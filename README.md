# AI-Agent 驱动在线教育平台（智学 / SmartLearn）

## 项目概述

本项目是一个 AI-Agent 驱动的在线教育平台 MVP，旨在通过苏格拉底式提问引导学生思考，提供 24 小时个性化学习指导，同时监测学生心理健康状态，让家长、教师、学校实时掌握学生学习进度与心理状态。

平台覆盖香港 DSE 及中国义务教育课程标准（小学、初中、高中），支持语文、数学、英语三大学科。采用 Freemium 商业模式，免费用户每日可访问 5 个知识点。

**当前版本**：v1.1 MVP
**目标上线日期**：2026 年 5 月 20 日（MVP）

### 已实现核心功能

- **AI 学习助手**：基于多模型 API（Claude / OpenAI / OpenRouter / DeepSeek），通过苏格拉底式提问引导学生独立思考
  - 自由对话模式 + 知识点引导模式，无缝切换
  - 对话历史本地持久化（Zustand persist）
  - 敏感词过滤（分学科上下文感知）
- **学习内容体系**：按学科 → 章节 → 知识点三级结构组织（语文、数学、英语，含 DSE 课程）
- **能力测试**：智能选题 + 考试分数录入 + 拍照识别错题（占位）
- **学习进度追踪**：知识点掌握程度可视化（已掌握 / 部分掌握 / 未掌握）
- **家长监控端**：查看孩子学习汇总、学科进度、心理健康（占位）、活动动态
- **树洞（Tree Hole）**：学生情绪倾诉空间，对话记录退出即删除，数据不持久化
- **教师/学校端**：班级数据看板、学生列表、知识点掌握率、心理健康聚合报告（占位）
- **多语言支持**：简体中文、繁體中文、English 三语切换
- **用户认证**：手机号 + 验证码 / 邮箱 + 密码注册登录，未登录时可模拟登录跳转到 onboarding
- **Onboarding 流程**：国家/地区 → 身份选择（学生 / 家长）→ 性别 / 年龄 / 学校 / 年级分层引导
- **响应式 UI**：移动端 `.phone-frame` 容器模拟手机界面；网页端自适应布局

### 技术栈

| 端 | 实际技术选型 |
|---|---|
| **移动端**（学生端 + 家长端） | React 19 + TypeScript + TanStack Start + TanStack Router + Vite 7 + Zustand + Tailwind CSS v4 + shadcn/ui (Radix UI) + Recharts + Framer Motion |
| **网页端**（教师 / 学校端） | React 18 + TypeScript + Vite 5 + React Router v6 + Zustand + Recharts + 自定义 CSS |
| **后端** | Node.js + Express 5 + TypeScript 6 + MySQL + Prisma 6 + JWT (bcryptjs) |
| **AI 集成** | Claude API / OpenAI API / OpenRouter / DeepSeek（可配置切换，支持按成本 + 学科适配） |

> **说明**：移动端最初规划为 React Native，后改为基于 React SSR（TanStack Start）的方案，以复用 Web 技术栈并加快 MVP 开发速度。通过 `.phone-frame` CSS 容器在浏览器中模拟移动端界面。

---

## 项目结构

```
Online Education Platform/
├── CLAUDE.md                          # Claude Code 行为规范与项目指引
├── PRD.md                             # 产品需求文档
├── Jobs Duty Assignment.md            # 团队分工与里程碑
├── README.md                          # 本文件
├── todo.md                            # 任务清单
│
├── backend/                           # 后端服务（Node.js + Express + MySQL）
│   ├── src/
│   │   ├── app.ts                     # Express 应用入口（路由注册）
│   │   ├── index.ts                   # 服务器启动入口
│   │   ├── config/
│   │   │   └── prisma.ts              # Prisma 客户端单例
│   │   ├── middleware/
│   │   │   └── auth.ts                # JWT 认证中间件（角色权限控制）
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts     # 注册 / 登录
│   │   │   ├── user.controller.ts     # 用户管理
│   │   │   ├── ai.controller.ts       # AI 对话（苏格拉底式引导）
│   │   │   ├── class.controller.ts    # 班级管理
│   │   │   ├── school.controller.ts   # 学校管理
│   │   │   ├── progress.controller.ts # 学习进度
│   │   │   ├── dashboard.controller.ts # 看板聚合数据
│   │   │   ├── subscription.controller.ts # 订阅管理
│   │   │   └── system.controller.ts   # 系统配置（AI 模型切换等）
│   │   ├── services/
│   │   │   ├── ai.service.ts          # AI 模型调用 / 切换逻辑
│   │   │   └── filter.service.ts      # 敏感词过滤
│   │   └── routes/
│   │       ├── auth.routes.ts         # POST /register, /login
│   │       ├── user.routes.ts         # 用户 CRUD
│   │       ├── ai.routes.ts           # POST /chat（AI 对话）
│   │       ├── class.routes.ts        # 班级 CRUD
│   │       ├── school.routes.ts       # 学校 CRUD
│   │       ├── progress.routes.ts     # 学习进度查询 / 更新
│   │       ├── dashboard.routes.ts    # 看板数据聚合
│   │       ├── subscription.routes.ts # 订阅状态查询
│   │       └── system.routes.ts       # 系统配置
│   ├── prisma/
│   │   ├── schema.prisma              # 数据库 Schema（Prisma）
│   │   └── seed.ts                    # 种子数据脚本
│   ├── dist/                          # TypeScript 编译输出
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── mobile/                        # 移动端（React SSR + TanStack Start）
│   │   ├── src/
│   │   │   ├── router.tsx             # TanStack Router 实例创建
│   │   │   ├── routes/
│   │   │   │   ├── __root.tsx          # 根布局（QueryClientProvider、meta、404、error）
│   │   │   │   ├── index.tsx          # 首页重定向
│   │   │   │   ├── login.tsx          # 登录 / 注册页面
│   │   │   │   ├── onboarding.tsx      # 新用户引导（5 步: 国家→身份→性别→年龄→学校）
│   │   │   │   ├── student.tsx         # 学生端布局（认证守卫）
│   │   │   │   ├── student.learn.tsx   # 学科列表首页
│   │   │   │   ├── student.learn.$subject.tsx         # 章节列表
│   │   │   │   ├── student.learn.$subject.$chapter.tsx # 知识点列表
│   │   │   │   ├── student.ai.tsx       # AI 对话页（自由 + 引导模式）
│   │   │   │   ├── student.treehole.tsx # 树洞倾诉页
│   │   │   │   ├── student.test.tsx     # 能力提升入口
│   │   │   │   ├── student.test.quiz.tsx    # 测试答题
│   │   │   │   ├── student.test.result.tsx  # 测试结果
│   │   │   │   ├── student.test.score.tsx   # 录入考试分数
│   │   │   │   ├── student.test.wrong.tsx   # 拍照录入错题（占位）
│   │   │   │   ├── student.test.index.tsx   # 测试首页（旧版重定向）
│   │   │   │   ├── student.knowledge-point.tsx # 知识点详情
│   │   │   │   ├── student.progress.tsx     # 学习进度概览
│   │   │   │   ├── student.progress.$subject.tsx # 学科进度详情
│   │   │   │   ├── student.progress.index.tsx    # 进度首页（旧版重定向）
│   │   │   │   ├── student.textbook.tsx     # 教材选择
│   │   │   │   ├── student.settings.tsx     # 学生设置
│   │   │   │   ├── student.me.tsx           # 个人中心
│   │   │   │   ├── edit-profile.tsx         # 编辑资料
│   │   │   │   ├── parent.tsx               # 家长端布局（认证守卫）
│   │   │   │   ├── parent.overview.tsx       # 家长首页（学习汇总）
│   │   │   │   ├── parent.subjects.tsx       # 学科进度
│   │   │   │   ├── parent.wellbeing.tsx      # 心理健康（占位）
│   │   │   │   ├── parent.children.tsx       # 孩子管理 / 绑定
│   │   │   │   ├── parent.settings.tsx       # 家长设置
│   │   │   │   └── parent.me.tsx             # 家长个人中心
│   │   │   ├── components/
│   │   │   │   ├── cards/              # 卡片组件（StatCard、MasteryBadge 等）
│   │   │   │   ├── mobile/             # 移动壳组件（MobileShell、BottomTab、AppBar）
│   │   │   │   ├── LanguagePopup.tsx   # 语言选择弹窗
│   │   │   │   └── ui/                 # shadcn/ui 组件（Button、Input、Dialog 等 ~50 个）
│   │   │   ├── lib/
│   │   │   │   ├── store.ts            # Zustand 全局状态（持久化：登录、角色、AI 对话历史等）
│   │   │   │   ├── mock-data.ts        # 课程数据（学科 / 章节 / 知识点 / 测试题）
│   │   │   │   ├── i18n.ts            # 国际化（中 / 繁 / 英三语字典）
│   │   │   │   ├── utils.ts            # 工具函数（cn 等）
│   │   │   │   └── error-capture.ts    # 错误捕获
│   │   │   ├── hooks/
│   │   │   │   └── use-mobile.tsx      # 响应式检测 Hook
│   │   │   ├── styles.css              # 全局样式（Tailwind + CSS 变量主题）
│   │   │   └── vite-env.d.ts
│   │   ├── public/                    # 静态资源
│   │   ├── dist/                      # 构建产物
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── components.json            # shadcn/ui 配置
│   │   └── .prettierrc / .prettierignore
│   │
│   └── web/                           # 网页端（React SPA + Vite）
│       └── vite-app/
│           ├── src/
│           │   ├── main.tsx            # React DOM 挂载入口
│           │   ├── App.tsx             # 应用壳（侧边栏 + 顶栏 + 视图路由）
│           │   ├── views/
│           │   │   ├── Dashboard.tsx       # 教师看板（KPI 卡片 + 活动 Feed）
│           │   │   ├── Classes.tsx          # 班级列表
│           │   │   ├── ClassDetail.tsx       # 班级详情（学生列表 + 知识点掌握率矩阵）
│           │   │   ├── StudentDetail.tsx     # 学生详情（个人掌握率 + 趋势）
│           │   │   ├── Students.tsx          # 全部学生检索
│           │   │   ├── AdminSchool.tsx       # 学校管理员视图
│           │   │   └── MentalHealth.tsx      # 心理健康（班级 + 风险分级 + 占位提示）
│           │   ├── components/
│           │   │   ├── Sidebar.tsx           # 左侧导航栏
│           │   │   ├── Topbar.tsx            # 顶部栏（面包屑 + 语言切换 + 用户信息）
│           │   │   ├── charts.tsx            # 图表组件（Donut、Sparkline、KeywordCloud 等）
│           │   │   ├── primitives.tsx        # UI 基础组件（Card、Badge、Avatar 等）
│           │   │   ├── NotificationsPanel.tsx # 通知面板
│           │   │   ├── SubscriptionModal.tsx  # 订阅弹窗（Freemium，占位）
│           │   │   ├── SettingsModal.tsx      # 设置弹窗
│           │   │   └── TweaksPanel.tsx        # 样式调整面板
│           │   ├── lib/
│           │   │   ├── data.ts               # 模拟数据（班级 / 学生 / 考试 / 活动 Feed）
│           │   │   ├── mastery.ts            # 掌握度计算工具
│           │   │   ├── format.ts             # 格式化工具
│           │   │   ├── i18n.ts               # 国际化（英文）
│           │   │   └── i18n.zh-TW.ts        # 国际化（繁体中文）
│           │   ├── types.ts                  # TypeScript 类型定义
│           │   ├── styles/                   # CSS 文件
│           │   └── vite-env.d.ts
│           ├── package.json
│           └── tsconfig.json
│
├── content/                           # 课程内容数据（占位）
│
├── docs/                              # 项目文档
│   └── superpowers/specs/
│       └── 2026-05-18-forest-sprite-design.md  # 森林小精灵 AI 伙伴设计方案
│
└── .git/                              # Git 版本控制
```

---

## 产品 Idea 与特色功能

### 🪷 树洞（Tree Hole）
学生在学习过程中可随时进入「树洞」匿名倾诉情绪。采用「树」的拟人化 AI 角色进行温和共情回复。所有对话记录在退出应用时自动销毁，不持久化存储，保护学生隐私。

### 🌿 森林小精灵 & 池塘生态（规划中）
在 AI 对话页加入水獭形态的森林小精灵和会自然生长的池塘场景。学生每完成一个章节的学习，就会有一只新的小动物来到池塘安家。**零操作、纯自动**——池塘是学习旅程的可视化日记，不是需要经营的游戏。

设计方案详见：[docs/superpowers/specs/2026-05-18-forest-sprite-design.md](docs/superpowers/specs/2026-05-18-forest-sprite-design.md)

### 🌐 多语言 / 多地区
支持简体中文、繁體中文、English 三语切换，覆盖中国大陆、中国香港、中国台湾等地区课程体系（DSE / 高考 / IB）。

### 🤖 多 AI 模型动态切换
后端支持 Claude / OpenAI / OpenRouter / DeepSeek 四种 AI 模型，可通过系统配置表动态切换，按成本和学科适配选择最优模型。

---

## 启动方法

### 前置条件

- Node.js >= 18
- MySQL >= 8.0
- npm >= 9

### 1. 后端

```bash
cd backend

# 安装依赖
npm install

# 配置环境变量（复制并编辑 .env）
cp .env.example .env
# 编辑 .env，填入数据库连接信息和 AI API Key

# 数据库迁移
npx prisma migrate dev

# 导入课程数据
npx ts-node prisma/seed.ts

# 开发模式启动（nodemon + ts-node）
npm run dev

# 生产模式启动
npm run build && npm start
```

后端默认运行在 `http://localhost:3000`。

### 2. 移动端

```bash
cd frontend/mobile

# 安装依赖
npm install

# 开发模式启动（Vite dev server）
npm run dev

# 构建生产版本
npm run build

# 预览构建产物
npm run preview
```

移动端开发服务器默认运行在 `http://localhost:5173`。在浏览器中通过 `.phone-frame` 容器模拟移动端界面展示。

### 3. 网页端

```bash
cd frontend/web/vite-app

# 安装依赖
npm install

# 开发模式启动
npm run dev

# 构建生产版本
npm run build

# 预览构建产物
npm run preview
```

网页端开发服务器默认运行在 `http://localhost:5173`。

---

## 团队分工

| 成员 | 职责 | 交付物 |
|---|---|---|
| 成员 1 | 课程内容 / 数据编排 / PPT 制作 | 课程内容包、示例数据、最终 PPT |
| 成员 2 | 移动端开发 | 学生端 / 家长端移动应用原型 |
| 成员 3 | 教师端 / 学校端网页开发 | 教师端 / 学校端网页应用原型 |
| 成员 4 | 后端开发 | 后端服务、数据库结构、API 接口 |

## 项目里程碑

| 日期 | 里程碑 |
|---|---|
| 5 月 17 日 | 完成主要功能核心开发，保证主流程可展示 |
| 5 月 24 日 | 完成 API 接口联通、PPT 与主要演示流程 |
| 5 月 29 日 | 最终 Presentation |

---

## 数据模型（核心表）

| 模型 | 说明 |
|---|---|
| User | 用户（学生、家长、教师、学校管理员四角色） |
| UserParent | 家长-孩子关联关系 |
| School | 学校 |
| Class | 班级 |
| ClassStudent | 学生-班级关联 |
| Subject / Chapter / KnowledgePoint | 学科 / 章节 / 知识点三级课程结构 |
| Progress | 知识点掌握记录（未掌握 / 部分掌握 / 已掌握） |
| ChatHistory | AI 对话历史 |
| MentalHealth | 心理健康聚合报告 |
| ForbiddenKeyword | 敏感词黑名单 |
| SystemConfig | 系统配置（AI 模型切换等） |

---

## API 端点概览

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | /api/auth/register | 用户注册 |
| POST | /api/auth/login | 用户登录 |
| GET/PUT | /api/users/* | 用户管理 |
| POST | /api/ai/chat | AI 对话（苏格拉底式引导） |
| GET | /api/classes/* | 班级 CRUD |
| GET | /api/schools/* | 学校 CRUD |
| GET/PUT | /api/progress/* | 学习进度查询 / 更新 |
| GET | /api/dashboard/* | 看板数据聚合 |
| GET | /api/subscription/* | 订阅状态 |
| GET/PUT | /api/system/* | 系统配置 |

---

## Credit

Powered by **Jack Guan**, **Nicole Zhu**, **Angela Mok**, **Tony Tu** from CUHK MSc in ISTM
