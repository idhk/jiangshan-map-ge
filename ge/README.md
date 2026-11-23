# 格鲁吉亚历史版 · 第一框架（v0.2）

> 沿用「江山时序」的 **时代 → 版图阶段（phase / snap）→ 里程碑（milestone）** 结构。
> 时代划分以格鲁吉亚史为主轴，覆盖南高加索三国。拖动时间轴切换 50 个阶段的边界色块和图例；可输入年份或按时代跳转，也可点击地点查看史事。每阶段注明边界参考年，资料不足的地区留空。

从仓库根目录运行 `python3 -m http.server --bind 127.0.0.1 8000`，打开 [地图调试页](http://127.0.0.1:8000/ge/)。
运行 `node --test scripts/tests/georgia.test.js` 检查年代覆盖、疆域路径、政权引用和地点坐标。

参考底图取自 Natural Earth 的 [1∶50m 地形晕渲](https://www.naturalearthdata.com/downloads/50m-raster-data/50m-shaded-relief/)（v3.2.0）和 [Land、Lakes、Rivers](https://www.naturalearthdata.com/downloads/50m-physical-vectors/)（v5.1.2 数据包）。栅格与点位使用下表同一视野，经纬度线性投影；超出视野的史事仍列在里程碑中。

| 文件 | 内容 |
|---|---|
| [`ge_dynasty_data.js`](./ge_dynasty_data.js) | `window.GE_DYNASTY_DATA`：14 个时代 · 50 个版图快照 · 100 个里程碑（schema 同 `js/map_data.js`） |
| [`ge_polities.js`](./ge_polities.js) | `window.GE_POLITIES`：93 个政权色块（中文 / 格鲁吉亚语 / 英文）；`window.GE_ATLAS_CONFIG`：视野与语言 |
| [`borders-data.js`](./borders-data.js) | 50 个阶段的疆域色块。参考年份和裁剪规则在 [生成脚本](../scripts/build_ge_borders.py) 中 |

## 1. 已确定的设定

| 项 | 决定 |
|---|---|
| 起点 | 前 600 年（科尔基斯） |
| 视野 | 南高加索三国 + 周边，`bbox = [38.5, 37.5, 51.0, 44.8]` |
| 地名 | 中文 + 格鲁吉亚语原文（`titleKa` / `ka` / `siteKa`），英文备用 |
| 特殊区域 | 阿布哈兹、南奥塞梯、纳戈尔诺—卡拉巴赫、洛里中立区、巴统（1918–1920）：**只画色块**（`label: false`），不出标签、图例或悬浮说明 |

## 2. 时间轴总览

| # | 时代 key | 时代 | 格鲁吉亚语 | 年代 | 快照 |
|---|---|---|---|---|---|
| 1 | `colchis` | 科尔基斯与早期伊比利亚 | კოლხეთი და ადრეული იბერია | 前600–前302 | 2 |
| 2 | `pharnavazid` | 伊比利亚王国（法尔纳瓦兹王朝） | ქართლის სამეფო (ფარნავაზიანები) | 前302–前65 | 3 |
| 3 | `roman` | 罗马—帕提亚之间 | რომსა და პართიას შორის | 前65–326 | 3 |
| 4 | `christian_kartli` | 基督教化与瓦赫坦·戈尔加萨利 | ქრისტიანული ქართლი და ეგრისი | 326–580 | 3 |
| 5 | `principate` | 伊比利亚公国与阿拉伯统治 | ქართლის საერისმთავრო და არაბთა ბატონობა | 580–786 | 3 |
| 6 | `kingdoms` | 诸国并立 | ქართული სამეფო-სამთავროები | 786–1008 | 3 |
| 7 | `golden_age` | 统一王国 · 黄金时代 | ერთიანი საქართველოს სამეფო · ოქროს ხანა | 1008–1236 | 5 |
| 8 | `mongol` | 蒙古统治、复兴与帖木儿 | მონღოლთა ბატონობა და თემურლენგის ლაშქრობები | 1236–1490 | 5 |
| 9 | `three_kingdoms` | 三王国与奥斯曼—萨法维 | სამი სამეფო ოსმალეთსა და ირანს შორის | 1490–1762 | 4 |
| 10 | `kartli_kakheti` | 卡尔特利—卡赫季王国 | ქართლ-კახეთის სამეფო | 1762–1801 | 2 |
| 11 | `russian` | 俄罗斯帝国 | რუსეთის იმპერიის შემადგენლობაში | 1801–1918 | 4 |
| 12 | `drg` | 格鲁吉亚民主共和国 | საქართველოს დემოკრატიული რესპუბლიკა | 1918–1921 | 3 |
| 13 | `soviet` | 苏联时期 | საბჭოთა საქართველო | 1921–1991 | 5 |
| 14 | `independent` | 独立的格鲁吉亚 | დამოუკიდებელი საქართველო | 1991–今 | 5 |

## 3. 三国色块的组织方式

- 每阶段的 `polities` 是文字清单。疆域图例随已取得的几何更新，并复用同名政权的色系和中译名。`group` 分为 `ge` 格鲁吉亚、`am` 亚美尼亚、`az` 阿塞拜疆／高加索阿尔巴尼亚和 `ext` 外部帝国。
- 里程碑新增 `scope`：`am` = 亚美尼亚史，`az` = 阿塞拜疆史，缺省 = 格鲁吉亚史。时间轴可以按三国分别筛选。
- 三国主线举例：亚美尼亚 —— 阿尔塔希阿斯王朝、387 年瓜分、巴格拉图尼王朝、扎卡里德、埃里温汗国、1828 年入俄；阿塞拜疆 —— 高加索阿尔巴尼亚、希尔万沙国、沙达德、萨法维、诸汗国、1813 年入俄。

## 4. 疆域资料

- 主来源为 **James S. Bennett、Erin Mutch、Andrew Tollefson 等，Seshat Global History Databank 的 [Cliopatria 0.2.1](https://github.com/Seshat-Global-History-Databank/cliopatria/releases/tag/v0.2.1)**，遵循 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。取参考年对应的政权，裁剪到本页视野和现代海岸线，简化边界，过滤错置的地理片段。最晚的参考年为 2024 年。
- 科尔基斯和伊比利亚的早期虚线来自 **Deu、Cplakidas、Ercwlff 等** 的 [Early Georgian States, ca. 600–150 BC](https://commons.wikimedia.org/wiki/File:Georgian_States_Colchis_and_Iberia_(600-150BC)-en.svg)。用皮蒂乌斯、狄奥斯库里亚斯、法西斯、姆茨赫塔等图上点位配准，提取科尔基斯和伊比利亚核心区，简化后发布为 [early-boundaries.geojson](./early-boundaries.geojson)，遵循 [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)。原图涵盖数世纪，轮廓为阶段参考。
- 苏联后期加盟共和国资料来自 **Armenica.org、Artaxiad、Hellerick 等** 的 [Soviet Caucasus map, 1957–1991](https://commons.wikimedia.org/wiki/File:Soviet_Caucasus_map.svg)。用第比利斯、埃里温、巴库等图上点位配准，提取三共和国轮廓并简化，发布为 [soviet-boundaries.geojson](./soviet-boundaries.geojson)，遵循 [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)。1957 年前的苏联色块采用国际外边界。克卢霍里等阶段性行政界线待补。
- 2020 年秋季战事之后的纳卡参考范围和近年阿布哈兹参考范围来自 [Natural Earth v5.1.2](https://github.com/nvkelso/natural-earth-vector/blob/v5.1.2/geojson/ne_10m_admin_0_disputed_areas.geojson) 的 2022 年争议区数据。较早阶段的对应控制线仍有缺项。争议区以所引资料的范围为参考。

生成时向 [build_ge_borders.py](../scripts/build_ge_borders.py) 依次传入 Cliopatria v0.2.1 的 `cliopatria.geojson.zip`，以及 Natural Earth v5.1.2 的 `ne_50m_land.geojson`、`ne_50m_lakes.geojson`、`ne_10m_admin_0_disputed_areas.geojson`。例如 `uv run --with shapely==2.2.0 scripts/build_ge_borders.py cliopatria.geojson.zip ne_50m_land.geojson ne_50m_lakes.geojson ne_10m_admin_0_disputed_areas.geojson`。网页直接读取生成文件。

时间轴按疆域阶段分档，也可输入年份定位。1918、1919、1920 各有一档，分别对应格鲁吉亚民主共和国的三个阶段。巴统英军驻区和洛里中立区的细部界线待补。

## 5. 待核实

- 年代为约数或传统纪年的条目（数据中 `approx: true`）
- 格鲁吉亚语地名、政权名建议请母语者过一遍，尤其是古代政权的学术译名（如 აბაზგია、ზენდიანთა ირანი）
