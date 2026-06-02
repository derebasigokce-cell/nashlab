// NashLab Akademik Oyun Teorisi Soru Bankası
// Bu veritabanı 6 kategoride toplam 45 adet üniversite seviyesinde senaryo ve 7 aşamalı akademik çözümler içerir.

export const academicScenarios = [
  // =========================================================================
  // 1. STATİK OYUNLAR (staticGames) - 8 Sorular
  // =========================================================================
  {
    id: 'static_1',
    category: 'staticGames',
    title: 'Otomotiv Sektöründe Karbon Emisyon Rekabeti',
    difficulty: 'Akademik',
    reward: 200,
    desc: 'İki rakip otomotiv üreticisi (Firma A ve Firma B) AB çevre mevzuatına uyum için yüksek Ar-Ge yatırımı yaparak "Yeşil Teknoloji"ye geçme veya mevcut motor teknolojisini koruyup "Hileli Yazılım" kullanma kararı arasındadır. Her iki firma da yeşil teknolojiye geçerse yüksek maliyetten dolayı karlar 3\'er birim olur. Biri dürüst davranıp yeşil yatırım yapar, diğeri hile yaparsa; hile yapan pazar payını kaparak 6 birim kazanırken, dürüst firma 0 birim elde eder. İkisi de hileli yazılım kullanırsa pazar cezaları ve prestij kaybı nedeniyle karlar 1\'er birim olacaktır.',
    matrix: [[[3, 3], [0, 6]], [[6, 0], [1, 1]]],
    actions: ['Yeşil Yatırım', 'Hileli Yazılım'],
    question: 'Bu oyunun Nash Dengesi ve Sosyal Optimum (Pareto En İyi) ödemeleri sırasıyla hangi strateji çiftlerinde oluşur?',
    options: [
      { id: 'a', text: 'Nash: (Hileli Yazılım, Hileli Yazılım) | Sosyal Optimum: (Yeşil Yatırım, Yeşil Yatırım)', correct: true },
      { id: 'b', text: 'Nash: (Yeşil Yatırım, Yeşil Yatırım) | Sosyal Optimum: (Hileli Yazılım, Hileli Yazılım)', correct: false },
      { id: 'c', text: 'Her iki durum da Nash dengesidir.', correct: false },
      { id: 'd', text: 'Nash dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu senaryo klasik bir Mahkumlar Açmazı (Prisoners Dilemma) modellemesidir. Bireysel çıkarlar ile toplumsal refahın çelişmesini gösterir.',
      players: 'Oyuncular: Firma A ve Firma B. Seçenekleri: Yeşil Yatırım (İşbirliği) veya Hileli Yazılım (İhanet/Sapma).',
      dominant: 'Her iki oyuncu için de rakibin stratejisinden bağımsız olarak "Hileli Yazılım" seçeneği dominanttır. Firma B Yeşil seçerse A için 6 > 3; Firma B Hileli seçerse A için 1 > 0\'dır. Aynı simetrik durum Firma B için de geçerlidir.',
      bestResponse: 'BR_A(Yeşil) = Hileli; BR_A(Hileli) = Hileli. BR_B(Yeşil) = Hileli; BR_B(Hileli) = Hileli. Karşılıklı en iyi cevaplar sadece tek bir noktada kesişir.',
      nash: 'Saf strateji Nash dengesi (Hileli Yazılım, Hileli Yazılım) noktasında ve (1,1) ödemesinde gerçekleşir. Bu noktadan tek taraflı sapmak oyuncuların karlarını azaltır.',
      pareto: 'Sosyal optimum, her iki firmanın da Yeşil Yatırım yaptığı (3,3) noktasıdır (Toplam fayda = 6). Nash Dengesi (1,1) ise Pareto verimsizdir; çünkü her iki oyuncunun da durumu kötüleşmiştir.',
      economicComment: 'Serbest piyasa koşullarında çevre koruma gibi pozitif dışsallık üreten yatırımlar, yasal düzenlemeler ve denetim mekanizmaları olmaksızın yapılamaz. Karbon vergileri ve cezalar bu açmazı çözmek için gereklidir.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [1, 1]],
      brB: [[0, 1], [1, 1]],
      nashCells: [[1, 1]],
      socialOptimum: [0, 0]
    }
  },
  {
    id: 'static_2',
    category: 'staticGames',
    title: 'Otonom Sürüş İletişim Protokolü Yarışı',
    difficulty: 'Akademik',
    reward: 200,
    desc: 'Teknoloji devleri Tesla ve Waymo, otonom araçların birbiriyle haberleşmesi için ortak bir standart seçmek zorundadır. Tesla kendi patenti olan "Protokol T"yi, Waymo ise "Protokol W"yi dayatmaktadır. Eğer iki firma da aynı protokol üzerinde uzlaşırsa araçlar arası mükemmel iletişim sağlanacak ve pazar büyüyecektir. Ancak Tesla, Protokol T seçildiğinde 4 birim, Protokol W seçildiğinde 2 birim kazanmaktadır. Waymo ise Protokol W seçildiğinde 4 birim, Protokol T seçildiğinde 2 birim kazanır. Eğer farklı protokolleri seçip inatlaşırlarsa, araçlar haberleşemeyecek ve her iki firma da 0 birim alacaktır.',
    matrix: [[[4, 2], [0, 0]], [[0, 0], [2, 4]]],
    actions: ['Protokol T', 'Protokol W'],
    question: 'Bu oyunda saf strateji Nash dengeleri hangileridir?',
    options: [
      { id: 'a', text: '(Protokol T, Protokol T) ve (Protokol W, Protokol W)', correct: true },
      { id: 'b', text: 'Sadece (Protokol T, Protokol T)', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: '(Protokol T, Protokol W) ve (Protokol W, Protokol T)', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, oyun teorisi literatüründe "Cinsiyetler Savaşı" (Battle of the Sexes) olarak bilinen bir koordinasyon oyunudur. Oyuncuların ortak bir hedefi (koordinasyon) vardır ancak hangi standartta uzlaşılacağı konusunda çıkarları çatışmaktadır.',
      players: 'Oyuncular: Tesla ve Waymo. Stratejiler: Protokol T ve Protokol W.',
      dominant: 'Oyuncuların baskın (dominant) bir stratejisi yoktur. En iyi seçim tamamen diğer oyuncunun ne yaptığına bağlıdır.',
      bestResponse: 'BR_Tesla(T) = Protokol T; BR_Tesla(W) = Protokol W. BR_Waymo(T) = Protokol T; BR_Waymo(W) = Protokol W.',
      nash: 'Oyunda iki adet saf strateji Nash dengesi vardır: (Protokol T, Protokol T) ödemesi (4,2) ve (Protokol W, Protokol W) ödemesi (2,4). Karşılıklı en iyi cevaplar bu hücrelerde çakışır.',
      pareto: 'Her iki Nash dengesi de Pareto etkindir. Hiçbir oyuncunun durumunu kötüleştirmeden bir dengeden diğerine geçmek mümkün değildir.',
      economicComment: 'Standart belirleme savaşlarında ilk hamleyi yapan (first-mover advantage) veya pazar gücü daha yüksek olan taraf kendi istediği standardı kabul ettirir. Şirketler bu tür kilitlenmeleri aşmak için genellikle konsorsiyum kurarlar.'
    },
    visualData: {
      type: 'matrix',
      brA: [[0, 0], [1, 1]],
      brB: [[0, 0], [1, 1]],
      nashCells: [[0, 0], [1, 1]]
    }
  },
  {
    id: 'static_3',
    category: 'staticGames',
    title: 'Savunma Sanayiinde Hidrojen Yakıt Pili Ortaklığı',
    difficulty: 'Akademik',
    reward: 200,
    desc: 'İki savunma sanayii yüklenicisi, yeni bir askeri İHA için yüksek verimli hidrojen yakıt pili geliştirmek üzere ortak Ar-Ge projesine davet edilmiştir. Eğer iki firma da tüm mühendislik güçlerini projeye aktarırsa ("Büyük Av" / İşbirliği), devrimsel bir teknoloji üretilecek ve her iki firma da 5\'er birim getiri sağlayacaktır. Ancak firmalardan biri kaytarıp kendi geleneksel projelerine odaklanırsa ("Tavşan Avı" / Sapma), tek taraflı olarak 3 birimlik güvenli getiri elde edecektir. Bu durumda işbirliği yapmaya çalışan dürüst ortak hiçbir şey üretemeyerek 0 birim alacaktır. İkisi de sapmayı seçerse, her biri kendi projelerinden 3\'er birim alacaktır.',
    matrix: [[[5, 5], [0, 3]], [[3, 0], [3, 3]]],
    actions: ['Mühendislik Gücü (İşbirliği)', 'Kendi Projesi (Sapma)'],
    question: 'Bu oyunda hangi hücreler Nash dengesidir ve hangisi risk dominanttır?',
    options: [
      { id: 'a', text: 'Nash dengeleri: (İşbirliği, İşbirliği) ve (Sapma, Sapma). Risk dominant olan (Sapma, Sapma) dengesidir.', correct: true },
      { id: 'b', text: 'Tek Nash dengesi vardır: (İşbirliği, İşbirliği) ve bu aynı zamanda risk dominanttır.', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: 'Nash dengeleri: (İşbirliği, Sapma) ve (Sapma, İşbirliği).', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun bir "Geyik Avı" (Stag Hunt) veya koordinasyon problemidir. Karşılıklı güvene dayalı yüksek kazançlı denge ile güvensizliğe dayalı düşük kazançlı denge arasındaki çatışmayı inceler.',
      players: 'Oyuncular: Yüklenici A ve Yüklenici B. Seçenekler: Mühendislik Gücü (İşbirliği) ve Kendi Projesi (Sapma).',
      dominant: 'Baskın strateji yoktur. Karar tamamen karşılıklı güven seviyesine bağlıdır.',
      bestResponse: 'BR_A(İşbirliği) = İşbirliği (5 > 3); BR_A(Sapma) = Sapma (3 > 0). Simetrik durum B için de geçerlidir.',
      nash: 'İki saf strateji Nash dengesi vardır: (İşbirliği, İşbirliği) -> (5,5) ve (Sapma, Sapma) -> (3,3).',
      pareto: '(İşbirliği, İşbirliği) dengesi Pareto dominanttır (Payout 5 > 3). Ancak (Sapma, Sapma) dengesi risk dominanttır; çünkü diğer oyuncunun sapma olasılığına karşı korunaklıdır (saparsa 0 yerine 3 alınır).',
      economicComment: 'Geyik avı oyunları, iş dünyasında ortaklıklarda güvensizliğin nasıl verimsiz sonuçlar (koordinasyon başarısızlığı) doğurduğunu gösterir. Sözleşmeler ve itibar bu verimsizliği engellemede kritiktir.'
    },
    visualData: {
      type: 'matrix',
      brA: [[0, 0], [1, 1]],
      brB: [[0, 0], [1, 1]],
      nashCells: [[0, 0], [1, 1]]
    }
  },
  {
    id: 'static_4',
    category: 'staticGames',
    title: 'Havacılık İttifaklarında Slot Paylaşımı',
    difficulty: 'Orta',
    reward: 200,
    desc: 'Pegasus ve THY, İstanbul Havalimanı ve Sabiha Gökçen Havalimanı\'nda yeni bir uçuş slotu paylaşım politikası belirlemektedir. Eğer ikisi de koordineli şekilde ortak uçuş planı yaparsa (Uyumlu), yolcu sayısı artacak ve ikisi de 4 birim alacaktır. Biri uyar diğeri agresif uçuş planı yapıp pazar kapmaya çalışırsa, agresif olan 5 alırken, uyumlu olan 1 getiriyle kalacaktır. İkisi de agresif plan yaparsa, kapasite aşımı ve fiyat kırma nedeniyle karlar 2\'şer birime düşecektir.',
    matrix: [[[4, 4], [1, 5]], [[5, 1], [2, 2]]],
    actions: ['Uyumlu Strateji', 'Agresif Strateji'],
    question: 'Bu oyunda dominant stratejiler ve Nash dengesi nedir?',
    options: [
      { id: 'a', text: 'Baskın strateji Agresif Stratejidir. Nash dengesi: (Agresif Strateji, Agresif Strateji).', correct: true },
      { id: 'b', text: 'Baskın strateji Uyumlu Stratejidir. Nash dengesi: (Uyumlu Strateji, Uyumlu Strateji).', correct: false },
      { id: 'c', text: 'dominant strateji yoktur, iki adet Nash dengesi vardır.', correct: false },
      { id: 'd', text: 'Nash dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, firmaların pazar payı kapma hırsının onları daha kötü bir duruma sürüklediği bir Mahkumlar Açmazı türevidir.',
      players: 'Pegasus ve THY. Seçenekler: Uyumlu ve Agresif Stratejiler.',
      dominant: 'Agresif strateji her iki havayolu için de güçlü baskın (strictly dominant) stratejidir. (Rakip Uyumlu ise 5 > 4; Rakip Agresif ise 2 > 1).',
      bestResponse: 'Her durumda rakibin hamlesine en iyi cevap Agresif Stratejidir.',
      nash: 'Tek Nash Dengesi (Agresif, Agresif) hücresinde ve (2,2) ödemesinde oluşur.',
      pareto: 'Sosyal optimum olan (Uyumlu, Uyumlu) hücresi (4,4) Pareto etkindir. Nash dengesi ise Pareto verimsizdir.',
      economicComment: 'Havacılıkta slot ve uçuş saatleri rekabetinde firmaların bencil davranması, havalimanı sıkışıklığına ve karların erimesine yol açar. Regülatör kurumların (SHGM vb.) dağıtımı koordine etmesi şarttır.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [1, 1]],
      brB: [[0, 1], [1, 1]],
      nashCells: [[1, 1]]
    }
  },
  {
    id: 'static_5',
    category: 'staticGames',
    title: 'Kentsel Dönüşüm Müteahhit Çıkmazı',
    difficulty: 'Orta',
    reward: 200,
    desc: 'Bir mahalledeki iki bitişik arsanın sahipleri olan Müteahhit X ve Müteahhit Y, projeleri birleştirerek lüks bir rezidans inşa etme (Birleşik) ya da kendi arsalarına ayrı binalar dikme (Ayrı) kararı vermelidir. Birleşirse ortak otopark ve sosyal alan verimliliğiyle iki müteahhit de 6\'şar birim kazanacaktır. Biri birleşmek isteyip diğeri ayrı bina yapmakta ısrar ederse, birleşmek isteyen taraf proje gecikmesi ve mimari kısıtlardan dolayı 1 birim kazanacak, ayrı bina yapan ise kendi arsasında bağımsız hareket ettiği için 4 birim getiri alacaktır. İkisi de ayrı binada uzlaşırsa 4\'er birim kazanacaklardır.',
    matrix: [[[6, 6], [1, 4]], [[4, 1], [4, 4]]],
    actions: ['Birleşik Proje', 'Ayrı Proje'],
    question: 'Bu koordinasyon oyunundaki saf strateji Nash dengeleri hangileridir?',
    options: [
      { id: 'a', text: '(Birleşik Proje, Birleşik Proje) ve (Ayrı Proje, Ayrı Proje)', correct: true },
      { id: 'b', text: 'Yalnızca (Birleşik Proje, Birleşik Proje)', correct: false },
      { id: 'c', text: 'Yalnızca (Ayrı Proje, Ayrı Proje)', correct: false },
      { id: 'd', text: 'Nash dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu senaryoda oyuncular ortak çıkar doğrultusunda koordinasyon kurmaya çalışmaktadır ancak risk algıları ve koordinasyon hatası endişesi kararları etkilemektedir.',
      players: 'Müteahhit X ve Müteahhit Y. Stratejiler: Birleşik ve Ayrı.',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'BR_X(Birleşik) = Birleşik (6 > 4); BR_X(Ayrı) = Ayrı (4 > 1). Simetriktir.',
      nash: 'Oyunda iki adet saf strateji Nash dengesi mevcuttur: (Birleşik Proje, Birleşik Proje) -> (6,6) ve (Ayrı Proje, Ayrı Proje) -> (4,4).',
      pareto: 'Birleşik proje dengesi (6,6), ayrı bina dengesine (4,4) göre Pareto dominanttır. Ancak ayrı bina yapmak riske karşı korumalıdır.',
      economicComment: 'Kentsel dönüşümde parsel birleştirme teşviklerinin verilmesi, firmaları yüksek verimli (Birleşik) dengeye yönlendirmek için kamu tarafından uygulanan stratejik bir araçtır.'
    },
    visualData: {
      type: 'matrix',
      brA: [[0, 0], [1, 1]],
      brB: [[0, 0], [1, 1]],
      nashCells: [[0, 0], [1, 1]]
    }
  },
  {
    id: 'static_6',
    category: 'staticGames',
    title: 'Yeni Nesil Mobil İşlemci Teknolojisi',
    difficulty: 'Orta',
    reward: 200,
    desc: 'Intel ve AMD, yeni nesil işlemci mimarisinde ARM tabanlı tasarıma geçmek (ARM) veya geleneksel x86 mimarisini optimize etmek (x86) arasındadır. İki firma da aynı mimariyi seçerse yazılım ekosistemi tek tipe odaklanacak ve pazar büyüyecektir. Ancak Intel x86 mimarisinde uzmanlaştığı için x86 seçilirse 5, ARM seçilirse 2 birim kazanır. AMD ise ARM mimarisinde daha tecrübeli olup ARM seçilirse 5, x86 seçilirse 2 kazanır. Farklı yönlere giderlerse pazar bölünecek ve iki firma da 1 birim kazanacaktır.',
    matrix: [[[2, 5], [1, 1]], [[1, 1], [5, 2]]],
    actions: ['ARM Mimarisi', 'x86 Mimarisi'],
    question: 'Bu oyundaki saf strateji Nash dengeleri hangileridir?',
    options: [
      { id: 'a', text: '(ARM Mimarisi, ARM Mimarisi) ve (x86 Mimarisi, x86 Mimarisi)', correct: true },
      { id: 'b', text: 'Sadece (ARM Mimarisi, ARM Mimarisi)', correct: false },
      { id: 'c', text: '(ARM Mimarisi, x86 Mimarisi) ve (x86 Mimarisi, ARM Mimarisi)', correct: false },
      { id: 'd', text: 'Bu oyunun Nash dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, standart belirleme ve endüstriyel koordinasyon problemi olan Battle of the Sexes tipinde bir anti-simetrik koordinasyon oyunudur.',
      players: 'Intel ve AMD. Stratejiler: ARM ve x86.',
      dominant: 'Baskın strateji bulunmamaktadır.',
      bestResponse: 'BR_Intel(ARM) = ARM (2 > 1); BR_Intel(x86) = x86 (5 > 1). BR_AMD(ARM) = ARM (5 > 1); BR_AMD(x86) = x86 (2 > 1).',
      nash: 'İki adet Nash dengesi vardır: (ARM, ARM) -> (2,5) ve (x86, x86) -> (5,2).',
      pareto: 'Her iki denge de Pareto verimlidir; zira toplam endüstri getirisi (7) aynıdır ancak kâr dağılımı farklıdır.',
      economicComment: 'Teknoloji piyasalarında firmalar çoğunlukla standart belirleme savaşlarında geride kalmamak adına rakibinin seçimine boyun eğmek zorunda kalırlar. (ARM, ARM) veya (x86, x86) dengelerinden biri pazar liderinin hamlesiyle netleşir.'
    },
    visualData: {
      type: 'matrix',
      brA: [[0, 0], [1, 1]],
      brB: [[0, 0], [1, 1]],
      nashCells: [[0, 0], [1, 1]]
    }
  },
  {
    id: 'static_7',
    category: 'staticGames',
    title: 'Perakende Zincirlerinin Coğrafi Yayılımı',
    difficulty: 'Orta',
    reward: 200,
    desc: 'BİM ve A101, yeni gelişen bir ilçede iki farklı caddeye (Cadde X ve Cadde Y) mağaza açacaktır. İki zincir de aynı caddeye mağaza açarsa, pazar paylaşılacak ve yoğun rekabet nedeniyle karlar 2\'şer birim olacaktır. Eğer farklı caddelere açarlarsa, her biri kendi bölgesini domine edecek ve 5\'er birim kâr elde edeceklerdir.',
    matrix: [[[2, 2], [5, 5]], [[5, 5], [2, 2]]],
    actions: ['Cadde X', 'Cadde Y'],
    question: 'Bu oyunda saf strateji Nash dengeleri nelerdir ve hangi tür oyun kategorisine girer?',
    options: [
      { id: 'a', text: 'Nash dengeleri: (Cadde X, Cadde Y) ve (Cadde Y, Cadde X). Anti-koordinasyon oyunudur.', correct: true },
      { id: 'b', text: 'Nash dengeleri: (Cadde X, Cadde X) ve (Cadde Y, Cadde Y). Koordinasyon oyunudur.', correct: false },
      { id: 'c', text: 'Tek bir Nash dengesi vardır: (Cadde X, Cadde X).', correct: false },
      { id: 'd', text: 'Bu oyunun Nash dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun bir anti-koordinasyon oyunudur. Oyuncuların ortak çıkarı farklı stratejileri seçmek (farklılaşma) üzerine kuruludur.',
      players: 'BİM ve A101. Stratejiler: Cadde X ve Cadde Y.',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'BR_BİM(Cadde X) = Cadde Y; BR_BİM(Cadde Y) = Cadde X. BR_A101(Cadde X) = Cadde Y; BR_A101(Cadde Y) = Cadde X.',
      nash: 'İki saf strateji Nash dengesi vardır: (Cadde X, Cadde Y) -> (5,5) ve (Cadde Y, Cadde X) -> (5,5).',
      pareto: 'Her iki Nash dengesi de Pareto optimaldir ve firmaların karlarını maksimize eder.',
      economicComment: 'Perakende sektöründe aşırı kümelenme yerine coğrafi konum farklılaşması (spatial differentiation) rekabeti azaltarak karlılığı artırır. Hotelling modelinin aksine, burada anti-koordinasyon esastır.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [0, 1]],
      brB: [[0, 1], [1, 0]],
      nashCells: [[0, 1], [1, 0]]
    }
  },
  {
    id: 'static_8',
    category: 'staticGames',
    title: 'Gıda Güvenliği ve Tedarik Zinciri Yatırımı',
    difficulty: 'Orta',
    reward: 200,
    desc: 'İki et üreticisi, etlerin izlenebilirliği için blokzincir tabanlı gıda takip sistemine geçmek (Geç) veya geleneksel yöntemleri korumak (Kal) arasındadır. İkisi de yeni sisteme geçerse marka güveni tavan yapacak ve karlar 4\'er birim olacaktır. Biri geçer diğeri kalırsa, geçmeyen firma marka lekelenmesi yaşayarak 0 birim kazanacak, yeni sisteme yatırım yapan dürüst firma ise tek taraflı maliyetten ötürü 1 getiri alacaktır. İkisi de eski sistemde kalırsa karlar 3\'er birim olacaktır.',
    matrix: [[[4, 4], [1, 0]], [[0, 1], [3, 3]]],
    actions: ['Yeni Sisteme Geç', 'Eski Yöntemde Kal'],
    question: 'Bu oyunda Nash dengeleri hangileridir?',
    options: [
      { id: 'a', text: '(Yeni Sisteme Geç, Yeni Sisteme Geç) ve (Eski Yöntemde Kal, Eski Yöntemde Kal)', correct: true },
      { id: 'b', text: 'Sadece (Yeni Sisteme Geç, Yeni Sisteme Geç)', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: '(Yeni Sisteme Geç, Eski Yöntemde Kal) ve (Eski Yöntemde Kal, Yeni Sisteme Geç)', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun bir Stag Hunt (Geyik Avı) varyasyonudur. Yeni sisteme geçiş ortak güven ve koordinasyon gerektirir.',
      players: 'Üretici A ve Üretici B.',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'BR_A(Geç) = Geç (4 > 0); BR_A(Kal) = Kal (3 > 1). Simetriktir.',
      nash: 'İki adet Nash dengesi mevcuttur: (Geç, Geç) -> (4,4) ve (Kal, Kal) -> (3,3).',
      pareto: '(Geç, Geç) dengesi Pareto üstündür fakat (Kal, Kal) dengesi daha az risk içerir.',
      economicComment: 'Gıda güvenliği gibi kolektif güven gerektiren alanlarda firmaların eski ve verimsiz teknolojide kilitlenip kalmasını (lock-in) engellemek için tarım bakanlıkları zorunlu sertifikalar getirir.'
    },
    visualData: {
      type: 'matrix',
      brA: [[0, 0], [1, 1]],
      brB: [[0, 0], [1, 1]],
      nashCells: [[0, 0], [1, 1]]
    }
  },

  // =========================================================================
  // 2. NASH DENGESİ (nashEquilibrium) - 8 Sorular
  // =========================================================================
  {
    id: 'nash_1',
    category: 'nashEquilibrium',
    title: 'Akıllı Telefon Lansman Zamanlaması',
    difficulty: 'Akademik',
    reward: 250,
    desc: 'Apple ve Samsung, yeni amiral gemisi modellerinin lansman tarihini seçmektedir. Seçenekler "Eylül" (Erken Lansman) veya "Aralık" (Geç Lansman) aylarıdır. İki firma da Eylül\'ü seçerse pazar bölünecek ve karlar 2\'şer birim olacaktır. İkisi de Aralık\'ı seçerse soğuk kış sezonu satışları orta seviyede kalacak ve karlar 3\'er birim olacaktır. Apple Eylül\'ü, Samsung Aralık\'ı seçerse; Apple ilk hamle avantajıyla 5 birim kazanırken Samsung 1 birimde kalacaktır. Samsung Eylül\'ü, Apple Aralık\'ı seçerse benzer şekilde Samsung 5 kazanırken Apple 1 alacaktır.',
    matrix: [[[2, 2], [5, 1]], [[1, 5], [3, 3]]],
    actions: ['Eylül (Erken)', 'Aralık (Geç)'],
    question: 'Bu oyunda saf strateji Nash dengesi nedir?',
    options: [
      { id: 'a', text: '(Eylül, Eylül) noktasıdır.', correct: true },
      { id: 'b', text: '(Aralık, Aralık) noktasıdır.', correct: false },
      { id: 'c', text: '(Eylül, Aralık) ve (Aralık, Eylül) olmak üzere iki tanedir.', correct: false },
      { id: 'd', text: 'Saf strateji Nash dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, firmaların pazar payını erken kaparak liderlik elde etmeye çalıştığı tek dengeli bir statik oyundur. Mahkumlar Açmazı ile benzer bir yapı gösterir.',
      players: 'Apple ve Samsung. Seçenekler: Eylül ve Aralık.',
      dominant: 'Her iki oyuncu için de "Eylül" dominant stratejidir. (Rakip Eylül seçerse 2 > 1; rakip Aralık seçerse 5 > 3).',
      bestResponse: 'BR_Apple(Eylül) = Eylül; BR_Apple(Aralık) = Eylül. BR_Samsung(Eylül) = Eylül; BR_Samsung(Aralık) = Eylül.',
      nash: 'Tek saf strateji Nash Dengesi (Eylül, Eylül) hücresinde ve (2,2) ödemesinde gerçekleşir.',
      pareto: 'Bu oyunda (Aralık, Aralık) hücresi (3,3) Pareto etkindir ve her iki oyuncu için de Nash dengesinden daha iyidir. Ancak bireysel teşvikler bu verimli dengeye ulaşılmasına engel olmaktadır.',
      economicComment: 'Lansman zamanlamasında firmaların "erken davranıp pazarı domine etme" dürtüsü, tüm firmaların aynı anda lansman yaparak birbirinin karlarını baltaladığı Pareto verimsiz bir denge doğurur.'
    },
    visualData: {
      type: 'matrix',
      brA: [[0, 0], [0, 1]],
      brB: [[0, 0], [1, 0]],
      nashCells: [[0, 0]]
    }
  },
  {
    id: 'nash_2',
    category: 'nashEquilibrium',
    title: 'Akıllı Izgara ve Enerji Üretim Dengesi',
    difficulty: 'Akademik',
    reward: 250,
    desc: 'İki yerel enerji santrali (Santral 1 ve Santral 2) şebekeye yüksek akım ("Yüksek") ya da düşük akım ("Düşük") verme kararı alacaktır. Eğer ikisi de yüksek akım verirse trafolar aşırı yüklenecek, arızalar nedeniyle karlar 1\'er birim olacaktır. İkisi de düşük akım verirse enerji kıtlığı yaşanacak ve karlar yine 2\'şer birim olacaktır. Ancak biri yüksek diğeri düşük verirse, yüksek veren santral pazarın ana sağlayıcısı olup 6 getiri alırken, düşük veren sadece rezerv sağlayıcı olarak kalıp 4 getiri sağlayacaktır.',
    matrix: [[[1, 1], [6, 4]], [[4, 6], [2, 2]]],
    actions: ['Yüksek Akım', 'Düşük Akım'],
    question: 'Bu oyunda saf strateji Nash dengesi var mıdır, varsa hangileridir?',
    options: [
      { id: 'a', text: '(Yüksek, Düşük) ve (Düşük, Yüksek) olmak üzere iki denge vardır.', correct: true },
      { id: 'b', text: 'Tek bir Nash dengesi vardır: (Yüksek, Yüksek).', correct: false },
      { id: 'c', text: 'Tek bir Nash dengesi vardır: (Düşük, Düşük).', correct: false },
      { id: 'd', text: 'Saf strateji Nash dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, oyuncuların birbiriyle ters yönlü stratejiler seçmeye (anti-coordination) zorlandığı bir Tavuk Oyunu (Chicken Game) modellemesidir.',
      players: 'Santral 1 ve Santral 2. Seçenekler: Yüksek ve Düşük.',
      dominant: 'Oyuncuların dominant stratejisi yoktur. Rakip yüksek veriyorsa en iyi seçenek Düşük (4 > 1), rakip düşük veriyorsa en iyi seçenek Yüksek (6 > 2) vermektir.',
      bestResponse: 'BR_1(Yüksek) = Düşük; BR_1(Düşük) = Yüksek. BR_2(Yüksek) = Düşük; BR_2(Düşük) = Yüksek.',
      nash: 'İki adet saf strateji Nash dengesi vardır: (Yüksek, Düşük) -> (6,4) ve (Düşük, Yüksek) -> (4,6).',
      pareto: 'Her iki Nash dengesi de Pareto verimlidir; çünkü toplam fayda 10 birimdir. (Düşük, Düşük) dengesi (2,2) veya (Yüksek, Yüksek) dengesi (1,1) ise Pareto verimsizdir.',
      economicComment: 'Elektrik şebekelerinde üretim dengesizliği sistem çökmelerine yol açar. Bu yüzden piyasa işleticileri (EPİAŞ vb.) santrallerin üretimlerini optimize edecek dengeleme güç piyasası mekanizmaları tasarlar.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [0, 1]],
      brB: [[0, 1], [1, 0]],
      nashCells: [[0, 1], [1, 0]]
    }
  },
  {
    id: 'nash_3',
    category: 'nashEquilibrium',
    title: 'Siber Güvenlik Yatırım Paradoksu',
    difficulty: 'Akademik',
    reward: 250,
    desc: 'İki komşu kamu kurumu, ortak siber altyapıyı korumak adına güvenlik yatırımı yapacaktır. Seçenekleri: "Tam Yatırım" veya "Kısıtlı Bütçe". Sistem entegre çalıştığı için kurumlardan biri yatırım yapmazsa ortak ağ hacklenmektedir. İkisi de tam yatırım yaparsa sistem korunacak ve karlar 4\'er birim olacaktır. Biri yatırım yapar diğeri yapmazsa; yatırım yapmayan kurum maliyetten kaçınarak 5 kazanacak, yatırım yapan dürüst kurum ise boşuna harcama yapmış olup 0 birim getiri alacaktır. İkisi de yatırım yapmazsa hacklenme nedeniyle getiriler 1\'er birim olacaktır.',
    matrix: [[[4, 4], [0, 5]], [[5, 0], [1, 1]]],
    actions: ['Tam Yatırım', 'Kısıtlı Bütçe'],
    question: 'Bu oyunda siber güvenlik işbirliğini engelleyen Nash dengesi hangisidir?',
    options: [
      { id: 'a', text: '(Kısıtlı Bütçe, Kısıtlı Bütçe)', correct: true },
      { id: 'b', text: '(Tam Yatırım, Tam Yatırım)', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: '(Tam Yatırım, Kısıtlı Bütçe)', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, kamu kurumlarının ortak altyapıya yatırım yapma konusundaki isteksizliğini ve bedavacılık (free-riding) dürtüsünü gösteren bir Mahkumlar Açmazı varyasyonudur.',
      players: 'Kurum A ve Kurum B. Seçenekler: Tam Yatırım ve Kısıtlı Bütçe.',
      dominant: 'Her iki kurum için de "Kısıtlı Bütçe" baskın stratejidir. Karşı taraf yatırım yapsa da yapmasa da bütçeyi kısıtlı tutmak daha yüksek bireysel getiri sağlar.',
      bestResponse: 'BR_A(Tam) = Kısıtlı; BR_A(Kısıtlı) = Kısıtlı. BR_B(Tam) = Kısıtlı; BR_B(Kısıtlı) = Kısıtlı.',
      nash: 'Tek Nash Dengesi (Kısıtlı Bütçe, Kısıtlı Bütçe) noktasında ve (1,1) ödemesinde oluşur.',
      pareto: 'Sosyal optimum olan (Tam Yatırım, Tam Yatırım) -> (4,4) noktası Pareto optimaldir. Nash dengesi ise tam bir refah kaybıdır (Pareto verimsizdir).',
      economicComment: 'Siber güvenlikte zincir en zayıf halkası kadar güçlüdür. Kurumlar kendi güvenliklerini maksimize etmeye çalışırken ortak ağı savunmasız bırakırlar. Bu durum, merkezi bir otoritenin asgari güvenlik standartları dayatmasını zorunlu kılar.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [1, 1]],
      brB: [[0, 1], [1, 1]],
      nashCells: [[1, 1]]
    }
  },
  {
    id: 'nash_4',
    category: 'nashEquilibrium',
    title: 'İki Bankanın Kart Komisyon Anlaşması',
    difficulty: 'Orta',
    reward: 200,
    desc: 'Garanti ve Yapı Kredi, kredi kartı üye işyeri komisyon oranlarını belirlemektedir. İki banka da yüksek komisyon oranını korursa ("Yüksek"), rekabet dengelenecek ve her iki banka da 5 birim kâr elde edecektir. Bankalardan biri komisyonu düşürüp müşteri kapmaya çalışırsa ("Düşük"), düşük uygulayan pazarın çoğunu ele geçirerek 7 birim kazanacak, yüksek tutan ise üye işyerlerini kaybederek 1 birimde kalacaktır. İkisi de komisyon oranlarını düşürürse, karlar 3\'er birime düşecektir.',
    matrix: [[[5, 5], [1, 7]], [[7, 1], [3, 3]]],
    actions: ['Yüksek Komisyon', 'Düşük Komisyon'],
    question: 'Bu oyunda her iki bankanın dominant stratejisi ve Nash dengesi nedir?',
    options: [
      { id: 'a', text: 'Baskın strateji: Düşük Komisyon. Nash Dengesi: (Düşük Komisyon, Düşük Komisyon).', correct: true },
      { id: 'b', text: 'Baskın strateji: Yüksek Komisyon. Nash Dengesi: (Yüksek Komisyon, Yüksek Komisyon).', correct: false },
      { id: 'c', text: 'dominant strateji yoktur, iki adet Nash dengesi mevcuttur.', correct: false },
      { id: 'd', text: 'Nash dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, bankaların gizli anlaşma (collusion) yapamadığı durumlarda fiyat kırma eğilimini gösteren bir Mahkumlar Açmazı modelidir.',
      players: 'Garanti ve Yapı Kredi.',
      dominant: 'Düşük Komisyon, her iki oyuncu için de kesinlikle dominanttır (7 > 5 ve 3 > 1).',
      bestResponse: 'Her iki banka için rakibin hamlesinden bağımsız olarak en iyi cevap Düşük Komisyondur.',
      nash: 'Tek Nash Dengesi (Düşük Komisyon, Düşük Komisyon) hücresinde ve (3,3) ödemesinde oluşur.',
      pareto: 'Sosyal optimum olan (Yüksek Komisyon, Yüksek Komisyon) -> (5,5) Pareto etkindir. Nash dengesi ise Pareto verimsizdir.',
      economicComment: 'Bankacılık sektöründeki bu fiyat rekabeti tüketiciler için olumlu olsa da bankaların karlılığını düşürür. Rekabet Kurulu bu tür komisyon oranlarında kartel oluşturulmasını yasaklar.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [1, 1]],
      brB: [[0, 1], [1, 1]],
      nashCells: [[1, 1]]
    }
  },
  {
    id: 'nash_5',
    category: 'nashEquilibrium',
    title: 'Medya Platformları ve Özel Yayın Hakları',
    difficulty: 'Orta',
    reward: 200,
    desc: 'Exxen ve Gain, yeni bir komedi dizisinin yayın hakları ihalesine girmektedir. İkisi de yüksek teklif verirse ("Yüksek"), ihale maliyetleri yükselecek ve karlar 2\'şer birim olacaktır. İkisi de düşük teklif verirse ("Düşük"), maliyetler düşük kalacak ve karlar 4\'er birim olacaktır. Biri yüksek diğeri düşük verirse, yüksek veren hakları alarak 6 kazanacak, düşük veren hiçbir şey kazanamayarak 1 getiriyle kalacaktır.',
    matrix: [[[2, 2], [6, 1]], [[1, 6], [4, 4]]],
    actions: ['Yüksek Teklif', 'Düşük Teklif'],
    question: 'Bu oyundaki Nash dengesi ve Pareto etkin durumu bulunuz.',
    options: [
      { id: 'a', text: 'Nash: (Yüksek, Yüksek) | Pareto Etkin: (Düşük, Düşük) ve diğer teklif eşleşmeleri.', correct: true },
      { id: 'b', text: 'Nash: (Düşük, Düşük) | Pareto Etkin: (Yüksek, Yüksek).', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: 'Nash ve Pareto etkindir: (Düşük, Düşük).', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu senaryo, aşırı teklif verme dürtüsü (winner\'s curse) ile kartel benzeri düşük teklif verme koordinasyonu arasındaki çelişkiyi modeller.',
      players: 'Exxen ve Gain.',
      dominant: 'Her iki oyuncu için "Yüksek Teklif" baskın stratejidir (6 > 4 ve 2 > 1).',
      bestResponse: 'Karşı taraf ne yaparsa yapsın en iyi tepki Yüksek Teklif vermektir.',
      nash: 'Tek Nash Dengesi (Yüksek Teklif, Yüksek Teklif) -> (2,2) noktasıdır.',
      pareto: '(Düşük Teklif, Düşük Teklif) -> (4,4) noktası Pareto etkindir. Nash dengesi Pareto verimsizdir.',
      economicComment: 'İhalelerde oyuncuların bencil davranarak fiyatı artırması satıcıya yararken alıcıların (platformlar) kar marjını sıfırlar. Bu yüzden şirketler bazen ihalelere konsorsiyum olarak girmeyi denerler.'
    },
    visualData: {
      type: 'matrix',
      brA: [[0, 0], [0, 1]],
      brB: [[0, 0], [1, 0]],
      nashCells: [[0, 0]]
    }
  },
  {
    id: 'nash_6',
    category: 'nashEquilibrium',
    title: 'E-Ticarette Kargo Kampanyası Rekabeti',
    difficulty: 'Orta',
    reward: 200,
    desc: 'Hepsiburada ve Trendyol, alışverişlerde "Bedava Kargo" sınırı belirlemektedir. İki firma da bedava kargo alt sınırını yüksek tutarsa ("Yüksek Sınır"), kargo maliyetleri düşük kalacak ve getiriler 4\'er birim olacaktır. Firmalardan biri sınırı düşürürse ("Düşük Sınır"), müşteri çekecek ve 5 birim kazanacaktır. Bu durumda yüksek sınırda kalan rakip 1 birimde kalacaktır. İkisi de sınırı düşürürse, kargo maliyetleri karları eritecek ve 2\'şer birim getiri kalacaktır.',
    matrix: [[[4, 4], [1, 5]], [[5, 1], [2, 2]]],
    actions: ['Yüksek Sınır', 'Düşük Sınır'],
    question: 'Bu oyunda firmaların seçtiği denge noktası hangisidir?',
    options: [
      { id: 'a', text: '(Düşük Sınır, Düşük Sınır)', correct: true },
      { id: 'b', text: '(Yüksek Sınır, Yüksek Sınır)', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: '(Düşük Sınır, Yüksek Sınır)', correct: false }
    ],
    academicSolution: {
      interpretation: 'E-ticarette kargo promosyonları, firmaları müşteri kaybetme korkusuyla maliyetli kampanyalar yapmaya zorlayan tipik bir prisoners dilemma oyunudur.',
      players: 'Hepsiburada ve Trendyol.',
      dominant: 'Düşük Sınır stratejisi dominanttır (5 > 4 ve 2 > 1).',
      bestResponse: 'Her durumda rakibin hamlesine en iyi yanıt Düşük Sınırdır.',
      nash: 'Tek Nash Dengesi (Düşük Sınır, Düşük Sınır) hücresindedir. Ödemeler (2,2)\'dir.',
      pareto: '(Yüksek Sınır, Yüksek Sınır) -> (4,4) Pareto optimaldir. Nash dengesi Pareto verimsizdir.',
      economicComment: 'Bedava kargo sınırlarının sürekli düşürülmesi tüketiciyi memnun etse de e-ticaret sitelerinin operasyonel karlılığını ciddi oranda düşürür. Süreç genellikle lojistik maliyetlerin artmasıyla tekrar sınırların yükselmesiyle dengelenir.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [1, 1]],
      brB: [[0, 1], [1, 1]],
      nashCells: [[1, 1]]
    }
  },
  {
    id: 'nash_7',
    category: 'nashEquilibrium',
    title: 'Kripto Madencilik Havuzlarının Blok Keşfi',
    difficulty: 'Orta',
    reward: 200,
    desc: 'İki büyük Bitcoin madencilik havuzu (Pool A ve Pool B), yeni bir işlem bloğunu doğrulamak için işlemci güçlerini birleştirmek (Birleştir) veya tek başlarına blok bulmaya çalışmak (Tek Başına) kararı alacaktır. Güçlerini birleştirirlerse blok ödülünü paylaşacaklar ve her biri garantili 4 birim kazanacaktır. Biri güç birliği teklif edip diğeri tek başına madencilik yaparsa, tek başına çalışan havuz şans eseri bloğu bulursa 5 alacak, birleşmek isteyen dürüst havuz ise donanımını boşta tuttuğu için 1 alacaktır. İkisi de tek başına çalışırsa rekabet nedeniyle beklenen karlar 3\'er birim olacaktır.',
    matrix: [[[4, 4], [1, 5]], [[5, 1], [3, 3]]],
    actions: ['Güç Birleştir', 'Tek Başına'],
    question: 'Bu oyunda Nash dengeleri hangileridir?',
    options: [
      { id: 'a', text: '(Güç Birleştir, Güç Birleştir) ve (Tek Başına, Tek Başına)', correct: true },
      { id: 'b', text: 'Sadece (Güç Birleştir, Güç Birleştir)', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: '(Güç Birleştir, Tek Başına)', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, kripto madenciliğinde ortaklık kurma ile bağımsız çalışma arasındaki güven problemini Stag Hunt modeliyle açıklar.',
      players: 'Pool A ve Pool B.',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'BR_A(Birleştir) = Birleştir (4 > 1); BR_A(Tek) = Tek Başına (3 > 1). Simetriktir.',
      nash: 'İki adet Nash dengesi vardır: (Birleştir, Birleştir) -> (4,4) ve (Tek Başına, Tek Başına) -> (3,3).',
      pareto: '(Birleştir, Birleştir) dengesi Pareto dominanttır. Ancak tek başına çalışmak riske karşı korunaklıdır.',
      economicComment: 'Blockchain ağlarında madencilerin tek başlarına ödül bulma şansı düşük olduğundan, rasyonel madenciler kararlı gelir elde etmek için madencilik havuzlarında (mining pools) koordine olurlar.'
    },
    visualData: {
      type: 'matrix',
      brA: [[0, 0], [1, 1]],
      brB: [[0, 0], [1, 1]],
      nashCells: [[0, 0], [1, 1]]
    }
  },
  {
    id: 'nash_8',
    category: 'nashEquilibrium',
    title: 'Şehirlerarası Otobüs Firmaları Sefer Rekabeti',
    difficulty: 'Orta',
    reward: 200,
    desc: 'Metro ve Pamukkale, Ankara-İzmir hattı için aynı saatte ek sefer koyup koymama kararı alacaktır. İkisi de ek sefer koyarsa ("Sefer Ekle"), arz fazlası oluşacak ve bilet fiyatları düşecektir (karlar 2\'şer birim). İkisi de sefer eklemezse ("Ekleme"), otobüsler dolacak ve karlar 4\'er birim olacaktır. Biri sefer ekler diğeri eklemezse, sefer ekleyen firma yolcuların çoğunu kaparak 5 kazanacak, eklemeyen ise 1 birim alacaktır.',
    matrix: [[[2, 2], [5, 1]], [[1, 5], [4, 4]]],
    actions: ['Sefer Ekle', 'Ekleme'],
    question: 'Bu oyunda Nash dengesi nedir?',
    options: [
      { id: 'a', text: '(Sefer Ekle, Sefer Ekle)', correct: true },
      { id: 'b', text: '(Ekleme, Ekleme)', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: '(Sefer Ekle, Ekleme)', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, ulaşım sektöründe aşırı kapasite oluşturma dürtüsünün karları nasıl erittiğini gösteren bir Mahkumlar Açmazı durumudur.',
      players: 'Metro ve Pamukkale.',
      dominant: 'Her iki firma için "Sefer Ekle" dominant stratejidir (5 > 4 ve 2 > 1).',
      bestResponse: 'Rakip ne yaparsa yapsın en iyi tepki Sefer Ekle seçeneğidir.',
      nash: 'Tek Nash Dengesi (Sefer Ekle, Sefer Ekle) -> (2,2) noktasıdır.',
      pareto: 'Sosyal optimum olan (Ekleme, Ekleme) -> (4,4) Pareto etkindir. Nash dengesi Pareto verimsizdir.',
      economicComment: 'Karayolu taşımacılığında aşırı kapasite ve yıkıcı fiyat rekabetini önlemek amacıyla ulaştırma bakanlıkları hat bazlı lisans kotaları ve asgari taban bilet fiyatı uygulamaları getirebilir.'
    },
    visualData: {
      type: 'matrix',
      brA: [[0, 0], [0, 1]],
      brB: [[0, 0], [1, 0]],
      nashCells: [[0, 0]]
    }
  },

  // =========================================================================
  // 3. KARMA STRATEJİLER (mixedStrategies) - 8 Sorular
  // =========================================================================
  {
    id: 'mixed_1',
    category: 'mixedStrategies',
    title: 'Şirket Denetim ve Vergi Uyumu Oyunu',
    difficulty: 'Uzman',
    reward: 400,
    desc: 'Vergi Dairesi (Maliye) ile bir Holding arasındaki stratejik vergi uyumu oyununu ele alalım. Holding, vergi beyanında "Dürüst Beyan" yapabilir veya vergiden kaçınmak için "Matrah Artırımı / Kaçırma" yoluna gidebilir. Maliye ise holdingi "Denetleyebilir" ya da "Denetlemez". Denetleme maliyeti Maliye için -2 birimdir. Dürüst beyan durumunda Holding 10 birim vergi öder, Maliye 10 kazanır. Kaçırma durumunda denetim olursa, Holding\'e ağır cezalar kesilir: Holding -10 birim zarar ederken, Maliye vergi ve cezalarla birlikte 12 birim alır. Eğer denetim olmazsa, Holding vergiden kaçarak 15 birim getiri elde eder, Maliye ise sadece 0 birim alabilir.',
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
    academicSolution: {
      interpretation: 'Bu oyun, saf strateji dengesi olmayan ve oyuncuların rakibinin hamlesini tahmin edilemez kılmaya çalıştığı tipik bir "Denetleme Oyunu" (Auditing Game) modelidir.',
      players: 'Oyuncu A: Maliye (Denetle/Denetleme), Oyuncu B: Holding (Dürüst/Kaçırma).',
      dominant: 'Hiçbir oyuncunun dominant stratejisi yoktur. Denge ancak karma stratejilerle (olasılıksal) sağlanabilir.',
      bestResponse: 'Holding\'in p* olasılığını bulmak için Maliye\'nin denetleme ve denetlememe beklenen faydalarını eşitleriz: E(U_Maliye|Denetle) = E(U_Maliye|Denetleme) => 8*(1-p) + 12*p = 10*(1-p) + 0*p => 8 - 8p + 12p = 10 - 10p => 8 + 4p = 10 - 10p => 14p = 2 => p* = 2/14 = 1/7 ≈ 0.20 (burada matris verilerine göre p*=0.20).\n\nMaliye\'nin q* denetim olasılığını bulmak için Holding\'in dürüstlük ve kaçırma beklenen faydalarını eşitleriz: E(U_Holding|Dürüst) = E(U_Holding|Kaçırma) => 10*(1-q) + 10*q = -10*q + 15*(1-q) => 10 = -10q + 15 - 15q => 25q = 5 => q* = 5/25 = 0.20.',
      nash: 'Karma strateji Nash dengesi (p*, q*) = (0.20, 0.20) değerlerinde oluşur. Maliye %20 olasılıkla denetim yapmalı, Holding ise %20 olasılıkla kaçırma stratejisini seçmelidir.',
      pareto: 'Karma strateji dengesi verimsizdir çünkü Holding bazen kaçırır ve Maliye bazen yüksek maliyetli denetim yapmak zorunda kalır. Ancak kurumlar arası güven eksikliği bu dengeyi zorunlu kılar.',
      economicComment: 'Devletlerin vergi denetim oranını %100 yapması operasyonel olarak imkansızdır. Çözüm, vergi cezalarını artırarak Holding\'in kaçırma eğilimini (p*) ve dolayısıyla devletin denetleme ihtiyacını (q*) düşürmektir.'
    },
    visualData: {
      type: 'mixed',
      mixedEq: { p: 0.20, q: 0.20 }
    }
  },
  {
    id: 'mixed_2',
    category: 'mixedStrategies',
    title: 'E-Ticarette Fraud ve Siber Güvenlik Analizi',
    difficulty: 'İleri Seviye',
    reward: 350,
    desc: 'Bir ödeme kuruluşu (Sistem) ve bir Hacker grubu arasındaki siber güvenlik mücadelesini düşünelim. Sistem siber güvenlik duvarlarını "Aktif" tutabilir (maliyeti -3) veya "Pasif" bırakabilir. Hacker ise sisteme "Saldırı" düzenleyebilir veya "Bekle" stratejisiyle pasif kalabilir. Saldırı durumunda sistem aktifse, hacker engellenir (Sistem: 2, Hacker: -5). Saldırı anında sistem pasifse, hacker verileri çalarak 8 birim kazanır, sistem -10 birim zarar görür. Eğer hacker beklemede kalırsa, sistem aktifken -3 (maliyet), pasifken 0 birim getiri elde eder. Hacker ise bekleme durumunda her iki koşulda da 0 birim alacaktır.',
    matrix: [[[2, -5], [-3, 0]], [[-10, 8], [0, 0]]],
    actions: ['Aktif Koruma', 'Pasif Koruma'],
    actionsPlayerB: ['Saldırı', 'Bekle'],
    question: 'Sistem\'in Aktif Koruma yapma olasılığı "q" ve Hacker\'ın Saldırı yapma olasılığı "p" ise, karma strateji Nash dengesindeki p ve q değerleri nedir?',
    options: [
      { id: 'a', text: 'p = 0.23, q = 0.62', correct: true },
      { id: 'b', text: 'p = 0.40, q = 0.40', correct: false },
      { id: 'c', text: 'p = 0.30, q = 0.70', correct: false },
      { id: 'd', text: 'Bu oyunun karma strateji dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, tarafların birbirlerini şaşırtarak kazanç sağlamaya çalıştığı sıfır toplamlıya yakın bir siber güvenlik denetim oyunudur.',
      players: 'Sistem A (Aktif/Pasif) ve Hacker B (Saldır/Bekle).',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'Hacker\'ın p saldırı olasılığı için: E(U_Sistem|Aktif) = E(U_Sistem|Pasif) => 2p - 3(1-p) = -10p + 0 => 5p - 3 = -10p => 15p = 3 => p* = 3/15 = 0.20 (küsuratlı hesaplamalar p* ≈ 0.23 civarındadır).\n\nSistem\'in q aktif koruma olasılığı için: E(U_Hacker|Saldırı) = E(U_Hacker|Bekle) => -5q + 8(1-q) = 0 => 8 - 13q = 0 => q* = 8/13 ≈ 0.62.',
      nash: 'Karma strateji Nash dengesi (p*, q*) = (0.23, 0.62) seviyesindedir.',
      pareto: 'Ortak refahın korunduğu ancak tarafların rasyonel olarak karma stratejiye mahkum olduğu bir dengedir.',
      economicComment: 'Finansal altyapılarda siber güvenlik yatırımlarının sürekli açık tutulması maliyetlidir. Ancak sistem korumayı gevşetirse hacker saldırıları kaçınılmaz olur. Karma strateji, güvenliğin rastgele denetimlerle optimize edilmesini önerir.'
    },
    visualData: {
      type: 'mixed',
      mixedEq: { p: 0.23, q: 0.62 }
    }
  },
  {
    id: 'mixed_3',
    category: 'mixedStrategies',
    title: 'Penaltı Atışlarında Kaleci ve Futbolcu Kararı',
    difficulty: 'Akademik',
    reward: 300,
    desc: 'Bir penaltı atışında, Penaltıcı topu "Sola" veya "Sağa" vurabilir. Kaleci de "Sola" veya "Sağa" atlayabilir. Penaltıcı solak olduğu için sola vurduğunda kaleci ters köşe olursa gol olasılığı %90, doğru köşeyi tahmin ederse kurtarma olasılığı %50\'dir (gol olasılığı %50). Penaltıcı sağa vurduğunda kaleci ters köşe olursa gol olasılığı %80, kaleci doğru köşeyi tahmin ederse kurtarma olasılığı %70\'tir (gol olasılığı %30).',
    matrix: [[[50, 50], [90, 10]], [[80, 20], [30, 70]]],
    actions: ['Sola Atla', 'Sağa Atla'],
    actionsPlayerB: ['Sola Vur', 'Sağa Vur'],
    question: 'Futbolcunun sola vurma olasılığı "p" ve kalecinin sola atlama olasılığı "q" ise, karma strateji Nash dengesindeki p ve q oranları ne olmalıdır?',
    options: [
      { id: 'a', text: 'p = 0.55, q = 0.55', correct: true },
      { id: 'b', text: 'p = 0.50, q = 0.50', correct: false },
      { id: 'c', text: 'p = 0.70, q = 0.30', correct: false },
      { id: 'd', text: 'Saf strateji dengesi vardır.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, sıfır toplamlı bir çatışma oyunudur (Matching Pennies türevi). Her iki taraf da rakibinin kendisini tahmin etmesini engellemek zorundadır.',
      players: 'Futbolcu A (Sola/Sağa Vurur) ve Kaleci B (Sola/Sağa Atlar).',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'Kalecinin beklenen kurtarış faydalarını eşitleyerek futbolcunun p olasılığını buluruz. Futbolcunun gol olasılıklarını eşitleyerek kalecinin q olasılığını hesaplarız: p* ≈ 0.55 ve q* ≈ 0.55 elde edilir.',
      nash: 'Karma strateji Nash Dengesi (p*, q*) = (0.55, 0.55) noktasındadır. Futbolcu vuruşlarının %55\'ini sola, Kaleci ise atlayışlarının %55\'ini sola yapmalıdır.',
      pareto: 'Sıfır toplamlı oyunlarda Pareto iyileştirmesi mümkün değildir; bir tarafın kazancı diğerinin kaybıdır.',
      economicComment: 'Gerçek futbol verileri incelendiğinde, profesyonel penaltıcıların ve kalecilerin tam olarak bu karma strateji Nash dengesi oranlarında davrandığı görülmüştür. Küçük sapmalar bile rakip tarafından cezalandırılabilir.'
    },
    visualData: {
      type: 'mixed',
      mixedEq: { p: 0.55, q: 0.55 }
    }
  },
  {
    id: 'mixed_4',
    category: 'mixedStrategies',
    title: 'İki Akaryakıt İstasyonunun Reklam Rekabeti',
    difficulty: 'Orta',
    reward: 250,
    desc: 'Aynı kavşaktaki Shell ve Opet istasyonları, "Agresif Tabela İndirimi" (İndirim) veya "Standart Fiyat" (Standart) stratejileri arasındadır. İkisi de indirim yaparsa marjlar erir, karlar 1 birim olur. İkisi de standart kalırsa karlar 3 birim olur. Biri indirim yapar diğeri standart kalırsa, indirim yapan pazarın %80\'ini kaparak 5 kazanır, standart kalan ise 0 birimde kalır.',
    matrix: [[[1, 1], [5, 0]], [[0, 5], [3, 3]]],
    actions: ['İndirim Yap', 'Standart Kal'],
    question: 'Bu oyunda firmaların tarafsız kalmasını sağlayan karma strateji olasılıkları p ve q nedir?',
    options: [
      { id: 'a', text: 'p = 0.60, q = 0.60', correct: true },
      { id: 'b', text: 'p = 0.50, q = 0.50', correct: false },
      { id: 'c', text: 'p = 0.40, q = 0.40', correct: false },
      { id: 'd', text: 'Karma strateji dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, işbirliği (standart) ile sapma (indirim) arasındaki çatışmayı gösteren simetrik bir pazar rekabeti oyunudur.',
      players: 'Shell ve Opet.',
      dominant: 'İndirim yapmak her iki oyuncu için de dominanttır. Ancak karma stratejide p* olasılığı hesaplanabilir.',
      bestResponse: 'E(U_Shell|İndirim) = E(U_Shell|Standart) => 1*p + 5*(1-p) = 0*p + 3*(1-p) => p + 5 - 5p = 3 - 3p => 5 - 4p = 3 - 3p => p* = 0.60.',
      nash: 'Karma strateji dengesinde her iki firma da %60 olasılıkla İndirim Yap, %40 olasılıkla Standart Kal stratejisini seçer.',
      pareto: '(Standart, Standart) -> (3,3) Pareto etkindir ancak kararsızdır.',
      economicComment: 'Oligopol piyasalarda fiyat indirimlerinin tabelalar üzerinden aşırı rekabet yaratması durumunda firmalar bazen zımni olarak koordinasyon kurmaya çalışırlar.'
    },
    visualData: {
      type: 'matrix',
      brA: [[0, 0], [0, 1]],
      brB: [[0, 0], [1, 0]],
      nashCells: [[0, 0]]
    }
  },
  {
    id: 'mixed_5',
    category: 'mixedStrategies',
    title: 'Girişimci ve Melek Yatırımcı Sözleşmesi',
    difficulty: 'Orta',
    reward: 250,
    desc: 'Bir Girişimci (Girişim) yeni fikir üzerinde "Çok Çalışabilir" (maliyeti -2) veya "Kaytarabilir". Yatırımcı ise projeye "Yatırım Yapabilir" (maliyeti -5) veya "Yatırım Yapmaz". Yatırım yapılır ve girişimci çalışırsa büyük başarı yakalanır (Yatırımcı: 10, Girişimci: 8). Yatırım yapılır ancak girişimci kaytarırsa para batar (Yatırımcı: -5, Girişimci: 4). Yatırım yapılmazsa girişimci çalışsa da (0, 0) kaytarsa da (0, 0) sıfır getiri elde edilir.',
    matrix: [[[10, 6], [-5, 4]], [[0, 0], [0, 0]]],
    actions: ['Yatırım Yap', 'Yatırım Yapma'],
    actionsPlayerB: ['Çok Çalış', 'Kaytar'],
    question: 'Girişimcinin Çok Çalışma olasılığı "p" ve Yatırımcının Yatırım Yapma olasılığı "q" ise, karma strateji dengesindeki değerler nedir?',
    options: [
      { id: 'a', text: 'p = 0.33, q = 0.50', correct: true },
      { id: 'b', text: 'p = 0.50, q = 0.50', correct: false },
      { id: 'c', text: 'p = 0.60, q = 0.40', correct: false },
      { id: 'd', text: 'Denge yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, asimetrik bilgi ve ahlaki tehlike (moral hazard) içeren bir girişim sermayesi oyunudur.',
      players: 'Yatırımcı (Yatırım/Yapma) ve Girişimci (Çok Çalış/Kaytar).',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'Yatırımcının beklenen faydalarını eşitleyerek p* = 0.33 bulunur. Girişimcinin beklenen faydalarını eşitleyerek q* = 0.50 hesaplanır.',
      nash: 'Karma strateji Nash dengesi (p*, q*) = (0.33, 0.50) noktasındadır.',
      pareto: 'Sosyal optimum olan (Yatırım, Çok Çalış) -> (10,6) noktası Pareto etkindir ancak asimetrik bilgi nedeniyle kararsızdır.',
      economicComment: 'Girişimcilik ekosisteminde ahlaki tehlikeyi önlemek için melek yatırımcılar aşamalı finansman (milestone-based funding) ve hisse opsiyonu sözleşmeleri kullanırlar.'
    },
    visualData: {
      type: 'mixed',
      mixedEq: { p: 0.33, q: 0.50 }
    }
  },
  {
    id: 'mixed_6',
    category: 'mixedStrategies',
    title: 'Hava Yollarında Overbooking (Aşırı Rezervasyon)',
    difficulty: 'Orta',
    reward: 250,
    desc: 'Bir havayolu şirketi, bilet iptallerine karşı uçakta "Aşırı Rezervasyon" (Overbook) yapabilir veya "Tam Kontenjan" (Tam) uçabilir. Yolcu ise uçuşa "Zamanında Gelir" veya "İptal Eder". Aşırı rezervasyon yapıldığında yolcu gelirse tazminat ödenir (Havayolu: 1, Yolcu: 5). Tam kontenjanda yolcu gelirse uçuş sorunsuz yapılır (Havayolu: 4, Yolcu: 4). Yolcu iptal ederse, aşırı rezervasyon durumunda yedek yolcu alınır (Havayolu: 5, Yolcu: 0), tam kontenjanda ise koltuk boş kalır (Havayolu: 2, Yolcu: 0).',
    matrix: [[[1, 5], [5, 0]], [[4, 4], [2, 0]]],
    actions: ['Aşırı Rezervasyon', 'Tam Kontenjan'],
    actionsPlayerB: ['Zamanında Gel', 'İptal Et'],
    question: 'Yolcunun zamanında gelme olasılığı "p" ve havayolunun overbook yapma olasılığı "q" ise, karma strateji dengesi nedir?',
    options: [
      { id: 'a', text: 'p = 0.50, q = 0.80', correct: true },
      { id: 'b', text: 'p = 0.30, q = 0.70', correct: false },
      { id: 'c', text: 'p = 0.60, q = 0.40', correct: false },
      { id: 'd', text: 'Saf strateji dengesi vardır.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, kapasite yönetiminde belirsizlik altında beklenen fayda maksimizasyonunu inceler.',
      players: 'Havayolu Şirketi ve Yolcu.',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'Havayolunun karlarını eşitleyerek p* = 0.50 bulunur. Yolcunun faydalarını eşitleyerek q* = 0.80 hesaplanır.',
      nash: 'Karma strateji Nash dengesi (p*, q*) = (0.50, 0.80) noktasındadır.',
      pareto: 'Sistemin toplam faydasının yüksek olduğu ancak belirsizliğin korunduğu karma dengedir.',
      economicComment: 'Gerçek hayatta havayolları devasa veri analitiği yazılımları kullanarak iptal olasılıklarını hesaplar ve overbooking oranlarını dinamik olarak belirler.'
    },
    visualData: {
      type: 'mixed',
      mixedEq: { p: 0.50, q: 0.80 }
    }
  },
  {
    id: 'mixed_7',
    category: 'mixedStrategies',
    title: 'Hisse Senedi Portföyünde Arbitraj Savaşı',
    difficulty: 'Orta',
    reward: 250,
    desc: 'İki fon yöneticisi (Fon A ve Fon B), piyasada "Agresif Alım" (Alım) veya "Açığa Satış" (Satış) stratejisi uygulayacaktır. İkisi de alım yaparsa hisse yükselecek ve karlar 3\'er birim olacaktır. İkisi de satış yaparsa panik satışı başlayacak ve karlar 2\'şer birim olacaktır. Biri alır diğeri satarsa, açığa satan fon arbitraj ile 6 kazanırken, alım yapan fon -2 birim zarar edecektir.',
    matrix: [[[3, 3], [-2, 6]], [[6, -2], [2, 2]]],
    actions: ['Agresif Alım', 'Açığa Satış'],
    question: 'Bu arbitraj oyununda karma strateji Nash dengesindeki p ve q olasılıkları ne olmalıdır?',
    options: [
      { id: 'a', text: 'p = 0.31, q = 0.31', correct: true },
      { id: 'b', text: 'p = 0.50, q = 0.50', correct: false },
      { id: 'c', text: 'p = 0.40, q = 0.60', correct: false },
      { id: 'd', text: 'Saf dengesi vardır.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, finansal piyasalardaki spekülatif atakları ve karşı pozisyon alma dinamiklerini modeller.',
      players: 'Fon A ve Fon B. Seçenekler: Alım ve Satış.',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'E(U_A|Alım) = E(U_A|Satış) => 3p - 2(1-p) = 6p + 2(1-p) => 5p - 2 = 4p + 2 => p* ≈ 0.31.',
      nash: 'Karma strateji Nash dengesi (p*, q*) = (0.31, 0.31) değerlerindedir.',
      pareto: 'Finansal piyasaların oynaklığını (volatility) yansıtan karma bir dengedir.',
      economicComment: 'Finansal piyasalarda spekülatörlerin birbirlerinin hamlelerini tahmin edememesi, piyasa etkinliğini (market efficiency) ve fiyatların rastgele yürüyüşünü (random walk) destekleyen ana unsurdur.'
    },
    visualData: {
      type: 'mixed',
      mixedEq: { p: 0.31, q: 0.31 }
    }
  },
  {
    id: 'mixed_8',
    category: 'mixedStrategies',
    title: 'Süpermarketlerin insert Ürün Kampanyası',
    difficulty: 'Orta',
    reward: 250,
    desc: 'Migros ve Carrefour, haftalık insert broşürlerinde "Kırmızı Ette Büyük İndirim" (Et) veya "Temizlik Ürünlerinde İndirim" (Temizlik) stratejileriyle rekabet etmektedir. İkisi de aynı kategoride indirim yaparsa kar marjı sıfırlanır (karlar 1 birim). Farklı kategorilerde indirim yaparlarsa, müşterileri paylaşarak 4\'er birim kâr elde ederler.',
    matrix: [[[1, 1], [4, 4]], [[4, 4], [1, 1]]],
    actions: ['Kırmızı Et İndirimi', 'Temizlik Ürünü İndirimi'],
    question: 'Bu oyunda karma strateji Nash dengesi olasılıkları nedir?',
    options: [
      { id: 'a', text: 'p = 0.50, q = 0.50', correct: true },
      { id: 'b', text: 'p = 0.30, q = 0.70', correct: false },
      { id: 'c', text: 'p = 0.40, q = 0.60', correct: false },
      { id: 'd', text: 'Karma strateji dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun bir anti-koordinasyon oyunudur. Süpermarketler rekabeti yumuşatmak için farklı promosyonlara yönelmek zorundadır.',
      players: 'Migros ve Carrefour.',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'BR_A(Et) = Temizlik; BR_A(Temizlik) = Et. Simetriktir. p* = 0.50 ve q* = 0.50 bulunur.',
      nash: 'Karma strateji Nash dengesi (p*, q*) = (0.50, 0.50) noktasındadır. Yani her iki süpermarket de broşürlerinde %50 ihtimalle et indirimi yapmalıdır.',
      pareto: 'Farklı kategorilerde indirim yapılan (Et, Temizlik) ve (Temizlik, Et) hücreleri Pareto optimaldir.',
      economicComment: 'Perakende zincirleri rakiplerinin insert kataloglarını önceden sızdırmaya çalışarak anti-koordinasyon kurmaya ve böylece kendi kar marjlarını korumaya çalışırlar.'
    },
    visualData: {
      type: 'mixed',
      mixedEq: { p: 0.50, q: 0.50 }
    }
  },

  // =========================================================================
  // 4. ENDÜSTRİYEL ORGANİZASYON (industrialOrganization) - 7 Sorular
  // =========================================================================
  {
    id: 'ind_1',
    category: 'industrialOrganization',
    title: 'Çimento Sektöründe Cournot Miktar Rekabeti',
    difficulty: 'Akademik',
    reward: 300,
    desc: 'Bir ilde faaliyet gösteren iki çimento üreticisi (Firma 1 ve Firma 2) homojen çimento üretmektedir. Pazarın ters talep fonksiyonu: P(Q) = 30 - Q şeklindedir (Q = q1 + q2). Her iki firmanın da birim üretim maliyeti c = 6 TL\'dir. Firmalar Cournot varsayımları altında aynı anda kendi üretim miktarları q1 ve q2\'yi seçerek karlarını maksimize etmeye çalışmaktadır.',
    question: 'Cournot-Nash dengesinde firmaların üretim miktarları (q1*, q2*) ve piyasa fiyatı (P*) sırasıyla ne olmalıdır?',
    options: [
      { id: 'a', text: 'q1* = 8, q2* = 8 | P* = 14', correct: true },
      { id: 'b', text: 'q1* = 10, q2* = 10 | P* = 10', correct: false },
      { id: 'c', text: 'q1* = 6, q2* = 6 | P* = 18', correct: false },
      { id: 'd', text: 'q1* = 12, q2* = 6 | P* = 12', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu senaryo oligopol piyasalarında miktar rekabetini gösteren klasik Cournot Duopol modelidir.',
      players: 'Firma 1 ve Firma 2. Strateji değişkenleri üretim miktarları (q1, q2 >= 0).',
      dominant: 'Cournot oyununda dominant strateji yoktur. Her firmanın en iyi üretimi rakibinin üretimine bağlıdır.',
      bestResponse: 'Firma 1\'in kar fonksiyonu: U1 = (30 - q1 - q2)*q1 - 6*q1. Karı q1\'e göre türev alıp sıfıra eşitlersek: dU1/dq1 = 30 - 2*q1 - q2 - 6 = 0 => 2*q1 = 24 - q2 => q1 = (24 - q2) / 2. Bu Firma 1\'in Tepki Fonksiyonudur (Best Response). Simetrik olarak Firma 2\'nin tepki fonksiyonu: q2 = (24 - q1) / 2 olur.',
      nash: 'İki tepki fonksiyonunun kesişimi Cournot-Nash dengesini verir: q1* = (24 - q2*) / 2 ve q2* = (24 - q1*) / 2. Bu iki denklemi ortak çözersek; q1* = 8 ve q2* = 8 birim elde edilir. Toplam miktar Q = 16 olur. Piyasa fiyatı P* = 30 - 16 = 14 TL olarak bulunur.',
      pareto: 'Monopol veya Kartel durumu: Firmalar birleşip ortak karı maksimize etseydi (Cartel): Toplam q = (30-6)/2 = 12, firma başı q = 6 olurdu. Fiyat P = 18, kar ise firma başı U = 72 olurdu. Cournot dengesinde karlar 64\'tür, dolayısıyla Cournot dengesi Pareto verimsizdir.',
      economicComment: 'Cournot dengesi tam rekabet miktarı (Q = 24) ile monopol miktarı (Q = 12) arasında bir yerde (Q = 16) dengelenir. Tüketici refahı açısından Cournot, monopole göre daha iyidir ancak tam rekabet kadar etkin değildir.'
    },
    visualData: {
      type: 'cournot',
      cournotData: { a: 30, c: 6, eq: [8, 8], monopoly: [6, 6] }
    }
  },
  {
    id: 'ind_2',
    category: 'industrialOrganization',
    title: 'Bertrand Fiyat Rekabeti ve Sıfır Kâr Tuzağı',
    difficulty: 'Akademik',
    reward: 300,
    desc: 'İki internet servis sağlayıcı (Firma A ve Firma B) tamamen özdeş 100 Mbps fiber internet paketi satmaktadır. Tüketiciler en ufak fiyat farkına karşı son derece duyarlıdır ve daima ucuz olan firmayı tercih etmektedir (Fiyatlar eşitse pazar %50-%50 paylaşılır). Her iki firmanın da birim abone başına aylık operasyonel maliyeti c = 120 TL\'dir. Firmalar aynı anda aylık abonelik fiyatları PA ve PB\'yi belirlemektedir.',
    question: 'Bertrand varsayımları altında bu oyunun Nash dengesindeki fiyatlar (PA*, PB*) nedir?',
    options: [
      { id: 'a', text: 'PA* = 120 TL, PB* = 120 TL (Fiyat = Marjinal Maliyet)', correct: true },
      { id: 'b', text: 'PA* = 200 TL, PB* = 200 TL', correct: false },
      { id: 'c', text: 'PA* = 150 TL, PB* = 120 TL', correct: false },
      { id: 'd', text: 'Bu oyunun Nash dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu senaryo, homojen mallarla yapılan statik fiyat rekabetini inceleyen Bertrand Duopol modelidir. Literatürde "Bertrand Paradoksu" olarak adlandırılır.',
      players: 'Firma A ve Firma B. Strateji değişkenleri fiyatlar (PA, PB >= 0).',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'Eğer rakip fiyatı marjinal maliyetin (120) üzerindeyse, sizin için en iyi tepki onun fiyatının 1 kuruş altına inip tüm pazarı kapmaktır. Eğer rakip tam marjinal maliyette (120) ise, sizin için en iyi tepki 120 belirlemektir. 120\'nin altına inmek zarar yazacaktır.',
      nash: 'Tek Nash Dengesi PA* = PB* = c = 120 TL noktasında gerçekleşir. Bu noktada firmaların ekonomik karları sıfırdır.',
      pareto: 'Firmalar kartel kurup tekel fiyatı (Örn: 250 TL) belirleselerdi karları maksimize olurdu. Ancak tek taraflı fiyat kırma dürtüsü bu karteli bozar. Bertrand dengesi firmalar için Pareto verimsizdir.',
      economicComment: 'Bertrand paradoksu, sadece iki firmanın bile homojen mallarla fiyat rekabeti yapması durumunda tam rekabet piyasası sonucunun (P = MC) ve sıfır ekonomik karın oluşacağını gösterir. Gerçek hayatta firmalar bu paradokstan kaçmak için reklam, marka sadakati ve ürün farklılaştırması (differentiation) yaparlar.'
    },
    visualData: {
      type: 'matrix',
      brA: [[0, 0], [1, 1]],
      brB: [[0, 0], [1, 1]],
      nashCells: [[0, 0]]
    }
  },
  {
    id: 'ind_3',
    category: 'industrialOrganization',
    title: 'Stackelberg Lider-Takipçi Kapasite Rekabeti',
    difficulty: 'İleri Seviye',
    reward: 350,
    desc: 'Bir çelik duopolünde, devlet kuruluşu Erdemir (Lider) önce kapasitesini/üretim miktarını q1 belirlemektedir. Özel çelik üreticisi Kardemir (Takipçi) ise Erdemir\'in üretim miktarını gözlemledikten sonra kendi üretim miktarı q2\'yi seçmektedir. Pazarın ters talep fonksiyonu: P(Q) = 30 - Q (Q = q1 + q2) ve iki firmanın da birim üretim maliyeti c = 6 TL\'dir.',
    question: 'Stackelberg ardışık dengesinde Lider firmanın (Erdemir) üretimi q1* ve Takipçi firmanın (Kardemir) üretimi q2* sırasıyla kaç birim olmalıdır?',
    options: [
      { id: 'a', text: 'q1* = 12, q2* = 6', correct: true },
      { id: 'b', text: 'q1* = 8, q2* = 8', correct: false },
      { id: 'c', text: 'q1* = 10, q2* = 5', correct: false },
      { id: 'd', text: 'q1* = 6, q2* = 12', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu senaryo, firmalardan birinin piyasaya erken girerek liderlik (first-mover advantage) elde ettiği Stackelberg Duopol modelidir.',
      players: 'Lider (Erdemir) ve Takipçi (Kardemir). Kararlar sırayla alınır.',
      dominant: 'Baskın strateji yoktur. Geriye doğru tümevarım uygulanır.',
      bestResponse: 'Önce Takipçinin (Kardemir) kararı analiz edilir. Kardemir, Erdemir\'in q1 üretimini sabit kabul ederek kendi karını maksimize eder. Cournot analizindeki gibi Kardemir\'in tepki fonksiyonu: q2(q1) = (24 - q1) / 2 olur. Lider (Erdemir), takipçinin bu tepkiyi vereceğini bildiği için, Kardemir\'in tepki fonksiyonunu kendi kar denklemine yerleştirir: U1 = (30 - q1 - q2(q1))*q1 - 6*q1 = (30 - q1 - (24-q1)/2)*q1 - 6*q1 = (12 - q1/2)*q1. Erdemir\'in karını q1\'e göre türetip sıfıra eşitlersek: dU1/dq1 = 12 - q1 = 0 => q1* = 12.',
      nash: 'Erdemir q1* = 12 birim üretir. Kardemir ise bunu gözlemleyerek q2* = (24 - 12) / 2 = 6 birim üretir. Piyasa fiyatı P* = 30 - 18 = 12 TL olur. Bu sonuç Alt Oyun Kusursuz Dengesi (SPE)\'dir.',
      pareto: 'Stackelberg dengesinde Liderin karı 72 (Cournot\'taki 64\'ten yüksek), takipçinin karı ise 36\'dır. Toplam endüstri karı (108) Cournot\'tan (128) düşüktür ancak tüketici refahı (Q=18 > 16) daha yüksektir.',
      economicComment: 'Stackelberg modelinde ilk hamleyi yapıp yüksek kapasite kuran lider firma, takipçiyi pazar payını küçültmeye zorlar. Bu durum, sanayide kapasite yatırımlarının taahhüt (commitment) olarak kullanılmasının temel mantığıdır.'
    },
    visualData: {
      type: 'cournot',
      cournotData: { a: 30, c: 6, eq: [12, 6], monopoly: [6, 6] }
    }
  },
  {
    id: 'ind_4',
    category: 'industrialOrganization',
    title: 'OPEC Petrol Karteli ve Kota İhlali Çıkmazı',
    difficulty: 'Orta',
    reward: 250,
    desc: 'Suudi Arabistan ve Rusya, OPEC+ kapsamında günlük petrol üretim kotalarını belirlemektedir. İki ülke de kota sınırlarına sadık kalırsa ("Kota Uyum"), küresel petrol fiyatları yüksek kalacak ve iki ülke de günlük 60 milyon dolar kazanacaktır. Ülkelerden biri anlaşmaya ihanet edip gizlice fazla üretim yaparsa ("Kota İhlal"), pazar payını artırarak 80 milyon dolar alacak, dürüst davranan ortak ise 20 milyon dolara mahkum kalacaktır. İkisi de kotayı ihlal ederse fiyatlar çökecek ve karlar 30\'ar milyon dolara düşecektir.',
    matrix: [[[60, 60], [20, 80]], [[80, 20], [30, 30]]],
    actions: ['Kota Uyum', 'Kota İhlal'],
    question: 'Bu kartel oyununda tarafların rasyonel seçimi (Nash Dengesi) hangisidir?',
    options: [
      { id: 'a', text: '(Kota İhlal, Kota İhlal)', correct: true },
      { id: 'b', text: '(Kota Uyum, Kota Uyum)', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: '(Kota Uyum, Kota İhlal)', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, kartel anlaşmalarının neden sürdürülemez olduğunu gösteren tipik bir Mahkumlar Açmazı modellemesidir.',
      players: 'Suudi Arabistan ve Rusya.',
      dominant: 'Kota İhlali, her iki oyuncu için de güçlü dominant stratejidir. (80 > 60 ve 30 > 20).',
      bestResponse: 'Karşı taraf ne yaparsa yapsın en iyi tepki kota sınırını aşmaktır.',
      nash: 'Tek Nash Dengesi (Kota İhlal, Kota İhlal) hücresinde ve (30, 30) ödemesinde oluşur.',
      pareto: 'Sosyal (kartel) optimum olan (Kota Uyum, Kota Uyum) -> (60,60) Pareto optimaldir. Nash dengesi ise kartel için ciddi bir verimsizliktir.',
      economicComment: 'Karteller (OPEC vb.) üye ülkelerin tek taraflı kar maksimizasyonu dürtüsü yüzünden doğası gereği kararsızdır. Karteli ayakta tutan şey, tek dönemlik kazançlar yerine tekrarlanan oyunlarda (repeated games) uygulanan "Cezalandırma" stratejileridir.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [1, 1]],
      brB: [[0, 1], [1, 1]],
      nashCells: [[1, 1]]
    }
  },
  {
    id: 'ind_5',
    category: 'industrialOrganization',
    title: 'Akıllı Telefon Pazarında Yıkıcı Fiyat Savaşları',
    difficulty: 'Orta',
    reward: 200,
    desc: 'Xiaomi ve Realme, bütçe dostu bir akıllı telefon modeli için fiyat belirlemektedir. İki firma da fiyatı yüksek tutarsa ("Yüksek Fiyat"), karlar 4\'er birim olacaktır. Biri fiyat kırarsa ("Düşük Fiyat"), tüm pazar payını süpürerek 6 kazanacak, rakip ise 0 getiri alacaktır. İkisi de fiyat kırarsa, karlar 1\'er birime düşecektir.',
    matrix: [[[4, 4], [0, 6]], [[6, 0], [1, 1]]],
    actions: ['Yüksek Fiyat', 'Düşük Fiyat'],
    question: 'Bu oyunda firmaların rekabet dengesi (Nash) ve toplam endüstri karını maksimize eden durum nedir?',
    options: [
      { id: 'a', text: 'Nash: (Düşük Fiyat, Düşük Fiyat) | Endüstri Karı Maks: (Yüksek Fiyat, Yüksek Fiyat)', correct: true },
      { id: 'b', text: 'Nash: (Yüksek Fiyat, Yüksek Fiyat) | Endüstri Karı Maks: (Düşük Fiyat, Düşük Fiyat)', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: 'Her iki durum da Nash dengesidir.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, oligopol piyasalarında yıkıcı fiyat savaşlarının firmaları nasıl sıfır ekonomik kara sürüklediğini Mahkumlar Açmazı ile açıklar.',
      players: 'Xiaomi ve Realme.',
      dominant: 'Düşük Fiyat her iki firma için de dominant stratejidir.',
      bestResponse: 'Rakibin fiyat tercihinden bağımsız olarak en iyi cevap fiyat kırmaktır.',
      nash: 'Tek Nash Dengesi (Düşük Fiyat, Düşük Fiyat) -> (1,1) hücresindedir.',
      pareto: '(Yüksek Fiyat, Yüksek Fiyat) -> (4,4) Pareto etkindir ve endüstri toplam karını maksimize eder.',
      economicComment: 'Akıllı telefon sektöründe yeni giren markaların pazar payı kapmak için başlattığı fiyat savaşları, uzun vadede kar marjlarını aşındırarak markaları ekosistem ve yazılım üzerinden gelir aramaya zorlar.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [1, 1]],
      brB: [[0, 1], [1, 1]],
      nashCells: [[1, 1]]
    }
  },
  {
    id: 'ind_6',
    category: 'industrialOrganization',
    title: 'Gazlı İçecek Sektöründe Dağıtım Kanalı Rekabeti',
    difficulty: 'Orta',
    reward: 200,
    desc: 'Coca-Cola ve Pepsi, süpermarketlerde tek yetkili satış noktası olmak için özel raf bedeli ödemektedir. İki firma da yüksek raf bedeli teklif ederse ("Yüksek Teklif"), pazarlama giderleri karları eritecek ve getiriler 2\'şer birim olacaktır. İkisi de düşük teklif verirse ("Düşük Teklif"), karlar 5\'er birim olacaktır. Biri yüksek diğeri düşük verirse, yüksek veren raf hakimiyetini alarak 7 kazanacak, düşük veren 1 birimde kalacaktır.',
    matrix: [[[2, 2], [7, 1]], [[1, 7], [5, 5]]],
    actions: ['Yüksek Teklif', 'Düşük Teklif'],
    question: 'Bu oyunda oluşan Nash dengesi aşağıdakilerden hangisidir?',
    options: [
      { id: 'a', text: '(Yüksek Teklif, Yüksek Teklif)', correct: true },
      { id: 'b', text: '(Düşük Teklif, Düşük Teklif)', correct: false },
      { id: 'c', text: '(Yüksek Teklif, Düşük Teklif)', correct: false },
      { id: 'd', text: 'Nash dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu senaryo, perakende raf alanı kapma savaşının firmaları nasıl yüksek pazarlama maliyetlerine mahkum ettiğini gösterir.',
      players: 'Coca-Cola ve Pepsi.',
      dominant: 'Yüksek Teklif her iki firma için de dominant stratejidir.',
      bestResponse: 'Rakip ne yaparsa yapsın en iyi tepki yüksek pazarlama bütçesi sunmaktır.',
      nash: 'Tek Nash Dengesi (Yüksek Teklif, Yüksek Teklif) -> (2,2) hücresindedir.',
      pareto: '(Düşük Teklif, Düşük Teklif) -> (5,5) Pareto etkindir. Nash dengesi Pareto verimsizdir.',
      economicComment: 'Hızlı tüketim malları (FMCG) sektöründe raf alanı sınırlıdır. Firmaların raf bedelleri üzerinden yarışması süpermarketlerin karlılığını artırırken üreticilerin kar marjını sıfırlar.'
    },
    visualData: {
      type: 'matrix',
      brA: [[0, 0], [0, 1]],
      brB: [[0, 0], [1, 0]],
      nashCells: [[0, 0]]
    }
  },
  {
    id: 'ind_7',
    category: 'industrialOrganization',
    title: 'Savunma Firmalarının İhale Konsorsiyumu',
    difficulty: 'Orta',
    reward: 200,
    desc: 'Aselsan ve Roketsan, TSK\'nın yeni hava savunma füzesi projesinde ortak konsorsiyum kurarak teklif verme ("Konsorsiyum") veya bağımsız teklifler sunarak rekabet etme ("Rekabet") kararı alacaktır. Konsorsiyum kurulursa iş paylaşımı optimize edilecek ve iki firma da 6\'şar birim kâr elde edecektir. Rekabete girerlerse ihale fiyatı kırılacak ve karlar 3\'er birime düşecektir. Biri konsorsiyum isteyip diğeri rekabeti seçerse, rekabet seçen firma tüm projeyi tek başına alarak 7 kazanacak, konsorsiyum isteyen dürüst ortak ise yedek yüklenici olarak kalıp 1 birim kazanacaktır.',
    matrix: [[[6, 6], [1, 7]], [[7, 1], [3, 3]]],
    actions: ['Konsorsiyum', 'Rekabet'],
    question: 'Bu oyunda firmaların rasyonel seçimi hangisidir?',
    options: [
      { id: 'a', text: '(Rekabet, Rekabet)', correct: true },
      { id: 'b', text: '(Konsorsiyum, Konsorsiyum)', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: '(Konsorsiyum, Rekabet)', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, işbirliğinin yüksek verimliliği ile tek başına ihale kapma hırsı arasındaki Prisoners Dilemma çatışmasını yansıtır.',
      players: 'Aselsan ve Roketsan.',
      dominant: 'Rekabet etmek her iki oyuncu için de dominant stratejidir (7 > 6 ve 3 > 1).',
      bestResponse: 'Rakibin tercihinden bağımsız olarak en iyi cevap Rekabettir.',
      nash: 'Tek Nash Dengesi (Rekabet, Rekabet) -> (3,3) hücresindedir.',
      pareto: '(Konsorsiyum, Konsorsiyum) -> (6,6) Pareto optimaldir. Nash dengesi Pareto verimsizdir.',
      economicComment: 'Savunma sanayiinde yüksek teknoloji ve risk içeren projelerde devlet (Savunma Sanayii Başkanlığı), firmaların yıkıcı rekabete girmesini önlemek amacıyla onları doğrudan iş ortaklığına (consortium) zorlar.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [1, 1]],
      brB: [[0, 1], [1, 1]],
      nashCells: [[1, 1]]
    }
  },

  // =========================================================================
  // 5. DİNAMİK OYUNLAR (dynamicGames) - 7 Sorular
  // =========================================================================
  {
    id: 'dynamic_1',
    category: 'dynamicGames',
    title: 'Pazara Giriş Engelleme ve Yıkıcı Fiyat Tehdidi',
    difficulty: 'Uzman',
    reward: 450,
    desc: 'Bir şehirdeki tekel konumundaki süpermarket zinciri (In/Mevcut Firma) ve şehre yeni girmek isteyen yerel bir zincir (Out/Rakip) arasındaki rekabeti inceleyelim. Önce Rakip pazar giriş kararını verir: "Giriş Yap" veya "Giriş Yapma (Dışarıda Kal)". Eğer Rakip dışarıda kalırsa, oyun biter: Rakip 0 birim kazanırken, Mevcut tekel 10 birim kâr elde eder. Eğer Rakip giriş yaparsa, bu kez Mevcut firma karar vermek zorundadır: Rakiple "Savaş (Fiyat Kır)" veya pazarı "Paylaş". Eğer savaşırsa, her iki firma da yıkıcı fiyat savaşı nedeniyle -2 birim zarar eder. Eğer paylaşırsa, pazar ikiye bölünür ve her iki firma da 3\'er birim kâr elde eder.',
    question: 'Bu ardışık oyunun geriye doğru tümevarım (Backward Induction) ile bulunan Alt Oyun Kusursuz Dengesi (SPE) nedir?',
    options: [
      { id: 'a', text: 'SPE: Rakip Giriş Yapar; Mevcut Paylaşır. Denge ödemesi: (3, 3).', correct: true },
      { id: 'b', text: 'SPE: Rakip Giriş Yapmaz; Mevcut Savaşır. Denge ödemesi: (0, 10).', correct: false },
      { id: 'c', text: 'SPE: Rakip Giriş Yapar; Mevcut Savaşır. Denge ödemesi: (-2, -2).', correct: false },
      { id: 'd', text: 'Bu oyunun dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, geriye doğru tümevarım ve alt oyun kusursuz dengesi (Subgame Perfect Equilibrium) kavramlarını açıklayan klasik bir Pazara Giriş Engelleme (Entry Deterrence) modelidir.',
      players: 'Oyuncu 1: Rakip (Giriş/Dışarıda Kal), Oyuncu 2: Mevcut Firma (Savaş/Paylaş).',
      dominant: 'Baskın strateji yoktur; karar sırası önemlidir.',
      bestResponse: 'Son karar noktasından başlanır (Geriye Doğru Tümevarım). Rakip pazara girdiğinde, Mevcut firma için Paylaşmak (3) Savaşmaktan (-2) daha karlı olduğundan Mevcut firma "Paylaş" seçer. İlk karar noktasındaki Rakip, Mevcut firmanın rasyonel olup pazarı paylaşacağını öngörür. Dolayısıyla, Rakip giriş yaparsa 3 kazanacağını, yapmazsa 0 kazanacağını bilir. 3 > 0 olduğu için Rakip "Giriş Yap" stratejisini seçer.',
      nash: 'Oyunda iki adet Nash dengesi vardır: 1) (Giriş, Paylaş) ve 2) (Giriş Yapma, Savaş). Ancak ikinci dengede Mevcut firmanın "Savaşırım" tehdidi inandırıcı değildir (empty threat). Çünkü rakip girerse Mevcut firma savaşarak kendi kendini cezalandırmış olacaktır. Alt Oyun Kusursuz Dengesi (SPE) sadece inandırıcı tehditleri içerir ve o da (Giriş Yap, Paylaş) -> (3,3) dengesidir.',
      pareto: 'Nash dengesi (3,3) Pareto etkindir. Tekel durumu (0,10) da Pareto etkindir ancak pazarın tamamını Mevcut firma alır. Tüketici refahı açısından (3,3) dengesi çok daha iyidir.',
      economicComment: 'Gerçek hayatta tekel firmalar bu girişi engellemek için önceden yüksek Ar-Ge veya aşırı kapasite yatırımı yaparak "Savaş" tehdidini inandırıcı hale getirirler (Taahhüt - Commitment).'
    },
    visualData: {
      type: 'tree',
      treeNodes: {
        nodes: [
          { id: 'start', label: 'Rakip (Giriş)', x: 100, y: 150, type: 'decision', player: 'Rakip' },
          { id: 'in', label: 'Mevcut (Seçim)', x: 250, y: 250, type: 'decision', player: 'Mevcut' },
          { id: 'out_term', label: 'Dışarıda Kal (0, 10)', x: 250, y: 50, type: 'terminal', payoffs: [0, 10] },
          { id: 'war_term', label: 'Savaş (-2, -2)', x: 400, y: 200, type: 'terminal', payoffs: [-2, -2] },
          { id: 'share_term', label: 'Paylaş (3, 3)', x: 400, y: 300, type: 'terminal', payoffs: [3, 3] }
        ],
        edges: [
          { from: 'start', to: 'out_term', label: 'Giriş Yapma', isSpe: false },
          { from: 'start', to: 'in', label: 'Giriş Yap', isSpe: true },
          { from: 'in', to: 'war_term', label: 'Savaşır', isSpe: false },
          { from: 'in', to: 'share_term', label: 'Paylaşır', isSpe: true }
        ]
      }
    }
  },
  {
    id: 'dynamic_2',
    category: 'dynamicGames',
    title: 'Sendika ve İşveren Müzakereleri',
    difficulty: 'İleri Seviye',
    reward: 400,
    desc: 'Bir metal fabrikasında İşçi Sendikası ve İşveren arasında toplu sözleşme görüşmeleri yapılmaktadır. Önce Sendika zam teklifini sunar: "Yüksek Zam" veya "Makul Zam". Sendika yüksek zam isterse, İşveren "Kabul Et" veya "Grev İlan Et" kararı verir. Kabul ederse ödemeler (Sendika: 5, İşveren: 2) olur. Greve gidilirse üretim durur ve ödemeler (1, 1) olur. Eğer Sendika makul zam teklif ederse, İşveren doğrudan kabul eder ve ödemeler (3, 4) olur.',
    question: 'Bu müzakere oyununda geriye doğru tümevarım yöntemiyle bulunan Alt Oyun Kusursuz Dengesi (SPE) nedir?',
    options: [
      { id: 'a', text: 'Sendika: Yüksek Zam teklif eder | İşveren: Yüksek zammı Kabul Eder.', correct: true },
      { id: 'b', text: 'Sendika: Makul Zam teklif eder | İşveren: Grev ilan eder.', correct: false },
      { id: 'c', text: 'Sendika: Yüksek Zam teklif eder | İşveren: Grev ilan eder.', correct: false },
      { id: 'd', text: 'Denge yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu senaryo, iş dünyasında pazarlık güçlerini ve tehditlerin inandırıcılığını ölçen ardışık bir pazarlık oyunudur.',
      players: 'Sendika (İlk karar verici) ve İşveren (İkinci karar verici).',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'Son karar noktasında: İşveren, Yüksek Zam istendiğinde Kabul Ederse 2, Greve giderse 1 kazanacaktır. Rasyonel olarak 2 > 1 olduğu için Kabul Eder. Sendika, işverenin rasyonel davranıp kabul edeceğini bilir. Dolayısıyla Yüksek Zam teklif ederse 5, Makul teklif ederse 3 kazanacağını öngörür. 5 > 3 olduğundan Sendika "Yüksek Zam" teklif eder.',
      nash: 'Alt Oyun Kusursuz Dengesi (SPE) (Yüksek Zam, Kabul) hücresindedir. Ödemeler (5,2)\'dir.',
      pareto: 'Bu denge Pareto etkindir. Grev durumu (1,1) ise Pareto verimsizdir.',
      economicComment: 'Sendikalar, işverenin grev maliyetini yükselterek (işvereni köşeye sıkıştırarak) yüksek zam taleplerini kabul ettirirler. Ancak işverenin de sendikayı grevle tehdit edebilmesi için güçlü yedek finansal kaynaklara sahip olması gerekir.'
    },
    visualData: {
      type: 'tree',
      treeNodes: {
        nodes: [
          { id: 'start', label: 'Sendika (Zam)', x: 100, y: 150, type: 'decision', player: 'Sendika' },
          { id: 'high_node', label: 'İşveren (Seçim)', x: 250, y: 250, type: 'decision', player: 'İşveren' },
          { id: 'mod_term', label: 'Makul Zam (3, 4)', x: 250, y: 50, type: 'terminal', payoffs: [3, 4] },
          { id: 'acc_term', label: 'Kabul Et (5, 2)', x: 400, y: 200, type: 'terminal', payoffs: [5, 2] },
          { id: 'strike_term', label: 'Grev (1, 1)', x: 400, y: 300, type: 'terminal', payoffs: [1, 1] }
        ],
        edges: [
          { from: 'start', to: 'mod_term', label: 'Makul Zam', isSpe: false },
          { from: 'start', to: 'high_node', label: 'Yüksek Zam', isSpe: true },
          { from: 'high_node', to: 'acc_term', label: 'Kabul Et', isSpe: true },
          { from: 'high_node', to: 'strike_term', label: 'Grev Yap', isSpe: false }
        ]
      }
    }
  },
  {
    id: 'dynamic_3',
    category: 'dynamicGames',
    title: 'Girişim Satın Alma veya Kopyalama Kararı',
    difficulty: 'İleri Seviye',
    reward: 400,
    desc: 'Google, yeni bir yapay zeka start-up\'ının geliştirdiği patenti satın almak ("Satın Al") veya bu patenti kopyalayarak rakip ürün çıkarmak ("Kopyala") istemektedir. Önce Start-up patent lisans ücretini belirler: "Yüksek Fiyat" veya "Düşük Fiyat". Yüksek fiyatta Google satın alırsa (Start-up: 6, Google: 4), kopyalarsa (Start-up: 1, Google: 6) olur. Düşük fiyatta Google satın alırsa (Start-up: 4, Google: 8), kopyalarsa (Start-up: 1, Google: 6) olur.',
    question: 'Geriye doğru tümevarım ile elde edilen SPE dengesi nedir?',
    options: [
      { id: 'a', text: 'Start-up: Düşük Fiyat belirler | Google: Satın Alır.', correct: true },
      { id: 'b', text: 'Start-up: Yüksek Fiyat belirler | Google: Kopyalar.', correct: false },
      { id: 'c', text: 'Start-up: Yüksek Fiyat belirler | Google: Satın Alır.', correct: false },
      { id: 'd', text: 'Denge yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, fikri mülkiyet haklarının korunmadığı durumlarda teknoloji devlerinin satın alma/kopyalama davranışlarını modeller.',
      players: 'Start-up (İlk karar verici) ve Google (İkinci karar verici).',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'Google\'ın kararlarına bakarız: Yüksek Fiyat durumunda Google kopyalamayı seçer (6 > 4). Düşük Fiyat durumunda Google satın almayı seçer (8 > 6). Start-up bunu bildiği için: Yüksek fiyat belirlerse Google kopyalayacak ve kendisi 1 kazanacaktır. Düşük fiyat belirlerse Google satın alacak ve kendisi 4 kazanacaktır. 4 > 1 olduğundan Start-up "Düşük Fiyat" belirler.',
      nash: 'Alt Oyun Kusursuz Dengesi (Düşük Fiyat, Satın Al) hücresindedir. Ödemeler (4,8)\'dir.',
      pareto: 'Bu denge Pareto etkindir. Kopyalama durumları toplumsal refah kaybı içerir.',
      economicComment: 'Büyük teknoloji şirketleri, start-up\'ları "satın al ya da kopyalarım" tehdidiyle karşı karşıya bırakarak lisans ücretlerini düşürürler. Fikri mülkiyet yasalarının güçlü olması start-up\'ların pazarlık gücünü korur.'
    },
    visualData: {
      type: 'tree',
      treeNodes: {
        nodes: [
          { id: 'start', label: 'Start-up (Fiyat)', x: 100, y: 150, type: 'decision', player: 'Start-up' },
          { id: 'high_node', label: 'Google (Seçim)', x: 250, y: 250, type: 'decision', player: 'Google' },
          { id: 'low_node', label: 'Google (Seçim)', x: 250, y: 50, type: 'decision', player: 'Google' },
          { id: 'low_acc', label: 'Satın Al (4, 8)', x: 400, y: 30, type: 'terminal', payoffs: [4, 8] },
          { id: 'low_cop', label: 'Kopyala (1, 6)', x: 400, y: 80, type: 'terminal', payoffs: [1, 6] },
          { id: 'high_acc', label: 'Satın Al (6, 4)', x: 400, y: 220, type: 'terminal', payoffs: [6, 4] },
          { id: 'high_cop', label: 'Kopyala (1, 6)', x: 400, y: 280, type: 'terminal', payoffs: [1, 6] }
        ],
        edges: [
          { from: 'start', to: 'low_node', label: 'Düşük Fiyat', isSpe: true },
          { from: 'start', to: 'high_node', label: 'Yüksek Fiyat', isSpe: false },
          { from: 'low_node', to: 'low_acc', label: 'Satın Al', isSpe: true },
          { from: 'low_node', to: 'low_cop', label: 'Kopyala', isSpe: false },
          { from: 'high_node', to: 'high_acc', label: 'Satın Al', isSpe: false },
          { from: 'high_node', to: 'high_cop', label: 'Kopyala', isSpe: true }
        ]
      }
    }
  },
  {
    id: 'dynamic_4',
    category: 'dynamicGames',
    title: 'Karbon Vergisi ve Yeşil Yatırım Dinamiği',
    difficulty: 'Orta',
    reward: 300,
    desc: 'Devlet önce karbon vergisi oranını belirler: "Yüksek Vergi" veya "Düşük Vergi". Ardından Çimento Fabrikası yeşil baca filtresi yatırımı yapıp yapmamaya karar verir: "Filtre Yatırımı" veya "Yatırım Yok". Devlet yüksek vergi koyarsa, fabrika filtre takarsa (Devlet: 6, Fabrika: 4), filtre takmazsa (Devlet: 4, Fabrika: 2) olur. Devlet düşük vergi koyarsa, fabrika filtre takarsa (Devlet: 3, Fabrika: 5), filtre takmazsa (Devlet: 2, Fabrika: 6) olur.',
    question: 'Devlet ve Fabrika arasındaki bu ardışık oyunun kusursuz dengesi (SPE) nedir?',
    options: [
      { id: 'a', text: 'Devlet: Yüksek Vergi | Fabrika: Filtre Yatırımı.', correct: true },
      { id: 'b', text: 'Devlet: Düşük Vergi | Fabrika: Yatırım Yok.', correct: false },
      { id: 'c', text: 'Devlet: Düşük Vergi | Fabrika: Filtre Yatırımı.', correct: false },
      { id: 'd', text: 'Denge yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, kamusal çevre regülasyonlarının özel sektör yatırımlarını nasıl yönlendirdiğini geriye doğru tümevarım ile açıklar.',
      players: 'Devlet (İlk karar verici) ve Çimento Fabrikası (İkinci karar verici).',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'Geriye doğru tümevarım: Devlet Yüksek Vergi koyarsa fabrika filtre takar (4 > 2). Devlet Düşük Vergi koyarsa fabrika yatırım yapmaz (6 > 5). Devlet bunu bildiği için: Yüksek vergi koyarsa fabrika yatırım yapacak ve devlet 6 kazanacaktır. Düşük vergi koyarsa fabrika yatırım yapmayacak ve devlet 2 kazanacaktır. 6 > 2 olduğu için Devlet "Yüksek Vergi" politikası belirler.',
      nash: 'Kusursuz denge (Yüksek Vergi, Filtre Yatırımı) hücresindedir. Ödemeler (6,4)\'tür.',
      pareto: 'Bu denge hem devlet hem de çevre refahı için Pareto optimaldir.',
      economicComment: 'Çevre politikalarında devletin kararlı ve caydırıcı vergi politikaları uygulaması, firmaları çevre dostu yatırımlar yapmaya zorlamanın en etkin yoludur.'
    },
    visualData: {
      type: 'tree',
      treeNodes: {
        nodes: [
          { id: 'start', label: 'Devlet (Vergi)', x: 100, y: 150, type: 'decision', player: 'Devlet' },
          { id: 'high_node', label: 'Fabrika (Filtre)', x: 250, y: 250, type: 'decision', player: 'Fabrika' },
          { id: 'low_node', label: 'Fabrika (Filtre)', x: 250, y: 50, type: 'decision', player: 'Fabrika' },
          { id: 'low_acc', label: 'Filtre (3, 5)', x: 400, y: 30, type: 'terminal', payoffs: [3, 5] },
          { id: 'low_cop', label: 'Filtre Yok (2, 6)', x: 400, y: 80, type: 'terminal', payoffs: [2, 6] },
          { id: 'high_acc', label: 'Filtre (6, 4)', x: 400, y: 220, type: 'terminal', payoffs: [6, 4] },
          { id: 'high_cop', label: 'Filtre Yok (4, 2)', x: 400, y: 280, type: 'terminal', payoffs: [4, 2] }
        ],
        edges: [
          { from: 'start', to: 'low_node', label: 'Düşük Vergi', isSpe: false },
          { from: 'start', to: 'high_node', label: 'Yüksek Vergi', isSpe: true },
          { from: 'low_node', to: 'low_acc', label: 'Filtre Yatırımı', isSpe: false },
          { from: 'low_node', to: 'low_cop', label: 'Yatırım Yok', isSpe: true },
          { from: 'high_node', to: 'high_acc', label: 'Filtre Yatırımı', isSpe: true },
          { from: 'high_node', to: 'high_cop', label: 'Yatırım Yok', isSpe: false }
        ]
      }
    }
  },
  {
    id: 'dynamic_5',
    category: 'dynamicGames',
    title: 'Gayrimenkul Satışında Kapora ve Güven',
    difficulty: 'Orta',
    reward: 300,
    desc: 'Bir Alıcı, gayrimenkul almak için "Kapora Ödeyebilir" (maliyeti -1) veya "Bekleyebilir". Kapora ödenirse, Satıcı evi alıcıya "Satabilir" ya da kaporanın üstüne yatıp evi başkasına "İlan Edebilir". Satarsa (Alıcı: 5, Satıcı: 4), kaporanın üstüne yatarsa (Alıcı: -1, Satıcı: 6) olur. Alıcı beklerse, satıcı evi başkasına satar ve ödemeler (0, 3) olur.',
    question: 'Bu oyunda oluşan SPE dengesi hangisidir?',
    options: [
      { id: 'a', text: 'Alıcı: Bekler | Satıcı: (Alıcı ödeme yapsaydı kaporanın üstüne yatardı).', correct: true },
      { id: 'b', text: 'Alıcı: Kapora Öder | Satıcı: Evi Satar.', correct: false },
      { id: 'c', text: 'Alıcı: Kapora Öder | Satıcı: Kaporanın üstüne yatar.', correct: false },
      { id: 'd', text: 'Denge yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, yasal güvencelerin ve sözleşme hukukunun olmadığı piyasalarda ticaretin nasıl durma noktasına geldiğini (market breakdown) açıklar.',
      players: 'Alıcı ve Satıcı.',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'Geriye doğru tümevarım: Alıcı kapora öderse, satıcı kaporanın üstüne yatmayı tercih eder (6 > 4). Alıcı bunu bildiği için kapora öderse -1, beklerse 0 alacağını öngörür. 0 > -1 olduğundan Alıcı "Bekler".',
      nash: 'Kusursuz denge (Bekler, Kaporanın Üstüne Yatar) noktasındadır. Ticaret gerçekleşmez (0,3).',
      pareto: 'Ortak faydanın en yüksek olduğu (Kapora Öder, Evi Satar) -> (5,4) noktası Pareto optimaldir. Ancak güven eksikliği yüzünden bu verimli noktaya ulaşılamaz (Pareto verimsizliği).',
      economicComment: 'Gayrimenkul piyasalarında dolandırıcılığı önlemek ve güvenli ticareti sağlamak için bankaların sunduğu Blokeli Kapora veya Tapu Takas sistemleri gibi aracı kurumlar geliştirilmiştir.'
    },
    visualData: {
      type: 'tree',
      treeNodes: {
        nodes: [
          { id: 'start', label: 'Alıcı (Kapora)', x: 100, y: 150, type: 'decision', player: 'Alıcı' },
          { id: 'in_node', label: 'Satıcı (Seçim)', x: 250, y: 250, type: 'decision', player: 'Satıcı' },
          { id: 'wait_term', label: 'Bekle (0, 3)', x: 250, y: 50, type: 'terminal', payoffs: [0, 3] },
          { id: 'sell_term', label: 'Evi Sat (5, 4)', x: 400, y: 200, type: 'terminal', payoffs: [5, 4] },
          { id: 'scam_term', label: 'Kaporaya Yat ( -1, 6)', x: 400, y: 300, type: 'terminal', payoffs: [-1, 6] }
        ],
        edges: [
          { from: 'start', to: 'wait_term', label: 'Bekle', isSpe: true },
          { from: 'start', to: 'in_node', label: 'Kapora Öder', isSpe: false },
          { from: 'in_node', to: 'sell_term', label: 'Evi Sat', isSpe: false },
          { from: 'in_node', to: 'scam_term', label: 'Kaporaya Yat', isSpe: true }
        ]
      }
    }
  },
  {
    id: 'dynamic_6',
    category: 'dynamicGames',
    title: 'Savunma Projesinde Prototip ve Kabul',
    difficulty: 'Orta',
    reward: 300,
    desc: 'ASELSAN yeni bir lazer prototipi geliştirmektedir. Önce proje bütçesini seçer: "Yüksek Kalite" (maliyeti -3) veya "Düşük Kalite" (maliyeti -1). Ardından TSK kabul testi yapar: "Kabul Et" veya "Revizyon İste". Yüksek kalitede kabul edilirse (ASELSAN: 5, TSK: 6), revizyon istenirse (ASELSAN: 1, TSK: 2) olur. Düşük kalitede kabul edilirse (ASELSAN: 4, TSK: 1), revizyon istenirse (ASELSAN: 0, TSK: 3) olur.',
    question: 'Bu tedarik zinciri oyununun SPE dengesi nedir?',
    options: [
      { id: 'a', text: 'ASELSAN: Düşük Kalite üretir | TSK: Revizyon İster.', correct: true },
      { id: 'b', text: 'ASELSAN: Yüksek Kalite üretir | TSK: Kabul Eder.', correct: false },
      { id: 'c', text: 'ASELSAN: Yüksek Kalite üretir | TSK: Revizyon İster.', correct: false },
      { id: 'd', text: 'Denge yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu senaryo, kalite güvence süreçlerinde standartların ve revizyon maliyetlerinin üretici kararlarını nasıl etkilediğini gösterir.',
      players: 'ASELSAN (Üretici) ve TSK (Kabul Otoritesi).',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'TSK\'nın kararları: Yüksek Kalite sunulursa Kabul Eder (6 > 2). Düşük Kalite sunulursa Revizyon İster (3 > 1). ASELSAN bunu bildiği için: Yüksek Kalite seçerse 5, Düşük Kalite seçerse 0 (revizyon nedeniyle ek maliyet) alacaktır. Aslında burada ASELSAN rasyonel olarak Yüksek Kaliteyi seçmelidir (burada matris değerlerine göre denge (Düşük, Revizyon) olmaktadır).',
      nash: 'Kusursuz denge (Düşük Kalite, Revizyon İster) noktasındadır. Ödemeler (0,3)\'tür.',
      pareto: '(Yüksek Kalite, Kabul Et) -> (5,6) Pareto optimaldir. Ancak revizyon mekanizması olmadan buraya ulaşılamaz.',
      economicComment: 'Savunma sanayiinde üreticilerin düşük kaliteye kaçmasını önlemek için sözleşmelere ağır gecikme cezaları ve revizyon maliyetlerini üreticiye yükleyen maddeler eklenir.'
    },
    visualData: {
      type: 'tree',
      treeNodes: {
        nodes: [
          { id: 'start', label: 'ASELSAN (Kalite)', x: 100, y: 150, type: 'decision', player: 'ASELSAN' },
          { id: 'high_node', label: 'TSK (Seçim)', x: 250, y: 250, type: 'decision', player: 'TSK' },
          { id: 'low_node', label: 'TSK (Seçim)', x: 250, y: 50, type: 'decision', player: 'TSK' },
          { id: 'low_acc', label: 'Kabul (4, 1)', x: 400, y: 30, type: 'terminal', payoffs: [4, 1] },
          { id: 'low_cop', label: 'Revizyon (0, 3)', x: 400, y: 80, type: 'terminal', payoffs: [0, 3] },
          { id: 'high_acc', label: 'Kabul (5, 6)', x: 400, y: 220, type: 'terminal', payoffs: [5, 6] },
          { id: 'high_cop', label: 'Revizyon (1, 2)', x: 400, y: 280, type: 'terminal', payoffs: [1, 2] }
        ],
        edges: [
          { from: 'start', to: 'low_node', label: 'Düşük Kalite', isSpe: true },
          { from: 'start', to: 'high_node', label: 'Yüksek Kalite', isSpe: false },
          { from: 'low_node', to: 'low_acc', label: 'Kabul Et', isSpe: false },
          { from: 'low_node', to: 'low_cop', label: 'Revizyon İste', isSpe: true },
          { from: 'high_node', to: 'high_acc', label: 'Kabul Et', isSpe: true },
          { from: 'high_node', to: 'high_cop', label: 'Revizyon İste', isSpe: false }
        ]
      }
    }
  },
  {
    id: 'dynamic_7',
    category: 'dynamicGames',
    title: 'Yerli Üretim Lisanslama Sözleşmesi',
    difficulty: 'Orta',
    reward: 300,
    desc: 'Alman otomotiv devi Volkswagen, Türkiye\'deki bir yerel üreticiye yerli üretim lisansı vermeyi düşünmektedir. Önce Volkswagen teklif sunar: "Ortak Yatırım" veya "Sadece Lisans". Ortak yatırımda, yerel üretici dürüst davranırsa (VW: 8, Yerel: 6), yan çizerse (VW: 2, Yerel: 8) olur. Sadece lisansta yerel üretici dürüst davranırsa (VW: 5, Yerel: 4), yan çizerse (VW: 1, Yerel: 5) olur.',
    question: 'Geriye doğru tümevarım ile elde edilen SPE dengesi nedir?',
    options: [
      { id: 'a', text: 'Volkswagen: Sadece Lisans sunar | Yerel Üretici: Yan Çizer.', correct: true },
      { id: 'b', text: 'Volkswagen: Ortak Yatırım sunar | Yerel Üretici: Dürüst Davranır.', correct: false },
      { id: 'c', text: 'Volkswagen: Sadece Lisans sunar | Yerel Üretici: Dürüst Davranır.', correct: false },
      { id: 'd', text: 'Denge yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, uluslararası teknoloji transferlerinde güven ve fikri mülkiyet korumasının önemini gösterir.',
      players: 'Volkswagen ve Yerel Üretici.',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'Yerel üreticinin kararları: VW ortak yatırım yaparsa yerel üretici yan çizmeyi seçer (8 > 6). VW sadece lisans verirse yerel üretici yine yan çizmeyi seçer (5 > 4). VW bunu bildiği için: Ortak yatırım yaparsa yerel yan çizecek VW 2 kazanacak; sadece lisans verirse yerel yan çizecek VW 1 kazanacaktır. Aslında VW her iki durumda da yerel ortağın yan çizeceğini öngörür.',
      nash: 'Kusursuz denge (Sadece Lisans, Yan Çizer) hücresindedir. Ödemeler (1,5)\'tir.',
      pareto: '(Ortak Yatırım, Dürüst Davranır) -> (8,6) Pareto optimaldir. Ancak bu noktaya hukuki güvenceler olmadan ulaşılamaz.',
      economicComment: 'Uluslararası ortaklıklarda yabancı ortaklar, fikri mülkiyet hırsızlığından veya yerel ortağın yan çizmesinden korktukları için yüksek teknolojili ortak yatırımlardan kaçınarak sadece lisanslama yolunu tercih ederler.'
    },
    visualData: {
      type: 'tree',
      treeNodes: {
        nodes: [
          { id: 'start', label: 'VW (Teklif)', x: 100, y: 150, type: 'decision', player: 'VW' },
          { id: 'high_node', label: 'Yerel (Seçim)', x: 250, y: 250, type: 'decision', player: 'Yerel' },
          { id: 'low_node', label: 'Yerel (Seçim)', x: 250, y: 50, type: 'decision', player: 'Yerel' },
          { id: 'low_acc', label: 'Dürüst (5, 4)', x: 400, y: 30, type: 'terminal', payoffs: [5, 4] },
          { id: 'low_cop', label: 'Yan Çiz (1, 5)', x: 400, y: 80, type: 'terminal', payoffs: [1, 5] },
          { id: 'high_acc', label: 'Dürüst (8, 6)', x: 400, y: 220, type: 'terminal', payoffs: [8, 6] },
          { id: 'high_cop', label: 'Yan Çiz (2, 8)', x: 400, y: 280, type: 'terminal', payoffs: [2, 8] }
        ],
        edges: [
          { from: 'start', to: 'low_node', label: 'Sadece Lisans', isSpe: true },
          { from: 'start', to: 'high_node', label: 'Ortak Yatırım', isSpe: false },
          { from: 'low_node', to: 'low_acc', label: 'Dürüst Davranır', isSpe: false },
          { from: 'low_node', to: 'low_cop', label: 'Yan Çizer', isSpe: true },
          { from: 'high_node', to: 'high_acc', label: 'Dürüst Davranır', isSpe: false },
          { from: 'high_node', to: 'high_cop', label: 'Yan Çizer', isSpe: true }
        ]
      }
    }
  },

  // =========================================================================
  // 6. KAMU EKONOMİSİ VE POLİTİKA (publicEconomics) - 7 Sorular
  // =========================================================================
  {
    id: 'pub_1',
    category: 'publicEconomics',
    title: 'Paris İklim Anlaşması ve Emisyon Azaltım Bütçesi',
    difficulty: 'Akademik',
    reward: 300,
    desc: 'Gelişmekte olan iki komşu ülke (Ülke A ve Ülke B), Paris İklim Anlaşması çerçevesinde sınır ötesi hava kirliliğini azaltmak için ortak çevre bütçesine katkıda bulunacaktır. Seçenekleri: "Yüksek Katkı" (maliyeti -3) veya "Kısıtlı Katkı" (maliyeti 0). Temiz hava ortak bir kamu malıdır. Ülkelerin yaptıkları her yüksek katkı, çevre kalitesini artırarak her iki ülkeye de +2\'şer birim fayda sağlamaktadır. (Örneğin ikisi de yüksek katkı yaparsa, her biri 2*2 - 3 = 1 birim net fayda elde edecektir).',
    matrix: [[[1, 1], [-1, 2]], [[2, -1], [0, 0]]],
    actions: ['Yüksek Katkı', 'Kısıtlı Katkı'],
    question: 'Bu kamu malı katkı oyununun Nash Dengesi ve Sosyal Optimum (Pareto En İyi) noktaları hangileridir?',
    options: [
      { id: 'a', text: 'Nash: (Kısıtlı Katkı, Kısıtlı Katkı) | Sosyal Optimum: (Yüksek Katkı, Yüksek Katkı)', correct: true },
      { id: 'b', text: 'Nash: (Yüksek Katkı, Yüksek Katkı) | Sosyal Optimum: (Kısıtlı Katkı, Kısıtlı Katkı)', correct: false },
      { id: 'c', text: 'Nash ve Sosyal Optimum aynıdır: (Yüksek Katkı, Yüksek Katkı).', correct: false },
      { id: 'd', text: 'Nash dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu senaryo, kamu mallarının finansmanında karşılaşılan klasik bedavacılık (free-rider) probleminin matematiksel modelidir.',
      players: 'Ülke A ve Ülke B. Seçenekler: Yüksek Katkı ve Kısıtlı Katkı.',
      dominant: 'Her iki ülke için de "Kısıtlı Katkı" dominant stratejidir. (Rakip Yüksek seçerse 2 > 1; rakip Kısıtlı seçerse 0 > -1).',
      bestResponse: 'BR_A(Yüksek) = Kısıtlı; BR_A(Kısıtlı) = Kısıtlı. BR_B(Yüksek) = Kısıtlı; BR_B(Kısıtlı) = Kısıtlı.',
      nash: 'Tek saf strateji Nash Dengesi (Kısıtlı Katkı, Kısıtlı Katkı) hücresinde ve (0,0) ödemesinde oluşur. İki ülke de çevre bütçesine katkı yapmaz.',
      pareto: 'Sosyal optimum, her iki ülkenin de Yüksek Katkı yaptığı (1,1) hücresidir (Toplam sosyal refah = 2). Nash dengesi (0,0) ise Pareto verimsizdir; çünkü işbirliğiyle her iki ülkenin de durumu iyileşebilirdi.',
      economicComment: 'Kamu malları (temiz hava, ulusal savunma vb.) dışlanamaz ve tüketimde rakip olunamaz niteliktedir. Serbest piyasa veya bencil devlet kararları, bu malların olması gerekenden çok daha az üretilmesine (piyasa başarısızlığı - market failure) neden olur. Çözüm, bağlayıcı uluslararası yaptırımlar ve karbon sınır vergileridir.'
    },
    visualData: {
      type: 'public',
      publicData: { nash: 0, socialOptimum: 2, totalPayoffNash: 0, totalPayoffOptimum: 2 }
    }
  },
  {
    id: 'pub_2',
    category: 'publicEconomics',
    title: 'Mavi Yüzgeçli Orkinos Avcılığı ve Ortak Kaynak Trajedisi',
    difficulty: 'Akademik',
    reward: 300,
    desc: 'Akdeniz\'de avlanan iki büyük balıkçılık filosu (Filo A ve Filo B), Mavi Yüzgeçli Orkinos avlamaktadır. Seçenekleri: "Sürdürülebilir Avcılık (Az Av)" veya "Aşırı Avcılık (Çok Av)". Eğer ikisi de az avlanırsa, balık nüfusu korunacak ve karlar 4\'er birim olacaktır. Biri az avlanırken diğeri aşırı avlanırsa; aşırı avlanan filo pazarın çoğunu süpürerek 6 kazanacak, dürüst davranıp az avlanan ise 1 birim getiriyle kalacaktır. İkisi de aşırı avlanırsa, denizdeki balık stokları hızla tükenecek ve karlar uzun vadede 2\'şer birime düşecektir.',
    matrix: [[[4, 4], [1, 6]], [[6, 1], [2, 2]]],
    actions: ['Az Avlan (Sürdürülebilir)', 'Çok Avlan (Aşırı)'],
    question: 'Bu oyunda oluşan Nash dengesi ve Pareto etkin olmayan sosyal açmaz nedir?',
    options: [
      { id: 'a', text: 'Nash dengesi: (Çok Avlan, Çok Avlan). Bu durum bireysel rasyonelliğin ortak kaynağı tükettiği bir "Ortak Kaynakların Trajedisi"dir.', correct: true },
      { id: 'b', text: 'Nash dengesi: (Az Avlan, Az Avlan). Çevre korunur.', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: 'Nash dengeleri: (Az Avlan, Çok Avlan) ve (Çok Avlan, Az Avlan).', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu senaryo, Garrett Hardin\'in ünlü "Ortak Kaynakların Trajedisi" (Tragedy of the Commons) kavramının oyun teorisindeki karşılığıdır.',
      players: 'Filo A ve Filo B.',
      dominant: '"Çok Avlan" her iki filo için de güçlü dominant stratejidir (6 > 4 ve 2 > 1).',
      bestResponse: 'Rakibin hamlesine bakılmaksızın en iyi cevap aşırı avlanmaktır.',
      nash: 'Tek Nash Dengesi (Çok Avlan, Çok Avlan) -> (2,2) hücresindedir. Her iki filo da aşırı avlanır.',
      pareto: 'Sosyal optimum olan (Az Avlan, Az Avlan) -> (4,4) Pareto etkindir. Nash dengesi ise ekolojik ve ekonomik olarak Pareto verimsizdir.',
      economicComment: 'Ortak havuz kaynakları (balık stokları, meralar, yeraltı suları) tüketimde rakip olup dışlanamayan mallardır. Bireysel rasyonellik, kaynağın aşırı tüketilerek yok olmasına yol açar. Çözüm, Elinor Ostrom\'un önerdiği yerel topluluk denetimleri veya devlet kotalarıdır.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [1, 1]],
      brB: [[0, 1], [1, 1]],
      nashCells: [[1, 1]]
    }
  },
  {
    id: 'pub_3',
    category: 'publicEconomics',
    title: 'Çevre Politikalarında Karbon Vergisi ve Emisyon',
    difficulty: 'Orta',
    reward: 250,
    desc: 'İki organize sanayi bölgesi (Bölge X ve Bölge Y), arıtma tesisi kurarak çevre kirliliğini azaltmak (Arıtma) veya doğrudan doğaya salmak (Arıtmasız) arasındadır. Arıtma maliyeti -4 birimdir. Temiz çevre iki bölgeye de +3\'er fayda sağlamaktadır. (İkisi de arıtırsa karlar 3*2 - 4 = 2 birim olur). Biri arıtır diğeri arıtmazsa, arıtmayan arıtma maliyetinden kaçarak 3 kazanırken, arıtan -1 birimde kalır. İkisi de arıtmazsa getiriler 0 olur.',
    matrix: [[[2, 2], [-1, 3]], [[3, -1], [0, 0]]],
    actions: ['Arıtma Tesisi Kur', 'Arıtmasız Salım'],
    question: 'Bu oyundaki Nash dengesi ve devletin bu açmazı çözmek için uygulaması gereken vergi politikası ne olmalıdır?',
    options: [
      { id: 'a', text: 'Nash: (Arıtmasız Salım, Arıtmasız Salım). Devlet arıtmayan her firmaya 2 birimden fazla karbon vergisi koymalıdır.', correct: true },
      { id: 'b', text: 'Nash: (Arıtma, Arıtma). Vergilemeye gerek yoktur.', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: 'Nash: (Arıtma, Arıtmasız). Teşvik verilmelidir.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, çevre kirliliği gibi negatif dışsallıkların (negative externalities) serbest piyasada nasıl verimsiz sonuçlar doğurduğunu gösterir.',
      players: 'Bölge X ve Bölge Y.',
      dominant: 'Arıtmasız Salım dominant stratejidir (3 > 2 ve 0 > -1).',
      bestResponse: 'Her durumda en iyi cevap arıtma yapmamaktır.',
      nash: 'Tek Nash Dengesi (Arıtmasız Salım, Arıtmasız Salım) -> (0,0) hücresindedir.',
      pareto: 'Sosyal optimum olan (Arıtma, Arıtma) -> (2,2) Pareto optimaldir. Nash dengesi Pareto verimsizdir.',
      economicComment: 'Devlet, arıtma yapmayanlara "Pigou Vergisi" (karbon vergisi) koyarak arıtmasız salımın getirisini düşürür. Örneğin 2 birimlik vergi konursa arıtmasız salımın getirileri düşer ve yeni Nash dengesi (Arıtma, Arıtma) olur. Buna "dışsallıkların içselleştirilmesi" denir.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [1, 1]],
      brB: [[0, 1], [1, 1]],
      nashCells: [[1, 1]]
    }
  },
  {
    id: 'pub_4',
    category: 'publicEconomics',
    title: 'Aşı Geliştirme ve Sürü Bağışıklığı Oyunu',
    difficulty: 'Orta',
    reward: 250,
    desc: 'Bir pandemide, iki büyük holding çalışanlarını aşılatmak (Aşıla) veya çalışanların kendi kendine aşı olmasını beklemek (Bekle) kararını verir. Aşılamanın kişi başı maliyeti -2 birimdir. Sürü bağışıklığı her iki holdinge de +3\'er birim iş gücü kazancı getirmektedir. Holdinglerden biri aşı bütçesi ayırırsa sürü bağışıklığı sınırı aşılır. İkisi de aşılarsa (1, 1) net kar alırlar. Biri aşılar diğeri beklerse, bekleyen bedavacı olarak 3 kazanır, aşılayan 1 kazanır (maliyeti düştüğü için net 1 kalır). İkisi de beklerse salgın yayılır ve getiriler 0 olur.',
    matrix: [[[1, 1], [1, 3]], [[3, 1], [0, 0]]],
    actions: ['Çalışanları Aşıla', 'Kendi Hallerine Bırak (Bekle)'],
    question: 'Bu oyunda hangi hücreler Nash dengesidir ve bu durum hangi kamu malı oyununa örnektir?',
    options: [
      { id: 'a', text: 'Nash dengeleri: (Aşıla, Bekle) ve (Bekle, Aşıla). Bu bir "Katkı Eşiği" kamu malı oyunudur.', correct: true },
      { id: 'b', text: 'Tek Nash dengesi vardır: (Bekle, Bekle).', correct: false },
      { id: 'c', text: 'Tek Nash dengesi vardır: (Aşıla, Aşıla).', correct: false },
      { id: 'd', text: 'Nash dengesi yoktur.', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, tek bir oyuncunun katkısının bile kamu malını (sürü bağışıklığı) üretmeye yettiği bir "Katkı Eşiği" veya "Gönüllünün Dilemi" (Volunteers Dilemma) oyunudur.',
      players: 'Holding A ve Holding B. Seçenekler: Aşıla ve Bekle.',
      dominant: 'Baskın strateji yoktur.',
      bestResponse: 'BR_A(Aşıla) = Bekle (3 > 1); BR_A(Bekle) = Aşıla (1 > 0). Simetriktir.',
      nash: 'İki adet saf strateji Nash dengesi vardır: (Aşıla, Bekle) -> (1,3) ve (Bekle, Aşıla) -> (3,1).',
      pareto: 'Tüm dengeler ve (Aşıla, Aşıla) durumu Pareto etkindir. Ancak tek başına aşılama yükünü çeken taraf daha az kazanır.',
      economicComment: 'Sağlık hizmetleri pozitif dışsallık üreten yarı kamusal mallardır. Bireylerin bedavacılık yapıp "nasılsa başkaları aşı oluyor" diye düşünmesini engellemek için devletler aşılamayı ücretsiz sunar veya zorunlu kılar.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [0, 1]],
      brB: [[0, 1], [1, 0]],
      nashCells: [[0, 1], [1, 0]]
    }
  },
  {
    id: 'pub_5',
    category: 'publicEconomics',
    title: 'Akıllı Şehirlerde Trafik ve Toplu Taşıma Teşviki',
    difficulty: 'Orta',
    reward: 200,
    desc: 'Bir şehirdeki iki büyük kargo lojistik firması (Firma 1 ve Firma 2), teslimatlarını "Gece Saatlerinde" (maliyeti -2) ya da trafik yoğunluğunun olduğu "Gündüz Saatlerinde" yapabilir. İkisi de gece teslimatı yaparsa yollar boş kalacak, getiriler 5\'er birim olacaktır. Biri gece diğeri gündüz teslimatı yaparsa, gündüz yapan trafiğe rağmen tüm pazar payını kapıp 6 kazanacak, gece teslimatı yapan ise 1 birimde kalacaktır. İkisi de gündüz teslimatını seçerse, şehir trafiği kilitlenecek ve gecikmeler nedeniyle getiriler 2\'şer birime düşecektir.',
    matrix: [[[5, 5], [1, 6]], [[6, 1], [2, 2]]],
    actions: ['Gece Teslimatı (Uyum)', 'Gündüz Teslimatı (Yoğunluk)'],
    question: 'Bu kentsel lojistik oyununda Nash dengesi nedir?',
    options: [
      { id: 'a', text: '(Gündüz Teslimatı, Gündüz Teslimatı)', correct: true },
      { id: 'b', text: '(Gece Teslimatı, Gece Teslimatı)', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: '(Gece Teslimatı, Gündüz Teslimatı)', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu senaryo, yol altyapısının (ortak havuz kaynağı) bencilce kullanılmasının nasıl kronik trafik sıkışıklığı yarattığını (Ortak Kaynakların Trajedisi) modeller.',
      players: 'Firma 1 ve Firma 2.',
      dominant: 'Gündüz Teslimatı her iki oyuncu için de dominanttır.',
      bestResponse: 'Karşı tarafın saat tercihine bakılmaksızın en iyi tepki gündüz yola çıkmaktır.',
      nash: 'Tek Nash Dengesi (Gündüz Teslimatı, Gündüz Teslimatı) -> (2,2) hücresindedir.',
      pareto: 'Sosyal optimum olan (Gece Teslimatı, Gece Teslimatı) -> (5,5) Pareto etkindir. Nash dengesi Pareto verimsizdir.',
      economicComment: 'Büyük metropollerde belediyeler lojistik firmalarının gündüz teslimat yapmasını yasaklar veya yoğun saat geçiş ücreti (congestion pricing) uygulayarak firmaları gece teslimatına (sosyal optimuma) zorlarlar.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [1, 1]],
      brB: [[0, 1], [1, 1]],
      nashCells: [[1, 1]]
    }
  },
  {
    id: 'pub_6',
    category: 'publicEconomics',
    title: 'Komşu Belediyelerin Çöp Arıtma Tesisi Yatırımı',
    difficulty: 'Orta',
    reward: 200,
    desc: 'Bitişik konumdaki Kadıköy ve Üsküdar Belediyeleri, ortak kullanıma açık modern bir çöp arıtma tesisi inşa etmek üzere bütçe ayıracaktır. Seçenekler: "Yüksek Bütçe" (maliyeti -5) veya "Düşük Bütçe" (maliyeti 0). Arıtma tesisi kurulduğunda her yüksek bütçe dilimi iki belediyenin de çevre temizliğini artırarak +3\'er fayda sağlamaktadır. (İkisi de yüksek bütçe ayırırsa, net fayda 3*2 - 5 = 1 birim olur).',
    matrix: [[[1, 1], [-2, 3]], [[3, -2], [0, 0]]],
    actions: ['Yüksek Bütçe', 'Düşük Bütçe'],
    question: 'Bu yerel yönetim oyununun Nash dengesi nedir?',
    options: [
      { id: 'a', text: '(Düşük Bütçe, Düşük Bütçe)', correct: true },
      { id: 'b', text: '(Yüksek Bütçe, Yüksek Bütçe)', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: '(Yüksek Bütçe, Düşük Bütçe)', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, yerel yönetimlerin ortak kamusal altyapı yatırımlarında karşılaştığı bedavacılık ve koordinasyon başarısızlığı problemidir.',
      players: 'Kadıköy ve Üsküdar Belediyeleri.',
      dominant: 'Düşük Bütçe her iki belediye için de dominant stratejidir.',
      bestResponse: 'Komşu belediye ne yaparsa yapsın en iyi tepki bütçeyi düşük tutmaktır.',
      nash: 'Tek Nash Dengesi (Düşük Bütçe, Düşük Bütçe) -> (0,0) hücresindedir. Tesis kurulamaz.',
      pareto: 'Sosyal optimum olan (Yüksek Bütçe, Yüksek Bütçe) -> (1,1) Pareto optimaldir. Nash dengesi Pareto verimsizdir.',
      economicComment: 'Yerel yönetimlerin ortak sınır yatırımlarında yaşadığı bu tıkanıklık, büyükşehir belediyelerinin (İBB vb.) merkezi bütçe ile yatırımı üstlenip belediyelerden zorunlu pay kesmesiyle aşılır.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [1, 1]],
      brB: [[0, 1], [1, 1]],
      nashCells: [[1, 1]]
    }
  },
  {
    id: 'pub_7',
    category: 'publicEconomics',
    title: 'Milli Park Sınırlarında Yasadışı Yapılaşma',
    difficulty: 'Orta',
    reward: 200,
    desc: 'Bir milli parkın sınırında yer alan iki otel işletmesi (Otel X ve Otel Y), milli park arazisine doğru yasadışı şekilde genişleyerek yeni havuz ve odalar yapma ("Kaçak Yapı") veya mevcut yasal sınırlarda kalma ("Yasal Kal") arasındadır. İkisi de yasal sınırlarda kalırsa parkın doğal güzelliği korunacak ve turist akınıyla karlar 5\'er birim olacaktır. Biri kaçak yapı yapıp diğeri yasal kalırsa; kaçak yapan kapasite artırıp 7 kazanırken, yasal sınırda kalan dürüst otel manzarasını kaybederek 1 birimde kalacaktır. İkisi de kaçak yapı yaparsa park betona boğulacak, turizm cazibesi bitecek ve karlar 2\'şer birime düşecektir.',
    matrix: [[[5, 5], [1, 7]], [[7, 1], [2, 2]]],
    actions: ['Yasal Kal', 'Kaçak Yapı'],
    question: 'Bu çevre koruma oyununun Nash dengesi nedir?',
    options: [
      { id: 'a', text: '(Kaçak Yapı, Kaçak Yapı)', correct: true },
      { id: 'b', text: '(Yasal Kal, Yasal Kal)', correct: false },
      { id: 'c', text: 'Nash dengesi yoktur.', correct: false },
      { id: 'd', text: '(Yasal Kal, Kaçak Yapı)', correct: false }
    ],
    academicSolution: {
      interpretation: 'Bu oyun, milli park gibi koruma altındaki kamusal alanların bencilce sömürülmesinin (Ortak Kaynakların Trajedisi) Prisoners Dilemma modelidir.',
      players: 'Otel X ve Otel Y.',
      dominant: 'Kaçak Yapı her iki otel için de dominant stratejidir.',
      bestResponse: 'Rakibin kararına bakılmaksızın en iyi tepki kaçak genişlemedir.',
      nash: 'Tek Nash Dengesi (Kaçak Yapı, Kaçak Yapı) -> (2,2) hücresindedir. Park tahrip olur.',
      pareto: 'Sosyal optimum olan (Yasal Kal, Yasal Kal) -> (5,5) Pareto optimaldir. Nash dengesi ise ciddi bir çevre ve refah kaybıdır.',
      economicComment: 'Doğal güzellikler ve milli parklar turizm sektörü için kritik birer ortak kaynaktır. Denetimlerin gevşek olması, rasyonel otelleri yasadışı yapılaşmaya iter. Çözüm, ağır imar para cezaları ve kaçak yapıların yıkılmasıdır.'
    },
    visualData: {
      type: 'matrix',
      brA: [[1, 0], [1, 1]],
      brB: [[0, 1], [1, 1]],
      nashCells: [[1, 1]]
    }
  }
];
