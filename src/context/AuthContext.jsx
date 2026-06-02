import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const AuthContext = createContext();

const normalizeRole = (role) => {
  if (!role) return 'ogrenci';
  const r = role.toLowerCase().trim();
  const studentVariants = ['öğrenci', 'ogrenci', 'student', 'öğrenci', 'ogrencı'];
  const teacherVariants = ['öğretmen', 'ogretmen', 'teacher', 'ogretmen', 'ogretmen'];
  if (studentVariants.includes(r)) return 'ogrenci';
  if (teacherVariants.includes(r)) return 'ogretmen';
  return 'ogrenci';
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Clean up stale legacy active user if it exists in localStorage
      localStorage.removeItem('nashlab_active_user');

      const activeUserStr = sessionStorage.getItem('nashlab_active_session');
      if (activeUserStr && activeUserStr !== 'undefined') {
        const userData = JSON.parse(activeUserStr);
        const normalizedRole = normalizeRole(userData.role);
        const normalizedUser = { ...userData, role: normalizedRole };

        const allStatsStr = localStorage.getItem('nashlab_global_stats') || '{}';
        const allStats = JSON.parse(allStatsStr);
        const userStats = allStats[normalizedUser.email] || {
          xp: 0,
          level: 1,
          completedLessons: [],
          completedScenarios: [],
          badges: [],
          stats: { staticGames: 0, mixedStrategies: 0, dynamicGames: 0 },
          settings: { notifications: true, xpAlerts: true, news: false },
          weeklyProgress: { "Pzt": 0, "Sal": 0, "Çar": 0, "Per": 0, "Cum": 0, "Cmt": 0, "Paz": 0 }
        };
        
        setUser({ 
          ...normalizedUser, 
          ...userStats,
          weeklyProgress: userStats.weeklyProgress || { "Pzt": 0, "Sal": 0, "Çar": 0, "Per": 0, "Cum": 0, "Cmt": 0, "Paz": 0 }
        });
      }
    } catch (error) {
      console.error('Persistence load failed:', error);
      sessionStorage.removeItem('nashlab_active_session');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && user.email) {
      try {
        const allStatsStr = localStorage.getItem('nashlab_global_stats') || '{}';
        const allStats = JSON.parse(allStatsStr);
        allStats[user.email] = {
          xp: user.xp || 0,
          level: user.level || 1,
          completedLessons: user.completedLessons || [],
          completedScenarios: user.completedScenarios || [],
          badges: user.badges || [],
          stats: user.stats || { staticGames: 0, mixedStrategies: 0, dynamicGames: 0 },
          settings: user.settings || { notifications: true, xpAlerts: true, news: false },
          weeklyProgress: user.weeklyProgress || { "Pzt": 0, "Sal": 0, "Çar": 0, "Per": 0, "Cum": 0, "Cmt": 0, "Paz": 0 }
        };
        localStorage.setItem('nashlab_global_stats', JSON.stringify(allStats));
        
        const basicInfo = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role
        };
        sessionStorage.setItem('nashlab_active_session', JSON.stringify(basicInfo));

        // Sync local users list for login persistence
        const usersListStr = localStorage.getItem('nashlab_users');
        if (usersListStr) {
          const usersList = JSON.parse(usersListStr);
          const updatedList = usersList.map(u => 
            u.email === user.email ? { ...u, ...basicInfo } : u
          );
          localStorage.setItem('nashlab_users', JSON.stringify(updatedList));
        }
      } catch (e) {
        console.error('Persistence sync failed:', e);
      }
    }
  }, [user]);

  const login = useCallback((userData) => {
    const role = normalizeRole(userData.role);
    const normalizedUser = { ...userData, role };
    const allStatsStr = localStorage.getItem('nashlab_global_stats') || '{}';
    const allStats = JSON.parse(allStatsStr);
    const userStats = allStats[normalizedUser.email] || {
      xp: 0, level: 1, completedLessons: [], completedScenarios: [], badges: [],
      stats: { staticGames: 0, mixedStrategies: 0, dynamicGames: 0 },
      settings: { notifications: true, xpAlerts: true, news: false },
      weeklyProgress: { "Pzt": 0, "Sal": 0, "Çar": 0, "Per": 0, "Cum": 0, "Cmt": 0, "Paz": 0 }
    };
    setUser({ 
      ...normalizedUser, 
      ...userStats,
      weeklyProgress: userStats.weeklyProgress || { "Pzt": 0, "Sal": 0, "Çar": 0, "Per": 0, "Cum": 0, "Cmt": 0, "Paz": 0 }
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('nashlab_active_session');
  }, []);

  const updateProgression = useCallback((xpGain, lessonId = null, scenarioId = null, category = null) => {
    setUser(prev => {
      if (!prev) return null;
      const newXP = (prev.xp || 0) + xpGain;
      const newLevel = Math.floor(Math.sqrt(newXP / 100)) + 1;
      
      const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
      const todayName = dayNames[new Date().getDay()];
      const currentWeekly = prev.weeklyProgress || {
        "Pzt": 0, "Sal": 0, "Çar": 0, "Per": 0, "Cum": 0, "Cmt": 0, "Paz": 0
      };
      const updatedWeekly = {
        ...currentWeekly,
        [todayName]: (currentWeekly[todayName] || 0) + xpGain
      };

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        completedLessons: lessonId && !prev.completedLessons?.includes(lessonId) ? [...prev.completedLessons, lessonId] : prev.completedLessons,
        completedScenarios: scenarioId && !prev.completedScenarios?.includes(scenarioId) ? [...prev.completedScenarios, scenarioId] : prev.completedScenarios,
        stats: category ? { ...prev.stats, [category]: (prev.stats?.[category] || 0) + 1 } : prev.stats,
        weeklyProgress: updatedWeekly
      };
    });
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  const resetProgression = useCallback(() => {
    setUser(prev => prev ? {
      ...prev,
      xp: 0,
      level: 1,
      completedLessons: [],
      completedScenarios: [],
      stats: { staticGames: 0, mixedStrategies: 0, dynamicGames: 0 }
    } : null);
  }, []);

  const value = useMemo(() => ({
    user, login, logout, updateProgression, updateProfile, resetProgression,
    isAuthenticated: !!user, loading 
  }), [user, login, logout, updateProgression, updateProfile, resetProgression, loading]);

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
