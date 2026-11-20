export type Lang = 'ro' | 'ru';

export interface BlogArticle {
  slug: string;
  categoryRo: string;
  categoryRu: string;
  readTimeRo: string;
  readTimeRu: string;
  datePublished: string;
  titleRo: string;
  titleRu: string;
  excerptRo: string;
  excerptRu: string;
  metaDescRo: string;
  metaDescRu: string;
  sectionsRo: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  sectionsRu: { heading: string; paragraphs: string[]; bullets?: string[] }[];
}

export interface LoadRadiusRow {
  radiusM: string;
  maxLoadT: string;
  boomModeRo: string;
  boomModeRu: string;
  typicalUseRo: string;
  typicalUseRu: string;
}

export const LOAD_RADIUS_TABLE: LoadRadiusRow[] = [
  {
    radiusM: '3.0 m',
    maxLoadT: '25.0 t',
    boomModeRo: 'Braț de bază (~10.5 m)',
    boomModeRu: 'Базовая стрела (~10.5 м)',
    typicalUseRo: 'Sarcină maximă la cârlig (utilaje grele lângă șasiu)',
    typicalUseRu: 'Максимальная нагрузка на крюке вблизи шасси'
  },
  {
    radiusM: '5.0 m',
    maxLoadT: '~15.0 t',
    boomModeRo: 'Braț scurt / mediu',
    boomModeRu: 'Короткая / средняя стрела',
    typicalUseRo: 'Grinzi prefabricate din beton, transformatoare, generatoare',
    typicalUseRu: 'ЖБИ балки, трансформаторы, тяжелые генераторы'
  },
  {
    radiusM: '8.0 m',
    maxLoadT: '~9.0 t',
    boomModeRo: 'Braț telescopic mediu',
    boomModeRu: 'Средний вылет стрелы',
    typicalUseRo: 'Containere maritime 20ft/40ft, module de birou, utilaje industriale',
    typicalUseRu: 'Морские контейнеры 20/40 фт, бытовки, станки'
  },
  {
    radiusM: '12.0 m',
    maxLoadT: '~5.5 t',
    boomModeRo: 'Braț extins',
    boomModeRu: 'Удлиненная стрела',
    typicalUseRo: 'Montaj structuri metalice, stâlpi, ferme de hală',
    typicalUseRu: 'Монтаж металлоконструкций, колонн и ферм'
  },
  {
    radiusM: '16.0 m',
    maxLoadT: '~3.5 t',
    boomModeRo: 'Braț extins (~28–32 m)',
    boomModeRu: 'Выдвинутая стрела (~28–32 м)',
    typicalUseRo: 'Paleți cu cărămidă/BCA, pachete armătură, cofraje la etaj',
    typicalUseRu: 'Поддоны с кирпичом/газоблоком, арматура, опалубка'
  },
  {
    radiusM: '20.0 m',
    maxLoadT: '~2.2 t',
    boomModeRo: 'Braț principal lung (~35–40 m)',
    boomModeRu: 'Длинная основная стрела (~35–40 м)',
    typicalUseRo: 'Chillere HVAC, panouri sandwich, sticlă fațadă la înălțime',
    typicalUseRu: 'Чиллеры HVAC, сэндвич-панели, фасадное остекление'
  },
  {
    radiusM: '26.0 – 32.0 m',
    maxLoadT: '~0.6 – 1.1 t',
    boomModeRo: 'Braț 40 m + extensie Jib (până la 48 m)',
    boomModeRu: 'Стрела 40 м + гусек Jib (до 48 м)',
    typicalUseRo: 'Montaj la mare înălțime / peste obstacole cu sarcină ușoară',
    typicalUseRu: 'Подача на большую высоту / через препятствия'
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'calare-automacara-25-tone',
    categoryRo: 'Ghid tehnic',
    categoryRu: 'Технический гид',
    readTimeRo: '4 min lectură',
    readTimeRu: '4 мин чтения',
    datePublished: '2026-11-15',
    titleRo: 'Cum pregătești terenul pentru calarea unei automacarale de 25 Tone (spațiu 6m și siguranță)',
    titleRu: 'Как подготовить площадку для установки автокрана 25 тонн (габарит опор 6 м и безопасность)',
    excerptRo: 'Ce trebuie să verifice șeful de șantier înainte de sosirea utilajului XCMG 25T: lățimea de calare H-Type, rezistența solului și distanța față de rețelele electrice.',
    excerptRu: 'Что необходимо проверить прорабу до прибытия автокрана XCMG 25Т: ширину выдвижения опор H-Type, плотность грунта и расстояние до ЛЭП.',
    metaDescRo: 'Ghid practic pentru pregătirea șantierului în Chișinău înainte de sosirea automacaralei XCMG 25 tone: dimensiuni calare 6m, portanță teren și norme INST.',
    metaDescRu: 'Практическое руководство по подготовке объекта в Кишиневе для работы автокрана XCMG 25 тонн: размеры опор 6м, требования к грунту и безопасность INST.',
    sectionsRo: [
      {
        heading: '1. De ce calarea corectă determină 100% capacitatea de ridicare',
        paragraphs: [
          'O automacara de 25 de tone cu masa proprie de 25.000 kg (precum XCMG QY25K5) își transferă întreaga greutate proprie plus greutatea sarcinii ridicate pe cele 4 picioare hidraulice de calare (sistem H-Type).',
          'Diagrama oficială de sarcină este valabilă exclusiv atunci când utilajul este calat pe teren ferm, orizontal și cu grinzile stabilizatoare extinse complet la lățimea de aproximativ 6,0 metri (și ~5,14 metri longitudinal).'
        ]
      },
      {
        heading: '2. Lista de verificare în 4 puncte înainte de sosirea pe șantier',
        paragraphs: [
          'Pentru ca intervenția în Chișinău să înceapă în primele 15 minute de la sosire, recomandăm verificarea următoarelor detalii:'
        ],
        bullets: [
          'Cale de acces și poartă: lățime liberă de minimum 3,0–3,2 metri și înălțime fără cabluri joase de minimum 3,8 metri.',
          'Zonă de calare (6,0 m × 6,5 m): platou drept, betonat, asfaltat sau pământ bine compactat, fără cămine de vizitare, fose septice ori șanțuri proaspăt acoperite.',
          'Distanța față de săpături și taluzuri: picioarele de calare trebuie poziționate la o distanță sigură față de marginea fundațiilor deschise pentru a preveni surparea malului.',
          'Linii electrice aeriene: verificați absența firelor de tensiune deasupra zonei de rotație a brațului telescopic (40–48 m).'
        ]
      },
      {
        heading: '3. Cum scurtăm timpul de verificare la 1 minut',
        paragraphs: [
          'Cel mai simplu mod de a evita blocajele pe șantier este să trimiteți o fotografie a locului de parcare și a obiectului de ridicat pe WhatsApp sau Viber la 069 547 396 înainte de plecarea automacaralei.',
          'Operatorul nostru autorizat INST evaluează imediat unghiul de calare și vă confirmă raza optimă de lucru.'
        ]
      }
    ],
    sectionsRu: [
      {
        heading: '1. Почему правильная установка опор определяет грузоподъемность',
        paragraphs: [
          'Автокран грузоподъемностью 25 тонн с собственной массой 25 000 кг передает весь вес шасси и поднимаемого груза на 4 гидравлические опоры системы H-Type.',
          'Паспортная диаграмма грузоподъемности действует только при установке крана на твердом горизонтальном основании с полностью выдвинутыми опорами (ширина опорного контура около 6,0 м, длина ~5,14 м).'
        ]
      },
      {
        heading: '2. Чек-лист из 4 пунктов перед подачей автокрана на объект',
        paragraphs: [
          'Чтобы работа в Кишиневе началась сразу после прибытия техники, проверьте следующие параметры:'
        ],
        bullets: [
          'Подъездные пути и ворота: свободная ширина проезда не менее 3,0–3,2 м и высота без низко висящих кабелей от 3,8 м.',
          'Площадка под опоры (6,0 м × 6,5 м): ровный бетон, асфальт или плотно укатанный грунт без колодцев, пустот и свежих траншей.',
          'Отступ от котлованов: опоры должны располагаться на безопасном расстоянии от края фундамента или откоса.',
          'Линии электропередач (ЛЭП): отсутствие проводов в радиусе подъема и поворота стрелы (40–48 м).'
        ]
      },
      {
        heading: '3. Быстрая оценка площадки по фото за 1 минуту',
        paragraphs: [
          'Отправьте фото площадки и груза в WhatsApp или Viber на номер 069 547 396 до выезда техники.',
          'Аттестованный оператор INST сразу подскажет оптимальную точку постановки крана.'
        ]
      }
    ]
  },
  {
    slug: 'calcul-greutate-raza-brat-48m',
    categoryRo: 'Diagramă & Raza de lucru',
    categoryRu: 'Диаграмма и вылет стрелы',
    readTimeRo: '5 min lectură',
    readTimeRu: '5 мин чтения',
    datePublished: '2026-11-12',
    titleRo: 'Cum se calculează corect greutatea și raza de ridicare la brațul telescopic 40–48 m',
    titleRu: 'Как правильно рассчитать вес груза и рабочий вылет телескопической стрелы 40–48 м',
    excerptRo: 'De ce distanța orizontală dintre axul macaralei și punctul de montaj determină sarcina utilă și rolul senzorilor computerizați Hirschmann LMI.',
    excerptRu: 'Почему горизонтальное расстояние от оси поворота крана до центра груза определяет допустимый вес и как работает система Hirschmann LMI.',
    metaDescRo: 'Înțelege diagrama de sarcină a unei automacarale XCMG 25 tone cu braț 40-48m: diferența dintre înălțime și raza de lucru, scăderea muflului și protecția LMI.',
    metaDescRu: 'Разбор диаграммы грузоподъемности автокрана XCMG 25 тонн со стрелой 40-48м: разница между высотой подъема и вылетом стрелы, контроль безопасности Hirschmann LMI.',
    sectionsRo: [
      {
        heading: '1. Eroarea frecventă pe șantier: confundarea înălțimii cu raza de lucru',
        paragraphs: [
          'Atunci când un inginer sau constructor comandă o automacara de 25 de tone, parametrul critic nu este doar înălțimea clădirii, ci RAZA DE LUCRU — adică distanța orizontală măsurată pe pământ de la axul de rotație al macaralei până la centrul de greutate al piesei în punctul cel mai îndepărtat.',
          'Capacitatea nominală de 25 tone se obține la o rază strânsă de 3,0 metri lângă șasiu. Pe măsură ce brațul se extinde și se înclină peste clădire sau obstacole, momentul de răsturnare crește, iar sarcina maximă admisă scade progresiv.'
        ]
      },
      {
        heading: '2. Repere reale din diagrama XCMG 25T (cale complet extinse)',
        paragraphs: [
          'Înainte de a planifica poziția camionului care aduce materialele și poziția automacaralei, folosiți următoarele repere orientative:'
        ],
        bullets: [
          'Rază 3,0 m (lângă macara): până la 25,0 tone.',
          'Rază 5,0 m: aproximativ 15,0 tone (ideal pentru grinzi grele și transformatoare poziționate aproape).',
          'Rază 8,0 m: aproximativ 9,0 tone (acoperă majoritatea containerelor maritime și modulelor prefabricate).',
          'Rază 12,0 m: aproximativ 5,5 tone (montaj ferme metalice, stâlpi și planșee).',
          'Rază 16,0 – 20,0 m: aproximativ 3,5 t până la 2,2 t (paleți cu zidărie, armătură, echipamente HVAC pe acoperiș).',
          'Rază 26,0 – 32,0 m (braț 40 m + extensie Jib 48 m): ~0,6 – 1,1 tone pentru ridicări la mare înălțime sau peste clădiri.'
        ]
      },
      {
        heading: '3. Rolul sistemului computerizat Hirschmann LMI și scăderea dispozitivelor de prindere',
        paragraphs: [
          'Din valoarea indicată în diagramă se scade întotdeauna masa cârligului (muflului principal de ~250–550 kg) și a chingilor sau traverselor de ridicare. În plus, viteza vântului la înălțime nu trebuie să depășească 14 m/s.',
          'Automacaraua noastră XCMG 25T este echipată cu computer de sarcină Hirschmann LMI care măsoară în timp real presiunea hidraulică, lungimea brațului, unghiul și raza, blocând automat manevrele care ar depăși pragul de siguranță.'
        ]
      }
    ],
    sectionsRu: [
      {
        heading: '1. Главная ошибка при заказе: путаница между высотой подъема и вылетом стрелы',
        paragraphs: [
          'При планировании подъема ключевым параметром является РАБОЧИЙ ВЫЛЕТ — горизонтальное расстояние по земле от оси вращения поворотной платформы автокрана до вертикальной линии центра тяжести груза в точке установки.',
          'Максимальные 25 тонн достигаются на минимальном вылете 3,0 м. По мере увеличения вылета возрастает опрокидывающий момент, поэтому допустимая масса груза закономерно снижается.'
        ]
      },
      {
        heading: '2. Ориентировочные значения по диаграмме XCMG 25Т (опоры 6 м)',
        paragraphs: [
          'Для предварительной расстановки техники на площадке ориентируйтесь на следующие показатели:'
        ],
        bullets: [
          'Вылет 3,0 м: до 25,0 тонн.',
          'Вылет 5,0 м: около 15,0 тонн (тяжелые ЖБИ, трансформаторы вблизи крана).',
          'Вылет 8,0 м: около 9,0 тонн (морские контейнеры, бытовки, промышленное оборудование).',
          'Вылет 12,0 м: около 5,5 тонн (монтаж металлоконструкций и перекрытий).',
          'Вылет 16,0 – 20,0 м: от ~3,5 т до ~2,2 т (паллеты со стройматериалами, арматура, чиллеры HVAC).',
          'Вылет 26,0 – 32,0 м (стрела 40 м + гусек до 48 м): ~0,6 – 1,1 т для высотного монтажа.'
        ]
      },
      {
        heading: '3. Компьютерный контроль Hirschmann LMI и учет массы крюковой подвески',
        paragraphs: [
          'Из табличной грузоподъемности всегда вычитается собственный вес крюковой обоймы (~250–550 кг) и строп/траверс. Работа на длинной стреле выполняется при скорости ветра до 14 м/с.',
          'Бортовой компьютер Hirschmann LMI непрерывно контролирует вылет, угол наклона и нагрузку, гарантируя безаварийную работу на объекте.'
        ]
      }
    ]
  },
  {
    slug: 'descarcare-containere-structuri-metalice-chisinau',
    categoryRo: 'Logistică & B2B',
    categoryRu: 'Логистика и B2B',
    readTimeRo: '4 min lectură',
    readTimeRu: '4 мин чтения',
    datePublished: '2026-11-10',
    titleRo: 'Descărcarea containerelor maritime și montajul structurilor metalice în Chișinău: pași pentru o intervenție rapidă în 2–3 ore',
    titleRu: 'Разгрузка морских контейнеров и монтаж металлоконструкций в Кишиневе: как уложиться в выезд 2–3 часа',
    excerptRo: 'Cum organizezi accesul TIR-ului, prinderea în chingi certificate și documentația B2B cu factură fiscală TVA pentru a evita timpii morți pe șantier.',
    excerptRu: 'Как синхронизировать подачу фуры, строповку и оформление B2B документов с НДС, чтобы избежать простоев техники на объекте.',
    metaDescRo: 'Ghid B2B pentru descărcare containere, TIR-uri și montaj hale metalice în Chișinău cu automacara 25 tone: organizare șantier, pachete 2-3h sau 8h și factură TVA.',
    metaDescRu: 'Практические советы для бизнеса в Кишиневе: быстрая разгрузка контейнеров и монтаж металлоконструкций автокраном 25 тонн с договором и налоговой накладной НДС.',
    sectionsRo: [
      {
        heading: '1. Sincronizarea dintre TIR și automacara pentru pachetul de 2–3 ore',
        paragraphs: [
          'Pentru descărcarea containerelor maritime (20ft sau 40ft), a modulelor de șantier sau a camioanelor cu structuri metalice, cea mai mare economie de timp se obține prin poziționarea automacaralei ÎNAINTE sau simultan cu intrarea TIR-ului în curte.',
          'În loc să blocați camionul cu Macaraua în spatele lui într-un culoar îngust, ideal este ca automacaraua să fie deja calată lateral față de locul final de depunere, iar TIR-ul să tragă paralel, la o rază de 5–8 metri.'
        ]
      },
      {
        heading: '2. Pregătirea punctelor de ancorare și a echipei de legători de sarcină',
        paragraphs: [
          'Un ciclu de ridicare sigur și rapid presupune:'
        ],
        bullets: [
          'Cunoașterea greutății reale din avizul de însoțire a mărfii (container gol ~2,2–3,8 tone vs. container încărcat sau utilaj ambalat în cutie).',
          'Degajarea prealabilă a suporturilor (traverse din lemn sau blocuri de beton nivelate) pe care va fi așezat containerul.',
          'Prezența a 2 muncitori pe șantier cu frânghii de ghidare pentru stabilizarea pieselor lungi (ferme metalice, panouri sandwich, containere) în timpul rotirii.'
        ]
      },
      {
        heading: '3. Documentație B2B completă pentru companii (Contract & Factură Fiscală TVA)',
        paragraphs: [
          'S.R.L. „LIBERCONS PRIM” (IDNO: 1021600012320) colaborează atât pe intervenții punctuale de 2–3 ore, cât și pe schimburi complete de 8 ore sau contracte-cadru pentru șantiere industriale.',
          'Emitem contract oficial de prestări servicii și factură fiscală cu TVA (prin e-Factura), oferind antreprenorilor generali predictibilitate juridică și tehnică 24/7.'
        ]
      }
    ],
    sectionsRu: [
      {
        heading: '1. Синхронизация подачи фуры и автокрана в рамках выезда на 2–3 часа',
        paragraphs: [
          'При разгрузке 20- и 40-футовых контейнеров, бытовок или металлопроката максимальная экономия времени достигается, когда автокран устанавливается на опоры сбоку от места выгрузки, а длинномер подъезжает параллельно на радиус 5–8 метров.',
          'Такая схема позволяет снять груз с прицепа и сразу поставить его на подготовленный фундамент одним плавным поворотом платформы.'
        ]
      },
      {
        heading: '2. Подготовка строповки и площадки приема груза',
        paragraphs: [
          'Для быстрой и безопасной работы рекомендуем заранее проверить:'
        ],
        bullets: [
          'Точный вес груза по транспортной накладной (пустой контейнер 2,2–3,8 т либо груженый контейнер / станок в обрешетке).',
          'Готовность опорных тумб, плит или блоков, на которые опускается контейнер.',
          'Наличие двух монтажников с оттяжками для стабилизации длинномерных конструкций (ферм, балок, сэндвич-панелей) при повороте стрелы.'
        ]
      },
      {
        heading: '3. Официальный B2B документооборот (Договор и Налоговая накладная с НДС)',
        paragraphs: [
          'Компания S.R.L. „LIBERCONS PRIM” (IDNO: 1021600012320) работает как по разовым выездам (2–3 часа), так и по полным сменам (8 часов) и долгосрочным договорам подряда.',
          'Предоставляем полный пакет бухгалтерских документов и налоговую накладную с НДС (e-Factura).'
        ]
      }
    ]
  }
];

export const UI_CONTENT = {
  ro: {
    metaTitle: 'Prestare Servicii de Automacara XCMG 25 Tone Chișinău & Moldova | automacara.md',
    metaDesc:
      'Prestare servicii de automacara XCMG 25 Tone în Chișinău și Republica Moldova. Braț telescopic 40–48 m cu Jib, dispecerat 24/7, sosire ~45 min, operator autorizat INST și factură fiscală cu TVA. Sună: 069 547 396.',
    nav: {
      services: 'Servicii',
      specs: 'Specificații',
      packages: 'Colaborare',
      blog: 'Blog',
      faq: 'Întrebări',
      contact: 'Contact'
    },
    hero: {
      eyebrow: 'PRESTARE SERVICII DE AUTOMACARA • CHIȘINĂU & MOLDOVA',
      title: 'Prestare servicii de automacara XCMG 25 Tone în Chișinău și Moldova',
      motto: 'Ridicăm cu grijă. Construim cu încredere.',
      description:
        'Flotă proprie licențiată. Dispecerat 24/7 cu sosire medie ~45 min în Chișinău, operator autorizat INST și factură fiscală cu TVA.',
      ctaCall: 'Sună: 069 547 396',
      ctaQuote: 'Solicită estimare',
      imageCaption: 'Automacara XCMG 25 Tone • Braț telescopic 40–48 m (cu extensie Jib) • Sistem Hirschmann LMI',
      trustPills: [
        'Operator autorizat INST (RM)',
        'Contract & Factură fiscală cu TVA',
        'Dispecerat 24/7 • ~45 min în Chișinău'
      ]
    },
    specs: {
      eyebrow: 'FIȘĂ TEHNICĂ UTILAJ',
      title: 'Parametri tehnici — Automacara XCMG 25 Tone',
      subtitle:
        'Utilaj modern pe șasiu rutier cu stabilizare hidraulică H-Type și control computerizat al momentului de sarcină.',
      cards: [
        { value: '25 Tone', label: 'Sarcină maximă la cârlig' },
        { value: '40–48 m', label: 'Braț telescopic cu extensie Jib' },
        { value: '360°', label: 'Rotație continuă ghidată' },
        { value: 'INST', label: 'Operator autorizat inclus' }
      ],
      rows: [
        { label: 'Masa totală utilaj (chassis)', value: '25.000 kg' },
        { label: 'Sistem de calare & stabilizare (lățime ~6,0 m)', value: 'Hidraulic H-Type' },
        { label: 'Monitorizare computerizată sarcină', value: 'Senzori Hirschmann LMI' }
      ],
      tableTitle: 'Repere orientative de ridicare în funcție de rază (cale complet extinse 6,0 m)',
      tableHeaders: ['Rază de lucru', 'Sarcină max. orientativă', 'Configurație braț', 'Aplicații uzuale pe șantier'],
      tableDisclaimer:
        'Notă tehnică: Din sarcina tabelară se scade masa muflului (~250–550 kg) și a chingilor de prindere. Viteza maximă admisă a vântului: 14 m/s. Confirmarea finală se realizează de către operator pe diagrama oficială LMI din cabină.'
    },
    services: {
      eyebrow: 'CAPABILITĂȚI OPERAȚIONALE',
      title: 'Gama de servicii de ridicare',
      photoCaption: 'Manopere de precizie cu operator autorizat INST în mun. Chișinău și Republica Moldova',
      items: [
        {
          num: '01.',
          title: 'Montaj structuri metalice și prefabricate',
          desc: 'Grinzi de beton, piloni, ferme industriale, panouri sandwich, acoperișuri de hale și elemente prefabricate.'
        },
        {
          num: '02.',
          title: 'Descărcare și încărcare TIR-uri și containere',
          desc: 'Containere maritime 20ft/40ft, module de birou, rezervoare metalice, echipamente ambalate și paleți cu materiale grele.'
        },
        {
          num: '03.',
          title: 'Ridicare materiale la înălțime',
          desc: 'Cărămidă, fier beton, cofraje, sticlă pentru fațadă, utilaje HVAC și echipamente de șantier până la 40–48 m.'
        },
        {
          num: '04.',
          title: 'Relocări utilaje industriale',
          desc: 'Strunguri, generatoare de mare putere, transformatoare electrice, prese și linii de producție.'
        }
      ]
    },
    packages: {
      eyebrow: 'MODURI DE LUCRU',
      title: 'Formate de colaborare',
      subtitle: 'Estimare rapidă în 1 minut la telefon, WhatsApp sau Viber — fără costuri ascunse.',
      items: [
        {
          tag: 'INTERVENȚII PUNCTUALE',
          title: 'Intervenție Rapidă (2–3 ore)',
          desc: 'Descărcări containere, TIR-uri și ridicări punctuale, cu sosire medie în ~45 min în mun. Chișinău.',
          bullets: [
            'Ideal pentru 1–2 manevre rapide pe șantier',
            'Operator autorizat INST și chingi certificate',
            'Achitare numerar sau prin transfer cu TVA'
          ],
          cta: 'Solicită estimare 2–3 ore',
          featured: false
        },
        {
          tag: 'RECOMANDAT ȘANTIERE',
          title: 'Schimb Complet (8 ore)',
          desc: 'Șantiere active, montaj structuri metalice, asamblare hale și poziționare grinzi prefabricate pe durata întregii zile.',
          bullets: [
            'Condiții optimizate pentru lucru continuu pe șantier',
            'Braț telescopic 40 m + extensie Jib până la 48 m',
            'Contract oficial și factură fiscală cu TVA'
          ],
          cta: 'Solicită estimare schimb 8 ore',
          featured: true
        },
        {
          tag: 'COMPANII & ANTREPRENORI',
          title: 'Proiecte B2B / Termen Lung',
          desc: 'Contract oficial, deviz transparent, factură fiscală cu TVA și prioritate 24/7 pentru proiecte complexe în Moldova.',
          bullets: [
            'Planificare dedicată pentru șantiere multi-etapă',
            'Prioritate la dispecerat și intervenții de urgență',
            'Decontare prin e-Factura cu TVA inclus'
          ],
          cta: 'Solicită ofertă B2B',
          featured: false
        }
      ],
      coverageTitle: 'Arie de acoperire rapidă:',
      coverageText:
        'Botanica, Buiucani, Centru, Ciocana, Rîșcani, Poșta Veche, suburbii (Ialoveni, Strășeni, Cricova, Sîngera, Bubuieci, Stăuceni, Durlești, Trușeni, Codru) și întreg teritoriul Republicii Moldova.'
    },
    blog: {
      eyebrow: 'EXPERTIZĂ TEHNICĂ PE ȘANTIER',
      title: 'Blog Tehnic & Ghiduri de Șantier',
      subtitle:
        'Recomandări practice de la operatorii noștri autorizați INST pentru pregătirea șantierului și ridicări în siguranță.',
      readMore: 'Citește articolul →',
      backToSite: '← Înapoi la pagina principală',
      allArticles: 'Toate ghidurile tehnice',
      articleCtaTitle: 'Aveți o lucrare similară în Chișinău sau Moldova?',
      articleCtaSub: 'Trimiteți detaliile sau o fotografie pe WhatsApp/Viber la 069 547 396 pentru confirmarea razei și estimare în 1 minut.'
    },
    faq: {
      eyebrow: 'ÎNTREBĂRI FRECVENTE',
      title: 'Informații utile despre serviciile de automacara',
      items: [
        {
          q: 'În cât timp ajunge automacaraua la șantier în Chișinău?',
          a: 'Timpul mediu de deplasare și calare este de aproximativ 45 de minute în raza municipiului Chișinău (Botanica, Buiucani, Centru, Ciocana, Rîșcani, Poșta Veche și suburbii).'
        },
        {
          q: 'Care este capacitatea și lungimea brațului automacaralei?',
          a: 'Prestăm servicii cu automacara modernă XCMG de 25 tone, dotată cu braț telescopic de 40 metri (până la 48 metri cu extensie Jib), rotație 360°, calare hidraulică H-Type și senzori computerizați Hirschmann LMI.'
        },
        {
          q: 'Eliberați factură fiscală cu TVA și lucrați prin transfer bancar?',
          a: 'Da. S.R.L. „LIBERCONS PRIM” (IDNO: 1021600012320) activează oficial cu persoane juridice și fizice, oferind contract de prestări servicii, factură fiscală cu TVA (e-Factura) și operator autorizat INST.'
        },
        {
          q: 'Cum se calculează costul lucrării și ce formate de lucru aveți?',
          a: 'Lucrăm pe 3 formate clare: Intervenție Rapidă (2–3 ore) pentru descărcări și ridicări punctuale, Schimb Complet (8 ore) pentru șantiere active și Proiecte B2B pe termen lung. Sunați la 069 547 396 pentru o estimare exactă în 1 minut.'
        },
        {
          q: 'Interveniți și în weekend sau în regim non-stop (24/7)?',
          a: 'Da, dispeceratul și utilajul nostru sunt disponibile 24/7, inclusiv în weekend și în ture de noapte pentru lucrări urgente sau zone cu trafic restricționat.'
        }
      ]
    },
    contact: {
      eyebrow: 'CONTACT DIRECT 24/7 & CREDIBILITATE B2B',
      title: 'Aveți o lucrare de ridicare? Dispeceratul răspunde 24/7.',
      subtitle:
        'Apelați direct pentru urgențe sau trimiteți formularul alăturat — solicitarea ajunge instant la dispeceratul LiberCons Prim.',
      primaryLabel: 'Principal • Apel / WhatsApp / Viber',
      secondaryLabel: 'Secundar • Dispecerat',
      formTitle: 'Solicită estimare rapidă',
      formSubtitle: 'Lăsați datele lucrării și vă contactăm în câteva minute.',
      fieldName: 'Numele dvs. / Compania *',
      fieldNamePlaceholder: 'ex: Ion Popescu / Constructor SRL',
      fieldPhone: 'Număr de telefon *',
      fieldPhonePlaceholder: '069 XXX XXX',
      fieldFormat: 'Format de colaborare',
      fieldLocation: 'Locația lucrării (sector / localitate)',
      fieldLocationPlaceholder: 'ex: Chișinău, sec. Ciocana',
      fieldDetails: 'Detalii sarcină (ce ridicăm, greutate estimată, rază)',
      fieldDetailsPlaceholder: 'ex: Descărcare container 4.5t sau montaj grinzi hală',
      submitBtn: 'Trimite solicitarea la dispecerat',
      submittingBtn: 'Se transmite...',
      successTitle: 'Solicitare recepționată!',
      successDesc:
        'Datele au fost transmise dispeceratului S.R.L. „LIBERCONS PRIM”. Vă apelăm în cel mai scurt timp la numărul indicat.',
      whatsappFollowup: 'Trimite și o fotografie pe WhatsApp',
      newRequestBtn: 'Trimite altă solicitare'
    },
    footer: {
      company: 'S.R.L. „LIBERCONS PRIM”',
      idno: 'IDNO: 1021600012320',
      location: 'mun. Chișinău, Republica Moldova',
      cert: 'Operator autorizat INST (RM)',
      rights: 'Toate drepturile rezervate.'
    }
  },
  ru: {
    metaTitle: 'Услуги Автокрана XCMG 25 Тонн Кишинев и Молдова (Стрела 40–48м) | automacara.md',
    metaDesc:
      'Предоставление услуг автокрана XCMG 25 тонн в Кишиневе и Республике Молдова. Телескопическая стрела 40–48 м с гуськом, работаем 24/7, подача ~45 мин, оператор INST, договор и накладная с НДС. Тел: 069 547 396.',
    nav: {
      services: 'Услуги',
      specs: 'Характеристики',
      packages: 'Форматы',
      blog: 'Блог',
      faq: 'Вопросы',
      contact: 'Контакты'
    },
    hero: {
      eyebrow: 'УСЛУГИ АВТОКРАНА • КИШИНЕВ И МОЛДОВА',
      title: 'Услуги автокрана XCMG 25 Тонн в Кишиневе и по Молдове',
      motto: 'Поднимаем бережно. Строим с уверенностью.',
      description:
        'Собственная лицензированная техника. Диспетчерская 24/7 со средним временем подачи ~45 мин по Кишиневу, аттестованный оператор INST и налоговая накладная с НДС.',
      ctaCall: 'Позвонить: 069 547 396',
      ctaQuote: 'Запросить расчет',
      imageCaption: 'Автокран XCMG 25 Тонн • Телескопическая стрела 40–48 м (с гуськом Jib) • Система Hirschmann LMI',
      trustPills: [
        'Аттестованный оператор INST (РМ)',
        'Договор и налоговая накладная с НДС',
        'Диспетчерская 24/7 • ~45 мин по Кишиневу'
      ]
    },
    specs: {
      eyebrow: 'ТЕХНИЧЕСКИЙ ПАСПОРТ',
      title: 'Технические параметры — Автокран XCMG 25 Тонн',
      subtitle:
        'Современный автокран с гидравлическим контуром опор H-Type и компьютерным контролем грузового момента.',
      cards: [
        { value: '25 Тонн', label: 'Максимальная нагрузка на крюке' },
        { value: '40–48 м', label: 'Телескопическая стрела с гуськом Jib' },
        { value: '360°', label: 'Непрерывный поворот платформы' },
        { value: 'INST', label: 'Аттестованный машинист включен' }
      ],
      rows: [
        { label: 'Полная масса автокрана (шасси)', value: '25.000 кг' },
        { label: 'Система установки и стабилизации (контур ~6,0 м)', value: 'Гидравлическая H-Type' },
        { label: 'Компьютерный мониторинг безопасности', value: 'Датчики Hirschmann LMI' }
      ],
      tableTitle: 'Ориентировочные показатели грузоподъемности по вылету (опоры 6,0 м)',
      tableHeaders: ['Рабочий вылет', 'Макс. нагрузка (ориентир)', 'Конфигурация стрелы', 'Типовые задачи на объекте'],
      tableDisclaimer:
        'Техническое примечание: Из табличной массы вычитается вес крюковой подвески (~250–550 кг) и строп. Допустимая скорость ветра: до 14 м/с. Точный допуск подтверждается оператором по диаграмме LMI в кабине.'
    },
    services: {
      eyebrow: 'ВЫПОЛНЯЕМЫЕ РАБОТЫ',
      title: 'Спектр услуг по подъему и монтажу',
      photoCaption: 'Высокоточные грузоподъемные работы с оператором INST в мун. Кишинев и по всей Молдове',
      items: [
        {
          num: '01.',
          title: 'Монтаж металлоконструкций и ЖБИ',
          desc: 'Железобетонные балки, колонны, промышленные фермы, сэндвич-панели, кровля ангаров и сборные конструкции.'
        },
        {
          num: '02.',
          title: 'Разгрузка и погрузка фур и контейнеров',
          desc: 'Морские контейнеры 20/40 фт, модульные бытовки, металлические емкости, тяжелое оборудование и паллеты.'
        },
        {
          num: '03.',
          title: 'Подача стройматериалов на высоту',
          desc: 'Кирпич, арматура, опалубка, фасадное остекление, чиллеры HVAC и оборудование на высоту до 40–48 м.'
        },
        {
          num: '04.',
          title: 'Перемещение промышленного оборудования',
          desc: 'Станки, мощные генераторы, силовые трансформаторы, прессы и производственные линии.'
        }
      ]
    },
    packages: {
      eyebrow: 'УСЛОВИЯ РАБОТЫ',
      title: 'Форматы сотрудничества',
      subtitle: 'Быстрый расчет за 1 минуту по телефону, WhatsApp или Viber — без скрытых платежей.',
      items: [
        {
          tag: 'РАЗОВЫЕ ЗАДАЧИ',
          title: 'Срочный Выезд (2–3 часа)',
          desc: 'Разгрузка контейнеров, фур и точечные подъемы со средним временем прибытия ~45 мин по Кишиневу.',
          bullets: [
            'Оптимально для быстрой разгрузки или 1–2 подъемов',
            'Аттестованный оператор INST и сертифицированные стропы',
            'Наличный расчет или перечисление с НДС'
          ],
          cta: 'Запросить расчет на 2–3 часа',
          featured: false
        },
        {
          tag: 'ВЫБОР СТРОИТЕЛЕЙ',
          title: 'Полная Смена (8 часов)',
          desc: 'Активные стройплощадки, монтаж металлоконструкций, сборка ангаров и укладка ЖБИ на протяжении всего дня.',
          bullets: [
            'Выгодные условия для непрерывной работы на объекте',
            'Стрела 40 м + удлинитель Jib до 48 м',
            'Официальный договор и налоговая накладная с НДС'
          ],
          cta: 'Запросить расчет смены 8ч',
          featured: true
        },
        {
          tag: 'ДЛЯ КОМПАНИЙ И ПОДРЯДЧИКОВ',
          title: 'Проекты B2B / Долгосрочно',
          desc: 'Официальный договор, прозрачная смета, налоговая накладная с НДС и приоритетная подача 24/7 по Молдове.',
          bullets: [
            'Планирование графика подачи под этапы строительства',
            'Приоритетный выезд по заявкам 24/7',
            'Электронный документооборот (e-Factura) с НДС'
          ],
          cta: 'Запросить B2B предложение',
          featured: false
        }
      ],
      coverageTitle: 'Зона оперативного обслуживания:',
      coverageText:
        'Ботаника, Буюканы, Центр, Чеканы, Рышкановка, Старая Почта, пригороды (Яловены, Страшены, Крикова, Сынджера, Бубуечь, Ставчены, Дурлешты, Трушены, Кодру) и вся территория Республики Молдова.'
    },
    blog: {
      eyebrow: 'ИНЖЕНЕРНАЯ ПРАКТИКА',
      title: 'Технический Блог и Руководства',
      subtitle:
        'Практические рекомендации наших операторов INST по подготовке площадки и безопасной работе автокрана.',
      readMore: 'Читать статью →',
      backToSite: '← Вернуться на главную',
      allArticles: 'Все технические статьи',
      articleCtaTitle: 'Планируете аналогичную работу в Кишиневе или по Молдове?',
      articleCtaSub: 'Отправьте описание или фото площадки в WhatsApp/Viber на 069 547 396 для проверки вылета и расчета за 1 минуту.'
    },
    faq: {
      eyebrow: 'ЧАСТЫЕ ВОПРОСЫ',
      title: 'Полезная информация об услугах автокрана',
      items: [
        {
          q: 'Как быстро автокран прибывает на объект в Кишиневе?',
          a: 'Среднее время подачи и установки на опоры составляет около 45 минут по всем секторам Кишинева (Ботаника, Буюканы, Центр, Чеканы, Рышкановка, Старая Почта и пригороды).'
        },
        {
          q: 'Какова грузоподъемность и максимальная длина стрелы?',
          a: 'Мы выполняем работы современным автокраном XCMG грузоподъемностью 25 тонн с телескопической стрелой 40 метров (до 48 метров с гуськом Jib), поворотом 360°, опорами H-Type и системой безопасности Hirschmann LMI.'
        },
        {
          q: 'Предоставляете ли вы налоговую накладную с НДС и безналичный расчет?',
          a: 'Да. S.R.L. „LIBERCONS PRIM” (IDNO: 1021600012320) официально работает с юридическими и физическими лицами по договору, предоставляет налоговую накладную с НДС (e-Factura) и аттестованного машиниста INST.'
        },
        {
          q: 'Как рассчитывается стоимость и какие форматы заказа доступны?',
          a: 'Доступны 3 формата: Срочный выезд (2–3 часа) для разовых разгрузок, Полная смена (8 часов) для строек и Долгосрочные B2B проекты. Позвоните на 069 547 396 для точного расчета за 1 минуту.'
        },
        {
          q: 'Работаете ли вы в выходные дни и круглосуточно (24/7)?',
          a: 'Да, диспетчерская и техника работают 24/7 без выходных, включая ночные смены и срочные выезды.'
        }
      ]
    },
    contact: {
      eyebrow: 'ПРЯМАЯ СВЯЗЬ 24/7 И НАДЕЖНОСТЬ B2B',
      title: 'Нужен автокран на объект? Диспетчерская на связи 24/7.',
      subtitle:
        'Звоните напрямую для срочной подачи или отправьте форму — заявка мгновенно поступает диспетчеру LiberCons Prim.',
      primaryLabel: 'Основной • Звонок / WhatsApp / Viber',
      secondaryLabel: 'Дополнительный • Диспетчер',
      formTitle: 'Запросить быстрый расчет',
      formSubtitle: 'Оставьте параметры задачи, и мы перезвоним в течение нескольких минут.',
      fieldName: 'Ваше имя / Компания *',
      fieldNamePlaceholder: 'напр.: Иван / Constructor SRL',
      fieldPhone: 'Номер телефона *',
      fieldPhonePlaceholder: '069 XXX XXX',
      fieldFormat: 'Формат сотрудничества',
      fieldLocation: 'Локация объекта (сектор / населенный пункт)',
      fieldLocationPlaceholder: 'напр.: Кишинев, Чеканы',
      fieldDetails: 'Детали задачи (груз, примерный вес, вылет стрелы)',
      fieldDetailsPlaceholder: 'напр.: Разгрузка контейнера 4.5т или монтаж балок',
      submitBtn: 'Отправить заявку диспетчеру',
      submittingBtn: 'Отправка...',
      successTitle: 'Заявка принята!',
      successDesc:
        'Данные переданы диспетчеру S.R.L. „LIBERCONS PRIM”. Мы свяжемся с вами в ближайшее время по указанному номеру.',
      whatsappFollowup: 'Отправить также фото в WhatsApp',
      newRequestBtn: 'Отправить еще одну заявку'
    },
    footer: {
      company: 'S.R.L. „LIBERCONS PRIM”',
      idno: 'IDNO: 1021600012320',
      location: 'мун. Кишинев, Республика Молдова',
      cert: 'Аттестованный оператор INST (РМ)',
      rights: 'Все права защищены.'
    }
  }
} as const;
