/**
 * 格鲁吉亚历史版 · 第一框架（Framework v0.1）
 * ------------------------------------------------------------------
 * Schema 与 js/map_data.js 的 window.DYNASTY_DATA 保持一致：
 *   era      → key / title / titleEn / fromYear / toYear / focusYear / tint / seat / summary
 *   phases   → until（该阶段截止年）/ snap（待绘制的版图快照 id）/ overview / borderNote
 *   milestones → year / headline / site / coord [lon, lat] / isMapChange
 *
 * v0.1 新增（仅框架阶段使用，进入正式数据前可删除或改名）：
 *   titleEn      时代英文名
 *   borderNote   该版图快照「应当画什么」：各政权范围的文字描述，是后续绘制 polygon 的规格书
 *   approx       年代为传统纪年 / 约数，需要在 UI 中以「约」显示
 *
 * 约定：负数 = 公元前，无公元 0 年；坐标为 WGS84 [经度, 纬度]。
 * 尚无任何 snap 几何数据 —— 这里只是时间轴与国界的骨架。
 */
window.GE_DYNASTY_DATA = [
  {
    key: 'colchis',
    title: '科尔基斯与早期伊比利亚',
    titleEn: 'Colchis & Early Iberia',
    fromYear: -600,
    toYear: -302,
    focusYear: -401,
    tint: '#8a6a3b',
    seat: '瓦尼（科尔基斯）· 姆茨赫塔（东部卡尔特利）',
    summary: '西部黑海沿岸的科尔基斯（Colchis，希腊神话「金羊毛」之地）以瓦尼为中心，希腊人在法西斯（Phasis）、狄奥斯库里亚斯（Dioscurias）、皮提乌斯（Pityus）建立殖民港；东部卡尔特利诸部族以姆茨赫塔为中心，受阿契美尼德波斯影响。',
    phases: [
      {
        until: -401,
        snap: 's_ge_colchis_a',
        overview: '约前 600 — 前 401 · 科尔基斯王国与希腊殖民港；东部卡尔特利部族联盟',
        borderNote: '科尔基斯：里奥尼河—因古里河流域至黑海沿岸（北至皮聪大，南至乔鲁赫河口）；东部：库拉河上游姆茨赫塔一带部族区，边界画虚线（不确定）；南缘为阿契美尼德第 19 / 13 行省影响区。'
      },
      {
        until: -302,
        snap: 's_ge_colchis_b',
        overview: '前 400 — 前 302 · 色诺芬万人军北归、亚历山大帝国时代：科尔基斯分裂为若干「斯凯普图赫」诸侯',
        borderNote: '科尔基斯内陆分裂（可用浅色多块表示）；沿海希腊港保持点状；东部卡尔特利仍为部族区，为下一阶段法尔纳瓦兹统一做铺垫。'
      }
    ],
    milestones: [
      { year: -550, approx: true, headline: '米利都希腊人在里奥尼河口建立法西斯（Phasis）殖民港', site: '法西斯（波季）', coord: [41.67, 42.15] },
      { year: -401, headline: '色诺芬率万人军穿越陶希人、哈利布人之地抵达特拉佩祖斯（《长征记》）', site: '特拉佩祖斯（特拉布宗）', coord: [39.72, 41.0] }
    ],
    settlements: [
      { ancient: '瓦尼', modern: '瓦尼', coord: [42.52, 42.08], isCapital: true, remark: '科尔基斯中心，出土大量黄金器' },
      { ancient: '法西斯', modern: '波季', coord: [41.67, 42.15], remark: '希腊殖民港' },
      { ancient: '狄奥斯库里亚斯', modern: '苏呼米', coord: [41.02, 43.0], remark: '希腊殖民港' },
      { ancient: '姆茨赫塔', modern: '姆茨赫塔', coord: [44.72, 41.84], remark: '东部卡尔特利中心' }
    ]
  },
  {
    key: 'pharnavazid',
    title: '伊比利亚王国（法尔纳瓦兹王朝）',
    titleEn: 'Kingdom of Iberia · Pharnavazids',
    fromYear: -302,
    toYear: -65,
    focusYear: -299,
    tint: '#9b5b3a',
    seat: '姆茨赫塔 · 阿尔马齐',
    summary: '据格鲁吉亚编年史，法尔纳瓦兹一世统一卡尔特利，建立伊比利亚（Iberia，格鲁吉亚语卡尔特利）王国并创制文字传统。前 2 世纪亚美尼亚阿尔塔希阿斯王朝夺取南部边地；前 1 世纪本都米特拉达梯六世吞并科尔基斯。',
    phases: [
      {
        until: -190,
        snap: 's_ge_iberia_a',
        overview: '前 302 — 前 190 · 法尔纳瓦兹一世立国：伊比利亚统合卡尔特利，科尔基斯内陆受其影响',
        borderNote: '伊比利亚：库拉河中上游 + 阿拉格维河谷 + 南部扎瓦赫季、陶、克拉尔杰季；西界利希山（苏拉米山）；科尔基斯沿海为独立诸侯 + 希腊港。'
      },
      {
        until: -110,
        snap: 's_ge_iberia_b',
        overview: '前 189 — 前 110 · 亚美尼亚阿尔塔希阿斯一世崛起：伊比利亚失去南部戈加雷内等边地',
        borderNote: '伊比利亚南界北缩（戈加雷内 / 今阿哈尔齐赫—洛里一带归亚美尼亚）；科尔基斯同前。'
      },
      {
        until: -65,
        snap: 's_ge_iberia_c',
        overview: '前 110 — 前 65 · 本都米特拉达梯六世吞并科尔基斯；伊比利亚依附提格兰大帝的亚美尼亚',
        borderNote: '科尔基斯整体并入本都王国（与本都本土同色）；伊比利亚独立但标「亚美尼亚同盟」。'
      }
    ],
    milestones: [
      { year: -299, approx: true, headline: '法尔纳瓦兹一世统一卡尔特利，建伊比利亚王国（传统纪年）', site: '阿尔马齐 · 姆茨赫塔', coord: [44.69, 41.83], isMapChange: true },
      { year: -189, approx: true, headline: '亚美尼亚阿尔塔希阿斯一世夺取伊比利亚南部边地', site: '戈加雷内', coord: [44.3, 41.2], isMapChange: true },
      { year: -110, approx: true, headline: '米特拉达梯六世将科尔基斯纳入本都王国', site: '法西斯', coord: [41.67, 42.15], isMapChange: true }
    ],
    settlements: [
      { ancient: '姆茨赫塔', modern: '姆茨赫塔', coord: [44.72, 41.84], isCapital: true, remark: '伊比利亚王都' },
      { ancient: '阿尔马齐', modern: '姆茨赫塔南', coord: [44.69, 41.83], remark: '王城卫城 / 阿尔马兹神' },
      { ancient: '乌普利斯齐赫', modern: '戈里东', coord: [44.21, 41.97], remark: '岩凿城' }
    ]
  },
  {
    key: 'roman',
    title: '罗马—帕提亚之间',
    titleEn: 'Between Rome & Parthia',
    fromYear: -65,
    toYear: 326,
    focusYear: -65,
    tint: '#7d4f5a',
    seat: '姆茨赫塔（伊比利亚）· 法西斯 / 阿普萨罗斯（罗马沿海要塞）',
    summary: '前 65 年庞培击败伊比利亚王阿尔托凯斯，伊比利亚成为罗马附庸；科尔基斯沿海设罗马要塞，内陆逐渐形成拉齐卡（Lazica / 埃格里西）王国。伊比利亚国王法拉斯马内斯一世、二世与罗马合作扩张，298 年《尼西比斯和约》确认罗马宗主权。',
    phases: [
      {
        until: 35,
        snap: 's_ge_roman_a',
        overview: '前 65 — 35 · 庞培东征：伊比利亚成为罗马附庸，科尔基斯归本都波莱蒙王朝',
        borderNote: '伊比利亚恢复独立轮廓（罗马附庸，标注）；科尔基斯并入罗马附庸本都王国（波莱蒙）。'
      },
      {
        until: 224,
        snap: 's_ge_roman_b',
        overview: '35 — 224 · 法拉斯马内斯一世介入亚美尼亚；黑海沿岸罗马要塞线；拉齐卡兴起',
        borderNote: '沿海一线罗马行省 / 要塞（阿普萨罗斯—法西斯—塞巴斯托波利斯—皮提乌斯，点状 + 窄带）；内陆拉齐卡、阿普西利、阿巴斯基诸部；伊比利亚领有卡尔特利 + 南部恢复部分。'
      },
      {
        until: 326,
        snap: 's_ge_roman_c',
        overview: '224 — 326 · 萨珊波斯崛起与《尼西比斯和约》（298）：伊比利亚归罗马势力范围',
        borderNote: '同上，但伊比利亚改由科斯罗伊德（Chosroid）王朝米里安三世统治；南、东面为萨珊波斯。'
      }
    ],
    milestones: [
      { year: -65, headline: '庞培越过库拉河，在阿拉格维河畔击败伊比利亚王阿尔托凯斯', site: '姆茨赫塔', coord: [44.72, 41.84], isMapChange: true },
      { year: 35, headline: '伊比利亚王法拉斯马内斯一世助其弟米特拉达梯入主亚美尼亚', site: '阿尔塔沙特', coord: [44.55, 39.95] },
      { year: 141, approx: true, headline: '法拉斯马内斯二世访问罗马，安敦尼·庇护为其立像并扩其疆土', site: '姆茨赫塔', coord: [44.72, 41.84] },
      { year: 298, headline: '《尼西比斯和约》：罗马确认对伊比利亚的宗主权', site: '尼西比斯（努赛宾）', coord: [41.22, 37.07], isMapChange: true }
    ],
    settlements: [
      { ancient: '姆茨赫塔', modern: '姆茨赫塔', coord: [44.72, 41.84], isCapital: true, remark: '伊比利亚王都' },
      { ancient: '阿普萨罗斯', modern: '戈尼奥', coord: [41.57, 41.56], remark: '罗马要塞' },
      { ancient: '皮提乌斯', modern: '皮聪大', coord: [40.34, 43.16], remark: '罗马要塞' }
    ]
  },
  {
    key: 'christian_kartli',
    title: '基督教化与瓦赫坦·戈尔加萨利',
    titleEn: 'Christian Kartli & Lazica',
    fromYear: 326,
    toYear: 580,
    focusYear: 326,
    tint: '#6f6a3a',
    seat: '姆茨赫塔 → 第比利斯（6 世纪初迁都）· 拉齐卡：阿凯奥波利斯（诺卡拉克维）',
    summary: '圣尼诺传教，米里安三世皈依基督教（约 326/337）。5 世纪瓦赫坦·戈尔加萨利抗击萨珊、奠基第比利斯；6 世纪拜占庭与萨珊在拉齐卡爆发「拉齐卡战争」（541–562）。580 年萨珊废除伊比利亚王权。',
    phases: [
      {
        until: 387,
        snap: 's_ge_christian_a',
        overview: '326 — 387 · 米里安三世皈依：伊比利亚（罗马系）+ 拉齐卡（罗马附庸）',
        borderNote: '伊比利亚、拉齐卡两色；阿巴斯基亚（西北沿海）、斯瓦涅季（高山）作为拉齐卡附属浅色。'
      },
      {
        until: 522,
        snap: 's_ge_christian_b',
        overview: '387 — 522 · 亚美尼亚瓜分后伊比利亚转入萨珊势力：瓦赫坦·戈尔加萨利的扩张与反抗',
        borderNote: '伊比利亚（萨珊附庸，标注）扩及赫雷季西部、克拉尔杰季；拉齐卡（拜占庭附庸）；界线大致沿利希山。'
      },
      {
        until: 580,
        snap: 's_ge_christian_c',
        overview: '523 — 580 · 拉齐卡战争（541–562）与「五十年和约」：拉齐卡归拜占庭',
        borderNote: '拉齐卡 + 沿海（含佩特拉要塞）归拜占庭；伊比利亚王权名存实亡，萨珊直接控制第比利斯。'
      }
    ],
    milestones: [
      { year: 326, approx: true, headline: '圣尼诺传教，伊比利亚王米里安三世皈依基督教（传统 326 / 学界多作 337）', site: '姆茨赫塔', coord: [44.72, 41.84] },
      { year: 484, headline: '瓦赫坦·戈尔加萨利与亚美尼亚瓦汉·马米科尼扬联手反抗萨珊', site: '第比利斯', coord: [44.79, 41.72] },
      { year: 502, approx: true, headline: '达奇王将伊比利亚王都由姆茨赫塔迁往第比利斯', site: '第比利斯', coord: [44.79, 41.72] },
      { year: 541, headline: '拉齐卡战争爆发：萨珊攻陷黑海要塞佩特拉', site: '佩特拉（齐希斯季里）', coord: [41.66, 41.77], isMapChange: true },
      { year: 562, headline: '拜占庭—萨珊「五十年和约」：拉齐卡归拜占庭', site: '阿凯奥波利斯（诺卡拉克维）', coord: [42.21, 42.32], isMapChange: true }
    ],
    settlements: [
      { ancient: '第比利斯', modern: '第比利斯', coord: [44.79, 41.72], isCapital: true, remark: '6 世纪起为伊比利亚王都' },
      { ancient: '阿凯奥波利斯', modern: '诺卡拉克维', coord: [42.21, 42.32], isCapital: true, remark: '拉齐卡王都' },
      { ancient: '佩特拉', modern: '齐希斯季里', coord: [41.66, 41.77], remark: '拜占庭海防要塞' }
    ]
  },
  {
    key: 'principate',
    title: '伊比利亚公国与阿拉伯统治',
    titleEn: 'Principate of Iberia & Arab Rule',
    fromYear: 580,
    toYear: 786,
    focusYear: 627,
    tint: '#5a6b52',
    seat: '第比利斯（大公 / 阿拉伯埃米尔）· 阿纳科皮亚（阿巴斯基亚）',
    summary: '王权废除后由瓜拉姆家族、科斯罗伊德家族以「大公」（erismtavari）统治伊比利亚，摇摆于拜占庭与萨珊之间。627 年赫拉克利乌斯联合可萨人围攻第比利斯；7 世纪中叶阿拉伯人东来，8 世纪 30 年代马尔万·伊本·穆罕默德（「聋子马尔万」）远征后设第比利斯埃米尔国。',
    phases: [
      {
        until: 627,
        snap: 's_ge_principate_a',
        overview: '580 — 627 · 伊比利亚大公国：591 年拜占庭—萨珊重划边界',
        borderNote: '伊比利亚（大公国，拜占庭 / 萨珊交替宗主）；拉齐卡、阿巴斯基亚为拜占庭附庸；591 年界线：第比利斯以西归拜占庭，以东归萨珊。'
      },
      {
        until: 736,
        snap: 's_ge_principate_b',
        overview: '627 — 736 · 赫拉克利乌斯与可萨人攻第比利斯；阿拉伯人首次进入（645 年与第比利斯订约）',
        borderNote: '伊比利亚东部受哈里发宗主；西部拉齐卡、阿巴斯基亚仍属拜占庭。'
      },
      {
        until: 786,
        snap: 's_ge_principate_c',
        overview: '736 — 786 · 「聋子马尔万」远征后设第比利斯埃米尔国，卡赫季、陶—克拉尔杰季分立',
        borderNote: '第比利斯埃米尔国（库拉河中游，伊斯兰色）；卡赫季公国（东）；伊比利亚贵族南迁陶—克拉尔杰季；阿巴斯基亚（拜占庭附庸）。'
      }
    ],
    milestones: [
      { year: 580, headline: '萨珊废除伊比利亚王权，改由大公统治', site: '第比利斯', coord: [44.79, 41.72], isMapChange: true },
      { year: 627, headline: '拜占庭皇帝赫拉克利乌斯与可萨人围攻第比利斯', site: '第比利斯', coord: [44.79, 41.72] },
      { year: 645, approx: true, headline: '哈比卜·伊本·马斯拉玛与第比利斯订立保护条约', site: '第比利斯', coord: [44.79, 41.72] },
      { year: 736, approx: true, headline: '「聋子马尔万」远征格鲁吉亚，建立第比利斯埃米尔国', site: '第比利斯', coord: [44.79, 41.72], isMapChange: true }
    ],
    settlements: [
      { ancient: '第比利斯', modern: '第比利斯', coord: [44.79, 41.72], isCapital: true, remark: '大公 → 阿拉伯埃米尔驻地' },
      { ancient: '阿纳科皮亚', modern: '新阿丰', coord: [40.83, 43.08], remark: '阿巴斯基亚中心' }
    ]
  },
  {
    key: 'kingdoms',
    title: '诸国并立：阿布哈兹、陶—克拉尔杰季、卡赫季',
    titleEn: 'Abkhazia, Tao-Klarjeti & Kakheti',
    fromYear: 786,
    toYear: 1008,
    focusYear: 888,
    tint: '#4f6e72',
    seat: '库塔伊西（阿布哈兹王国）· 阿尔达努奇（陶—克拉尔杰季）· 第比利斯（埃米尔国）',
    summary: '列昂二世脱离拜占庭建立阿布哈兹王国并迁都库塔伊西；巴格拉季昂尼家族阿紹特一世在陶—克拉尔杰季立足（813），888 年阿达尔纳塞四世复称「伊比利亚人之王」。东部卡赫季、赫雷季独立，第比利斯仍为埃米尔国。陶的大卫三世扶持养子巴格拉特三世，最终于 1008 年统一东西。',
    phases: [
      {
        until: 888,
        snap: 's_ge_kingdoms_a',
        overview: '786 — 888 · 阿布哈兹王国独立；巴格拉季昂尼在陶—克拉尔杰季崛起；853 年布加·卡比尔焚第比利斯',
        borderNote: '五块：阿布哈兹王国（西格鲁吉亚全境，至利希山）；陶—克拉尔杰季（巴格拉季昂尼，拜占庭「库罗帕拉特」）；第比利斯埃米尔国；卡赫季公国；赫雷季公国。'
      },
      {
        until: 975,
        snap: 's_ge_kingdoms_b',
        overview: '888 — 975 · 阿达尔纳塞四世复伊比利亚王号；阿布哈兹王国东扩至内卡尔特利',
        borderNote: '阿布哈兹王国东扩，控制内卡尔特利（希达卡尔特利）；陶—克拉尔杰季分支并立；卡赫季吞并赫雷季（约 950）。'
      },
      {
        until: 1008,
        snap: 's_ge_kingdoms_c',
        overview: '975 — 1008 · 陶的大卫三世扶持巴格拉特三世：卡尔特利 + 阿布哈兹王位合于一身；1000 年拜占庭吞并陶',
        borderNote: '巴格拉特三世：阿布哈兹 + 卡尔特利；陶（大卫三世死后）并入拜占庭；卡赫季—赫雷季、第比利斯埃米尔国尚存。'
      }
    ],
    milestones: [
      { year: 786, approx: true, headline: '列昂二世称「阿布哈兹人之王」，脱离拜占庭，迁都库塔伊西', site: '库塔伊西', coord: [42.7, 42.27], isMapChange: true },
      { year: 813, headline: '阿紹特一世（巴格拉季昂尼）在陶—克拉尔杰季立国，获拜占庭库罗帕拉特衔', site: '阿尔达努奇', coord: [42.06, 41.13], isMapChange: true },
      { year: 853, headline: '阿拔斯将领布加·卡比尔焚毁第比利斯', site: '第比利斯', coord: [44.79, 41.72] },
      { year: 888, headline: '阿达尔纳塞四世复称「伊比利亚人之王」', site: '陶—克拉尔杰季', coord: [42.06, 41.13] },
      { year: 1000, headline: '陶的大卫三世去世，拜占庭巴西尔二世吞并陶', site: '奥什基', coord: [41.84, 40.57], isMapChange: true }
    ],
    settlements: [
      { ancient: '库塔伊西', modern: '库塔伊西', coord: [42.7, 42.27], isCapital: true, remark: '阿布哈兹王国都城' },
      { ancient: '阿尔达努奇', modern: '阿尔达努奇（土耳其）', coord: [42.06, 41.13], isCapital: true, remark: '陶—克拉尔杰季中心' },
      { ancient: '第比利斯', modern: '第比利斯', coord: [44.79, 41.72], remark: '阿拉伯埃米尔国' },
      { ancient: '泰拉维', modern: '泰拉维', coord: [45.47, 41.92], remark: '卡赫季中心' }
    ]
  },
  {
    key: 'golden_age',
    title: '统一的格鲁吉亚王国 · 黄金时代',
    titleEn: 'Unified Kingdom of Georgia · Golden Age',
    fromYear: 1008,
    toYear: 1236,
    focusYear: 1213,
    tint: '#a0412d',
    seat: '库塔伊西 → 第比利斯（1122 年起）',
    summary: '1008 年巴格拉特三世统一，建立格鲁吉亚王国（萨卡尔特维洛）。11 世纪后半塞尔柱突厥入侵（「大突厥人之灾」）；「建设者」大卫四世 1121 年迪德戈里之战大胜，1122 年收复第比利斯为都。塔玛尔女王时期（1184–1213）达到鼎盛：疆域自黑海至里海，宗主希尔万，扶立特拉布宗帝国。',
    phases: [
      {
        until: 1089,
        snap: 's_ge_golden_a',
        overview: '1008 — 1089 · 巴格拉特三世统一；1021–1022 年与拜占庭巴西尔二世之战；1080 年「大突厥人之灾」',
        borderNote: '格鲁吉亚王国（西 + 卡尔特利 + 卡赫季—赫雷季 1010 年并入）；第比利斯仍为埃米尔国飞地；南部陶、克拉尔杰季部分归拜占庭；1080 后南部受塞尔柱蚕食。'
      },
      {
        until: 1122,
        snap: 's_ge_golden_b',
        overview: '1089 — 1122 · 「建设者」大卫四世改革；1121 年迪德戈里大捷，1122 年收复第比利斯',
        borderNote: '王国收复卡赫季—赫雷季、下卡尔特利；1122 后第比利斯埃米尔国消亡并入王国。'
      },
      {
        until: 1184,
        snap: 's_ge_golden_c',
        overview: '1122 — 1184 · 王国向希尔万与亚美尼亚扩张：阿尼数度易手',
        borderNote: '东界达希尔万（附庸色）；南界含洛里、部分北亚美尼亚；1161 年乔治三世取阿尼（随后失去）。'
      },
      {
        until: 1213,
        snap: 's_ge_golden_d',
        overview: '1184 — 1213 · 塔玛尔女王鼎盛：沙姆科尔（1195）、阿尼（1199）、巴西亚尼（1202）、扶立特拉布宗帝国（1204）',
        borderNote: '【最大版图快照】格鲁吉亚本土 + 北亚美尼亚（扎卡里德家族领地含阿尼、卡尔斯）+ 希尔万附庸 + 北高加索部分山民附庸；特拉布宗帝国画为「受扶立盟国」。'
      },
      {
        until: 1236,
        snap: 's_ge_golden_e',
        overview: '1213 — 1236 · 乔治四世「拉沙」与鲁苏丹：蒙古首次来袭（1220）、花剌子模扎兰丁焚第比利斯（1226）',
        borderNote: '版图同上逐步收缩；1226 后第比利斯短暂被扎兰丁占领，可在快照中标「失陷」。'
      }
    ],
    milestones: [
      { year: 1008, headline: '巴格拉特三世统一阿布哈兹与卡尔特利，格鲁吉亚王国诞生', site: '库塔伊西', coord: [42.7, 42.27], isMapChange: true },
      { year: 1080, headline: '「大突厥人之灾」：塞尔柱突厥大规模入侵', site: '第比利斯', coord: [44.79, 41.72] },
      { year: 1106, headline: '大卫四世兴建盖拉蒂修道院与学院', site: '盖拉蒂', coord: [42.77, 42.29] },
      { year: 1121, headline: '迪德戈里之战：大卫四世大破塞尔柱联军', site: '迪德戈里', coord: [44.43, 41.75], isMapChange: true },
      { year: 1122, headline: '大卫四世收复第比利斯，定为王都', site: '第比利斯', coord: [44.79, 41.72], isMapChange: true },
      { year: 1185, approx: true, headline: '卢斯塔维利《虎皮武士》成书（12 世纪末—13 世纪初）', site: '第比利斯', coord: [44.79, 41.72] },
      { year: 1195, headline: '沙姆科尔之战：塔玛尔军击败埃尔迪居兹联军', site: '沙姆科尔', coord: [46.02, 40.83], isMapChange: true },
      { year: 1199, headline: '扎卡里德兄弟为格鲁吉亚夺取阿尼', site: '阿尼', coord: [43.57, 40.51], isMapChange: true },
      { year: 1202, headline: '巴西亚尼之战：击败鲁姆苏丹国', site: '巴西亚尼（帕辛莱尔）', coord: [41.68, 39.98] },
      { year: 1204, headline: '塔玛尔扶立科穆宁家族建立特拉布宗帝国', site: '特拉布宗', coord: [39.72, 41.0], isMapChange: true },
      { year: 1226, headline: '花剌子模扎兰丁攻陷并焚掠第比利斯', site: '第比利斯', coord: [44.79, 41.72] }
    ],
    settlements: [
      { ancient: '第比利斯', modern: '第比利斯', coord: [44.79, 41.72], isCapital: true, remark: '1122 年起王都' },
      { ancient: '库塔伊西', modern: '库塔伊西', coord: [42.7, 42.27], remark: '旧都' },
      { ancient: '瓦尔齐亚', modern: '瓦尔齐亚', coord: [43.28, 41.38], remark: '塔玛尔时代岩凿修道院城' },
      { ancient: '阿尼', modern: '阿尼（土耳其）', coord: [43.57, 40.51], remark: '1199 年后归格鲁吉亚宗主' }
    ]
  },
  {
    key: 'mongol',
    title: '蒙古统治、复兴与帖木儿之劫',
    titleEn: 'Mongol Rule, Revival & Timur',
    fromYear: 1236,
    toYear: 1490,
    focusYear: 1329,
    tint: '#6b5a7d',
    seat: '第比利斯（东）· 库塔伊西（西 / 伊梅列季）',
    summary: '1236 年蒙古征服，格鲁吉亚纳入伊儿汗国体系，并一度分裂为东西两王（大卫七世「乌卢」与大卫六世「纳林」）。「光辉者」乔治五世（1314–1346）驱逐蒙古、1329 年重新统一；随后黑死病与帖木儿八次入侵（1386–1403）重创国家，15 世纪后期王国瓦解。',
    phases: [
      {
        until: 1259,
        snap: 's_ge_mongol_a',
        overview: '1236 — 1259 · 蒙古征服：王国被划入伊儿汗国「古尔吉斯坦」八个万户',
        borderNote: '格鲁吉亚王国（蒙古附庸色）缩回本土；北亚美尼亚扎卡里德领地脱离；萨姆茨赫（南部）由蒙古直接管辖。'
      },
      {
        until: 1329,
        snap: 's_ge_mongol_b',
        overview: '1259 — 1329 · 东西分裂：大卫六世纳林据西部（伊梅列季）独立，东部仍属伊儿汗国',
        borderNote: '西：伊梅列季王国（独立）；东：格鲁吉亚王国（伊儿汗国附庸）；萨姆茨赫阿塔贝格国（贾克利家族，伊儿汗国直属）。'
      },
      {
        until: 1386,
        snap: 's_ge_mongol_c',
        overview: '1329 — 1386 · 「光辉者」乔治五世重新统一（1329 并伊梅列季，1334 收萨姆茨赫），驱逐蒙古',
        borderNote: '统一王国重现（不含北亚美尼亚）；萨姆茨赫为王国内自治阿塔贝格。'
      },
      {
        until: 1463,
        snap: 's_ge_mongol_d',
        overview: '1386 — 1463 · 帖木儿八次入侵；亚历山大一世「大帝」重建；1453 年君士坦丁堡陷落后孤立',
        borderNote: '王国轮廓同上，南部、东部边缘遭破坏；特拉布宗帝国仍为邻邦（1461 灭亡）。'
      },
      {
        until: 1490,
        snap: 's_ge_mongol_e',
        overview: '1463 — 1490 · 奇霍里之战（1463）后分裂：卡尔特利、卡赫季、伊梅列季三王国 + 萨姆茨赫阿塔贝格国',
        borderNote: '四块独立政权 + 西部米格雷利亚、古利亚、阿布哈兹、斯瓦涅季诸公国开始自立（浅色）。'
      }
    ],
    milestones: [
      { year: 1236, headline: '蒙古大军征服格鲁吉亚，鲁苏丹女王退守库塔伊西', site: '第比利斯', coord: [44.79, 41.72], isMapChange: true },
      { year: 1259, headline: '大卫六世纳林反抗蒙古，西部（伊梅列季）自立', site: '库塔伊西', coord: [42.7, 42.27], isMapChange: true },
      { year: 1329, headline: '「光辉者」乔治五世吞并伊梅列季，重新统一格鲁吉亚', site: '库塔伊西', coord: [42.7, 42.27], isMapChange: true },
      { year: 1386, headline: '帖木儿首次入侵，攻陷第比利斯并俘巴格拉特五世', site: '第比利斯', coord: [44.79, 41.72] },
      { year: 1463, headline: '奇霍里之战：巴格拉特（伊梅列季）击败乔治八世，王国开始分裂', site: '奇霍里', coord: [42.55, 42.18], isMapChange: true },
      { year: 1490, headline: '王室会议承认分裂：卡尔特利、卡赫季、伊梅列季三王国', site: '第比利斯', coord: [44.79, 41.72], isMapChange: true }
    ],
    settlements: [
      { ancient: '第比利斯', modern: '第比利斯', coord: [44.79, 41.72], isCapital: true, remark: '东部 / 统一王国都城' },
      { ancient: '库塔伊西', modern: '库塔伊西', coord: [42.7, 42.27], isCapital: true, remark: '伊梅列季都城' },
      { ancient: '阿哈尔齐赫', modern: '阿哈尔齐赫', coord: [42.98, 41.64], remark: '萨姆茨赫阿塔贝格驻地' }
    ]
  },
  {
    key: 'three_kingdoms',
    title: '三王国与奥斯曼—萨法维争夺',
    titleEn: 'Three Kingdoms under Ottoman & Safavid Pressure',
    fromYear: 1490,
    toYear: 1762,
    focusYear: 1555,
    tint: '#7a6a4a',
    seat: '第比利斯（卡尔特利）· 格雷米 → 泰拉维（卡赫季）· 库塔伊西（伊梅列季）',
    summary: '卡尔特利、卡赫季、伊梅列季三王国及米格雷利亚、古利亚、阿布哈兹、斯瓦涅季诸公国并立。1555 年《阿马西亚和约》划分势力：西部归奥斯曼、东部归萨法维波斯。1578 年奥斯曼吞并萨姆茨赫（设齐尔德尔省）；阿拔斯一世 1614–1617 年屠掠卡赫季；1723–1735 年奥斯曼占领第比利斯。',
    phases: [
      {
        until: 1555,
        snap: 's_ge_three_a',
        overview: '1490 — 1555 · 三王国 + 萨姆茨赫 + 西部诸公国自立',
        borderNote: '卡尔特利、卡赫季、伊梅列季、萨姆茨赫四色；米格雷利亚（达迪亚尼）、古利亚（古里埃利）、阿布哈兹（舍尔瓦希泽）、斯瓦涅季为伊梅列季名义附庸。'
      },
      {
        until: 1614,
        snap: 's_ge_three_b',
        overview: '1555 — 1614 · 《阿马西亚和约》划分东西：1578 年奥斯曼吞并萨姆茨赫',
        borderNote: '西部政权标奥斯曼宗主；东部标萨法维宗主；萨姆茨赫（阿哈尔齐赫）并入奥斯曼齐尔德尔省；阿扎拉（阿贾里亚）开始奥斯曼化。'
      },
      {
        until: 1723,
        snap: 's_ge_three_c',
        overview: '1614 — 1723 · 阿拔斯一世屠掠卡赫季；1625 年马尔特科皮起义；卡尔特利由萨法维「瓦利」统治',
        borderNote: '同上；卡赫季人口锐减，东部赫雷季平原（萨因吉洛）落入萨法维 / 达吉斯坦部族之手；阿布哈兹沿海脱离伊梅列季。'
      },
      {
        until: 1762,
        snap: 's_ge_three_d',
        overview: '1723 — 1762 · 奥斯曼占领第比利斯（1723–1735）；纳迪尔沙复萨法维宗主；泰穆拉兹二世与埃雷克勒二世分王卡尔特利、卡赫季（1744）',
        borderNote: '1723–1735 东部标奥斯曼占领；1735 后恢复波斯宗主；1744 后卡尔特利、卡赫季由父子分治（为下阶段合并铺垫）。'
      }
    ],
    milestones: [
      { year: 1555, headline: '奥斯曼与萨法维签订《阿马西亚和约》，瓜分格鲁吉亚势力范围', site: '阿马西亚', coord: [35.83, 40.65], isMapChange: true },
      { year: 1578, headline: '奥斯曼征服萨姆茨赫，设齐尔德尔省', site: '阿哈尔齐赫', coord: [42.98, 41.64], isMapChange: true },
      { year: 1616, headline: '阿拔斯一世屠掠卡赫季，大批居民被迁往伊朗', site: '格雷米', coord: [45.66, 42.0] },
      { year: 1625, headline: '马尔特科皮之战：格鲁吉亚人歼灭萨法维驻军；同年马拉布达之战失利', site: '马尔特科皮', coord: [45.0, 41.79] },
      { year: 1723, headline: '奥斯曼军占领第比利斯', site: '第比利斯', coord: [44.79, 41.72], isMapChange: true },
      { year: 1744, headline: '纳迪尔沙封泰穆拉兹二世为卡尔特利王、埃雷克勒二世为卡赫季王', site: '第比利斯', coord: [44.79, 41.72], isMapChange: true }
    ],
    settlements: [
      { ancient: '第比利斯', modern: '第比利斯', coord: [44.79, 41.72], isCapital: true, remark: '卡尔特利王都' },
      { ancient: '格雷米', modern: '格雷米', coord: [45.66, 42.0], isCapital: true, remark: '卡赫季王都（16–17 世纪）' },
      { ancient: '库塔伊西', modern: '库塔伊西', coord: [42.7, 42.27], isCapital: true, remark: '伊梅列季王都' },
      { ancient: '祖格迪迪', modern: '祖格迪迪', coord: [41.87, 42.51], remark: '米格雷利亚公国驻地' }
    ]
  },
  {
    key: 'kartli_kakheti',
    title: '卡尔特利—卡赫季王国',
    titleEn: 'Kingdom of Kartli-Kakheti',
    fromYear: 1762,
    toYear: 1801,
    focusYear: 1783,
    tint: '#8c4a3f',
    seat: '第比利斯',
    summary: '埃雷克勒二世于 1762 年合并卡尔特利与卡赫季。1783 年《格奥尔基耶夫斯克条约》使其成为俄国保护国；1795 年波斯阿迦·穆罕默德汗于克尔察尼西击败格军并焚毁第比利斯。1800 年乔治十二世去世后，俄国于 1801 年吞并该王国。',
    phases: [
      {
        until: 1783,
        snap: 's_ge_kk_a',
        overview: '1762 — 1783 · 埃雷克勒二世合并卡尔特利—卡赫季；伊梅列季（所罗门一世）仍属奥斯曼宗主',
        borderNote: '卡尔特利—卡赫季（含埃里温、占贾汗国朝贡区，可画附庸浅色）；伊梅列季；西部诸公国；阿哈尔齐赫属奥斯曼。'
      },
      {
        until: 1801,
        snap: 's_ge_kk_b',
        overview: '1783 — 1801 · 《格奥尔基耶夫斯克条约》成为俄国保护国；1795 年克尔察尼西之战与第比利斯焚城',
        borderNote: '同上，卡尔特利—卡赫季标「俄国保护国」；东南附庸汗国脱离。'
      }
    ],
    milestones: [
      { year: 1762, headline: '埃雷克勒二世继承卡尔特利，合并为卡尔特利—卡赫季王国', site: '第比利斯', coord: [44.79, 41.72], isMapChange: true },
      { year: 1783, headline: '《格奥尔基耶夫斯克条约》：卡尔特利—卡赫季成为俄国保护国', site: '格奥尔基耶夫斯克', coord: [43.47, 44.15], isMapChange: true },
      { year: 1795, headline: '克尔察尼西之战：阿迦·穆罕默德汗攻入并焚毁第比利斯', site: '克尔察尼西', coord: [44.81, 41.68] }
    ],
    settlements: [
      { ancient: '第比利斯', modern: '第比利斯', coord: [44.79, 41.72], isCapital: true, remark: '卡尔特利—卡赫季王都' },
      { ancient: '泰拉维', modern: '泰拉维', coord: [45.47, 41.92], remark: '埃雷克勒二世出生地与宫邸' }
    ]
  },
  {
    key: 'russian',
    title: '俄罗斯帝国统治',
    titleEn: 'Russian Empire',
    fromYear: 1801,
    toYear: 1918,
    focusYear: 1878,
    tint: '#5b5f78',
    seat: '梯弗里斯（高加索总督驻地）',
    summary: '1801 年俄国吞并卡尔特利—卡赫季，随后逐一兼并伊梅列季（1810）、古利亚（1829）、米格雷利亚（1857）、斯瓦涅季、阿布哈兹（1864）。1829 年《阿德里安堡条约》取得阿哈尔齐赫、阿哈尔卡拉基；1878 年《柏林条约》取得巴统（阿贾里亚）与卡尔斯。设梯弗里斯省、库塔伊西省、巴统州、苏呼米区。',
    phases: [
      {
        until: 1810,
        snap: 's_ge_ru_a',
        overview: '1801 — 1810 · 吞并卡尔特利—卡赫季（格鲁吉亚省）；米格雷利亚（1803）、伊梅列季（1804）成为保护国',
        borderNote: '俄罗斯帝国（格鲁吉亚省）；伊梅列季、米格雷利亚、古利亚标「俄国保护国」；阿布哈兹、阿贾里亚、阿哈尔齐赫属奥斯曼。'
      },
      {
        until: 1829,
        snap: 's_ge_ru_b',
        overview: '1810 — 1829 · 伊梅列季被废；阿布哈兹成为保护国（1810）；古利亚并入（1829）',
        borderNote: '伊梅列季直辖；阿布哈兹保护国；奥斯曼仍控制阿哈尔齐赫、阿贾里亚。'
      },
      {
        until: 1878,
        snap: 's_ge_ru_c',
        overview: '1829 — 1878 · 《阿德里安堡条约》取阿哈尔齐赫、阿哈尔卡拉基；1846 年设梯弗里斯省、库塔伊西省；1864 年废阿布哈兹公国',
        borderNote: '行政区划快照：梯弗里斯省、库塔伊西省（含米格雷利亚、斯瓦涅季、古利亚）、苏呼米军区；南界为俄奥边界（阿贾里亚仍属奥斯曼）。'
      },
      {
        until: 1918,
        snap: 's_ge_ru_d',
        overview: '1878 — 1918 · 《柏林条约》取巴统、卡尔斯：设巴统州；1905 年「古利亚共和国」；1917 年外高加索委员会',
        borderNote: '梯弗里斯省、库塔伊西省、巴统州（含阿尔特温）、苏呼米区、扎卡塔拉区；今格鲁吉亚—土耳其边界此时尚在南方（阿尔特温、阿尔达汉属俄）。'
      }
    ],
    milestones: [
      { year: 1801, headline: '沙皇亚历山大一世宣布吞并卡尔特利—卡赫季王国', site: '梯弗里斯', coord: [44.79, 41.72], isMapChange: true },
      { year: 1810, headline: '俄国废除伊梅列季王国', site: '库塔伊西', coord: [42.7, 42.27], isMapChange: true },
      { year: 1829, headline: '《阿德里安堡条约》：奥斯曼割让阿哈尔齐赫、阿哈尔卡拉基', site: '阿哈尔齐赫', coord: [42.98, 41.64], isMapChange: true },
      { year: 1864, headline: '俄国废除阿布哈兹公国，高加索战争结束，大批阿布哈兹人与切尔克斯人外迁', site: '苏呼米', coord: [41.02, 43.0], isMapChange: true },
      { year: 1878, headline: '《柏林条约》：巴统、阿贾里亚与卡尔斯划归俄国', site: '巴统', coord: [41.64, 41.64], isMapChange: true },
      { year: 1905, headline: '「古利亚共和国」农民自治运动', site: '奥祖尔盖蒂', coord: [42.0, 41.92] }
    ],
    settlements: [
      { ancient: '梯弗里斯', modern: '第比利斯', coord: [44.79, 41.72], isCapital: true, remark: '高加索总督驻地' },
      { ancient: '库塔伊西', modern: '库塔伊西', coord: [42.7, 42.27], remark: '库塔伊西省会' },
      { ancient: '巴统', modern: '巴统', coord: [41.64, 41.64], remark: '1878 年后俄国港口' }
    ]
  },
  {
    key: 'drg',
    title: '格鲁吉亚民主共和国',
    titleEn: 'Democratic Republic of Georgia',
    fromYear: 1918,
    toYear: 1921,
    focusYear: 1920,
    tint: '#9a3b3b',
    seat: '梯弗里斯',
    summary: '1918 年 5 月 26 日宣布独立，由孟什维克（社会民主党）执政。先后与奥斯曼（《巴统条约》）、亚美尼亚（1918 年 12 月边界战争）、邓尼金志愿军（索契之争）发生领土纠纷；1920 年《莫斯科条约》获苏俄承认，同年收回巴统。1921 年 2 月红军入侵，共和国覆灭。',
    phases: [
      {
        until: 1918,
        snap: 's_ge_drg_a',
        overview: '1918 · 独立与《巴统条约》：奥斯曼占领巴统、阿哈尔齐赫、阿哈尔卡拉基',
        borderNote: '共和国：梯弗里斯省大部 + 库塔伊西省 + 苏呼米区；南部巴统州、阿哈尔齐赫、阿哈尔卡拉基为奥斯曼占领；北部索契区由格方控制。'
      },
      {
        until: 1920,
        snap: 's_ge_drg_b',
        overview: '1918 末 — 1920 · 《穆德洛斯停战》后奥军撤离；英军占领巴统；亚美尼亚—格鲁吉亚战争与洛里中立区；索契区被志愿军夺回',
        borderNote: '共和国恢复南部（阿哈尔齐赫、阿哈尔卡拉基）；巴统州为英国占领区；洛里中立区（斜线）；索契移出；扎卡塔拉与阿塞拜疆争议（虚线）。'
      },
      {
        until: 1921,
        snap: 's_ge_drg_c',
        overview: '1920 — 1921 · 《莫斯科条约》：苏俄承认格鲁吉亚；1920 年 7 月收回巴统',
        borderNote: '【独立时期最大版图】含巴统州（含阿尔特温、阿尔达汉争议）、苏呼米、阿哈尔卡拉基；北界按 1920 年《莫斯科条约》。'
      }
    ],
    milestones: [
      { year: 1918, month: 5, headline: '格鲁吉亚民主共和国宣布独立', site: '梯弗里斯', coord: [44.79, 41.72], isMapChange: true },
      { year: 1918, month: 12, headline: '亚美尼亚—格鲁吉亚战争，后设洛里中立区', site: '洛里', coord: [44.5, 41.0], isMapChange: true },
      { year: 1920, month: 5, headline: '《莫斯科条约》：苏俄承认格鲁吉亚独立', site: '梯弗里斯', coord: [44.79, 41.72] },
      { year: 1920, month: 7, headline: '英军撤出，巴统归还格鲁吉亚', site: '巴统', coord: [41.64, 41.64], isMapChange: true }
    ],
    settlements: [
      { ancient: '梯弗里斯', modern: '第比利斯', coord: [44.79, 41.72], isCapital: true, remark: '共和国首都' },
      { ancient: '巴统', modern: '巴统', coord: [41.64, 41.64], remark: '1920 年收回' }
    ]
  },
  {
    key: 'soviet',
    title: '苏联时期',
    titleEn: 'Soviet Georgia',
    fromYear: 1921,
    toYear: 1991,
    focusYear: 1936,
    tint: '#7a2e2e',
    seat: '第比利斯',
    summary: '1921 年红军入侵后建立格鲁吉亚苏维埃社会主义共和国；同年《卡尔斯条约》将阿尔特温、阿尔达汉划归土耳其，巴统与阿贾里亚自治共和国留在格鲁吉亚。1922–1936 年属外高加索联邦，1936 年成为加盟共和国。阿布哈兹 1931 年由「条约共和国」降为格属自治共和国；1922 年设南奥塞梯自治州。1944–1957 年曾并入卡拉恰伊地区。1989 年 4 月 9 日第比利斯惨案引发独立运动。',
    phases: [
      {
        until: 1922,
        snap: 's_ge_soviet_a',
        overview: '1921 — 1922 · 红军入侵；《卡尔斯条约》定南界：阿尔特温、阿尔达汉划归土耳其；阿贾里亚自治共和国',
        borderNote: '【现代格土边界成形】格鲁吉亚苏维埃共和国 + 阿布哈兹苏维埃共和国（条约联系，独立色但同框）；洛里归亚美尼亚，扎卡塔拉归阿塞拜疆。'
      },
      {
        until: 1931,
        snap: 's_ge_soviet_b',
        overview: '1922 — 1931 · 外高加索联邦；南奥塞梯自治州（1922）',
        borderNote: '外高加索联邦作为上层框；内部：格鲁吉亚 + 阿布哈兹（条约共和国）+ 阿贾里亚自治共和国 + 南奥塞梯自治州。'
      },
      {
        until: 1944,
        snap: 's_ge_soviet_c',
        overview: '1931 — 1944 · 阿布哈兹降为格属自治共和国；1936 年格鲁吉亚苏维埃社会主义共和国成为加盟共和国',
        borderNote: '格鲁吉亚苏维埃社会主义共和国：含阿布哈兹自治共和国、阿贾里亚自治共和国、南奥塞梯自治州（内部分界线）。'
      },
      {
        until: 1957,
        snap: 's_ge_soviet_d',
        overview: '1944 — 1957 · 卡拉恰伊人被流放后，克卢霍里地区并入格鲁吉亚；梅斯赫特土耳其人被流放',
        borderNote: '北界向北扩张至克卢霍里（今卡拉恰伊—切尔克斯南部，捷别尔达一带）。'
      },
      {
        until: 1991,
        snap: 's_ge_soviet_e',
        overview: '1957 — 1991 · 克卢霍里归还；1978 年语言抗议；1989 年「4 月 9 日」惨案',
        borderNote: '回到 1944 前的边界 = 今日国际承认的格鲁吉亚边界。'
      }
    ],
    milestones: [
      { year: 1921, month: 2, headline: '苏俄红军入侵，格鲁吉亚民主共和国流亡', site: '第比利斯', coord: [44.79, 41.72], isMapChange: true },
      { year: 1921, month: 10, headline: '《卡尔斯条约》：阿尔特温、阿尔达汉划归土耳其，巴统留在格鲁吉亚', site: '卡尔斯', coord: [43.1, 40.6], isMapChange: true },
      { year: 1922, headline: '设南奥塞梯自治州；格鲁吉亚并入外高加索联邦', site: '茨欣瓦利', coord: [43.96, 42.23], isMapChange: true },
      { year: 1931, headline: '阿布哈兹由条约共和国降为格鲁吉亚属下的自治共和国', site: '苏呼米', coord: [41.02, 43.0], isMapChange: true },
      { year: 1944, headline: '梅斯赫特土耳其人遭流放；克卢霍里地区并入格鲁吉亚', site: '阿哈尔齐赫', coord: [42.98, 41.64], isMapChange: true },
      { year: 1956, headline: '第比利斯 1956 年 3 月抗议（反对赫鲁晓夫批判斯大林）', site: '第比利斯', coord: [44.79, 41.72] },
      { year: 1989, headline: '「4 月 9 日」第比利斯惨案，苏军镇压独立示威', site: '第比利斯', coord: [44.79, 41.72] }
    ],
    settlements: [
      { ancient: '第比利斯', modern: '第比利斯', coord: [44.79, 41.72], isCapital: true, remark: '加盟共和国首都' },
      { ancient: '苏呼米', modern: '苏呼米', coord: [41.02, 43.0], remark: '阿布哈兹首府' },
      { ancient: '巴统', modern: '巴统', coord: [41.64, 41.64], remark: '阿贾里亚首府' },
      { ancient: '茨欣瓦利', modern: '茨欣瓦利', coord: [43.96, 42.23], remark: '南奥塞梯首府' },
      { ancient: '哥里', modern: '哥里', coord: [44.11, 41.98], remark: '斯大林出生地' }
    ]
  },
  {
    key: 'independent',
    title: '独立的格鲁吉亚',
    titleEn: 'Independent Georgia',
    fromYear: 1991,
    toYear: 2027,
    focusYear: 2008,
    tint: '#a3322f',
    seat: '第比利斯',
    summary: '1991 年 4 月 9 日恢复独立。南奥塞梯战争（1991–1992）、阿布哈兹战争（1992–1993）后两地脱离中央实际控制。2003 年玫瑰革命；2004 年阿贾里亚危机和平解决；2008 年俄格战争后俄国承认阿布哈兹与南奥塞梯「独立」，格方失去科多里峡谷上部与阿哈尔戈里。2023 年获欧盟候选国地位，2024 年起围绕「外国代理人法」与入盟进程爆发大规模抗议。',
    phases: [
      {
        until: 1993,
        snap: 's_ge_ind_a',
        overview: '1991 — 1993 · 恢复独立；南奥塞梯战争与达戈梅斯停火（1992）；阿布哈兹战争爆发',
        borderNote: '国际承认边界 = 苏联加盟共和国边界（实线）；南奥塞梯部分地区格方失控（斜线），阿布哈兹战线逐月变化（建议只画 1993 年 9 月终局）。'
      },
      {
        until: 2008,
        snap: 's_ge_ind_b',
        overview: '1993 — 2008 · 苏呼米陷落（1993-09-27）：阿布哈兹、南奥塞梯大部脱离；2003 玫瑰革命；2004 阿贾里亚回归中央',
        borderNote: '格方控制区 + 阿布哈兹（不含科多里峡谷上部）+ 南奥塞梯（不含阿哈尔戈里及若干格族村）两块「事实控制区」。'
      },
      {
        until: 2027,
        snap: 's_ge_ind_c',
        overview: '2008 — 今 · 八月战争：俄国承认阿布哈兹、南奥塞梯；格方失去上科多里与阿哈尔戈里；「边界化」持续推进',
        borderNote: '两块区域扩至原自治单位全境（含上科多里、阿哈尔戈里）；标「俄军占领 / 事实控制，国际上承认为格鲁吉亚领土」。'
      }
    ],
    milestones: [
      { year: 1991, month: 4, headline: '格鲁吉亚宣布恢复独立', site: '第比利斯', coord: [44.79, 41.72], isMapChange: true },
      { year: 1992, month: 6, headline: '《索契协议》（达戈梅斯）结束南奥塞梯战争，设联合维和部队', site: '茨欣瓦利', coord: [43.96, 42.23], isMapChange: true },
      { year: 1993, month: 9, headline: '苏呼米陷落，阿布哈兹战争结束，大批格鲁吉亚族难民出逃', site: '苏呼米', coord: [41.02, 43.0], isMapChange: true },
      { year: 2003, month: 11, headline: '玫瑰革命，谢瓦尔德纳泽下台', site: '第比利斯', coord: [44.79, 41.72] },
      { year: 2004, month: 5, headline: '阿贾里亚危机和平解决，阿巴希泽出走', site: '巴统', coord: [41.64, 41.64] },
      { year: 2008, month: 8, headline: '俄格战争：俄国承认阿布哈兹、南奥塞梯「独立」', site: '茨欣瓦利 · 哥里', coord: [43.96, 42.23], siteCoords: [[43.96, 42.23], [44.11, 41.98]], isMapChange: true },
      { year: 2023, month: 12, headline: '欧盟授予格鲁吉亚候选国地位', site: '第比利斯', coord: [44.79, 41.72] },
      { year: 2024, month: 11, headline: '政府宣布暂停入盟谈判，引发持续大规模抗议', site: '第比利斯', coord: [44.79, 41.72] }
    ],
    settlements: [
      { ancient: '第比利斯', modern: '第比利斯', coord: [44.79, 41.72], isCapital: true, remark: '首都' },
      { ancient: '库塔伊西', modern: '库塔伊西', coord: [42.7, 42.27], remark: '2012–2019 议会所在地' },
      { ancient: '巴统', modern: '巴统', coord: [41.64, 41.64], remark: '阿贾里亚自治共和国首府' }
    ]
  }
];
