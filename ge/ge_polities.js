/**
 * 格鲁吉亚历史版 · 政权色块登记表（v0.2）
 * ------------------------------------------------------------------
 * 地图视野 = 南高加索三国（格鲁吉亚、亚美尼亚、阿塞拜疆）及其周边。
 * 每个 phase 的 `polities` 数组引用这里的 id；一个 id 对应一种色块。
 *
 *   zh     中文名
 *   ka     格鲁吉亚语原文（ქართული）
 *   en     英文名
 *   group  ge = 格鲁吉亚诸政权 · am = 亚美尼亚诸政权 · az = 阿塞拜疆 / 阿尔巴尼亚诸政权 · ext = 外部帝国与周边
 *   label  false = 只画色块，不出文字标签、不进图例、不出悬浮说明
 */
window.GE_ATLAS_CONFIG = {
  bbox: [38.5, 37.5, 51.0, 44.8], // [minLon, minLat, maxLon, maxLat]，南高加索三国 + 周边
  fromYear: -600,
  toYear: 2026,
  langs: ['zh', 'ka', 'en']
};

window.GE_POLITIES = {
  // ── 格鲁吉亚诸政权 ──
  colchis:          { zh: '科尔基斯', ka: 'კოლხეთი', en: 'Colchis', group: 'ge' },
  kartli_tribes:    { zh: '卡尔特利诸部', ka: 'ქართლის ტომები', en: 'Kartlian tribes', group: 'ge' },
  iberia:           { zh: '伊比利亚（卡尔特利）王国', ka: 'ქართლის სამეფო', en: 'Kingdom of Iberia', group: 'ge' },
  lazica:           { zh: '拉齐卡（埃格里西）', ka: 'ეგრისის სამეფო', en: 'Lazica (Egrisi)', group: 'ge' },
  abasgia:          { zh: '阿巴斯基亚', ka: 'აბაზგია', en: 'Abasgia', group: 'ge' },
  iberia_principate:{ zh: '伊比利亚公国', ka: 'ქართლის საერისმთავრო', en: 'Principate of Iberia', group: 'ge' },
  tbilisi_emirate:  { zh: '第比利斯埃米尔国', ka: 'თბილისის საამირო', en: 'Emirate of Tbilisi', group: 'ge' },
  kakheti_pr:       { zh: '卡赫季公国', ka: 'კახეთის საქორეპისკოპოსო', en: 'Principality of Kakheti', group: 'ge' },
  hereti:           { zh: '赫雷季', ka: 'ჰერეთის სამეფო', en: 'Hereti', group: 'ge' },
  kakheti_hereti:   { zh: '卡赫季—赫雷季王国', ka: 'კახეთ-ჰერეთის სამეფო', en: 'Kingdom of Kakheti-Hereti', group: 'ge' },
  abkhaz_kingdom:   { zh: '阿布哈兹王国', ka: 'აფხაზთა სამეფო', en: 'Kingdom of Abkhazia', group: 'ge' },
  tao_klarjeti:     { zh: '陶—克拉尔杰季', ka: 'ტაო-კლარჯეთი', en: 'Tao-Klarjeti', group: 'ge' },
  kingdom_georgia:  { zh: '格鲁吉亚王国', ka: 'საქართველოს სამეფო', en: 'Kingdom of Georgia', group: 'ge' },
  imereti:          { zh: '伊梅列季王国', ka: 'იმერეთის სამეფო', en: 'Kingdom of Imereti', group: 'ge' },
  samtskhe:         { zh: '萨姆茨赫阿塔贝格国', ka: 'სამცხე-საათაბაგო', en: 'Samtskhe-Saatabago', group: 'ge' },
  kartli_kingdom:   { zh: '卡尔特利王国', ka: 'ქართლის სამეფო', en: 'Kingdom of Kartli', group: 'ge' },
  kakheti_kingdom:  { zh: '卡赫季王国', ka: 'კახეთის სამეფო', en: 'Kingdom of Kakheti', group: 'ge' },
  mingrelia:        { zh: '米格雷利亚公国', ka: 'სამეგრელოს სამთავრო', en: 'Principality of Mingrelia', group: 'ge' },
  guria:            { zh: '古利亚公国', ka: 'გურიის სამთავრო', en: 'Principality of Guria', group: 'ge' },
  abkhaz_pr:        { zh: '阿布哈兹公国', ka: 'აფხაზეთის სამთავრო', en: 'Principality of Abkhazia', group: 'ge' },
  svaneti:          { zh: '斯瓦涅季', ka: 'სვანეთი', en: 'Svaneti', group: 'ge' },
  kartli_kakheti:   { zh: '卡尔特利—卡赫季王国', ka: 'ქართლ-კახეთის სამეფო', en: 'Kingdom of Kartli-Kakheti', group: 'ge' },
  drg:              { zh: '格鲁吉亚民主共和国', ka: 'საქართველოს დემოკრატიული რესპუბლიკა', en: 'Democratic Republic of Georgia', group: 'ge' },
  ge_ssr:           { zh: '格鲁吉亚苏维埃社会主义共和国', ka: 'საქართველოს სსრ', en: 'Georgian SSR', group: 'ge' },
  abkhaz_ssr:       { zh: '阿布哈兹苏维埃社会主义共和国', ka: 'აფხაზეთის სსრ', en: 'SSR Abkhazia', group: 'ge' },
  georgia:          { zh: '格鲁吉亚', ka: 'საქართველო', en: 'Georgia', group: 'ge' },

  // ── 亚美尼亚诸政权 ──
  orontid_am:       { zh: '亚美尼亚（耶烈万德王朝）', ka: 'ერვანდიანთა სომხეთი', en: 'Orontid Armenia', group: 'am' },
  artaxiad_am:      { zh: '大亚美尼亚（阿尔塔希阿斯王朝）', ka: 'არტაშესიანთა სომხეთი', en: 'Artaxiad Armenia', group: 'am' },
  arsacid_am:       { zh: '亚美尼亚（阿尔沙克王朝）', ka: 'არშაკუნიანთა სომხეთი', en: 'Arsacid Armenia', group: 'am' },
  bagratid_am:      { zh: '巴格拉图尼亚美尼亚王国', ka: 'ბაგრატუნიანთა სომხეთი', en: 'Bagratid Armenia', group: 'am' },
  vaspurakan:       { zh: '瓦斯普拉坎王国', ka: 'ვასპურაკანი', en: 'Vaspurakan', group: 'am' },
  syunik:           { zh: '休尼克王国', ka: 'სივნიეთი', en: 'Syunik', group: 'am' },
  lori_am:          { zh: '塔希尔—佐拉盖特王国（洛里）', ka: 'ტაშირ-ძორაგეტის სამეფო', en: 'Kingdom of Tashir-Dzoraget', group: 'am' },
  zakarid:          { zh: '扎卡里德亚美尼亚', ka: 'ზაქარიანთა სომხეთი', en: 'Zakarid Armenia', group: 'am' },
  am_republic:      { zh: '亚美尼亚第一共和国', ka: 'სომხეთის პირველი რესპუბლიკა', en: 'First Republic of Armenia', group: 'am' },
  am_ssr:           { zh: '亚美尼亚苏维埃社会主义共和国', ka: 'სომხეთის სსრ', en: 'Armenian SSR', group: 'am' },
  armenia:          { zh: '亚美尼亚', ka: 'სომხეთი', en: 'Armenia', group: 'am' },

  // ── 阿塞拜疆 / 高加索阿尔巴尼亚诸政权 ──
  albania:          { zh: '高加索阿尔巴尼亚', ka: 'კავკასიის ალბანეთი', en: 'Caucasian Albania', group: 'az' },
  atropatene:       { zh: '米底亚·阿特罗帕特尼', ka: 'ატროპატენა', en: 'Media Atropatene', group: 'az' },
  shirvanshah:      { zh: '希尔万沙国', ka: 'შირვანშაჰთა სახელმწიფო', en: 'Shirvanshahs', group: 'az' },
  sajid:            { zh: '萨吉德王朝', ka: 'საჯიანები', en: 'Sajids', group: 'az' },
  shaddadid:        { zh: '沙达德王朝', ka: 'შადადიანები', en: 'Shaddadids', group: 'az' },
  eldiguzid:        { zh: '埃尔迪居兹王朝', ka: 'ელდიგუზიდები', en: 'Eldiguzids', group: 'az' },
  erivan_kh:        { zh: '埃里温汗国', ka: 'ერევნის სახანო', en: 'Erivan Khanate', group: 'az' },
  nakhchivan_kh:    { zh: '纳希切万汗国', ka: 'ნახჭევნის სახანო', en: 'Nakhchivan Khanate', group: 'az' },
  karabakh_kh:      { zh: '卡拉巴赫汗国', ka: 'ყარაბაღის სახანო', en: 'Karabakh Khanate', group: 'az' },
  ganja_kh:         { zh: '占贾汗国', ka: 'განჯის სახანო', en: 'Ganja Khanate', group: 'az' },
  shaki_kh:         { zh: '舍基汗国', ka: 'შაქის სახანო', en: 'Shaki Khanate', group: 'az' },
  shirvan_kh:       { zh: '希尔万汗国', ka: 'შირვანის სახანო', en: 'Shirvan Khanate', group: 'az' },
  quba_kh:          { zh: '古巴汗国', ka: 'ყუბის სახანო', en: 'Quba Khanate', group: 'az' },
  baku_kh:          { zh: '巴库汗国', ka: 'ბაქოს სახანო', en: 'Baku Khanate', group: 'az' },
  talysh_kh:        { zh: '塔雷什汗国', ka: 'თალიშის სახანო', en: 'Talysh Khanate', group: 'az' },
  az_adr:           { zh: '阿塞拜疆民主共和国', ka: 'აზერბაიჯანის დემოკრატიული რესპუბლიკა', en: 'Azerbaijan Democratic Republic', group: 'az' },
  az_ssr:           { zh: '阿塞拜疆苏维埃社会主义共和国', ka: 'აზერბაიჯანის სსრ', en: 'Azerbaijan SSR', group: 'az' },
  azerbaijan:       { zh: '阿塞拜疆', ka: 'აზერბაიჯანი', en: 'Azerbaijan', group: 'az' },

  // ── 只画色块、不出任何文字的区域 ──
  abkhazia_blk:     { zh: '阿布哈兹', ka: 'აფხაზეთი', en: 'Abkhazia', group: 'ge', label: false },
  south_ossetia_blk:{ zh: '南奥塞梯', ka: 'სამხრეთ ოსეთი', en: 'South Ossetia', group: 'ge', label: false },
  karabakh_blk:     { zh: '纳戈尔诺—卡拉巴赫', ka: 'მთიანი ყარაბაღი', en: 'Nagorno-Karabakh', group: 'az', label: false },
  lori_nz:          { zh: '洛里中立区', ka: 'ლორეს ნეიტრალური ზონა', en: 'Lori Neutral Zone', group: 'am', label: false },
  batum_brit:       { zh: '巴统（1918–1920）', ka: 'ბათუმის ოლქი', en: 'Batum (1918–1920)', group: 'ext', label: false },

  // ── 外部帝国与周边 ──
  achaemenid:       { zh: '阿契美尼德波斯', ka: 'აქემენიდთა იმპერია', en: 'Achaemenid Empire', group: 'ext' },
  seleucid:         { zh: '塞琉古帝国', ka: 'სელევკიანთა სახელმწიფო', en: 'Seleucid Empire', group: 'ext' },
  pontus:           { zh: '本都王国', ka: 'პონტოს სამეფო', en: 'Kingdom of Pontus', group: 'ext' },
  rome:             { zh: '罗马帝国', ka: 'რომის იმპერია', en: 'Roman Empire', group: 'ext' },
  parthia:          { zh: '帕提亚', ka: 'პართია', en: 'Parthia', group: 'ext' },
  sasanian:         { zh: '萨珊波斯', ka: 'სასანიანთა ირანი', en: 'Sasanian Iran', group: 'ext' },
  byzantine:        { zh: '拜占庭帝国', ka: 'ბიზანტიის იმპერია', en: 'Byzantine Empire', group: 'ext' },
  caliphate:        { zh: '阿拉伯哈里发国', ka: 'არაბთა სახალიფო', en: 'Arab Caliphate', group: 'ext' },
  khazar:           { zh: '可萨汗国', ka: 'ხაზართა სახაკანო', en: 'Khazar Khaganate', group: 'ext' },
  alania:           { zh: '阿兰王国', ka: 'ალანეთი', en: 'Alania', group: 'ext' },
  seljuk:           { zh: '塞尔柱帝国', ka: 'დიდი სელჩუკთა სახელმწიფო', en: 'Seljuk Empire', group: 'ext' },
  rum:              { zh: '鲁姆苏丹国', ka: 'რუმის სასულთნო', en: 'Sultanate of Rum', group: 'ext' },
  trebizond:        { zh: '特拉布宗帝国', ka: 'ტრაპიზონის იმპერია', en: 'Empire of Trebizond', group: 'ext' },
  khwarazm:         { zh: '花剌子模', ka: 'ხვარაზმი', en: 'Khwarazmian Empire', group: 'ext' },
  mongol_empire:    { zh: '蒙古帝国', ka: 'მონღოლთა იმპერია', en: 'Mongol Empire', group: 'ext' },
  ilkhanate:        { zh: '伊儿汗国', ka: 'ილხანთა სახელმწიფო', en: 'Ilkhanate', group: 'ext' },
  golden_horde:     { zh: '金帐汗国', ka: 'ოქროს ურდო', en: 'Golden Horde', group: 'ext' },
  jalayirid:        { zh: '札剌亦儿王朝', ka: 'ჯალაირიდები', en: 'Jalayirids', group: 'ext' },
  timurid:          { zh: '帖木儿帝国', ka: 'თემურიანთა სახელმწიფო', en: 'Timurid Empire', group: 'ext' },
  qara_qoyunlu:     { zh: '黑羊王朝', ka: 'ყარაყოიუნლუ', en: 'Qara Qoyunlu', group: 'ext' },
  aq_qoyunlu:       { zh: '白羊王朝', ka: 'აყყოიუნლუ', en: 'Aq Qoyunlu', group: 'ext' },
  ottoman:          { zh: '奥斯曼帝国', ka: 'ოსმალეთის იმპერია', en: 'Ottoman Empire', group: 'ext' },
  safavid:          { zh: '萨法维波斯', ka: 'სეფიანთა ირანი', en: 'Safavid Iran', group: 'ext' },
  afsharid:         { zh: '阿夫沙尔波斯', ka: 'აფშართა ირანი', en: 'Afsharid Iran', group: 'ext' },
  zand:             { zh: '赞德波斯', ka: 'ზენდიანთა ირანი', en: 'Zand Iran', group: 'ext' },
  qajar:            { zh: '卡扎尔波斯', ka: 'ყაჯართა ირანი', en: 'Qajar Iran', group: 'ext' },
  north_caucasus:   { zh: '北高加索诸部', ka: 'ჩრდილოეთ კავკასიის ტომები', en: 'North Caucasian peoples', group: 'ext' },
  russia:           { zh: '俄罗斯帝国', ka: 'რუსეთის იმპერია', en: 'Russian Empire', group: 'ext' },
  russia_civil:     { zh: '俄国（内战时期）', ka: 'რუსეთი', en: 'Russia (Civil War)', group: 'ext' },
  rsfsr:            { zh: '俄罗斯苏维埃联邦社会主义共和国', ka: 'რსფსრ', en: 'RSFSR', group: 'ext' },
  russia_fed:       { zh: '俄罗斯联邦', ka: 'რუსეთის ფედერაცია', en: 'Russian Federation', group: 'ext' },
  turkey:           { zh: '土耳其', ka: 'თურქეთი', en: 'Turkey', group: 'ext' },
  iran:             { zh: '伊朗', ka: 'ირანი', en: 'Iran', group: 'ext' }
};
