# AI-Agent 驱动在线教育平台

## 项目概述

本项目是一个 AI-Agent 驱动的在线教育平台 MVP，旨在通过苏格拉底式提问引导学生思考，提供 24 小时个性化学习指导，同时监测学生心理健康状态，让家长、教师、学校实时掌握学生学习进度与心理状态。

平台覆盖香港 DSE 及中国义务教育课程标准（小学、初中、高中），支持语文、数学、英语三大学科。采用 Freemium 商业模式，免费用户每日可访问 5 个知识点。

**目标上线日期**：2026 年 5 月 20 日（MVP）

### 核心功能

- **AI 学习助手**：基于大模型 API（Claude / OpenAI / DeepSeek 等），通过苏格拉底式提问引导学生独立思考，支持自由对话与知识点引导两种模式
- **学习进度追踪**：按学科 → 章节 → 知识点层级展示掌握程度，AI 自动评估并动态更新
- **能力测试**：结合在校考试分数与错题数据，智能加权出题，可视化展示掌握程度变化趋势
- **多端监控面板**：家长端（移动端）查看孩子学习汇总与心理健康状态；教师 / 学校端（网页端）查看班级 / 全校数据
- **心理健康监控**：多端心理健康监控面板（MVP 为前端占位，预留 AI 情绪分析接口）
- **用户角色**：学生、家长、教师、学校管理员四角色，基于 JWT 的权限控制

### 技术栈

| 端 | 技术选型 |
|---|---|
| 移动端（学生端 + 家长端） | React Native + TypeScript + Redux Toolkit + Axios |
| 网页端（教师 / 学校端） | React + TypeScript + Ant Design + ECharts |
| 后端 | Node.js + Express + TypeScript + MySQL + Prisma |
| AI 集成 | Claude API / OpenAI API / OpenRouter / DeepSeek |

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
│   │   ├── config/                    # 配置管理（环境变量、数据库连接、AI 模型配置）
│   │   ├── middleware/                # 中间件（JWT 认证、角色权限、请求日志）
│   │   ├── models/                    # 数据模型（Prisma schema）
│   │   │   ├── User.ts                # 用户表（学生、家长、教师、管理员）
│   │   │   ├── ParentChild.ts         # 家长-孩子关联表
│   │   │   ├── School.ts              # 学校表
│   │   │   ├── Class.ts               # 班级表
│   │   │   ├── TeacherClass.ts        # 教师-班级关联表
│   │   │   ├── StudentClass.ts        # 学生-班级关联表
│   │   │   ├── Subject.ts             # 学科表
│   │   │   ├── Chapter.ts             # 章节表
│   │   │   ├── KnowledgePoint.ts      # 知识点表
│   │   │   ├── Exercise.ts            # 练习题表
│   │   │   ├── ChatSession.ts         # AI 对话会话表
│   │   │   ├── ChatMessage.ts         # 对话消息表
│   │   │   ├── TestResult.ts          # 能力测试结果表
│   │   │   ├── MasteryRecord.ts       # 知识点掌握记录表
│   │   │   ├── MentalHealthReport.ts  # 心理健康聚合报告表
│   │   │   └── Subscription.ts        # 订阅信息表
│   │   ├── routes/                    # API 路由
│   │   │   ├── auth.routes.ts         # 认证相关（注册、登录、Token 刷新）
│   │   │   ├── user.routes.ts         # 用户管理
│   │   │   ├── student.routes.ts      # 学生端接口
│   │   │   ├── parent.routes.ts       # 家长端接口
│   │   │   ├── teacher.routes.ts      # 教师端接口
│   │   │   ├── admin.routes.ts        # 管理员接口
│   │   │   ├── ai.routes.ts           # AI 对话接口
│   │   │   ├── content.routes.ts      # 课程内容接口
│   │   │   ├── progress.routes.ts     # 学习进度接口
│   │   │   ├── test.routes.ts         # 能力测试接口
│   │   │   ├── mentalHealth.routes.ts # 心理健康接口
│   │   │   └── school.routes.ts       # 学校 / 班级管理接口
│   │   ├── services/                  # 业务逻辑层
│   │   │   ├── ai.service.ts          # AI 模型调用与切换逻辑
│   │   │   ├── auth.service.ts        # 认证与权限逻辑
│   │   │   ├── content.service.ts     # 课程内容管理
│   │   │   ├── progress.service.ts    # 学习进度计算与更新
│   │   │   ├── mastery.service.ts     # 知识点掌握度评估
│   │   │   ├── filter.service.ts      # 敏感词过滤
│   │   │   └── mentalHealth.service.ts # 心理健康数据处理
│   │   ├── utils/                     # 工具函数
│   │   │   ├── jwt.ts                 # JWT 生成与验证
│   │   │   ├── logger.ts              # 日志工具（winston）
│   │   │   └── validators.ts          # 输入校验
│   │   └── app.ts                     # Express 应用入口
│   ├── prisma/
│   │   └── schema.prisma              # 数据库 Schema 定义
│   ├── .env                           # 环境变量（数据库、API Key 等）
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── mobile/                        # 移动端（React Native）
│   │   ├── src/
│   │   │   ├── api/                   # API 请求封装（Axios）
│   │   │   ├── assets/                # 静态资源（图片、字体）
│   │   │   ├── components/            # 公共组件
│   │   │   │   ├── common/            # 通用组件（Button、Input、Loading 等）
│   │   │   │   ├── auth/              # 认证相关组件
│   │   │   │   ├── learning/          # 学习相关组件
│   │   │   │   └── chart/             # 图表组件
│   │   │   ├── navigation/            # 导航配置（React Navigation）
│   │   │   ├── screens/               # 页面
│   │   │   │   ├── auth/              # 登录 / 注册
│   │   │   │   ├── student/           # 学生端页面
│   │   │   │   │   ├── HomeScreen.tsx           # 首页（学科选择）
│   │   │   │   │   ├── SubjectScreen.tsx        # 章节 / 知识点列表
│   │   │   │   │   ├── ChatScreen.tsx           # AI 对话页
│   │   │   │   │   ├── TestScreen.tsx           # 能力测试页
│   │   │   │   │   ├── ProgressScreen.tsx       # 学习进度页
│   │   │   │   │   └── ProfileScreen.tsx        # 个人中心
│   │   │   │   ├── parent/            # 家长端页面
│   │   │   │   │   ├── ParentHomeScreen.tsx     # 家长首页
│   │   │   │   │   ├── ChildProgressScreen.tsx  # 孩子学习进度
│   │   │   │   │   ├── MentalHealthScreen.tsx   # 心理健康（占位）
│   │   │   │   │   └── BindChildScreen.tsx      # 绑定孩子账号
│   │   │   │   └── role-switch/       # 角色切换页
│   │   │   ├── store/                 # Redux Toolkit 状态管理
│   │   │   │   ├── slices/
│   │   │   │   │   ├── authSlice.ts
│   │   │   │   │   ├── learningSlice.ts
│   │   │   │   │   └── progressSlice.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/                 # 自定义 Hooks
│   │   │   ├── utils/                 # 工具函数
│   │   │   └── App.tsx                # 应用入口
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── app.json
│   │
│   └── web/                           # 网页端（React）
│       ├── src/
│       │   ├── api/                   # API 请求封装
│       │   ├── assets/                # 静态资源
│       │   ├── components/            # 公共组件
│       │   │   ├── common/            # 通用组件
│       │   │   ├── layout/            # 布局组件（Header、Sidebar）
│       │   │   └── chart/             # 图表组件（ECharts）
│       │   ├── pages/                 # 页面
│       │   │   ├── auth/              # 登录 / 注册
│       │   │   ├── teacher/           # 教师端页面
│       │   │   │   ├── Dashboard.tsx           # 教师看板
│       │   │   │   ├── ClassList.tsx            # 班级列表
│       │   │   │   ├── ClassDetail.tsx          # 班级详情（学生列表 + 掌握率）
│       │   │   │   ├── StudentDetail.tsx        # 学生详情
│       │   │   │   └── MentalHealth.tsx         # 班级心理健康（占位）
│       │   │   └── admin/             # 管理员端页面
│       │   │       ├── Dashboard.tsx           # 全校看板
│       │   │       ├── SchoolOverview.tsx      # 年级 / 班级数据
│       │   │       ├── SchoolMentalHealth.tsx  # 全校心理健康（占位）
│       │   │       └── SchoolSettings.tsx      # 学校设置
│       │   ├── store/                 # 状态管理（Redux Toolkit / Zustand）
│       │   ├── router/               # 路由配置（React Router）
│       │   ├── hooks/                 # 自定义 Hooks
│       │   ├── utils/                 # 工具函数
│       │   └── App.tsx                # 应用入口
│       ├── package.json
│       └── tsconfig.json
│
├── content/                           # 课程内容数据
│   ├── subjects/                      # 学科数据
│   │   ├── chinese/                   # 语文
│   │   │   ├── chapters.json          # 章节数据
│   │   │   └── knowledge-points.json  # 知识点与描述
│   │   ├── math/                      # 数学
│   │   │   ├── chapters.json
│   │   │   └── knowledge-points.json
│   │   └── english/                   # 英语
│   │       ├── chapters.json
│   │       └── knowledge-points.json
│   ├── exercises/                     # 练习题库
│   │   ├── chinese.json
│   │   ├── math.json
│   │   └── english.json
│   └── seed.ts                        # 数据导入脚本
│
├── docs/                              # 项目文档
│   ├── api/                           # API 接口文档
│   │   └── endpoints.md               # 接口清单与说明
│   ├── database/                      # 数据库文档
│   │   └── schema.md                  # 表结构说明与 ER 图
│   └── design/                        # 设计文档
│       └── ui-mockups.md             # UI 原型说明
│
└── .git/                              # Git 版本控制
```

---

## 启动方法

> **注意**：当前项目处于早期开发阶段，以下命令为各端标准启动流程，待脚手架搭建完成后可直接使用。

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

# 开发模式启动
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

# iOS（需要 CocoaPods）
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

### 3. 网页端

```bash
cd frontend/web

# 安装依赖
npm install

# 开发模式启动
npm run dev

# 构建生产版本
npm run build
```

网页端默认运行在 `http://localhost:5173`。

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

## Credit

Power By **Jack Guan**, **Nicole Zhu**, **Angela Mok**, **Tony Tu** from CUHK MSc in ISTM
