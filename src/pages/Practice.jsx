import React, { useState, useEffect } from 'react';
import { GlassCard, PremiumButton, ProgressIndicator } from '../components/UI';
import { 
  Sword, Brain, Zap, Target, HelpCircle, 
  ChevronRight, Eye, CheckCircle, XCircle, 
  ArrowRight, Award, TrendingUp, Info, List, User,
  BookOpen, Users, AlertTriangle, Compass, CheckSquare, BarChart, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { academicScenarios } from '../data/scenarios';
import { AcademicVisualizer } from '../components/UI/AcademicVisualizer';

const CATEGORIES = {
  all: 'Tüm Müfredat',
  staticGames: 'Statik Oyunlar',
  nashEquilibrium: 'Nash Dengesi',
  mixedStrategies: 'Karma Stratejiler',
  industrialOrganization: 'Endüstriyel Organizasyon',
  dynamicGames: 'Dinamik Oyunlar',
  publicEconomics: 'Kamu Ekonomisi ve Politika'
};

const defaultExercises = [
  {
    id: 'static_1',
    title: 'Mahkumlar Açmazı',
    category: 'Mahkumlar Açmazı',
    difficulty: 'Başlangıç',
    scenario: 'İki rakip otomotiv üreticisi (Firma A ve Firma B) çevre mevzuatına uyum için Ar-Ge yatırımı yaparak "Yeşil Teknoloji"ye geçme veya mevcut teknolojiyi koruyup "Hileli Yazılım" kullanma kararı arasındadır. İkisi de yeşil teknolojiye geçerse karlar 3\'er birim olur. Biri dürüst davranıp yeşil yatırım yapar, diğeri hile yaparsa; hile yapan 6 birim kazanırken, dürüst firma 0 alır. İkisi de hileli yazılım kullanırsa karlar 1\'er birim olacaktır.',
    matrix: [[[3, 3], [0, 6]], [[6, 0], [1, 1]]],
    actions: ['Yeşil Yatırım', 'Hileli Yazılım'],
    question: 'Bu oyunda rasyonel karar mekanizması sonucunda hangi denge (Nash Dengesi) oluşur?',
    options: [
      { id: 'a', text: 'İkisi de Yeşil Yatırım seçer (3,3)', correct: false },
      { id: 'b', text: 'İkisi de Hileli Yazılım seçer (1,1)', correct: true },
      { id: 'c', text: 'Firma A Yeşil Yatırım, Firma B Hileli Yazılım seçer (0,6)', correct: false },
      { id: 'd', text: 'Saf strateji dengesi yoktur.', correct: false }
    ],
    correctAnswer: 'b',
    solution: 'Her iki firma için de "Hileli Yazılım" seçeneği dominant stratejidir. Karşı taraf ne seçerse seçsin hile yapmak daha yüksek getiri sağlar. Bu sebeple (Hileli Yazılım, Hileli Yazılım) hücresinde (1,1) ödemesi ile Nash dengesi oluşur.',
    explanation: 'Bu klasik bir Mahkumlar Açmazı (Prisoners Dilemma) oyunudur. Bireysel çıkarlar, toplumsal refahın kurban edilmesine yol açar.'
  },
  {
    id: 'ind_2',
    title: 'Fiyat Rekabeti',
    category: 'Fiyat Rekabeti',
    difficulty: 'Orta',
    scenario: 'İki internet servis sağlayıcı (Firma A ve Firma B) tamamen özdeş 100 Mbps fiber internet paketi satmaktadır. Tüketiciler en ucuz firmayı tercih etmektedir (Fiyatlar eşitse pazar yarı yarıya paylaşılır). Her iki firmanın da birim abone başına aylık operasyonel maliyeti c = 120 TL\'dir. Firmalar aynı anda aylık abonelik fiyatları PA and PB\'yi belirlemektedir.',
    matrix: [[[120, 120], [0, 180]], [[180, 0], [120, 120]]],
    actions: ['Fiyat Kır (120 TL)', 'Yüksek Tut (180 TL)'],
    question: 'Bertrand fiyat rekabeti altında bu oyunun Nash dengesindeki fiyatlar (PA*, PB*) ne olmalıdır?',
    options: [
      { id: 'a', text: 'PA* = 180 TL, PB* = 180 TL', correct: false },
      { id: 'b', text: 'PA* = 120 TL, PB* = 120 TL (Fiyat = Marjinal Maliyet)', correct: true },
      { id: 'c', text: 'PA* = 150 TL, PB* = 120 TL', correct: false },
      { id: 'd', text: 'Bu fiyatlarda bir denge oluşmaz.', correct: false }
    ],
    correctAnswer: 'b',
    solution: 'Eğer bir firma marjinal maliyetin üzerinde fiyat belirlerse, diğeri fiyatını onun hafifçe altına düşürerek tüm pazarı ele geçirebilir. Bu fiyat kırma yarışı, fiyatlar marjinal maliyete (120 TL) eşitlenene kadar sürer.',
    explanation: 'Bertrand Duopolü varsayımları altında, sadece iki firma bile olsa fiyat rekabeti sonucunda fiyatlar marjinal maliyete eşitlenir ve firmaların ekonomik karları sıfır olur (Bertrand Paradoksu).'
  },
  {
    id: 'mixed_4',
    title: 'Reklam Rekabeti',
    category: 'Reklam Rekabeti',
    difficulty: 'Orta',
    scenario: 'Aynı kavşaktaki Shell ve Opet istasyonları, "Agresif Tabela İndirimi" (İndirim) veya "Standart Fiyat" (Standart) stratejileri arasındadır. İkisi de indirim yaparsa marjlar erir, karlar 1 birim olur. İkisi de standart kalırsa karlar 3 birim olur. Biri indirim yapar diğeri standart kalırsa, indirim yapan pazarın %80\'ini kaparak 5 kazanır, standart kalan ise 0 birimde kalır.',
    matrix: [[[1, 1], [5, 0]], [[0, 5], [3, 3]]],
    actions: ['İndirim Yap', 'Standart Kal'],
    question: 'Bu oyunda firmaların tarafsız kalmasını sağlayan karma strateji olasılıkları p ve q nedir?',
    options: [
      { id: 'a', text: 'Karma strateji dengesi yoktur.', correct: false },
      { id: 'b', text: 'p = 0.50, q = 0.50', correct: false },
      { id: 'c', text: 'p = 0.40, q = 0.40', correct: false },
      { id: 'd', text: 'p = 0.60, q = 0.60', correct: true }
    ],
    correctAnswer: 'd',
    solution: 'Karma strateji dengesinde her iki firma da %60 olasılıkla İndirim Yap, %40 olasılıkla Standart Kal stratejisini seçer.',
    explanation: 'Tabela üzerinden agresif indirim yapma yarışı karma strateji ile modellenir ve her iki oyuncu için dengeli olasılıklar bulunur.'
  },
  {
    id: 'static_5',
    title: 'Koordinasyon Oyunu',
    category: 'Koordinasyon Oyunu',
    difficulty: 'Orta',
    scenario: 'İki bitişik arsanın sahipleri olan Müteahhit X ve Müteahhit Y, projeleri birleştirerek lüks bir rezidans inşa etme (Birleşik) ya da kendi arsalarına ayrı binalar dikme (Ayrı) kararı vermelidir. Birleşirse ortak otopark ve sosyal alan verimliliğiyle iki müteahhit de 6\'şar birim kazanacaktır. Biri birleşmek isteyip diğeri ayrı bina yapmakta ısrar ederse, birleşmek isteyen 1 birim, ayrı bina yapan ise 4 birim getiri alacaktır. İkisi de ayrı binada uzlaşırsa 4\'er birim kazanacaklardır.',
    matrix: [[[6, 6], [1, 4]], [[4, 1], [4, 4]]],
    actions: ['Birleşik Proje', 'Ayrı Proje'],
    question: 'Bu koordinasyon oyunundaki saf strateji Nash dengeleri hangileridir?',
    options: [
      { id: 'a', text: '(Birleşik Proje, Birleşik Proje) ve (Ayrı Proje, Ayrı Proje)', correct: true },
      { id: 'b', text: 'Yalnızca (Birleşik Proje, Birleşik Proje)', correct: false },
      { id: 'c', text: 'Yalnızca (Ayrı Proje, Ayrı Proje)', correct: false },
      { id: 'd', text: 'Bu oyunda Nash dengesi bulunmaz.', correct: false }
    ],
    correctAnswer: 'a',
    solution: 'İki adet Nash dengesi mevcuttur: (Birleşik Proje, Birleşik Proje) -> (6,6) ve (Ayrı Proje, Ayrı Proje) -> (4,4).',
    explanation: 'Koordinasyon oyunlarında birden fazla kararlı denge noktası bulunabilir. Ortak çıkarların optimize edildiği (6,6) dengesi Pareto dominanttır.'
  },
  {
    id: 'static_2',
    title: 'Battle of the Sexes',
    category: 'Battle of the Sexes',
    difficulty: 'Akademik',
    scenario: 'Teknoloji devleri Tesla ve Waymo, otonom araçların birbiriyle haberleşmesi için ortak bir standart seçmek zorundadır. Tesla kendi patenti olan "Protokol T"yi, Waymo ise "Protokol W"yi dayatmaktadır. Eğer iki firma da aynı protokolü seçerse araçlar arası mükemmel iletişim sağlanacak ve pazar büyüyecektir. Ancak Tesla, Protokol T seçildiğinde 4 birim, Protokol W seçildiğinde 2 birim kazanmaktadır. Waymo ise Protokol W seçildiğinde 4 birim, Protokol T seçildiğinde 2 birim kazanır. Farklı protokolleri seçerlerse iki firma da 0 alacaktır.',
    matrix: [[[4, 2], [0, 0]], [[0, 0], [2, 4]]],
    actions: ['Protokol T', 'Protokol W'],
    question: 'Bu oyunda saf strateji Nash dengeleri hangileridir?',
    options: [
      { id: 'a', text: 'Sadece (Protokol T, Protokol T)', correct: false },
      { id: 'b', text: '(Protokol T, Protokol T) ve (Protokol W, Protokol W)', correct: true },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: '(Protokol T, Protokol W) ve (Protokol W, Protokol T)', correct: false }
    ],
    correctAnswer: 'b',
    solution: 'İki adet saf strateji Nash dengesi vardır: (Protokol T, Protokol T) ödemesi (4,2) ve (Protokol W, Protokol W) ödemesi (2,4). Karşılıklı en iyi cevaplar bu hücrelerde çakışır.',
    explanation: 'Battle of the Sexes oyununda koordinasyon gereklidir ancak hangi standartta uzlaşılacağı konusunda çıkarlar çatışmaktadır.'
  },
  {
    id: 'static_3',
    title: 'Stag Hunt',
    category: 'Stag Hunt',
    difficulty: 'Akademik',
    scenario: 'İki savunma sanayii yüklenicisi, yeni bir askeri İHA için yüksek verimli hidrojen yakıt pili geliştirmek üzere ortak Ar-Ge projesine davet edilmiştir. Eğer iki firma da tüm mühendislik güçlerini projeye aktarırsa ("Büyük Av" / İşbirliği), devrimsel bir teknoloji üretilecek ve 5\'er birim getiri sağlayacaktır. Ancak firmalardan biri kaytarıp kendi geleneksel projelerine odaklanırsa ("Tavşan Avı" / Sapma), tek taraflı olarak 3 birimlik güvenli getiri elde edecektir. Bu durumda işbirliği yapmaya çalışan dürüst ortak hiçbir şey üretemeyerek 0 birim alacaktır. İkisi de sapmayı seçerse, her biri 3\'er birim alacaktır.',
    matrix: [[[5, 5], [0, 3]], [[3, 0], [3, 3]]],
    actions: ['Mühendislik Gücü (İşbirliği)', 'Kendi Projesi (Sapma)'],
    question: 'Bu oyunda hangi hücreler Nash dengesidir ve hangisi risk dominanttır?',
    options: [
      { id: 'a', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'b', text: 'Tek Nash dengesi vardır: (İşbirliği, İşbirliği) ve bu aynı zamanda risk dominanttır.', correct: false },
      { id: 'c', text: 'Nash dengeleri: (İşbirliği, İşbirliği) ve (Sapma, Sapma). Risk dominant olan (Sapma, Sapma) dengesidir.', correct: true },
      { id: 'd', text: 'Nash dengeleri: (İşbirliği, Sapma) ve (Sapma, İşbirliği).', correct: false }
    ],
    correctAnswer: 'c',
    solution: 'İki saf strateji Nash dengesi vardır: (İşbirliği, İşbirliği) -> (5,5) ve (Sapma, Sapma) -> (3,3). (Sapma, Sapma) dengesi risk dominanttır; çünkü diğer oyuncunun sapma olasılığına karşı korunaklıdır (saparsa 0 yerine 3 alınır).',
    explanation: 'Stag Hunt oyunlarında yüksek getirili işbirliği ile düşük getirili ama güvenli strateji arasında bir çatışma vardır.'
  },
  {
    id: 'nash_2',
    title: 'Tavuk Oyunu',
    category: 'Tavuk Oyunu',
    difficulty: 'Akademik',
    scenario: 'İki yerel enerji santrali (Santral 1 ve Santral 2) şebekeye yüksek akım ("Yüksek") ya da düşük akım ("Düşük") verme kararı alacaktır. Eğer ikisi de yüksek akım verirse trafolar aşırı yüklenecek, karlar 1\'er birim olacaktır. İkisi de düşük akım verirse karlar 2\'şer birim olacaktır. Ancak biri yüksek diğeri düşük verirse, yüksek veren santral 6 getiri alırken, düşük veren 4 getiri sağlayacaktır.',
    matrix: [[[1, 1], [6, 4]], [[4, 6], [2, 2]]],
    actions: ['Yüksek Akım', 'Düşük Akım'],
    question: 'Bu oyunda saf strateji Nash dengesi var mıdır, varsa hangileridir?',
    options: [
      { id: 'a', text: 'Tek bir Nash dengesi vardır: (Yüksek, Yüksek).', correct: false },
      { id: 'b', text: '(Yüksek, Düşük) ve (Düşük, Yüksek) olmak üzere iki denge vardır.', correct: true },
      { id: 'c', text: 'Tek bir Nash dengesi vardır: (Düşük, Düşük).', correct: false },
      { id: 'd', text: 'Saf strateji Nash dengesi yoktur.', correct: false }
    ],
    correctAnswer: 'b',
    solution: 'İki adet saf strateji Nash dengesi vardır: (Yüksek, Düşük) -> (6,4) ve (Düşük, Yüksek) -> (4,6). Karşılıklı en iyi cevaplar bu hücrelerde çakışır.',
    explanation: 'Tavuk Oyunu (Chicken Game) modelinde oyuncular birbiriyle ters yönlü stratejiler seçmeye zorlanır. İkisi de yüksek akım verirse sistem çöker.'
  },
  {
    id: 'mixed_3',
    title: 'Karma Strateji',
    category: 'Karma Strateji',
    difficulty: 'Uzman',
    scenario: 'Penaltı vuruşlarında bir Futbolcu ile Kaleci arasındaki mücadeleyi ele alalım. Futbolcu "Sola Vur" veya "Sağa Vur" seçimi yapmaktadır. Kaleci de "Sola Atla" veya "Sağa Atla" seçimi yapmaktadır. Eğer kaleci doğru köşeyi tahmin ederse kurtarış olasılığı yüksektir. Futbolcu sola vurup kaleci sola atlarsa gol olasılığı %40, kaleci sağa atlarsa gol olasılığı %90 olur. Futbolcu sağa vurup kaleci sola atlarsa gol olasılığı %80, kaleci sağa atlarsa gol olasılığı %30 olur.',
    matrix: [[[40, 60], [90, 10]], [[80, 20], [30, 70]]],
    actions: ['Sola Vur / Sola Atla', 'Sağa Vur / Sağa Atla'],
    question: 'Bu sıfır toplamlı penaltı oyununun karma strateji Nash dengesindeki sola vuruş (p) ve sola atlayış (q) olasılıkları nedir?',
    options: [
      { id: 'a', text: 'p* ≈ 0.50 sola vuruş | q* ≈ 0.60 sola atlayış', correct: true },
      { id: 'b', text: 'p* ≈ 0.33 sola vuruş | q* ≈ 0.33 sola atlayış', correct: false },
      { id: 'c', text: 'p* ≈ 0.80 sola vuruş | q* ≈ 0.20 sola atlayış', correct: false },
      { id: 'd', text: 'Bu oyunun karma strateji dengesi yoktur.', correct: false }
    ],
    correctAnswer: 'a',
    solution: 'Futbolcunun olasılıklarını q* olasılığı ile kalecinin kurtarma olasılıklarını eşitleyerek; kalecinin olasılıklarını p* olasılığı ile futbolcunun gol atma olasılıklarını eşitleyerek çözdüğümüzde: p* ≈ 0.50 ve q* ≈ 0.60 elde edilir.',
    explanation: 'Karma strateji dengesinde oyuncular birbirlerinin kararlarını tahmin edilemez kılmaya çalışırlar. Penaltı atışlarında da olasılıksal bir denge oluşur.'
  },
  {
    id: 'mixed_1',
    title: 'Denetleme Oyunu',
    category: 'Denetleme Oyunu',
    difficulty: 'Uzman',
    scenario: 'Vergi Dairesi (Maliye) ile bir Holding arasındaki stratejik vergi uyumu oyununu ele alalım. Holding, vergi beyanında "Dürüst Beyan" yapabilir veya vergiden kaçınmak için "Kaçırma" yoluna gidebilir. Maliye ise holdingi "Denetleyebilir" ya da "Denetlemez". Denetleme maliyeti Maliye için -2 birimdir. Dürüst beyan durumunda Holding 10 birim vergi öder, Maliye 10 kazanır. Kaçırma durumunda denetim olursa, Holding -10 birim zarar ederken, Maliye 12 birim alır. Eğer denetim olmazsa, Holding 15 birim getiri elde eder, Maliye ise 0 birim alabilir.',
    matrix: [[[8, 10], [12, -10]], [[10, 10], [0, 15]]],
    actions: ['Denetle', 'Denetleme'],
    actionsPlayerB: ['Dürüst Beyan', 'Kaçırma'],
    question: 'Holding\'in kaçırma olasılığı "p" ve Maliye\'nin denetleme olasılığı "q" ise, karma strateji Nash dengesindeki (p*, q*) değerleri ne olmalıdır?',
    options: [
      { id: 'a', text: 'p* = 0.20, q* = 0.20', correct: true },
      { id: 'b', text: 'p* = 0.50, q* = 0.50', correct: false },
      { id: 'c', text: 'p* = 0.40, q* = 0.30', correct: false },
      { id: 'd', text: 'Bu oyunun karma strateji dengesi yoktur.', correct: false }
    ],
    correctAnswer: 'a',
    solution: 'Holding kaçırma olasılığı p* = 0.20 ve Maliye denetleme olasılığı q* = 0.20 olarak hesaplanır.',
    explanation: 'Denetleme oyunlarında (Auditing Games) saf strateji dengesi yoktur; denge karma stratejilerle olasılıksal olarak sağlanır.'
  },
  {
    id: 'dynamic_1',
    title: 'Giriş Caydırma',
    category: 'Giriş Caydırma',
    difficulty: 'Uzman',
    scenario: 'Tekel konumundaki bir süpermarket zinciri (Mevcut) ve şehre yeni girmek isteyen yerel bir zincir (Rakip) arasındaki rekabeti inceleyelim. Önce Rakip karar verir: "Giriş Yap" veya "Dışarıda Kal". Eğer Rakip dışarıda kalırsa, Rakip 0, Mevcut 10 birim kazanır. Eğer Rakip giriş yaparsa, Mevcut karar verir: "Savaş (Fiyat Savaşları)" veya "Paylaş". Savaşırsa, iki firma da -2 birim zarar eder. Paylaşırsa, iki firma da 3\'er birim kazanır.',
    matrix: [[[3, 3], [-2, -2]], [[0, 10], [0, 10]]],
    actions: ['Giriş Yap', 'Dışarıda Kal'],
    question: 'Bu ardışık oyunun geriye doğru tümevarım (Backward Induction) ile bulunan Alt Oyun Kusursuz Dengesi (SPE) nedir?',
    options: [
      { id: 'a', text: 'SPE: Rakip Giriş Yapmaz; Mevcut Savaşır. Denge ödemesi: (0, 10).', correct: false },
      { id: 'b', text: 'SPE: Rakip Giriş Yapar; Mevcut Savaşır. Denge ödemesi: (-2, -2).', correct: false },
      { id: 'c', text: 'Denge yoktur.', correct: false },
      { id: 'd', text: 'SPE: Rakip Giriş Yapar; Mevcut Paylaşır. Denge ödemesi: (3, 3).', correct: true }
    ],
    correctAnswer: 'd',
    solution: 'SPE dengesi (Giriş Yap, Paylaş) olup denge ödemesi (3,3)\'tür.',
    explanation: 'Mevcut firmanın "Rakip girerse savaşırım" tehdidi rasyonel olmadığı için inandırıcı değildir (empty threat). Denge paylaşım ile sonuçlanır.'
  },
  {
    id: 'dynamic_2',
    title: 'Oyun Ağacı',
    category: 'Oyun Ağacı',
    difficulty: 'İleri Seviye',
    scenario: 'Bir metal fabrikasında İşçi Sendikası ve İşveren arasında toplu sözleşme görüşmeleri yapılmaktadır. Önce Sendika zam teklifini sunar: "Yüksek Zam" veya "Makul Zam". Sendika yüksek zam isterse, İşveren "Kabul Et" veya "Grev İlan Et" kararı verir. Kabul ederse ödemeler (5, 2) olur. Greve gidilirse ödemeler (1, 1) olur. Eğer Sendika makul zam teklif ederse, İşveren doğrudan kabul eder ve ödemeler (3, 4) olur.',
    matrix: [[[5, 2], [1, 1]], [[3, 4], [3, 4]]],
    actions: ['Yüksek Zam', 'Makul Zam'],
    question: 'Bu müzakere oyununda geriye doğru tümevarım yöntemiyle bulunan Alt Oyun Kusursuz Dengesi (SPE) nedir?',
    options: [
      { id: 'a', text: 'Sendika: Yüksek Zam teklif eder | İşveren: Yüksek zammı Kabul Eder.', correct: true },
      { id: 'b', text: 'Sendika: Makul Zam teklif eder | İşveren: Grev ilan eder.', correct: false },
      { id: 'c', text: 'Sendika: Yüksek Zam teklif eder | İşveren: Grev ilan eder.', correct: false },
      { id: 'd', text: 'Denge yoktur.', correct: false }
    ],
    correctAnswer: 'a',
    solution: 'SPE dengesinde Sendika Yüksek Zam ister ve İşveren bunu Kabul Eder. Ödemeler (5,2) olur.',
    explanation: 'İşveren için yüksek zam durumunda kabul etmek (2) greve gitmekten (1) daha iyidir. Dolayısıyla Sendika yüksek zam talep eder.'
  },
  {
    id: 'dynamic_3',
    title: 'Backward Induction',
    category: 'Backward Induction',
    difficulty: 'İleri Seviye',
    scenario: 'Bir teknoloji devi, yeni bir yapay zeka start-up\'ının geliştirdiği patenti satın almak ("Satın Al") veya patenti kopyalamak ("Kopyala") istemektedir. Önce Start-up patent lisans ücretini belirler: "Yüksek Fiyat" veya "Düşük Fiyat". Yüksek fiyatta Google kopyalarsa (Start-up: 1, Google: 6), satın alırsa (Start-up: 6, Google: 4) olur. Düşük fiyatta Google satın alırsa (Start-up: 4, Google: 8), kopyalarsa (Start-up: 1, Google: 6) olur.',
    matrix: [[[6, 4], [1, 6]], [[4, 8], [1, 6]]],
    actions: ['Yüksek Fiyat', 'Düşük Fiyat'],
    question: 'Geriye doğru tümevarım ile elde edilen SPE dengesi nedir?',
    options: [
      { id: 'a', text: 'Start-up: Yüksek Fiyat belirler | Google: Kopyalar.', correct: false },
      { id: 'b', text: 'Start-up: Düşük Fiyat belirler | Google: Satın Alır. Denge ödemesi: (4, 8).', correct: true },
      { id: 'c', text: 'Start-up: Yüksek Fiyat belirler | Google: Satın Alır.', correct: false },
      { id: 'd', text: 'Bu oyunda denge bulunmaz.', correct: false }
    ],
    correctAnswer: 'b',
    solution: 'Start-up Düşük Fiyat belirler ve Google bunu Satın Alır. Ödemeler (4,8) olur.',
    explanation: 'Start-up yüksek fiyat belirlerse kopyalanacağını öngördüğü için lisans ücretini düşük tutar ve satın almayı garantiler.'
  },
  {
    id: 'nash_1',
    title: 'Nash Dengesi',
    category: 'Nash Dengesi',
    difficulty: 'Akademik',
    scenario: 'Apple ve Samsung, yeni amiral gemisi modellerinin lansman tarihini seçmektedir. Seçenekler "Eylül" (Erken Lansman) veya "Aralık" (Geç Lansman) aylarıdır. İki firma da Eylül\'ü seçerse karlar 2\'şer birim olur. İkisi de Aralık\'ı seçerse karlar 3\'er birim olur. Apple Eylül\'ü, Samsung Aralık\'ı seçerse; Apple 5 kazanırken Samsung 1 alacaktır. Samsung Eylül\'ü, Apple Aralık\'ı seçerse Samsung 5 kazanırken Apple 1 alacaktır.',
    matrix: [[[2, 2], [5, 1]], [[1, 5], [3, 3]]],
    actions: ['Eylül (Erken)', 'Aralık (Geç)'],
    question: 'Bu oyunda saf strateji Nash dengesi nedir?',
    options: [
      { id: 'a', text: 'Nash dengesi (Eylül, Eylül) hücresindedir.', correct: true },
      { id: 'b', text: 'Nash dengesi (Aralık, Aralık) hücresindedir.', correct: false },
      { id: 'c', text: '(Eylül, Aralık) ve (Aralık, Eylül) dengeleridir.', correct: false },
      { id: 'd', text: 'Saf strateji Nash dengesi yoktur.', correct: false }
    ],
    correctAnswer: 'a',
    solution: 'Tek saf strateji Nash Dengesi (Eylül, Eylül) hücresinde ve (2,2) ödemesinde gerçekleşir.',
    explanation: 'Lansman zamanlamasında firmaların erken davranıp pazar payı kapma hırsı onları daha kötü bir dengeye (2,2) mahkum eder.'
  },
  {
    id: 'pub_1',
    title: 'Pareto Verimliliği',
    category: 'Pareto Verimliliği',
    difficulty: 'Akademik',
    scenario: 'Paris İklim Anlaşması çerçevesinde iki komşu ülke, sınır ötesi hava kirliliğini azaltmak için ortak çevre bütçesine katkıda bulunacaktır. Seçenekleri: "Yüksek Katkı" (maliyeti -3) veya "Kısıtlı Katkı" (maliyeti 0). Yaptıkları her yüksek katkı, çevre kalitesini artırarak her iki ülkeye de +2\'şer birim fayda sağlamaktadır.',
    matrix: [[[1, 1], [-1, 2]], [[2, -1], [0, 0]]],
    actions: ['Yüksek Katkı', 'Kısıtlı Katkı'],
    question: 'Bu oyundaki Nash Dengesi ve Pareto verimli (Sosyal Optimum) strateji çiftleri hangileridir?',
    options: [
      { id: 'a', text: 'Nash ve Sosyal Optimum: (Yüksek Katkı, Yüksek Katkı)', correct: false },
      { id: 'b', text: 'Nash: (Yüksek Katkı, Yüksek Katkı) | Sosyal Optimum: (Kısıtlı Katkı, Kısıtlı Katkı)', correct: false },
      { id: 'c', text: 'Nash: (Kısıtlı Katkı, Kısıtlı Katkı) | Sosyal Optimum: (Yüksek Katkı, Yüksek Katkı)', correct: true },
      { id: 'd', text: 'Nash dengesi yoktur.', correct: false }
    ],
    correctAnswer: 'c',
    solution: 'Nash Dengesi (Kısıtlı Katkı, Kısıtlı Katkı) iken, Pareto Etkin Sosyal Optimum (Yüksek Katkı, Yüksek Katkı) noktasıdır.',
    explanation: 'Serbest piyasa koşullarında bedavacılık (free-riding) nedeniyle çevre bütçesine katkı yapılmaz ve Pareto verimsiz bir denge oluşur.'
  },
  {
    id: 'pub_3',
    title: 'Kamu Malı Oyunu',
    category: 'Kamu Malı Oyunu',
    difficulty: 'Orta',
    scenario: 'Komşu iki belediye, sınır bölgesine ortak bir "Katı Atık Arıtma Tesisi" kurma kararı alacaktır. Belediye A ve B projeye "Katılım" (maliyeti -4) veya "Pasif Kalma" (maliyeti 0) kararı verecektir. Tesis kurulursa (en az bir katılım), iki belediye de temiz çevreden dolayı +6\'şar birim fayda kazanacaktır.',
    matrix: [[[2, 2], [2, 6]], [[6, 2], [0, 0]]],
    actions: ['Katılım', 'Pasif Kalma'],
    question: 'Bu oyunda hangi strateji çiftleri saf Nash dengesidir?',
    options: [
      { id: 'a', text: 'Yalnızca (Katılım, Katılım)', correct: false },
      { id: 'b', text: '(Katılım, Katılım) ve (Pasif Kalma, Pasif Kalma)', correct: false },
      { id: 'c', text: '(Katılım, Pasif Kalma) ve (Pasif Kalma, Katılım)', correct: true },
      { id: 'd', text: 'Bu oyunda Nash dengesi yoktur.', correct: false }
    ],
    correctAnswer: 'c',
    solution: 'İki adet Nash dengesi vardır: (Katılım, Pasif Kalma) ve (Pasif Kalma, Katılım). Belediyelerden birinin tesisi kurması yeterlidir.',
    explanation: 'Kamu malı yatırımlarında tek bir tarafın yatırımı üstlenmesi ve diğerinin bedavacılık yapması dengeli bir durum oluşturabilir.'
  },
  {
    id: 'static_6',
    title: 'İşlemci Standardı Koordinasyonu',
    category: 'Koordinasyon Oyunu',
    difficulty: 'Orta',
    scenario: 'Intel ve AMD, yeni nesil işlemci mimarisinde ARM tabanlı tasarıma geçmek (ARM) veya geleneksel x86 mimarisini optimize etmek (x86) arasındadır. İki firma da aynı mimariyi seçerse yazılım ekosistemi tek tipe odaklanacak ve pazar büyüyecektir. Ancak Intel x86 mimarisinde uzmanlaştığı için x86 seçilirse 5, ARM seçilirse 2 birim kazanır. AMD ise ARM mimarisinde daha tecrübeli olup ARM seçilirse 5, x86 seçilirse 2 kazanır. Farklı yönlere giderlerse iki firma da 1 birim kazanacaktır.',
    matrix: [[[2, 5], [1, 1]], [[1, 1], [5, 2]]],
    actions: ['ARM Mimarisi', 'x86 Mimarisi'],
    question: 'Bu oyundaki saf strateji Nash dengeleri hangileridir?',
    options: [
      { id: 'a', text: 'Sadece (ARM Mimarisi, ARM Mimarisi)', correct: false },
      { id: 'b', text: '(ARM, ARM) ve (x86, x86) dengeleridir.', correct: true },
      { id: 'c', text: '(ARM, x86) ve (x86, ARM) dengeleridir.', correct: false },
      { id: 'd', text: 'Bu oyunun Nash dengesi yoktur.', correct: false }
    ],
    correctAnswer: 'b',
    solution: 'İki adet Nash dengesi vardır: (ARM, ARM) -> (2,5) ve (x86, x86) -> (5,2).',
    explanation: 'Standart belirleme savaşlarında firmalar rakibinin seçimine koordinasyon kurmak amacıyla uyum göstermek zorunda kalabilirler.'
  },
  {
    id: 'nash_6',
    title: 'Kargo Kampanyası Savaşı',
    category: 'Tavuk Oyunu',
    difficulty: 'Orta',
    scenario: 'Hepsiburada ve Trendyol, alışverişlerde "Bedava Kargo" sınırı belirlemektedir. İki firma da bedava kargo alt sınırını yüksek tutarsa kargo maliyetleri düşük kalacak ve getiriler 4\'er birim olacaktır. Firmalardan biri sınırı düşürürse müşteri çekecek ve 5 kazanacaktır. Bu durumda yüksek sınırda kalan rakip 1 birimde kalacaktır. İkisi de sınırı düşürürse, kargo maliyetleri getirileri eritecek ve 2\'şer birim getiri kalacaktır.',
    matrix: [[[4, 4], [1, 5]], [[5, 1], [2, 2]]],
    actions: ['Yüksek Sınır', 'Düşük Sınır'],
    question: 'Bu oyunda firmaların seçtiği denge noktası hangisidir?',
    options: [
      { id: 'a', text: '(Yüksek Sınır, Yüksek Sınır)', correct: false },
      { id: 'b', text: '(Düşük Sınır, Düşük Sınır) hücresidir.', correct: true },
      { id: 'c', text: '(Düşük Sınır, Yüksek Sınır) hücresidir.', correct: false },
      { id: 'd', text: 'Nash dengesi yoktur.', correct: false }
    ],
    correctAnswer: 'b',
    solution: 'Tek Nash Dengesi (Düşük Sınır, Düşük Sınır) hücresindedir. Ödemeler (2,2)\'dir.',
    explanation: 'Bedava kargo sınırı rekabetinde firmalar müşteri kaybetmemek için kâr marjlarını eritmeyi göze alır.'
  },
  {
    id: 'nash_7',
    title: 'Kripto Havuzları İşbirliği',
    category: 'Stag Hunt',
    difficulty: 'Orta',
    scenario: 'İki büyük Bitcoin madencilik havuzu, yeni bir işlem bloğunu doğrulamak için işlemci güçlerini birleştirmek (Birleştir) veya tek başlarına blok bulmaya çalışmak (Tek Başına) kararı alacaktır. Güçlerini birleştirirlerse blok ödülünü paylaşacaklar ve her biri garantili 4 birim kazanacaktır. Biri güç birliği teklif edip diğeri tek başına madencilik yaparsa, tek başına çalışan havuz şans eseri bloğu bulursa 5 alacak, birleşmek isteyen dürüst havuz ise 1 alacaktır. İkisi de tek başına çalışırsa karlar 3\'er birim olacaktır.',
    matrix: [[[4, 4], [1, 5]], [[5, 1], [3, 3]]],
    actions: ['Güç Birleştir', 'Tek Başına'],
    question: 'Bu oyunda Nash dengeleri hangileridir?',
    options: [
      { id: 'a', text: 'Yalnızca (Güç Birleştir, Güç Birleştir)', correct: false },
      { id: 'b', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'c', text: '(Güç Birleştir, Güç Birleştir) ve (Tek Başına, Tek Başına)', correct: true },
      { id: 'd', text: '(Güç Birleştir, Tek Başına)', correct: false }
    ],
    correctAnswer: 'c',
    solution: 'İki adet Nash dengesi vardır: (Güç Birleştir, Güç Birleştir) -> (4,4) ve (Tek Başına, Tek Başına) -> (3,3).',
    explanation: 'Kripto madenciliğinde ortaklık kurmak verimlidir fakat güvensizlik bağımsız çalışmayı tetikleyebilir.'
  },
  {
    id: 'nash_8',
    title: 'Otobüs Firmaları Sefer Rekabeti',
    category: 'Nash Dengesi',
    difficulty: 'Orta',
    scenario: 'İki rakip otobüs firması, Ankara-İzmir hattı için aynı saatte ek sefer koyup koymama kararı alacaktır. İkisi de ek sefer koyarsa arz fazlası oluşacak ve karlar 2\'şer birim olacaktır. İkisi de sefer eklemezse otobüsler dolacak ve karlar 4\'er birim olacaktır. Biri sefer ekler diğeri eklemezse, sefer ekleyen 5 kazanacak, eklemeyen ise 1 birim alacaktır.',
    matrix: [[[2, 2], [5, 1]], [[1, 5], [4, 4]]],
    actions: ['Sefer Ekle', 'Ekleme'],
    question: 'Bu oyunda Nash dengesi nedir?',
    options: [
      { id: 'a', text: 'Nash dengesi (Ekleme, Ekleme) hücresindedir.', correct: false },
      { id: 'b', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'c', text: '(Sefer Ekle, Ekleme) hücresindedir.', correct: false },
      { id: 'd', text: 'Nash dengesi (Sefer Ekle, Sefer Ekle) hücresindedir.', correct: true }
    ],
    correctAnswer: 'd',
    solution: 'Tek Nash Dengesi (Sefer Ekle, Sefer Ekle) -> (2,2) noktasıdır.',
    explanation: 'Ek sefer koyup pazar payını koruma dürtüsü iki firmayı da kâr kaybına sürükler.'
  },
  {
    id: 'pub_2',
    title: 'Orkinos Avcılığı Çıkmazı',
    category: 'Kamu Malı Oyunu',
    difficulty: 'Akademik',
    scenario: 'Akdeniz\'de avlanan iki balıkçılık filosu, Mavi Yüzgeçli Orkinos avlamaktadır. Seçenekleri: "Sürdürülebilir Avcılık (Az Av)" veya "Aşırı Avcılık (Çok Av)". Eğer ikisi de az avlanırsa balık nüfusu korunacak ve karlar 4\'er birim olacaktır. Biri az avlanırken diğeri aşırı avlanırsa; aşırı avlanan 6 kazanacak, dürüst davranan ise 1 alacaktır. İkisi de aşırı avlanırsa balık stokları hızla tükenecek ve karlar uzun vadede 2\'şer birime düşecektir.',
    matrix: [[[4, 4], [1, 6]], [[6, 1], [2, 2]]],
    actions: ['Az Avlan', 'Çok Avlan'],
    question: 'Bu oyunda oluşan Nash dengesi ve Pareto etkin olmayan durum nedir?',
    options: [
      { id: 'a', text: 'Nash dengesi (Az Avlan, Az Avlan)\'dır.', correct: false },
      { id: 'b', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'c', text: '(Az Avlan, Çok Avlan) dengesidir.', correct: false },
      { id: 'd', text: 'Nash dengesi (Çok Avlan, Çok Avlan)\'dır ve bu durum Pareto verimsizdir.', correct: true }
    ],
    correctAnswer: 'd',
    solution: 'Nash dengesi (Çok Avlan, Çok Avlan) olup ödemeler (2,2)\'dir. Bu denge Pareto verimsizdir.',
    explanation: 'Bireysel kâr hırsının ortak doğal kaynakları yok etmesi "Ortak Kaynakların Trajedisi" olarak bilinir.'
  }
];

// Helper to check category compatibility
const matchCategory = (scenarioCategory, activeCat) => {
  if (activeCat === 'all') return true;
  if (!scenarioCategory) return false;
  
  const sc = scenarioCategory.toLowerCase();
  
  if (activeCat === 'staticGames') {
    return sc.includes('mahkum') || sc.includes('koordinasyon') || sc.includes('battle') || sc.includes('stag') || sc.includes('tavuk') || sc.includes('static');
  }
  if (activeCat === 'nashEquilibrium') {
    return sc.includes('nash') || sc.includes('dengesi');
  }
  if (activeCat === 'mixedStrategies') {
    return sc.includes('mixed') || sc.includes('karma') || sc.includes('denetleme');
  }
  if (activeCat === 'industrialOrganization') {
    return sc.includes('fiyat') || sc.includes('reklam') || sc.includes('industrial') || sc.includes('organizasyon');
  }
  if (activeCat === 'dynamicGames') {
    return sc.includes('dynamic') || sc.includes('dinamik') || sc.includes('giriş') || sc.includes('ağacı') || sc.includes('backward') || sc.includes('induct');
  }
  if (activeCat === 'publicEconomics') {
    return sc.includes('kamu') || sc.includes('pareto') || sc.includes('public') || sc.includes('ortak');
  }
  
  return sc.includes(activeCat.toLowerCase());
};

const mapScenario = (s) => {
  if (!s) return null;
  const id = s.id || `scenario_${Date.now()}_${Math.random()}`;
  const title = s.title || "Başlıksız Alıştırma";
  const category = s.category || "Nash Dengesi";
  const difficulty = s.difficulty || "Orta";
  const desc = s.scenario || s.desc || "Açıklama belirtilmemiş.";
  const matrix = s.matrix || s.payoff || [[[0,0],[0,0]],[[0,0],[0,0]]];
  const question = s.question || "Soru belirtilmemiş.";
  const reward = s.reward || "200 XP";
  const author = s.author || "Akademi";

  const safeOptions = Array.isArray(s.options) ? s.options.map(opt => ({
    id: opt?.id || '',
    text: opt?.text || 'Seçenek belirtilmemiş',
    correct: opt?.correct !== undefined ? opt.correct : (s.correctAnswer ? s.correctAnswer === opt.id : false)
  })) : [
    { id: 'a', text: 'Strateji A', correct: s.correctAnswer === 'a' },
    { id: 'b', text: 'Strateji B', correct: s.correctAnswer === 'b' },
    { id: 'c', text: 'Strateji C', correct: s.correctAnswer === 'c' },
    { id: 'd', text: 'Strateji D', correct: s.correctAnswer === 'd' }
  ];

  let visualData = s.visualData;
  if (!visualData) {
    let type = 'matrix';
    const catLower = category.toLowerCase();
    if (catLower.includes('karma') || catLower.includes('denetleme')) {
      type = 'mixed';
    } else if (catLower.includes('ağacı') || catLower.includes('backward') || catLower.includes('giriş')) {
      type = 'tree';
    } else if (catLower.includes('kamu')) {
      type = 'public';
    }
    
    visualData = {
      type,
      brA: s.brA || [[0, 0]],
      brB: s.brB || [[0, 0]],
      nashCells: s.nashCells || [[0, 0]],
      mixedEq: s.mixedEq || { p: 0.5, q: 0.5 },
      treeNodes: s.treeNodes || { nodes: [], edges: [] }
    };
  }

  const explanationText = s.explanation || s.solution || "Çözüm açıklaması belirtilmemiş.";
  const solutionText = s.solution || s.explanation || "Çözüm açıklaması belirtilmemiş.";
  
  const academicSolution = {
    interpretation: explanationText,
    players: (s.academicSolution && s.academicSolution.players) || 'Eğitmen tarafından belirtilen iki oyuncu.',
    dominant: (s.academicSolution && s.academicSolution.dominant) || 'Dominant stratejiler matris verilerinden bulunabilir.',
    bestResponse: (s.academicSolution && s.academicSolution.bestResponse) || 'En iyi tepkiler matris verilerinden bulunabilir.',
    nash: solutionText,
    pareto: (s.academicSolution && s.academicSolution.pareto) || 'Sosyal optimum ile Nash kıyaslaması.',
    economicComment: (s.academicSolution && s.academicSolution.economicComment) || 'İlgili durumun sektörel/ekonomik yansıması.',
    ...s.academicSolution
  };

  return {
    id,
    title,
    category,
    difficulty,
    desc,
    scenario: desc,
    matrix,
    payoff: matrix,
    question,
    options: safeOptions,
    correctAnswer: s.correctAnswer || '',
    reward,
    author,
    academicSolution,
    visualData,
    explanation: explanationText,
    solution: solutionText
  };
};

const defaultScenarios = (defaultExercises || []).map(mapScenario).filter(Boolean);

const Practice = () => {
  const { user, updateProgression } = useAuth();
  const [selectedId, setSelectedId] = useState(() => localStorage.getItem('nashlab_current_scenario_id') || null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [answer, setAnswer] = useState(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  
  const [scenarios, setScenarios] = useState(() => {
    let customScenarios = [];
    try {
      const raw = localStorage.getItem('nashlab_custom_questions');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          customScenarios = parsed;
        }
      }
    } catch (error) {
      console.error('Failed to parse custom questions:', error);
      // Clean up corrupted key and fallback to defaults
      try {
        localStorage.removeItem('nashlab_custom_questions');
      } catch (e) {
        console.error(e);
      }
    }

    const mappedCustom = (customScenarios || []).map(s => {
      if (!s) return null;
      return mapScenario({
        ...s,
        author: 'Öğretmen'
      });
    }).filter(Boolean);

    return [...defaultScenarios, ...mappedCustom];
  });
  
  // Solution Tabs state (1 to 7)
  const [activeSolutionTab, setActiveSolutionTab] = useState('interpretation');

  useEffect(() => {
    if (selectedId) {
      localStorage.setItem('nashlab_current_scenario_id', selectedId);
      if (scenarios.length > 0) {
        const exists = scenarios.some(s => s && s.id === selectedId);
        if (!exists) {
          setSelectedId(null);
        }
      }
    } else {
      localStorage.removeItem('nashlab_current_scenario_id');
    }
  }, [selectedId, scenarios]);

  const current = (scenarios || []).find(s => s && s.id === selectedId);
  const showDetail = !!(selectedId && current);

  const filteredScenarios = activeCategory === 'all' 
    ? (scenarios || []) 
    : (scenarios || []).filter(s => s && matchCategory(s.category, activeCategory));

  const handleEvaluate = () => {
    if (!answer) return;
    setIsEvaluated(true);
    setShowSolution(true); // Automatically open solution
    if (answer.correct && current) {
      updateProgression(parseInt(current.reward) || 200, null, current.id, current.category || 'staticGames');
    }
  };

  const handleNext = () => {
    const list = scenarios || [];
    const idx = list.findIndex(s => s && s.id === selectedId);
    if (idx !== -1 && idx < list.length - 1) {
      resetState();
      setSelectedId(list[idx + 1].id);
    } else {
      setSelectedId(null);
      resetState();
    }
  };

  const resetState = () => {
    setAnswer(null);
    setIsEvaluated(false);
    setShowSolution(false);
    setActiveSolutionTab('interpretation');
  };

  const onOptionClick = (opt) => {
    if (isEvaluated) return;
    setAnswer(opt);
  };

  const academicSolution = current?.academicSolution || {};
  const solutionInterpretation = academicSolution.interpretation || 'Çözüm açıklaması eklenmemiş.';
  const solutionPlayers = academicSolution.players || 'Oyuncu analizi eklenmemiş.';
  const solutionDominant = academicSolution.dominant || 'Dominant strateji analizi eklenmemiş.';
  const solutionBestResponse = academicSolution.bestResponse || 'En iyi tepki analizi eklenmemiş.';
  const solutionNash = academicSolution.nash || 'Nash dengesi analizi eklenmemiş.';
  const solutionPareto = academicSolution.pareto || 'Pareto analizi eklenmemiş.';
  const solutionEconomicComment = academicSolution.economicComment || 'Ekonomik çıkarım eklenmemiş.';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="practice-academic" style={{ paddingBottom: '4rem' }}>
      <AnimatePresence mode="wait">
        {!showDetail ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
            {/* Header Area */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 800 }}>NashLab Akademi Çalışma Odası</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Üniversite müfredatına uygun seviyelerde Oyun Teorisi teorisini ve matematiksel uygulamalarını interaktif senaryolarla kavrayın.</p>
            </div>

            {/* Category Navigation Bar */}
            <div style={categoryBar}>
              {Object.keys(CATEGORIES).map(catKey => (
                <button
                  key={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  style={{
                    ...categoryTab,
                    background: activeCategory === catKey ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    color: activeCategory === catKey ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    borderColor: activeCategory === catKey ? 'var(--accent-blue)' : 'transparent'
                  }}
                >
                  {CATEGORIES[catKey]}
                </button>
              ))}
            </div>

            {/* Main Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
              {/* Question list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {(filteredScenarios || []).length > 0 ? (
                  (filteredScenarios || []).map((s) => {
                    if (!s) return null;
                    const isCompleted = user?.completedScenarios?.includes(s.id);
                    return (
                      <GlassCard 
                        key={s.id} 
                        style={{ 
                          padding: '1.5rem', 
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          border: isCompleted ? '1px solid #10b981' : '1px solid var(--glass-border)' 
                        }}
                        onClick={() => {
                          setSelectedId(s.id);
                          resetState();
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: '1.25rem' }}>
                            <div style={iconBox}>
                              {isCompleted ? (
                                <CheckCircle color="#10b981" />
                              ) : s.author === 'Öğretmen' ? (
                                <User color="#10b981" />
                              ) : (
                                <Brain color="var(--accent-blue)" />
                              )}
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{s.title || "Başlıksız Alıştırma"}</h3>
                                {s.author === 'Öğretmen' && <span style={teacherBadge}>Eğitmen İçeriği</span>}
                              </div>
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0.5rem 0', lineClamp: '1', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {s.desc || "Açıklama belirtilmemiş."}
                              </p>
                              <div style={badgeRow}>
                                <span style={categoryTag}>{CATEGORIES[s.category] || s.category || "staticGames"}</span>
                                <span style={diffTag}>{s.difficulty || "Orta"}</span>
                                <span style={xpTag}>{s.reward || "200 XP"}</span>
                                {isCompleted && <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓ Çözüldü</span>}
                              </div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }} onClick={(e) => e.stopPropagation()}>
                            <PremiumButton 
                              size="small" 
                              variant="glass" 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                setSelectedId(s.id); 
                                setIsEvaluated(true);
                                setShowSolution(true);
                                setAnswer(null);
                              }}
                            >
                              Çözümü Göster
                            </PremiumButton>
                            <PremiumButton 
                              size="small" 
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                setSelectedId(s.id); 
                                resetState(); 
                              }}
                            >
                              Başla
                            </PremiumButton>
                          </div>
                        </div>
                      </GlassCard>
                    );
                  })
                ) : (
                  <GlassCard style={{ padding: '3rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>Bu kategoride henüz yayınlanmış bir akademik senaryo bulunmamaktadır.</p>
                  </GlassCard>
                )}
              </div>

              {/* Stats & Progress Sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <GlassCard style={{ padding: '1.5rem' }}>
                   <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <Award size={48} color="#fbbf24" style={{ marginBottom: '0.5rem' }} />
                      <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>Seviye {user?.level || 1}</div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Toplam Başarı: {user?.xp || 0} XP</p>
                   </div>
                   <ProgressIndicator label="Sonraki Seviye İlerlemesi" value={(user?.xp % 100)} />
                </GlassCard>

                <GlassCard style={{ padding: '1.5rem' }}>
                   <h4 style={{ marginBottom: '1rem', fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Ders Yetkinlik Endeksi</h4>
                   <SkillStat label="Statik Oyunlar" value={user?.stats?.staticGames || 0} />
                   <SkillStat label="Karma Stratejiler" value={user?.stats?.mixedStrategies || 0} />
                   <SkillStat label="Dinamik Oyunlar" value={user?.stats?.dynamicGames || 0} />
                   <SkillStat label="Endüstriyel Organizasyon" value={user?.stats?.industrialOrganization || 0} />
                   <SkillStat label="Kamu Ekonomisi" value={user?.stats?.publicEconomics || 0} />
                </GlassCard>

                <GlassCard style={{ padding: '1.5rem' }}>
                   <h4 style={{ marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 700 }}><Info size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Çalışma Tavsiyesi</h4>
                   <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                     Nash dengesi analizi yaparken her zaman **"Best Response" (En İyi Tepki)** işaretleme metodunu kullanın. Karşılıklı en iyi tepkilerin çakıştığı hücreler, oyunun saf strateji dengeleridir.
                   </p>
                </GlassCard>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="game" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
               {/* Back navigation */}
               <button onClick={() => setSelectedId(null)} style={backLink}>
                 <ArrowRight size={16} style={{ transform: 'rotate(180deg)', marginRight: '6px' }} /> 
                 Akademi Müfredatına Dön
               </button>
               
               {/* Detail Grid */}
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
                  <div>
                     {/* Question area */}
                     <GlassCard style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                           <span style={catBadge}>{CATEGORIES[current.category] || current.category || 'Senaryo'}</span>
                           <span style={diffBadge}>{current.difficulty || 'Orta'}</span>
                           {current.author === 'Öğretmen' && <span style={teacherBadgeSmall}>Eğitmen İçeriği</span>}
                        </div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 800 }}>{current.title || "Başlıksız Alıştırma"}</h2>
                        <p style={problemText}>{current.desc || "Açıklama belirtilmemiş."}</p>

                        {/* Embed the Dynamic Academic Visualizer */}
                        {current.visualData && (
                          <div style={{ margin: '1.5rem 0' }}>
                            <AcademicVisualizer 
                              scenario={current} 
                              isRevealed={isEvaluated || showSolution} 
                              userAnswer={answer} 
                            />
                          </div>
                        )}

                        <div style={questionHeader}>
                           <HelpCircle size={22} color="var(--accent-blue)" />
                           <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>{current.question || "Soru cümlesi eklenmemiş."}</h4>
                        </div>

                        {/* Options */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           {(current?.options || []).map(opt => {
                              if (!opt) return null;
                              const isSelected = answer?.id === opt.id;
                              const isCorrect = opt.correct || false;
                              let btnBorderColor = 'var(--glass-border)';
                              let btnBackground = 'rgba(255,255,255,0.02)';
                              let btnOpacity = 1;
                              let circleBorderColor = 'rgba(255,255,255,0.2)';
                              let circleTextColor = 'white';

                              if (!isEvaluated) {
                                btnBorderColor = isSelected ? 'var(--accent-blue)' : 'var(--glass-border)';
                                btnBackground = isSelected ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255,255,255,0.02)';
                                circleBorderColor = isSelected ? 'var(--accent-blue)' : 'rgba(255,255,255,0.2)';
                                circleTextColor = isSelected ? 'var(--accent-blue)' : 'white';
                              } else {
                                if (isSelected) {
                                  if (isCorrect) {
                                    btnBorderColor = '#10b981';
                                    btnBackground = 'rgba(16, 185, 129, 0.12)';
                                    circleBorderColor = '#10b981';
                                    circleTextColor = '#10b981';
                                  } else {
                                    btnBorderColor = '#ef4444';
                                    btnBackground = 'rgba(239, 68, 68, 0.12)';
                                    circleBorderColor = '#ef4444';
                                    circleTextColor = '#ef4444';
                                  }
                                } else {
                                  if (isCorrect) {
                                    btnBorderColor = '#10b981';
                                    btnBackground = 'rgba(16, 185, 129, 0.05)';
                                    circleBorderColor = '#10b981';
                                    circleTextColor = '#10b981';
                                  } else {
                                    btnBorderColor = 'var(--glass-border)';
                                    btnBackground = 'rgba(255,255,255,0.01)';
                                    btnOpacity = 0.5;
                                    circleBorderColor = 'rgba(255,255,255,0.1)';
                                    circleTextColor = 'var(--text-muted)';
                                  }
                                }
                              }

                              return (
                                <button 
                                  key={opt.id}
                                  onClick={(e) => { e.preventDefault(); onOptionClick(opt); }}
                                  style={{ 
                                    ...optionBtn, 
                                    borderColor: btnBorderColor,
                                    background: btnBackground,
                                    opacity: btnOpacity,
                                    cursor: isEvaluated ? 'default' : 'pointer'
                                  }}
                                >
                                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                      <div style={{ 
                                         width: '28px', height: '28px', borderRadius: '50%', border: '2px solid',
                                         borderColor: circleBorderColor,
                                         color: circleTextColor,
                                         display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700
                                      }}>
                                         {(opt.id || '').toUpperCase()}
                                      </div>
                                      <span style={{ fontSize: '0.95rem', color: isEvaluated && isCorrect ? '#10b981' : 'white' }}>{opt.text || "Seçenek metni girilmemiş."}</span>
                                   </div>
                                </button>
                              );
                           })}
                        </div>

                        {/* Action buttons */}
                        {!isEvaluated ? (
                          <PremiumButton 
                            disabled={!answer}
                            onClick={handleEvaluate}
                            style={{ width: '100%', justifyContent: 'center', marginTop: '2rem', height: '50px' }}
                          >
                             Stratejik Analizi Değerlendir
                          </PremiumButton>
                        ) : (
                          <div style={{ marginTop: '2rem' }}>
                             {answer ? (
                               answer.correct ? (
                                  <div style={successBox}>
                                     <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                                        <CheckCircle color="#10b981" /> Doğru Analiz
                                     </h4>
                                     <p style={{ fontSize: '0.9rem' }}>Harika! Oyun dengesini ve rasyonel oyuncu davranışlarını kusursuz şekilde tespit ettiniz.</p>
                                     <div style={{ marginTop: '0.75rem', fontWeight: 800, color: '#fbbf24', fontSize: '1.1rem' }}>+{current.reward || "200"} XP Akademik Puan</div>
                                  </div>
                               ) : (
                                  <div style={errorBox}>
                                     <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                                        <XCircle color="#ef4444" /> Hatalı Analiz
                                     </h4>
                                     <p style={{ fontSize: '0.9rem' }}>Belirttiğiniz strateji dengesi, rasyonel kararlarla veya Nash en iyi tepki kesişimiyle örtüşmemektedir.</p>
                                  </div>
                               )
                             ) : (
                               <div style={infoBox}>
                                 <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                                    <BookOpen color="var(--accent-blue)" /> Çözüm İzleme Modu
                                 </h4>
                                 <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Bu oyunun çözüm adımlarını, dominant stratejilerini ve akademik analizini aşağıdan inceleyebilirsiniz.</p>
                               </div>
                             )}
                             <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                <PremiumButton variant="glass" style={{ flex: 1 }} onClick={() => setShowSolution(!showSolution)} icon={Eye}>
                                  {showSolution ? 'Çözüm Rehberini Gizle' : '7 Aşamalı Çözüm Rehberi'}
                                </PremiumButton>
                                <PremiumButton style={{ flex: 1 }} onClick={handleNext} icon={ChevronRight}>Sıradaki Akademik Konu</PremiumButton>
                             </div>
                          </div>
                        )}
                     </GlassCard>

                     {/* 7-STEP RIGOROUS ACADEMIC SOLUTION SUITE */}
                     <AnimatePresence>
                      {showSolution && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0 }}>
                           <GlassCard style={{ padding: '2rem', marginTop: '1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
                                <BookOpen size={24} color="var(--accent-blue)" />
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Üniversite Düzeyi Akademik Çözüm Rehberi</h3>
                              </div>

                              {/* Solution Tabs */}
                              <div style={solutionTabBar}>
                                <button onClick={() => setActiveSolutionTab('interpretation')} style={{...solutionTabButton, borderColor: activeSolutionTab === 'interpretation' ? 'var(--accent-blue)' : 'transparent', color: activeSolutionTab === 'interpretation' ? 'white' : 'var(--text-secondary)'}}>
                                  <Compass size={14} /> 1. Yorum
                                </button>
                                <button onClick={() => setActiveSolutionTab('players')} style={{...solutionTabButton, borderColor: activeSolutionTab === 'players' ? 'var(--accent-blue)' : 'transparent', color: activeSolutionTab === 'players' ? 'white' : 'var(--text-secondary)'}}>
                                  <Users size={14} /> 2. Aktörler
                                </button>
                                <button onClick={() => setActiveSolutionTab('dominant')} style={{...solutionTabButton, borderColor: activeSolutionTab === 'dominant' ? 'var(--accent-blue)' : 'transparent', color: activeSolutionTab === 'dominant' ? 'white' : 'var(--text-secondary)'}}>
                                  <Zap size={14} /> 3. Dominantlık
                                </button>
                                <button onClick={() => setActiveSolutionTab('bestResponse')} style={{...solutionTabButton, borderColor: activeSolutionTab === 'bestResponse' ? 'var(--accent-blue)' : 'transparent', color: activeSolutionTab === 'bestResponse' ? 'white' : 'var(--text-secondary)'}}>
                                  <Target size={14} /> 4. En İyi Tepki
                                </button>
                                <button onClick={() => setActiveSolutionTab('nash')} style={{...solutionTabButton, borderColor: activeSolutionTab === 'nash' ? 'var(--accent-blue)' : 'transparent', color: activeSolutionTab === 'nash' ? 'white' : 'var(--text-secondary)'}}>
                                  <Award size={14} /> 5. Nash Dengesi
                                </button>
                                <button onClick={() => setActiveSolutionTab('pareto')} style={{...solutionTabButton, borderColor: activeSolutionTab === 'pareto' ? 'var(--accent-blue)' : 'transparent', color: activeSolutionTab === 'pareto' ? 'white' : 'var(--text-secondary)'}}>
                                  <BarChart size={14} /> 6. Pareto Verimlilik
                                </button>
                                <button onClick={() => setActiveSolutionTab('economicComment')} style={{...solutionTabButton, borderColor: activeSolutionTab === 'economicComment' ? 'var(--accent-blue)' : 'transparent', color: activeSolutionTab === 'economicComment' ? 'white' : 'var(--text-secondary)'}}>
                                  <Globe size={14} /> 7. Ekonomik Çıkarım
                                </button>
                              </div>

                              {/* Tab Content */}
                              <div style={tabContentContainer}>
                                {activeSolutionTab === 'interpretation' && (
                                  <SolutionBlock 
                                    title="Problemin Stratejik ve Ekonomik Yorumu" 
                                    text={solutionInterpretation} 
                                    tip="Ekonomik aktörlerin stratejik hedefleri ve oyunun temel hikayesi bu aşamada özetlenmektedir."
                                  />
                                )}
                                {activeSolutionTab === 'players' && (
                                  <SolutionBlock 
                                    title="Oyuncular, Eylemler ve Kısıtlar" 
                                    text={solutionPlayers} 
                                    tip="Oyuncuların eylem uzayları (action space) ve ödeme fonksiyonlarının genel mantığı."
                                  />
                                )}
                                {activeSolutionTab === 'dominant' && (
                                  <SolutionBlock 
                                    title="Dominant (Baskın) Strateji Analizi" 
                                    text={solutionDominant} 
                                    tip="Dominant stratejiler belirlenerek oyun 'iteratif dominant strateji elemesi' ile sadeleştirilebilir."
                                  />
                                )}
                                {activeSolutionTab === 'bestResponse' && (
                                  <SolutionBlock 
                                    title="Best Response (En İyi Tepki) Analizi ve Koşulları" 
                                    text={solutionBestResponse} 
                                    tip="Karşılıklı en iyi tepki (Best Response) fonksiyonlarının kesişimi Nash dengesini bulmamızı sağlar."
                                  />
                                )}
                                {activeSolutionTab === 'nash' && (
                                  <SolutionBlock 
                                    title="Nash Dengesi Türetilişi" 
                                    text={solutionNash} 
                                    tip="Hiçbir oyuncunun tek taraflı olarak strateji değiştirmek (sapmak) için bir teşvikinin olmadığı kararlı denge durumudur."
                                  />
                                )}
                                {activeSolutionTab === 'pareto' && (
                                  <SolutionBlock 
                                    title="Pareto Verimlilik ve Sosyal Optimum Kıyaslaması" 
                                    text={solutionPareto} 
                                    tip="Pareto etkinsizlik, oyuncuların birbirine zarar vermeden durumlarını iyileştirebileceği ortak bir alternatifin varlığını gösterir."
                                  />
                                )}
                                {activeSolutionTab === 'economicComment' && (
                                  <SolutionBlock 
                                    title="Ekonomik Çıkarım ve Politika Önerileri" 
                                    text={solutionEconomicComment} 
                                    tip="Regülatörlerin veya piyasa yapıcılarının bu verimsiz dengeleri kırmak için uygulayabileceği ceza, vergi veya teşvik mekanizmaları."
                                  />
                                )}
                              </div>
                           </GlassCard>
                        </motion.div>
                      )}
                     </AnimatePresence>
                  </div>

                  {/* Sidebar Tip & Terminology */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                     <GlassCard style={{ padding: '1.5rem' }}>
                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                          <Info size={18} color="var(--accent-blue)" /> Akademik Not
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                           {current.author === 'Öğretmen' 
                             ? 'Eğitmeniniz bu soruyu hazırlarken gerçek hayat senaryolarından esinlendi. Rasyonelliğe ve karşılıklı bağımlılığa odaklanın.' 
                             : 'Alt Oyun Kusursuz Dengesi (Subgame Perfect Equilibrium), ardışık oyunlarda inandırıcı olmayan tehditleri ayıklayarak ulaştığımız nihai dengedir.'}
                        </p>
                     </GlassCard>

                     <GlassCard style={{ padding: '1.5rem' }}>
                       <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 700 }}><List size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Terimler Sözlüğü</h4>
                       <div style={termBox}>
                         <strong>Nash Dengesi:</strong> Diğer oyuncuların stratejileri sabitken, hiçbir oyuncunun tek taraflı sapma teşvikinin olmadığı durum.
                       </div>
                       <div style={termBox}>
                         <strong>Pareto Etkinlik:</strong> Kimsenin durumunu kötüleştirmeden en az bir kişinin durumunu iyileştirmenin imkansız olduğu refah durumu.
                       </div>
                       <div style={termBox}>
                         <strong>SPE (Kusursuz Denge):</strong> Ardışık oyunun her bir alt oyununda (subgame) bir Nash Dengesi olan stratejiler seti.
                       </div>
                     </GlassCard>
                  </div>
               </div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SkillStat = ({ label, value }) => (
  <div style={{ marginBottom: '1rem' }}>
     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
        <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{value} Çözüldü</span>
     </div>
     <div style={{ height: '5px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: `${Math.min(value * 20, 100)}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))', borderRadius: '3px' }}></div>
     </div>
  </div>
);

const SolutionBlock = ({ title, text, tip }) => (
  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
    <h5 style={{ color: 'white', fontSize: '1.05rem', marginBottom: '0.75rem', fontWeight: 700 }}>{title}</h5>
    
    {/* Format text linebreaks nicely */}
    <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
      {text}
    </div>

    {tip && (
      <div style={solutionTipBox}>
        <AlertTriangle size={16} color="#fbbf24" style={{ flexShrink: 0, marginTop: '2px' }} />
        <span style={{ fontSize: '0.8rem', color: '#fbbf24', lineHeight: 1.5 }}>
          <strong>Akademik İpucu:</strong> {tip}
        </span>
      </div>
    )}
  </motion.div>
);

// CSS-in-JS Styles for Practice Page
const categoryBar = {
  display: 'flex',
  gap: '0.5rem',
  overflowX: 'auto',
  paddingBottom: '0.75rem',
  marginBottom: '2rem',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  scrollbarWidth: 'thin'
};

const categoryTab = {
  padding: '0.6rem 1.25rem',
  borderRadius: '50px',
  fontSize: '0.85rem',
  fontWeight: 600,
  border: '1px solid transparent',
  transition: 'all 0.2s',
  whiteSpace: 'nowrap',
  cursor: 'pointer'
};

const iconBox = { 
  width: '50px', 
  height: '50px', 
  borderRadius: '14px', 
  background: 'rgba(255,255,255,0.02)', 
  border: '1px solid var(--glass-border)',
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center' 
};

const badgeRow = { display: 'flex', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, marginTop: '0.5rem', flexWrap: 'wrap' };
const categoryTag = { padding: '3px 8px', background: 'rgba(59, 130, 246, 0.08)', color: 'var(--accent-blue)', borderRadius: '4px' };
const diffTag = { padding: '3px 8px', background: 'rgba(245, 158, 11, 0.08)', color: '#fbbf24', borderRadius: '4px' };
const xpTag = { padding: '3px 8px', background: 'rgba(16, 185, 129, 0.08)', color: '#10b981', borderRadius: '4px' };

const teacherBadge = { padding: '2px 8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, marginLeft: '0.5rem' };
const teacherBadgeSmall = { padding: '4px 10px', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700 };

const backLink = { background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.2s' };
const catBadge = { padding: '4px 10px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700 };
const diffBadge = { padding: '4px 10px', background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700 };
const problemText = { fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' };
const questionHeader = { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', padding: '1.25rem', background: 'rgba(59, 130, 246, 0.05)', borderLeft: '3px solid var(--accent-blue)', borderRadius: '0 8px 8px 0' };
const optionBtn = { width: '100%', padding: '1.25rem', border: '1px solid', borderRadius: '12px', textAlign: 'left', color: 'white', transition: 'all 0.2s', fontSize: '1rem', pointerEvents: 'auto' };

const successBox = { padding: '1.5rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid #10b981', borderRadius: '12px' };
const errorBox = { padding: '1.5rem', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid #ef4444', borderRadius: '12px' };
const infoBox = { padding: '1.5rem', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid var(--accent-blue)', borderRadius: '12px' };

// Solution tabs styles
const solutionTabBar = {
  display: 'flex',
  gap: '0.25rem',
  overflowX: 'auto',
  paddingBottom: '0.5rem',
  marginBottom: '1.5rem',
  borderBottom: '1px solid rgba(255,255,255,0.05)'
};

const solutionTabButton = {
  padding: '0.5rem 0.75rem',
  fontSize: '0.8rem',
  fontWeight: 700,
  borderBottom: '2px solid transparent',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  whiteSpace: 'nowrap'
};

const tabContentContainer = {
  padding: '1rem',
  background: 'rgba(0,0,0,0.15)',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.03)'
};

const solutionTipBox = {
  marginTop: '1.25rem',
  padding: '0.75rem 1rem',
  background: 'rgba(245, 158, 11, 0.04)',
  border: '1px solid rgba(245, 158, 11, 0.2)',
  borderRadius: '8px',
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'flex-start'
};

const termBox = {
  fontSize: '0.8rem',
  color: 'var(--text-secondary)',
  padding: '0.5rem 0',
  borderBottom: '1px solid rgba(255,255,255,0.03)',
  lineHeight: 1.5
};

export default Practice;
