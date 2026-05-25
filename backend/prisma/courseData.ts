/**
 * DSE course data extracted from course_info JSON files.
 *
 * Structure per subject:
 *   小一至小六  → Primary
 *   中一至中三  → Junior Secondary
 *   中四至中六  → Senior Secondary (DSE)
 *
 * Each chapter contains knowledge_points extracted from the official
 * Hong Kong DSE curriculum documents.
 */

// ============================================================
// 数学 Mathematics
// ============================================================

export const mathPrimaryChapters = [
  {
    name: '小一 — 数与代数',
    sortOrder: 1,
    knowledgePoints: [
      { name: '数的认识', desc: '认识10以内的数，理解数的基本概念', sortOrder: 1 },
      { name: '数的顺序', desc: '理解数的大小关系和顺序', sortOrder: 2 },
      { name: '数的组成', desc: '理解数的组成和分解', sortOrder: 3 },
      { name: '加法', desc: '掌握10以内的加法运算', sortOrder: 4 },
      { name: '减法', desc: '掌握10以内的减法运算', sortOrder: 5 },
      { name: '加减混合运算', desc: '理解加减混合运算的顺序', sortOrder: 6 },
      { name: '简单应用题', desc: '运用加减法解决简单实际问题', sortOrder: 7 },
      { name: '生活情境中的数学', desc: '在生活中发现和运用数学', sortOrder: 8 },
    ]
  },
  {
    name: '小一 — 量度与图形',
    sortOrder: 2,
    knowledgePoints: [
      { name: '图形认识', desc: '认识圆形、正方形、长方形、三角形', sortOrder: 1 },
      { name: '长度', desc: '初步认识长度的概念和比较', sortOrder: 2 },
      { name: '重量', desc: '初步认识重量的概念和比较', sortOrder: 3 },
      { name: '时间', desc: '认识整点和半点', sortOrder: 4 },
      { name: '大小比较', desc: '比较物体的大小、长短、轻重', sortOrder: 5 },
    ]
  },
  {
    name: '小二 — 数与代数',
    sortOrder: 3,
    knowledgePoints: [
      { name: '100以内数的认识', desc: '认识和读写100以内的数', sortOrder: 1 },
      { name: '两位数加减法', desc: '掌握两位数的加减运算', sortOrder: 2 },
      { name: '表内乘法', desc: '初步认识乘法，学习乘法口诀', sortOrder: 3 },
      { name: '四则运算', desc: '理解加减乘除的运算顺序', sortOrder: 4 },
      { name: '两步应用题', desc: '解决需要两步计算的应用题', sortOrder: 5 },
    ]
  },
  {
    name: '小三 — 数与代数',
    sortOrder: 4,
    knowledgePoints: [
      { name: '万以内数的认识', desc: '认识和读写万以内的数', sortOrder: 1 },
      { name: '数的读写', desc: '正确读写多位数', sortOrder: 2 },
      { name: '多位数加减法', desc: '掌握多位数的加减运算', sortOrder: 3 },
      { name: '乘除法', desc: '掌握多位数乘除一位数', sortOrder: 4 },
      { name: '混合运算', desc: '掌握四则混合运算', sortOrder: 5 },
      { name: '分数的初步认识', desc: '认识分数的基本概念', sortOrder: 6 },
      { name: '简单分数的大小比较', desc: '比较同分母分数的大小', sortOrder: 7 },
    ]
  },
  {
    name: '小四 — 数与代数',
    sortOrder: 5,
    knowledgePoints: [
      { name: '大数的认识', desc: '认识亿以内的大数', sortOrder: 1 },
      { name: '分数的意义', desc: '理解分数表示部分与整体的关系', sortOrder: 2 },
      { name: '分数的性质', desc: '理解分数的基本性质', sortOrder: 3 },
      { name: '分数的大小比较', desc: '比较分数的大小', sortOrder: 4 },
      { name: '小数的初步认识', desc: '认识小数的基本概念', sortOrder: 5 },
      { name: '小数的加减法', desc: '掌握小数的加减运算', sortOrder: 6 },
    ]
  },
  {
    name: '小五 — 数与代数',
    sortOrder: 6,
    knowledgePoints: [
      { name: '分数的加减法', desc: '掌握同分母和异分母分数的加减', sortOrder: 1 },
      { name: '分数的乘除法', desc: '掌握分数的乘除运算', sortOrder: 2 },
      { name: '小数的四则运算', desc: '掌握小数的加减乘除', sortOrder: 3 },
      { name: '百分数的认识', desc: '理解百分数的意义', sortOrder: 4 },
      { name: '百分数的应用', desc: '运用百分数解决实际问题', sortOrder: 5 },
    ]
  },
  {
    name: '小六 — 数与代数',
    sortOrder: 7,
    knowledgePoints: [
      { name: '整数运算', desc: '复习整数的四则运算', sortOrder: 1 },
      { name: '分数运算', desc: '复习分数的四则运算', sortOrder: 2 },
      { name: '小数运算', desc: '复习小数的四则运算', sortOrder: 3 },
      { name: '百分数的应用', desc: '折扣、利率等百分数实际问题', sortOrder: 4 },
      { name: '比的认识', desc: '理解比的意义和性质', sortOrder: 5 },
      { name: '比例的应用', desc: '运用比例解决实际问题', sortOrder: 6 },
    ]
  },
];

export const mathJuniorChapters = [
  {
    name: '中一 — 数与代数',
    sortOrder: 8,
    knowledgePoints: [
      { name: '有理数的概念', desc: '理解正数、负数和零的概念', sortOrder: 1 },
      { name: '有理数的加减法', desc: '掌握有理数的加减运算', sortOrder: 2 },
      { name: '有理数的乘除法', desc: '掌握有理数的乘除运算', sortOrder: 3 },
      { name: '代数式的概念', desc: '理解用字母表示数', sortOrder: 4 },
      { name: '代数式的化简', desc: '合并同类项，化简代数式', sortOrder: 5 },
      { name: '代数式的值', desc: '求代数式在给定值时的结果', sortOrder: 6 },
      { name: '一元一次方程', desc: '列一元一次方程解决问题', sortOrder: 7 },
      { name: '方程的解法', desc: '掌握一元一次方程的解法', sortOrder: 8 },
      { name: '方程的应用', desc: '运用方程解决实际问题', sortOrder: 9 },
      { name: '不等式的概念', desc: '理解不等式及其解集', sortOrder: 10 },
      { name: '不等式的性质', desc: '掌握不等式的基本性质', sortOrder: 11 },
    ]
  },
  {
    name: '中一 — 量度、图形与空间',
    sortOrder: 9,
    knowledgePoints: [
      { name: '角的概念', desc: '理解角的定义和度量', sortOrder: 1 },
      { name: '角的分类', desc: '认识锐角、直角、钝角、平角、周角', sortOrder: 2 },
      { name: '角的性质', desc: '掌握角的平分线、互余、互补等性质', sortOrder: 3 },
      { name: '三角形的分类', desc: '按角和边分类三角形', sortOrder: 4 },
      { name: '三角形的性质', desc: '三角形内角和、三边关系', sortOrder: 5 },
      { name: '全等三角形', desc: '全等三角形的判定和性质', sortOrder: 6 },
      { name: '四边形', desc: '平行四边形、矩形、菱形、正方形', sortOrder: 7 },
      { name: '多边形内角和', desc: '掌握多边形内角和公式', sortOrder: 8 },
      { name: '圆的基本概念', desc: '圆心、半径、直径、弧、弦', sortOrder: 9 },
      { name: '圆的性质', desc: '垂径定理、圆周角定理', sortOrder: 10 },
    ]
  },
  {
    name: '中一 — 数据处理',
    sortOrder: 10,
    knowledgePoints: [
      { name: '数据类型', desc: '定性数据和定量数据', sortOrder: 1 },
      { name: '数据收集方法', desc: '调查、实验、观察等方法', sortOrder: 2 },
      { name: '数据整理方法', desc: '分组、排序、制表', sortOrder: 3 },
      { name: '条形图', desc: '制作和解读条形统计图', sortOrder: 4 },
      { name: '折线图', desc: '制作和解读折线统计图', sortOrder: 5 },
      { name: '饼图', desc: '制作和解读扇形统计图', sortOrder: 6 },
      { name: '平均数', desc: '计算和理解算术平均数', sortOrder: 7 },
      { name: '中位数', desc: '计算和理解中位数', sortOrder: 8 },
      { name: '众数', desc: '计算和理解众数', sortOrder: 9 },
      { name: '概率的初步认识', desc: '理解随机事件和概率', sortOrder: 10 },
      { name: '简单事件概率', desc: '计算简单事件的概率', sortOrder: 11 },
    ]
  },
  {
    name: '中二 — 数与代数',
    sortOrder: 11,
    knowledgePoints: [
      { name: '实数的概念', desc: '理解有理数和无理数', sortOrder: 1 },
      { name: '实数的运算', desc: '掌握实数的四则运算', sortOrder: 2 },
      { name: '平方根', desc: '理解平方根和算术平方根', sortOrder: 3 },
      { name: '多项式的概念', desc: '理解多项式和次数', sortOrder: 4 },
      { name: '多项式的加减', desc: '掌握多项式的加减运算', sortOrder: 5 },
      { name: '多项式的乘法', desc: '掌握多项式的乘法运算', sortOrder: 6 },
      { name: '一元一次不等式', desc: '解一元一次不等式', sortOrder: 7 },
      { name: '不等式组', desc: '解一元一次不等式组', sortOrder: 8 },
      { name: '绝对值不等式', desc: '解含绝对值的不等式', sortOrder: 9 },
      { name: '函数的概念', desc: '理解函数的定义和对应关系', sortOrder: 10 },
      { name: '函数的表示法', desc: '列表法、图像法、解析法', sortOrder: 11 },
      { name: '函数的图像', desc: '绘制和解读函数图像', sortOrder: 12 },
    ]
  },
  {
    name: '中二 — 几何与空间',
    sortOrder: 12,
    knowledgePoints: [
      { name: '平行四边形的性质', desc: '平行四边形的判定和性质', sortOrder: 1 },
      { name: '特殊平行四边形', desc: '矩形、菱形、正方形的性质', sortOrder: 2 },
      { name: '梯形的性质', desc: '梯形和等腰梯形的性质', sortOrder: 3 },
      { name: '圆的性质', desc: '切线、弦切角、圆心角', sortOrder: 4 },
      { name: '切线', desc: '切线的判定和性质', sortOrder: 5 },
      { name: '圆周角', desc: '圆周角定理及其应用', sortOrder: 6 },
      { name: '相似三角形', desc: '相似三角形的判定和性质', sortOrder: 7 },
      { name: '相似多边形', desc: '相似多边形的性质', sortOrder: 8 },
      { name: '相似的应用', desc: '运用相似解决测量问题', sortOrder: 9 },
    ]
  },
  {
    name: '中二 — 统计与概率',
    sortOrder: 13,
    knowledgePoints: [
      { name: '数据的分布', desc: '理解数据的集中趋势和离散程度', sortOrder: 1 },
      { name: '数据的离散程度', desc: '极差、方差、标准差', sortOrder: 2 },
      { name: '抽样方法', desc: '简单随机抽样、分层抽样', sortOrder: 3 },
      { name: '估计', desc: '用样本估计总体', sortOrder: 4 },
      { name: '概率公式', desc: '古典概型和几何概型', sortOrder: 5 },
      { name: '条件概率', desc: '理解条件概率的概念', sortOrder: 6 },
      { name: '独立事件', desc: '理解事件的独立性', sortOrder: 7 },
      { name: '复合统计图表', desc: '制作和分析复合统计图表', sortOrder: 8 },
      { name: '统计图表分析', desc: '从统计图表中提取信息', sortOrder: 9 },
    ]
  },
  {
    name: '中三 — 数与代数',
    sortOrder: 14,
    knowledgePoints: [
      { name: '二次方程的解法', desc: '因式分解、配方法、公式法', sortOrder: 1 },
      { name: '判别式', desc: '利用判别式判断根的情况', sortOrder: 2 },
      { name: '根与系数的关系', desc: '韦达定理及其应用', sortOrder: 3 },
      { name: '一次函数', desc: '一次函数的图像和性质', sortOrder: 4 },
      { name: '二次函数', desc: '二次函数的图像和性质', sortOrder: 5 },
      { name: '函数的性质', desc: '单调性、奇偶性、最值', sortOrder: 6 },
      { name: '指数的概念', desc: '理解指数的意义', sortOrder: 7 },
      { name: '指数的运算', desc: '掌握指数运算法则', sortOrder: 8 },
      { name: '指数函数', desc: '指数函数的图像和性质', sortOrder: 9 },
      { name: '对数的概念', desc: '理解对数的定义', sortOrder: 10 },
      { name: '对数的运算', desc: '掌握对数运算法则', sortOrder: 11 },
      { name: '对数函数', desc: '对数函数的图像和性质', sortOrder: 12 },
    ]
  },
  {
    name: '中三 — 几何与三角学',
    sortOrder: 15,
    knowledgePoints: [
      { name: '三角形的性质', desc: '三角形的中线、高、角平分线', sortOrder: 1 },
      { name: '三角形的面积', desc: '各种三角形面积公式', sortOrder: 2 },
      { name: '勾股定理', desc: '勾股定理及其逆定理', sortOrder: 3 },
      { name: '三角函数的定义', desc: '正弦、余弦、正切的定义', sortOrder: 4 },
      { name: '三角函数的性质', desc: '三角函数的周期性和单调性', sortOrder: 5 },
      { name: '三角函数的图像', desc: '绘制三角函数图像', sortOrder: 6 },
      { name: '圆的性质', desc: '圆幂定理、圆和直线的位置关系', sortOrder: 7 },
      { name: '圆周角', desc: '圆周角定理的深入应用', sortOrder: 8 },
      { name: '切线', desc: '切线长定理', sortOrder: 9 },
      { name: '向量的概念', desc: '理解向量的定义和表示', sortOrder: 10 },
      { name: '向量的运算', desc: '向量的加减、数乘', sortOrder: 11 },
      { name: '向量的应用', desc: '运用向量解决几何问题', sortOrder: 12 },
    ]
  },
  {
    name: '中三 — 统计与概率',
    sortOrder: 16,
    knowledgePoints: [
      { name: '数据的分析', desc: '数据的整理、描述和分析', sortOrder: 1 },
      { name: '统计推断', desc: '用样本推断总体特征', sortOrder: 2 },
      { name: '回归分析', desc: '线性回归的基本思想', sortOrder: 3 },
      { name: '概率分布', desc: '离散型随机变量的分布', sortOrder: 4 },
      { name: '期望值', desc: '计算随机变量的期望', sortOrder: 5 },
      { name: '大数定律', desc: '理解频率与概率的关系', sortOrder: 6 },
      { name: '高级统计图表', desc: '箱线图、散点图等', sortOrder: 7 },
      { name: '统计在生活中的应用', desc: '运用统计知识解决实际问题', sortOrder: 8 },
      { name: '概率在决策中的应用', desc: '运用概率进行决策', sortOrder: 9 },
    ]
  },
];

export const mathSeniorChapters = [
  {
    name: '中四 — 代数与函数',
    sortOrder: 17,
    knowledgePoints: [
      { name: '二次函数', desc: '二次函数的图像、性质和最值', sortOrder: 1 },
      { name: '函数图像', desc: '函数图像的变换和性质分析', sortOrder: 2 },
      { name: '函数性质', desc: '定义域、值域、单调性、奇偶性', sortOrder: 3 },
      { name: '多项式运算', desc: '多项式的乘除、因式分解', sortOrder: 4 },
      { name: '多项式方程', desc: '高次方程的解法', sortOrder: 5 },
      { name: '多项式函数', desc: '多项式函数的图像和性质', sortOrder: 6 },
      { name: '指数函数', desc: '指数函数的图像、性质和应用', sortOrder: 7 },
      { name: '对数函数', desc: '对数函数的图像、性质和应用', sortOrder: 8 },
      { name: '指数对数方程', desc: '解指数方程和对数方程', sortOrder: 9 },
      { name: '不等式解法', desc: '一元二次不等式、分式不等式', sortOrder: 10 },
      { name: '不等式应用', desc: '运用不等式解决最优化问题', sortOrder: 11 },
    ]
  },
  {
    name: '中四 — 几何与三角学',
    sortOrder: 18,
    knowledgePoints: [
      { name: '三角函数定义', desc: '任意角的三角函数定义', sortOrder: 1 },
      { name: '三角函数图像', desc: '正弦、余弦、正切函数的图像', sortOrder: 2 },
      { name: '三角函数性质', desc: '周期性、对称性、单调性', sortOrder: 3 },
      { name: '基本恒等式', desc: '同角三角函数关系', sortOrder: 4 },
      { name: '和差公式', desc: '两角和与差的三角函数', sortOrder: 5 },
      { name: '倍角公式', desc: '二倍角、半角公式', sortOrder: 6 },
      { name: '正弦定理', desc: '正弦定理及其应用', sortOrder: 7 },
      { name: '余弦定理', desc: '余弦定理及其应用', sortOrder: 8 },
      { name: '解三角形应用', desc: '运用正余弦定理解决实际问题', sortOrder: 9 },
      { name: '向量运算', desc: '向量的坐标运算', sortOrder: 10 },
      { name: '向量应用', desc: '向量在几何和物理中的应用', sortOrder: 11 },
      { name: '向量几何', desc: '用向量方法证明几何命题', sortOrder: 12 },
    ]
  },
  {
    name: '中四 — 统计与概率',
    sortOrder: 19,
    knowledgePoints: [
      { name: '数据分布', desc: '正态分布及其特征', sortOrder: 1 },
      { name: '统计量', desc: '均值、方差、标准差的计算', sortOrder: 2 },
      { name: '数据可视化', desc: '直方图、茎叶图、箱线图', sortOrder: 3 },
      { name: '离散分布', desc: '二项分布、泊松分布', sortOrder: 4 },
      { name: '连续分布', desc: '正态分布及其应用', sortOrder: 5 },
      { name: '参数估计', desc: '点估计和区间估计', sortOrder: 6 },
      { name: '假设检验', desc: '基本假设检验方法', sortOrder: 7 },
      { name: '回归分析', desc: '线性回归方程的建立和应用', sortOrder: 8 },
      { name: '条件概率', desc: '贝叶斯公式及其应用', sortOrder: 9 },
      { name: '独立事件', desc: '独立事件的概率计算', sortOrder: 10 },
      { name: '期望值', desc: '随机变量的期望和方差', sortOrder: 11 },
    ]
  },
  {
    name: '中五 — 微积分基础',
    sortOrder: 20,
    knowledgePoints: [
      { name: '极限概念', desc: '理解极限的定义和直观意义', sortOrder: 1 },
      { name: '极限运算', desc: '极限的四则运算法则', sortOrder: 2 },
      { name: '极限应用', desc: '连续性的判断', sortOrder: 3 },
      { name: '导数概念', desc: '导数的定义和几何意义', sortOrder: 4 },
      { name: '导数运算', desc: '基本求导公式和法则', sortOrder: 5 },
      { name: '导数应用', desc: '切线、单调性、极值、最优化', sortOrder: 6 },
      { name: '不定积分', desc: '原函数和不定积分的概念', sortOrder: 7 },
      { name: '定积分', desc: '定积分的定义和几何意义', sortOrder: 8 },
      { name: '积分应用', desc: '面积、体积的计算', sortOrder: 9 },
      { name: '最优化问题', desc: '运用导数解决最优化问题', sortOrder: 10 },
      { name: '面积体积', desc: '用积分计算平面图形面积', sortOrder: 11 },
      { name: '变化率', desc: '导数在实际问题中的应用', sortOrder: 12 },
    ]
  },
  {
    name: '中五 — 代数与几何',
    sortOrder: 21,
    knowledgePoints: [
      { name: '矩阵运算', desc: '矩阵的加减、乘法、转置', sortOrder: 1 },
      { name: '行列式', desc: '二阶和三阶行列式的计算', sortOrder: 2 },
      { name: '线性方程组', desc: '用矩阵方法解线性方程组', sortOrder: 3 },
      { name: '直线', desc: '直线的方程和位置关系', sortOrder: 4 },
      { name: '圆', desc: '圆的标准方程和一般方程', sortOrder: 5 },
      { name: '圆锥曲线', desc: '椭圆、双曲线、抛物线', sortOrder: 6 },
      { name: '向量空间', desc: '向量空间的基本概念', sortOrder: 7 },
      { name: '内积', desc: '向量的内积和夹角', sortOrder: 8 },
      { name: '叉积', desc: '向量的叉积及其应用', sortOrder: 9 },
      { name: '几何证明', desc: '用解析法证明几何命题', sortOrder: 10 },
      { name: '轨迹问题', desc: '求动点的轨迹方程', sortOrder: 11 },
      { name: '极值问题', desc: '条件极值的求法', sortOrder: 12 },
    ]
  },
  {
    name: '中五 — 统计与概率进阶',
    sortOrder: 22,
    knowledgePoints: [
      { name: '方差分析', desc: '单因素方差分析', sortOrder: 1 },
      { name: '时间序列', desc: '时间序列的基本分析', sortOrder: 2 },
      { name: '随机变量', desc: '离散型和连续型随机变量', sortOrder: 3 },
      { name: '概率分布', desc: '常见概率分布的性质', sortOrder: 4 },
      { name: '大数定律', desc: '大数定律和中心极限定理', sortOrder: 5 },
      { name: '回归分析', desc: '多元线性回归', sortOrder: 6 },
      { name: '统计推断', desc: '置信区间和假设检验', sortOrder: 7 },
      { name: '数据分析', desc: '实际数据的统计分析', sortOrder: 8 },
      { name: '预测', desc: '利用统计模型进行预测', sortOrder: 9 },
      { name: '决策', desc: '统计方法在决策中的应用', sortOrder: 10 },
    ]
  },
  {
    name: '中六 — 数学专题研究',
    sortOrder: 23,
    knowledgePoints: [
      { name: '纯数学', desc: '数论、抽象代数初步', sortOrder: 1 },
      { name: '应用数学', desc: '数学建模和优化', sortOrder: 2 },
      { name: '统计数学', desc: '高级统计方法', sortOrder: 3 },
      { name: '文献综述', desc: '查阅和综述相关文献', sortOrder: 4 },
      { name: '数据分析', desc: '收集和分析研究数据', sortOrder: 5 },
      { name: '模型构建', desc: '建立数学模型', sortOrder: 6 },
      { name: '选题', desc: '确定研究方向和题目', sortOrder: 7 },
      { name: '研究设计', desc: '设计研究方案', sortOrder: 8 },
      { name: '结果分析', desc: '分析和解释研究结果', sortOrder: 9 },
      { name: '引用格式', desc: '学术引用规范', sortOrder: 10 },
      { name: '学术诚信', desc: '学术道德和规范', sortOrder: 11 },
    ]
  },
  {
    name: '中六 — 数学应用',
    sortOrder: 24,
    knowledgePoints: [
      { name: '数学模型', desc: '建立实际问题的数学模型', sortOrder: 1 },
      { name: '模型求解', desc: '求解数学模型', sortOrder: 2 },
      { name: '模型验证', desc: '验证模型的合理性', sortOrder: 3 },
      { name: '线性规划', desc: '线性规划问题的求解', sortOrder: 4 },
      { name: '非线性规划', desc: '非线性优化方法', sortOrder: 5 },
      { name: '动态规划', desc: '动态规划的基本思想', sortOrder: 6 },
      { name: '数值计算', desc: '数值计算方法和误差分析', sortOrder: 7 },
      { name: '数值分析', desc: '插值、逼近、数值积分', sortOrder: 8 },
      { name: '算法设计', desc: '设计解决问题的算法', sortOrder: 9 },
      { name: '科学应用', desc: '数学在科学中的应用', sortOrder: 10 },
      { name: '工程应用', desc: '数学在工程中的应用', sortOrder: 11 },
      { name: '经济应用', desc: '数学在经济学中的应用', sortOrder: 12 },
    ]
  },
  {
    name: '中六 — 高阶数学专题',
    sortOrder: 25,
    knowledgePoints: [
      { name: '图论', desc: '图的基本概念和算法', sortOrder: 1 },
      { name: '组合数学', desc: '排列组合、容斥原理', sortOrder: 2 },
      { name: '数论', desc: '整除、同余、素数', sortOrder: 3 },
      { name: '复变函数', desc: '复数与复变函数初步', sortOrder: 4 },
      { name: '微分方程', desc: '常微分方程的基本解法', sortOrder: 5 },
      { name: '积分方程', desc: '积分方程初步', sortOrder: 6 },
      { name: '抽象代数', desc: '群、环、域的基本概念', sortOrder: 7 },
      { name: '拓扑学', desc: '拓扑空间初步', sortOrder: 8 },
      { name: '数学分析', desc: '实分析基础', sortOrder: 9 },
      { name: '数学史', desc: '数学发展历程', sortOrder: 10 },
      { name: '数学家', desc: '著名数学家的贡献', sortOrder: 11 },
      { name: '数学思想', desc: '重要的数学思想方法', sortOrder: 12 },
    ]
  },
];

// ============================================================
// 英语 English
// ============================================================

export const englishPrimaryChapters = [
  {
    name: 'P1 — Greetings and Introductions',
    sortOrder: 1,
    knowledgePoints: [
      { name: '问候语', desc: 'Hello, Good morning, Good afternoon', sortOrder: 1 },
      { name: '自我介绍', desc: 'My name is..., I am... years old', sortOrder: 2 },
      { name: '询问姓名', desc: 'What is your name?', sortOrder: 3 },
      { name: '字母发音', desc: '26个字母的发音', sortOrder: 4 },
      { name: '拼读规则', desc: '基本拼读规则', sortOrder: 5 },
    ]
  },
  {
    name: 'P1 — Family and Friends',
    sortOrder: 2,
    knowledgePoints: [
      { name: '家庭成员', desc: 'father, mother, brother, sister, grandpa, grandma', sortOrder: 1 },
      { name: '介绍家人', desc: 'This is my...', sortOrder: 2 },
      { name: '描述朋友', desc: 'He/She is...', sortOrder: 3 },
      { name: '名词单复数', desc: '单数和复数的基本变化', sortOrder: 4 },
      { name: '形容词用法', desc: '描述人的形容词', sortOrder: 5 },
    ]
  },
  {
    name: 'P1 — School Life',
    sortOrder: 3,
    knowledgePoints: [
      { name: '学校设施', desc: 'classroom, library, playground', sortOrder: 1 },
      { name: '科目', desc: 'English, Maths, Music, PE', sortOrder: 2 },
      { name: '表达喜好', desc: 'I like..., I don\'t like...', sortOrder: 3 },
      { name: '动词现在时', desc: '一般现在时的基本用法', sortOrder: 4 },
      { name: '介词用法', desc: 'in, on, at, under', sortOrder: 5 },
    ]
  },
  {
    name: 'P2 — Daily Routines',
    sortOrder: 4,
    knowledgePoints: [
      { name: '日常活动', desc: 'get up, go to school, eat lunch, do homework', sortOrder: 1 },
      { name: '时间表达', desc: 'at 7 o\'clock, in the morning', sortOrder: 2 },
      { name: '一般现在时', desc: '描述日常习惯', sortOrder: 3 },
      { name: '时间状语', desc: 'always, usually, sometimes, never', sortOrder: 4 },
      { name: '频率副词', desc: 'often, rarely, every day', sortOrder: 5 },
    ]
  },
  {
    name: 'P2 — Hobbies and Interests',
    sortOrder: 5,
    knowledgePoints: [
      { name: '兴趣爱好', desc: 'reading, swimming, playing football', sortOrder: 1 },
      { name: '表达喜好', desc: 'I like..., I enjoy...', sortOrder: 2 },
      { name: '情态动词', desc: 'can 表示能力', sortOrder: 3 },
      { name: '动词ing形式', desc: 'like + V-ing', sortOrder: 4 },
      { name: '连接词', desc: 'and, but, or, because', sortOrder: 5 },
    ]
  },
  {
    name: 'P3 — Food and Drinks',
    sortOrder: 6,
    knowledgePoints: [
      { name: '食物', desc: 'apple, bread, rice, noodles, fish', sortOrder: 1 },
      { name: '饮料', desc: 'water, milk, juice, tea', sortOrder: 2 },
      { name: '点餐', desc: 'I want..., Can I have...?', sortOrder: 3 },
      { name: '名词复数', desc: '规则和不规则复数', sortOrder: 4 },
      { name: '可数不可数', desc: 'countable and uncountable nouns', sortOrder: 5 },
      { name: 'some/any', desc: 'some 和 any 的用法', sortOrder: 6 },
    ]
  },
  {
    name: 'P3 — Weather and Seasons',
    sortOrder: 7,
    knowledgePoints: [
      { name: '天气', desc: 'sunny, rainy, cloudy, windy, snowy', sortOrder: 1 },
      { name: '季节', desc: 'spring, summer, autumn, winter', sortOrder: 2 },
      { name: '天气表达', desc: 'It is..., The weather is...', sortOrder: 3 },
      { name: '条件句', desc: 'If it rains, ...', sortOrder: 4 },
      { name: 'because', desc: '表达原因', sortOrder: 5 },
    ]
  },
  {
    name: 'P4 — Holidays and Celebrations',
    sortOrder: 8,
    knowledgePoints: [
      { name: '节日', desc: 'Christmas, Chinese New Year, Mid-Autumn Festival', sortOrder: 1 },
      { name: '庆祝活动', desc: 'celebrate, party, fireworks', sortOrder: 2 },
      { name: '过去时', desc: '一般过去时的基本用法', sortOrder: 3 },
      { name: '节日表达', desc: 'We celebrate..., I enjoyed...', sortOrder: 4 },
      { name: '文化介绍', desc: '介绍不同文化的节日', sortOrder: 5 },
    ]
  },
  {
    name: 'P4 — Animals and Nature',
    sortOrder: 9,
    knowledgePoints: [
      { name: '动物', desc: 'cat, dog, elephant, tiger, panda', sortOrder: 1 },
      { name: '自然', desc: 'forest, ocean, mountain, river', sortOrder: 2 },
      { name: '形容词比较级', desc: 'bigger, smaller, faster', sortOrder: 3 },
      { name: '情态动词', desc: 'should, must 表示建议和义务', sortOrder: 4 },
      { name: '表达观点', desc: 'I think..., We should...', sortOrder: 5 },
    ]
  },
  {
    name: 'P5 — Travel and Transport',
    sortOrder: 10,
    knowledgePoints: [
      { name: '旅行', desc: 'travel, trip, journey, destination', sortOrder: 1 },
      { name: '交通', desc: 'bus, train, plane, car, MTR', sortOrder: 2 },
      { name: '过去时', desc: '描述旅行经历', sortOrder: 3 },
      { name: '将来时', desc: '计划旅行', sortOrder: 4 },
      { name: '交通表达', desc: 'I went to..., I traveled by...', sortOrder: 5 },
    ]
  },
  {
    name: 'P5 — Health and Fitness',
    sortOrder: 11,
    knowledgePoints: [
      { name: '健康', desc: 'healthy, sick, exercise, sleep', sortOrder: 1 },
      { name: '运动', desc: 'running, swimming, cycling, yoga', sortOrder: 2 },
      { name: '情态动词', desc: 'should, need to 表示建议', sortOrder: 3 },
      { name: '建议表达', desc: 'You should..., It is important to...', sortOrder: 4 },
      { name: '原因说明', desc: 'because, so, therefore', sortOrder: 5 },
    ]
  },
  {
    name: 'P6 — School and Future',
    sortOrder: 12,
    knowledgePoints: [
      { name: '学校生活', desc: 'subjects, activities, teachers, classmates', sortOrder: 1 },
      { name: '未来计划', desc: 'I want to..., I plan to..., I hope to...', sortOrder: 2 },
      { name: '将来时', desc: 'will, be going to', sortOrder: 3 },
      { name: '目标表达', desc: 'My goal is to...', sortOrder: 4 },
      { name: '条件句', desc: 'If I study hard, ...', sortOrder: 5 },
    ]
  },
  {
    name: 'P6 — Review and Progress',
    sortOrder: 13,
    knowledgePoints: [
      { name: '小学核心词汇', desc: '复习小学阶段核心词汇', sortOrder: 1 },
      { name: '基本句型', desc: '复习基本句型结构', sortOrder: 2 },
      { name: '语法要点', desc: '时态、语态、从句复习', sortOrder: 3 },
      { name: '听说读写', desc: '四项基本技能综合训练', sortOrder: 4 },
      { name: '学习策略', desc: '自主学习策略', sortOrder: 5 },
      { name: '学习成果', desc: '总结学习进步', sortOrder: 6 },
    ]
  },
];

export const englishJuniorChapters = [
  {
    name: 'S1 — Personal Identity',
    sortOrder: 14,
    knowledgePoints: [
      { name: '个人特征', desc: '描述外貌、性格、兴趣', sortOrder: 1 },
      { name: '时态复习', desc: '一般现在时、过去时、将来时', sortOrder: 2 },
      { name: '形容词比较级', desc: '比较级和最高级的用法', sortOrder: 3 },
      { name: '情态动词', desc: 'can, may, must, should', sortOrder: 4 },
      { name: '连接词', desc: 'and, but, or, so, because, although', sortOrder: 5 },
      { name: '描述', desc: '描述个人经历和特征', sortOrder: 6 },
      { name: '表达观点', desc: '表达个人观点和感受', sortOrder: 7 },
      { name: '分享经历', desc: '分享个人经历', sortOrder: 8 },
    ]
  },
  {
    name: 'S1 — School Life',
    sortOrder: 15,
    knowledgePoints: [
      { name: '学校设施', desc: '描述学校环境和设施', sortOrder: 1 },
      { name: '被动语态', desc: '被动语态的基本结构', sortOrder: 2 },
      { name: '定语从句', desc: 'who, which, that 引导的定语从句', sortOrder: 3 },
      { name: '状语从句', desc: '时间、条件、原因状语从句', sortOrder: 4 },
      { name: '名词性从句', desc: '主语从句、宾语从句', sortOrder: 5 },
      { name: '描述', desc: '描述学校生活', sortOrder: 6 },
      { name: '讨论', desc: '讨论教育话题', sortOrder: 7 },
      { name: '评价', desc: '评价学校活动', sortOrder: 8 },
      { name: '建议', desc: '提出改进建议', sortOrder: 9 },
    ]
  },
  {
    name: 'S1 — Daily Life and Hobbies',
    sortOrder: 16,
    knowledgePoints: [
      { name: '日常活动', desc: '描述日常生活安排', sortOrder: 1 },
      { name: '现在完成时', desc: 'have/has + past participle', sortOrder: 2 },
      { name: '进行时', desc: '现在进行时和过去进行时', sortOrder: 3 },
      { name: '将来时', desc: 'will, be going to, present continuous for future', sortOrder: 4 },
      { name: '条件句', desc: '第一条件句 If + present, will + verb', sortOrder: 5 },
      { name: '描述', desc: '描述日常生活', sortOrder: 6 },
      { name: '讨论', desc: '讨论兴趣爱好', sortOrder: 7 },
      { name: '计划', desc: '制定时间规划', sortOrder: 8 },
    ]
  },
  {
    name: 'S1 — Food and Culture',
    sortOrder: 17,
    knowledgePoints: [
      { name: '饮食文化', desc: '不同文化的饮食习惯', sortOrder: 1 },
      { name: '比较级和最高级', desc: '形容词比较级和最高级的规则', sortOrder: 2 },
      { name: '关系从句', desc: '定语从句的深入应用', sortOrder: 3 },
      { name: '分词结构', desc: '现在分词和过去分词', sortOrder: 4 },
      { name: '虚拟语气', desc: '基本虚拟语气结构', sortOrder: 5 },
      { name: '描述', desc: '描述饮食文化', sortOrder: 6 },
      { name: '比较', desc: '比较不同文化', sortOrder: 7 },
      { name: '讨论', desc: '讨论文化差异', sortOrder: 8 },
      { name: '评价', desc: '评价文化现象', sortOrder: 9 },
    ]
  },
  {
    name: 'S2 — Environmental Issues',
    sortOrder: 18,
    knowledgePoints: [
      { name: '环境问题', desc: 'pollution, global warming, deforestation', sortOrder: 1 },
      { name: '复杂句', desc: '复合句和复杂句的结构', sortOrder: 2 },
      { name: '非谓语动词', desc: '不定式、动名词、分词', sortOrder: 3 },
      { name: '倒装句', desc: '倒装句的结构和用法', sortOrder: 4 },
      { name: '强调句', desc: 'It is... that... 强调结构', sortOrder: 5 },
      { name: '讨论', desc: '讨论环境问题', sortOrder: 6 },
      { name: '表达观点', desc: '表达环保观点', sortOrder: 7 },
      { name: '分析问题', desc: '分析环境问题的成因', sortOrder: 8 },
      { name: '提出建议', desc: '提出环保建议', sortOrder: 9 },
    ]
  },
  {
    name: 'S2 — Technology and Innovation',
    sortOrder: 19,
    knowledgePoints: [
      { name: '科技发展', desc: 'AI, internet, smartphone, robotics', sortOrder: 1 },
      { name: '虚拟语气', desc: '与现在事实相反的虚拟语气', sortOrder: 2 },
      { name: '情态动词', desc: '推测性情态动词', sortOrder: 3 },
      { name: '被动语态', desc: '各种时态的被动语态', sortOrder: 4 },
      { name: '连接词', desc: '递进、转折、因果连接词', sortOrder: 5 },
      { name: '描述', desc: '描述科技发展', sortOrder: 6 },
      { name: '分析', desc: '分析科技影响', sortOrder: 7 },
      { name: '预测', desc: '预测未来趋势', sortOrder: 8 },
      { name: '评价', desc: '评价科技利弊', sortOrder: 9 },
    ]
  },
  {
    name: 'S2 — Media and Communication',
    sortOrder: 20,
    knowledgePoints: [
      { name: '媒体', desc: 'social media, newspaper, TV, podcast', sortOrder: 1 },
      { name: '复杂从句', desc: '名词性从句、定语从句、状语从句', sortOrder: 2 },
      { name: '非谓语动词', desc: '分词作定语和状语', sortOrder: 3 },
      { name: '倒装句', desc: '否定词开头的倒装', sortOrder: 4 },
      { name: '省略句', desc: '省略结构', sortOrder: 5 },
      { name: '分析', desc: '分析媒体信息', sortOrder: 6 },
      { name: '讨论', desc: '讨论媒体影响', sortOrder: 7 },
      { name: '评价', desc: '评价媒体内容', sortOrder: 8 },
      { name: '建议', desc: '提出媒体素养建议', sortOrder: 9 },
    ]
  },
  {
    name: 'S2 — Global Issues',
    sortOrder: 21,
    knowledgePoints: [
      { name: '全球问题', desc: 'poverty, inequality, climate change', sortOrder: 1 },
      { name: '复杂句', desc: '多重从句嵌套', sortOrder: 2 },
      { name: '虚拟语气', desc: '与过去事实相反的虚拟语气', sortOrder: 3 },
      { name: '非谓语动词', desc: '分词的完成式和被动式', sortOrder: 4 },
      { name: '连接词', desc: '逻辑连接词的准确使用', sortOrder: 5 },
      { name: '讨论', desc: '讨论全球问题', sortOrder: 6 },
      { name: '分析', desc: '分析国际视角', sortOrder: 7 },
      { name: '建议', desc: '提出解决方案', sortOrder: 8 },
      { name: '评价', desc: '评价国际合作', sortOrder: 9 },
    ]
  },
  {
    name: 'S3 — Career and Future',
    sortOrder: 22,
    knowledgePoints: [
      { name: '职业', desc: 'doctor, engineer, teacher, programmer', sortOrder: 1 },
      { name: '复杂从句', desc: '各种从句的综合运用', sortOrder: 2 },
      { name: '非谓语动词', desc: '非谓语动词的综合运用', sortOrder: 3 },
      { name: '虚拟语气', desc: '虚拟语气的综合运用', sortOrder: 4 },
      { name: '连接词', desc: '高级连接词和过渡词', sortOrder: 5 },
      { name: '讨论', desc: '讨论职业选择', sortOrder: 6 },
      { name: '规划', desc: '规划未来发展', sortOrder: 7 },
      { name: '分析', desc: '分析职业要求', sortOrder: 8 },
      { name: '建议', desc: '给出职业建议', sortOrder: 9 },
    ]
  },
  {
    name: 'S3 — Literature and Culture',
    sortOrder: 23,
    knowledgePoints: [
      { name: '文学', desc: 'poetry, novel, drama, short story', sortOrder: 1 },
      { name: '复杂句', desc: '文学语言中的复杂句式', sortOrder: 2 },
      { name: '修辞手法', desc: 'metaphor, simile, personification', sortOrder: 3 },
      { name: '文学语言', desc: '文学作品的语言特点', sortOrder: 4 },
      { name: '文化表达', desc: '文化背景的表达', sortOrder: 5 },
      { name: '分析', desc: '分析文学作品', sortOrder: 6 },
      { name: '评价', desc: '评价文学价值', sortOrder: 7 },
      { name: '欣赏', desc: '欣赏文学之美', sortOrder: 8 },
      { name: '讨论', desc: '讨论文化内涵', sortOrder: 9 },
    ]
  },
  {
    name: 'S3 — Critical Thinking and Problem Solving',
    sortOrder: 24,
    knowledgePoints: [
      { name: '批判性思维', desc: '分析、评价、推理、创造', sortOrder: 1 },
      { name: '复杂句', desc: '逻辑严密的复杂句', sortOrder: 2 },
      { name: '逻辑连接词', desc: 'therefore, however, moreover, nevertheless', sortOrder: 3 },
      { name: '非谓语动词', desc: '非谓语动词在论证中的运用', sortOrder: 4 },
      { name: '虚拟语气', desc: '虚拟语气在论证中的运用', sortOrder: 5 },
      { name: '分析', desc: '分析问题', sortOrder: 6 },
      { name: '评价', desc: '评价方案', sortOrder: 7 },
      { name: '建议', desc: '提出解决方案', sortOrder: 8 },
      { name: '讨论', desc: '讨论不同观点', sortOrder: 9 },
    ]
  },
  {
    name: 'S3 — Preparation for DSE',
    sortOrder: 25,
    knowledgePoints: [
      { name: '考试词汇', desc: 'DSE 高频词汇', sortOrder: 1 },
      { name: '重点语法', desc: 'DSE 常考语法点', sortOrder: 2 },
      { name: '应试语法', desc: '语法在考试中的应用', sortOrder: 3 },
      { name: '高分技巧', desc: '写作和口语高分技巧', sortOrder: 4 },
      { name: '阅读技巧', desc: 'DSE 阅读策略', sortOrder: 5 },
      { name: '写作技巧', desc: 'DSE 写作策略', sortOrder: 6 },
      { name: '口语技巧', desc: 'DSE 口语策略', sortOrder: 7 },
      { name: '听力技巧', desc: 'DSE 听力策略', sortOrder: 8 },
    ]
  },
];

export const englishSeniorChapters = [
  {
    name: 'S4 — Language in Context',
    sortOrder: 26,
    knowledgePoints: [
      { name: '语言功能', desc: '语言在社会中的不同功能', sortOrder: 1 },
      { name: '语域', desc: '正式与非正式语言', sortOrder: 2 },
      { name: '语体', desc: '不同文体的语言特点', sortOrder: 3 },
      { name: '语境', desc: '语境对语言理解的影响', sortOrder: 4 },
      { name: '文本分析', desc: '分析文本的语言特征', sortOrder: 5 },
      { name: '语言特征', desc: '词汇、语法、修辞特征', sortOrder: 6 },
      { name: '修辞手法', desc: '常见修辞手法的识别和分析', sortOrder: 7 },
      { name: '文体分析', desc: '不同文体的分析方法', sortOrder: 8 },
      { name: '语言选择', desc: '根据情境选择适当语言', sortOrder: 9 },
      { name: '交际策略', desc: '有效的交际策略', sortOrder: 10 },
      { name: '语用规则', desc: '语用学基本规则', sortOrder: 11 },
      { name: '文化因素', desc: '文化对语言使用的影响', sortOrder: 12 },
    ]
  },
  {
    name: 'S4 — Personal Growth and Development',
    sortOrder: 27,
    knowledgePoints: [
      { name: '身份认同', desc: '探索个人身份和文化认同', sortOrder: 1 },
      { name: '个人成长', desc: '个人发展和成长经历', sortOrder: 2 },
      { name: '价值观', desc: '个人价值观的形成', sortOrder: 3 },
      { name: '目标设定', desc: '设定和实现个人目标', sortOrder: 4 },
      { name: '论述文写作', desc: '议论文的结构和技巧', sortOrder: 5 },
      { name: '观点表达', desc: '清晰表达个人观点', sortOrder: 6 },
      { name: '论证技巧', desc: '有效的论证方法', sortOrder: 7 },
      { name: '逻辑结构', desc: '文章的逻辑结构', sortOrder: 8 },
      { name: '发展词汇', desc: '个人发展相关词汇', sortOrder: 9 },
      { name: '情感词汇', desc: '表达情感的词汇', sortOrder: 10 },
      { name: '抽象词汇', desc: '抽象概念的表达', sortOrder: 11 },
      { name: '连接词', desc: '高级连接词的使用', sortOrder: 12 },
    ]
  },
  {
    name: 'S4 — Social Issues and Values',
    sortOrder: 28,
    knowledgePoints: [
      { name: '教育', desc: '教育公平、教育改革', sortOrder: 1 },
      { name: '环境', desc: '环境保护、可持续发展', sortOrder: 2 },
      { name: '科技', desc: '科技伦理、数字鸿沟', sortOrder: 3 },
      { name: '文化', desc: '文化多样性、文化保护', sortOrder: 4 },
      { name: '议论文写作', desc: '社会议题的议论文写作', sortOrder: 5 },
      { name: '分析讨论', desc: '多角度分析社会问题', sortOrder: 6 },
      { name: '评价', desc: '评价社会现象', sortOrder: 7 },
      { name: '建议', desc: '提出社会改进建议', sortOrder: 8 },
      { name: '社会词汇', desc: '社会议题相关词汇', sortOrder: 9 },
      { name: '分析词汇', desc: '分析性词汇', sortOrder: 10 },
      { name: '评价词汇', desc: '评价性词汇', sortOrder: 11 },
      { name: '建议词汇', desc: '建议性表达', sortOrder: 12 },
    ]
  },
  {
    name: 'S4 — Culture and Heritage',
    sortOrder: 29,
    knowledgePoints: [
      { name: '文化传统', desc: '传统文化的传承和发展', sortOrder: 1 },
      { name: '文化交流', desc: '跨文化交流和理解', sortOrder: 2 },
      { name: '身份认同', desc: '文化身份的建构', sortOrder: 3 },
      { name: '价值观念', desc: '不同文化的价值观', sortOrder: 4 },
      { name: '文化描述', desc: '描述文化现象', sortOrder: 5 },
      { name: '比较分析', desc: '比较不同文化', sortOrder: 6 },
      { name: '评价讨论', desc: '评价文化价值', sortOrder: 7 },
      { name: '文化表达', desc: '文化相关表达', sortOrder: 8 },
      { name: '文化词汇', desc: '文化相关词汇', sortOrder: 9 },
      { name: '比较词汇', desc: '比较性表达', sortOrder: 10 },
      { name: '分析词汇', desc: '文化分析词汇', sortOrder: 11 },
      { name: '评价词汇', desc: '文化评价词汇', sortOrder: 12 },
    ]
  },
  {
    name: 'S5 — Critical Thinking and Reasoning',
    sortOrder: 30,
    knowledgePoints: [
      { name: '分析', desc: '分解复杂问题', sortOrder: 1 },
      { name: '评价', desc: '评估论据的有效性', sortOrder: 2 },
      { name: '推理', desc: '逻辑推理方法', sortOrder: 3 },
      { name: '创造', desc: '创造性思维', sortOrder: 4 },
      { name: '议论文写作', desc: '高级议论文写作', sortOrder: 5 },
      { name: '逻辑论证', desc: '严密的逻辑论证', sortOrder: 6 },
      { name: '批判分析', desc: '批判性文本分析', sortOrder: 7 },
      { name: '观点表达', desc: '有力的观点表达', sortOrder: 8 },
      { name: '思维词汇', desc: '思维相关词汇', sortOrder: 9 },
      { name: '逻辑词汇', desc: '逻辑关系词汇', sortOrder: 10 },
      { name: '分析词汇', desc: '高级分析词汇', sortOrder: 11 },
      { name: '评价词汇', desc: '高级评价词汇', sortOrder: 12 },
    ]
  },
  {
    name: 'S5 — Media and Information Literacy',
    sortOrder: 31,
    knowledgePoints: [
      { name: '媒体类型', desc: '传统媒体与新媒体', sortOrder: 1 },
      { name: '信息传播', desc: '信息传播的方式和影响', sortOrder: 2 },
      { name: '媒体影响', desc: '媒体对社会的影响', sortOrder: 3 },
      { name: '媒介素养', desc: '批判性媒体素养', sortOrder: 4 },
      { name: '媒体分析', desc: '分析媒体信息', sortOrder: 5 },
      { name: '信息评估', desc: '评估信息可靠性', sortOrder: 6 },
      { name: '观点表达', desc: '表达对媒体的看法', sortOrder: 7 },
      { name: '批判讨论', desc: '批判性讨论媒体', sortOrder: 8 },
      { name: '媒体词汇', desc: '媒体相关词汇', sortOrder: 9 },
      { name: '分析词汇', desc: '媒体分析词汇', sortOrder: 10 },
      { name: '评价词汇', desc: '媒体评价词汇', sortOrder: 11 },
      { name: '批判词汇', desc: '批判性词汇', sortOrder: 12 },
    ]
  },
  {
    name: 'S5 — Global Perspectives',
    sortOrder: 32,
    knowledgePoints: [
      { name: '全球化', desc: '全球化的影响和挑战', sortOrder: 1 },
      { name: '环境保护', desc: '全球环境问题', sortOrder: 2 },
      { name: '国际合作', desc: '国际组织和合作', sortOrder: 3 },
      { name: '文化交流', desc: '全球文化交流', sortOrder: 4 },
      { name: '全球分析', desc: '分析全球议题', sortOrder: 5 },
      { name: '视角比较', desc: '比较不同视角', sortOrder: 6 },
      { name: '观点表达', desc: '表达全球观点', sortOrder: 7 },
      { name: '建议提出', desc: '提出全球解决方案', sortOrder: 8 },
      { name: '全球词汇', desc: '全球议题词汇', sortOrder: 9 },
      { name: '分析词汇', desc: '全球分析词汇', sortOrder: 10 },
      { name: '比较词汇', desc: '比较和对比词汇', sortOrder: 11 },
      { name: '建议词汇', desc: '建议性词汇', sortOrder: 12 },
    ]
  },
  {
    name: 'S5 — Literature and Human Experience',
    sortOrder: 33,
    knowledgePoints: [
      { name: '人性探索', desc: '文学中的人性主题', sortOrder: 1 },
      { name: '社会批判', desc: '文学作品的社会批判', sortOrder: 2 },
      { name: '文化传承', desc: '文学中的文化传承', sortOrder: 3 },
      { name: '价值观念', desc: '文学中的价值观', sortOrder: 4 },
      { name: '文学分析', desc: '深入分析文学作品', sortOrder: 5 },
      { name: '主题探讨', desc: '探讨文学主题', sortOrder: 6 },
      { name: '人物分析', desc: '分析文学人物', sortOrder: 7 },
      { name: '评价讨论', desc: '评价文学价值', sortOrder: 8 },
      { name: '文学词汇', desc: '文学分析词汇', sortOrder: 9 },
      { name: '分析词汇', desc: '文学批评词汇', sortOrder: 10 },
      { name: '评价词汇', desc: '文学评价词汇', sortOrder: 11 },
      { name: '情感词汇', desc: '情感表达词汇', sortOrder: 12 },
    ]
  },
  {
    name: 'S6 — Advanced Language Proficiency',
    sortOrder: 34,
    knowledgePoints: [
      { name: '高级词汇', desc: 'DSE 高级词汇', sortOrder: 1 },
      { name: '复杂句式', desc: '高级复杂句式', sortOrder: 2 },
      { name: '修辞手法', desc: '高级修辞手法', sortOrder: 3 },
      { name: '文体特征', desc: '不同文体的特征', sortOrder: 4 },
      { name: '学术写作', desc: '学术英语写作', sortOrder: 5 },
      { name: '商务写作', desc: '商务英语写作', sortOrder: 6 },
      { name: '口语表达', desc: '高级口语表达', sortOrder: 7 },
      { name: '听力理解', desc: '高级听力理解', sortOrder: 8 },
      { name: '文本分析', desc: '高级文本分析', sortOrder: 9 },
      { name: '语言评估', desc: '评估语言质量', sortOrder: 10 },
      { name: '风格识别', desc: '识别不同写作风格', sortOrder: 11 },
      { name: '效果评价', desc: '评价语言效果', sortOrder: 12 },
    ]
  },
  {
    name: 'S6 — Independent Inquiry and Research',
    sortOrder: 35,
    knowledgePoints: [
      { name: '选题', desc: '选择研究课题', sortOrder: 1 },
      { name: '资料搜集', desc: '搜集和整理资料', sortOrder: 2 },
      { name: '数据分析', desc: '分析研究数据', sortOrder: 3 },
      { name: '结论总结', desc: '总结研究结论', sortOrder: 4 },
      { name: '研究报告', desc: '撰写研究报告', sortOrder: 5 },
      { name: '学术写作', desc: '学术写作规范', sortOrder: 6 },
      { name: '文献综述', desc: '撰写文献综述', sortOrder: 7 },
      { name: '方法介绍', desc: '介绍研究方法', sortOrder: 8 },
      { name: '问题分析', desc: '分析研究问题', sortOrder: 9 },
      { name: '逻辑推理', desc: '研究中的逻辑推理', sortOrder: 10 },
      { name: '观点论证', desc: '论证研究观点', sortOrder: 11 },
      { name: '评价反思', desc: '评价和反思研究', sortOrder: 12 },
    ]
  },
  {
    name: 'S6 — Preparation for Higher Education and Career',
    sortOrder: 36,
    knowledgePoints: [
      { name: '大学要求', desc: '大学入学要求', sortOrder: 1 },
      { name: '专业选择', desc: '选择大学专业', sortOrder: 2 },
      { name: '学习规划', desc: '大学学习规划', sortOrder: 3 },
      { name: '能力提升', desc: '提升学术能力', sortOrder: 4 },
      { name: '职业规划', desc: '职业规划方法', sortOrder: 5 },
      { name: '技能培养', desc: '培养职业技能', sortOrder: 6 },
      { name: '求职技巧', desc: '求职和面试技巧', sortOrder: 7 },
      { name: '职业发展', desc: '职业发展路径', sortOrder: 8 },
      { name: '学术英语', desc: '学术英语写作', sortOrder: 9 },
      { name: '专业词汇', desc: '专业领域词汇', sortOrder: 10 },
      { name: '学习策略', desc: '大学学习策略', sortOrder: 11 },
      { name: '研究方法', desc: '基本研究方法', sortOrder: 12 },
    ]
  },
  {
    name: 'S6 — Synthesis and Integration',
    sortOrder: 37,
    knowledgePoints: [
      { name: '跨学科联系', desc: '不同学科之间的联系', sortOrder: 1 },
      { name: '知识体系', desc: '构建知识体系', sortOrder: 2 },
      { name: '能力整合', desc: '整合各种能力', sortOrder: 3 },
      { name: '经验总结', desc: '总结学习经验', sortOrder: 4 },
      { name: '学习反思', desc: '反思学习过程', sortOrder: 5 },
      { name: '能力提升', desc: '评估能力提升', sortOrder: 6 },
      { name: '目标设定', desc: '设定未来目标', sortOrder: 7 },
      { name: '发展规划', desc: '制定发展规划', sortOrder: 8 },
      { name: '社会责任', desc: '理解社会责任', sortOrder: 9 },
      { name: '文化理解', desc: '深化文化理解', sortOrder: 10 },
      { name: '国际视野', desc: '拓展国际视野', sortOrder: 11 },
      { name: '全球意识', desc: '培养全球意识', sortOrder: 12 },
    ]
  },
];

// ============================================================
// 语文 Chinese
// ============================================================

export const chinesePrimaryChapters = [
  {
    name: '小一 — 我爱上学',
    sortOrder: 1,
    knowledgePoints: [
      { name: '识字写字', desc: '学、校、书、笔、纸等基本生字', sortOrder: 1 },
      { name: '词语', desc: '学校、老师、同学、朋友', sortOrder: 2 },
      { name: '基本句型', desc: '这是...、我喜欢...、我会...', sortOrder: 3 },
      { name: '口语表达', desc: '基本的课堂口语表达', sortOrder: 4 },
      { name: '倾听理解', desc: '听懂简单指令和问题', sortOrder: 5 },
      { name: '观察描述', desc: '观察并描述学习用品', sortOrder: 6 },
    ]
  },
  {
    name: '小一 — 我的家人',
    sortOrder: 2,
    knowledgePoints: [
      { name: '识字写字', desc: '爸、妈、爷、奶、哥、弟等生字', sortOrder: 1 },
      { name: '词语', desc: '家人、爸爸、妈妈、爷爷、奶奶', sortOrder: 2 },
      { name: '基本句型', desc: '这是我的...、我爱...、我帮...', sortOrder: 3 },
      { name: '成语', desc: '相亲相爱、和睦相处', sortOrder: 4 },
      { name: '口语表达', desc: '介绍家庭成员', sortOrder: 5 },
      { name: '情感表达', desc: '表达对家人的感情', sortOrder: 6 },
    ]
  },
  {
    name: '小二 — 四季的变化',
    sortOrder: 3,
    knowledgePoints: [
      { name: '识字写字', desc: '春、夏、秋、冬、风、雨等生字', sortOrder: 1 },
      { name: '词语', desc: '春天、夏天、秋天、冬天', sortOrder: 2 },
      { name: '基本句型', desc: '春天来了...、我喜欢...的季节', sortOrder: 3 },
      { name: '比喻句', desc: '比喻句的基本运用', sortOrder: 4 },
      { name: '描写能力', desc: '描写季节特征', sortOrder: 5 },
      { name: '朗读能力', desc: '有感情地朗读课文', sortOrder: 6 },
      { name: '观察思考', desc: '观察自然并思考', sortOrder: 7 },
    ]
  },
  {
    name: '小三 — 奇妙的自然',
    sortOrder: 4,
    knowledgePoints: [
      { name: '阅读理解', desc: '理解简单的自然科普文章', sortOrder: 1 },
      { name: '写作练习', desc: '写简单的观察日记', sortOrder: 2 },
      { name: '词语积累', desc: '积累描写自然的词语', sortOrder: 3 },
      { name: '口语交际', desc: '分享自然观察发现', sortOrder: 4 },
    ]
  },
  {
    name: '小四 — 传统文化',
    sortOrder: 5,
    knowledgePoints: [
      { name: '古诗欣赏', desc: '欣赏简单的古诗', sortOrder: 1 },
      { name: '传统文化', desc: '了解传统节日和习俗', sortOrder: 2 },
      { name: '阅读理解', desc: '理解简单的文化文章', sortOrder: 3 },
      { name: '写作练习', desc: '写关于传统文化的短文', sortOrder: 4 },
      { name: '口语表达', desc: '介绍传统文化', sortOrder: 5 },
    ]
  },
  {
    name: '小五 — 阅读与写作',
    sortOrder: 6,
    knowledgePoints: [
      { name: '阅读理解', desc: '理解较复杂的文章', sortOrder: 1 },
      { name: '写作技巧', desc: '记叙文写作技巧', sortOrder: 2 },
      { name: '词语运用', desc: '准确运用词语', sortOrder: 3 },
      { name: '段落组织', desc: '组织段落结构', sortOrder: 4 },
      { name: '修改作文', desc: '自我修改和互评', sortOrder: 5 },
    ]
  },
  {
    name: '小六 — 综合复习',
    sortOrder: 7,
    knowledgePoints: [
      { name: '识字写字', desc: '复习小学阶段生字词', sortOrder: 1 },
      { name: '阅读理解', desc: '综合阅读理解训练', sortOrder: 2 },
      { name: '写作能力', desc: '综合写作能力训练', sortOrder: 3 },
      { name: '口语交际', desc: '综合口语交际训练', sortOrder: 4 },
      { name: '文学欣赏', desc: '初步文学欣赏能力', sortOrder: 5 },
      { name: '学习策略', desc: '自主学习策略', sortOrder: 6 },
    ]
  },
];

export const chineseJuniorChapters = [
  {
    name: '中一 — 认识自我',
    sortOrder: 8,
    knowledgePoints: [
      { name: '文言文阅读', desc: '《论语》选读、基本的文言文语法', sortOrder: 1 },
      { name: '记叙文写作', desc: '写人记事的记叙文', sortOrder: 2 },
      { name: '人物描写技巧', desc: '外貌、语言、动作、心理描写', sortOrder: 3 },
      { name: '心理描写方法', desc: '内心独白、心理活动描写', sortOrder: 4 },
      { name: '成语积累', desc: '常用成语的理解和运用', sortOrder: 5 },
      { name: '近义词辨析', desc: '辨析近义词的细微差别', sortOrder: 6 },
      { name: '词语的感情色彩', desc: '褒义词、贬义词、中性词', sortOrder: 7 },
      { name: '复杂句式', desc: '并列句、递进句、转折句', sortOrder: 8 },
      { name: '句群组织', desc: '句与句之间的逻辑关系', sortOrder: 9 },
      { name: '修辞手法', desc: '比喻、拟人、排比、夸张', sortOrder: 10 },
      { name: '写作能力', desc: '个人成长故事写作', sortOrder: 11 },
      { name: '口语表达', desc: '自我介绍和观点表达', sortOrder: 12 },
    ]
  },
  {
    name: '中一 — 家庭与社区',
    sortOrder: 9,
    knowledgePoints: [
      { name: '文言文阅读', desc: '《礼记》选读、关于家庭伦理的名句', sortOrder: 1 },
      { name: '说明文写作', desc: '空间说明、事物说明', sortOrder: 2 },
      { name: '空间描写', desc: '按空间顺序描写', sortOrder: 3 },
      { name: '结构安排', desc: '文章的开头、过渡、结尾', sortOrder: 4 },
      { name: '被动句', desc: '被字句的理解和运用', sortOrder: 5 },
      { name: '比较句', desc: '比字句的理解和运用', sortOrder: 6 },
      { name: '条件句', desc: '如果...就...等条件句式', sortOrder: 7 },
      { name: '调查研究能力', desc: '家庭关系调查', sortOrder: 8 },
      { name: '合作能力', desc: '小组合作项目', sortOrder: 9 },
    ]
  },
  {
    name: '中二 — 中华文化',
    sortOrder: 10,
    knowledgePoints: [
      { name: '文言文阅读', desc: '《诗经》选读、唐诗宋词', sortOrder: 1 },
      { name: '议论文写作', desc: '简单的议论文写作', sortOrder: 2 },
      { name: '论证方法', desc: '举例论证、对比论证、引用论证', sortOrder: 3 },
      { name: '文化评论', desc: '对文化现象的简单评论', sortOrder: 4 },
      { name: '文化词汇', desc: '文化相关词汇积累', sortOrder: 5 },
      { name: '成语典故', desc: '成语背后的典故', sortOrder: 6 },
      { name: '历史典故', desc: '常见历史典故', sortOrder: 7 },
      { name: '文言文特殊句式', desc: '倒装句、省略句、判断句', sortOrder: 8 },
      { name: '关联词语', desc: '因果、转折、递进关联词', sortOrder: 9 },
      { name: '篇章结构', desc: '文章的整体结构', sortOrder: 10 },
      { name: '研究能力', desc: '文化研究的基本方法', sortOrder: 11 },
      { name: '表达能力', desc: '文化主题演讲', sortOrder: 12 },
    ]
  },
  {
    name: '中三 — 香港社会',
    sortOrder: 11,
    knowledgePoints: [
      { name: '文言文阅读', desc: '香港相关历史文献、爱国诗词', sortOrder: 1 },
      { name: '应用文写作', desc: '书信、通知、报告', sortOrder: 2 },
      { name: '报告写作', desc: '调查报告、研究报告', sortOrder: 3 },
      { name: '演讲稿写作', desc: '演讲稿的结构和技巧', sortOrder: 4 },
      { name: '社会词汇', desc: '社会相关词汇', sortOrder: 5 },
      { name: '政治词汇', desc: '基本的政治词汇', sortOrder: 6 },
      { name: '经济词汇', desc: '基本的经济词汇', sortOrder: 7 },
      { name: '复杂句式', desc: '长句和复杂句的分析', sortOrder: 8 },
      { name: '篇章连贯', desc: '段落之间的过渡和连贯', sortOrder: 9 },
      { name: '文体特征', desc: '不同文体的语言特征', sortOrder: 10 },
      { name: '调查研究能力', desc: '社会调查方法', sortOrder: 11 },
      { name: '批判性思维', desc: '分析社会现象', sortOrder: 12 },
      { name: '社会参与意识', desc: '关注社会事务', sortOrder: 13 },
    ]
  },
];

export const chineseSeniorChapters = [
  {
    name: '中四 — 语言与生活',
    sortOrder: 12,
    knowledgePoints: [
      { name: '文言文阅读', desc: '《左传》选读、历史散文、政论文章', sortOrder: 1 },
      { name: '论述文写作', desc: '议论文的写作技巧', sortOrder: 2 },
      { name: '论证技巧', desc: '多种论证方法的综合运用', sortOrder: 3 },
      { name: '逻辑推理', desc: '严密的逻辑推理', sortOrder: 4 },
      { name: '专业词汇', desc: '各领域的专业词汇', sortOrder: 5 },
      { name: '外来语', desc: '外来词的理解和运用', sortOrder: 6 },
      { name: '网络语言', desc: '网络用语的特点和规范', sortOrder: 7 },
      { name: '复杂句分析', desc: '长难句的分析和理解', sortOrder: 8 },
      { name: '篇章结构', desc: '复杂文章的结构分析', sortOrder: 9 },
      { name: '语言风格', desc: '不同作者的语言风格', sortOrder: 10 },
      { name: '论述能力', desc: '深入论述观点', sortOrder: 11 },
      { name: '分析能力', desc: '分析语言现象', sortOrder: 12 },
      { name: '表达能力', desc: '准确表达观点', sortOrder: 13 },
      { name: '批判性思维', desc: '批判性分析文本', sortOrder: 14 },
    ]
  },
  {
    name: '中四 — 文学欣赏',
    sortOrder: 13,
    knowledgePoints: [
      { name: '诗歌', desc: '古诗词的欣赏和分析', sortOrder: 1 },
      { name: '散文', desc: '现代散文的欣赏', sortOrder: 2 },
      { name: '小说', desc: '小说的人物、情节、环境分析', sortOrder: 3 },
      { name: '戏剧', desc: '戏剧的基本元素和欣赏', sortOrder: 4 },
      { name: '文学批评', desc: '基本的文学批评方法', sortOrder: 5 },
      { name: '文学流派', desc: '主要文学流派的特点', sortOrder: 6 },
      { name: '创作方法', desc: '不同创作方法的特点', sortOrder: 7 },
      { name: '主题分析', desc: '分析作品主题', sortOrder: 8 },
      { name: '人物分析', desc: '分析文学人物', sortOrder: 9 },
      { name: '艺术特色', desc: '分析作品的艺术特色', sortOrder: 10 },
      { name: '中国文学发展', desc: '中国文学发展脉络', sortOrder: 11 },
      { name: '香港文学特色', desc: '香港文学的独特魅力', sortOrder: 12 },
      { name: '文学分析能力', desc: '深入分析文学作品', sortOrder: 13 },
      { name: '写作能力', desc: '文学评论写作', sortOrder: 14 },
      { name: '审美能力', desc: '培养审美情趣', sortOrder: 15 },
    ]
  },
  {
    name: '中五 — 中华文化传承',
    sortOrder: 14,
    knowledgePoints: [
      { name: '经典研读', desc: '四书五经选读、诸子百家', sortOrder: 1 },
      { name: '文化研究', desc: '传统文化的现代价值', sortOrder: 2 },
      { name: '文言文翻译', desc: '准确翻译文言文', sortOrder: 3 },
      { name: '文化评论', desc: '对文化现象的深入评论', sortOrder: 4 },
      { name: '专题写作', desc: '文化专题写作', sortOrder: 5 },
      { name: '文化反思', desc: '反思传统文化', sortOrder: 6 },
      { name: '价值判断', desc: '对文化价值的判断', sortOrder: 7 },
      { name: '文化认同', desc: '建立文化认同感', sortOrder: 8 },
      { name: '研究能力', desc: '文化研究能力', sortOrder: 9 },
      { name: '分析能力', desc: '文化分析能力', sortOrder: 10 },
      { name: '写作能力', desc: '文化论文写作', sortOrder: 11 },
      { name: '批判性思维', desc: '批判性文化思考', sortOrder: 12 },
    ]
  },
  {
    name: '中六 — 语文应用与实践',
    sortOrder: 15,
    knowledgePoints: [
      { name: '商业文书', desc: '商业信函、报告写作', sortOrder: 1 },
      { name: '学术写作', desc: '学术论文写作', sortOrder: 2 },
      { name: '公共文书', desc: '公告、通知、声明', sortOrder: 3 },
      { name: '口语表达', desc: '演讲和辩论', sortOrder: 4 },
      { name: '听力理解', desc: '高级听力理解', sortOrder: 5 },
      { name: '阅读策略', desc: '高效阅读策略', sortOrder: 6 },
      { name: '资料搜集', desc: '信息搜集和整理', sortOrder: 7 },
      { name: '分析整理', desc: '资料分析和整理', sortOrder: 8 },
      { name: '批判评估', desc: '批判性评估信息', sortOrder: 9 },
      { name: '文化差异', desc: '理解文化差异', sortOrder: 10 },
      { name: '沟通技巧', desc: '跨文化沟通技巧', sortOrder: 11 },
      { name: '国际视野', desc: '拓展国际视野', sortOrder: 12 },
      { name: '应用能力', desc: '语文综合应用能力', sortOrder: 13 },
      { name: '研究能力', desc: '独立研究能力', sortOrder: 14 },
      { name: '沟通能力', desc: '有效沟通能力', sortOrder: 15 },
      { name: '批判性思维', desc: '高级批判性思维', sortOrder: 16 },
    ]
  },
];
