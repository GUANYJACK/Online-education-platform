# AI-Agent-Driven Online Education Platform — Product Requirements Document (PRD)

**Version**: v1.0 MVP  
**Date**: May 8, 2026  
**Product Manager**: Senior PM (Series A Startup)  
**Target Launch Date**: May 20, 2026 (MVP)

---

## 1. Product Overview

### 1.1 Product Vision
Build an AI-Agent-driven personalized online education platform that guides students through Socratic questioning, provides 24/7 personalized learning support, and monitors student mental health — giving parents, teachers, and schools real-time visibility into student learning progress and wellbeing.

### 1.2 Core Pain Points
- **Lack of Personalization**: Traditional education platforms cannot provide fully personalized educational guidance.
- **After-School Support Gap**: Students studying independently after school have no access to teacher guidance around the clock.
- **Mental Health Blind Spot**: Student mental health issues are difficult to detect and address early.
- **Home–School Communication Gap**: Parents and teachers lack real-time tools to monitor student learning progress and mental health.

### 1.3 Solution
- **AI Learning Assistant**: Powered by large model APIs (Claude / OpenAI / DeepSeek, etc.), uses Socratic questioning to guide students toward independent thinking.
- **Learning Progress Tracking**: Displays mastery levels hierarchically by Subject → Chapter → Knowledge Point (AI-assessed automatically).
- **Multi-Platform Monitoring Dashboard**: Parent-facing mobile dashboard for summary data; Teacher/School-facing web dashboard for class/school-wide data.
- **Mental Health Monitoring**: Multi-platform mental health dashboards — parents view their child's emotional state; teachers monitor class-level mental health; school admins view school/grade-wide data. Frontend UI ships first; AI emotion analysis (sentiment polarity, stress keywords, risk level) to be integrated later.

### 1.4 Target Users
| User Role | Platform | Core Need |
|-----------|----------|-----------|
| Student | Mobile | Personalized learning, after-school self-study, skills assessment |
| Parent | Mobile | Monitor child's learning progress and mental health (summary data) |
| Teacher | Web | View class-level knowledge point mastery rates and average learning progress |
| School Admin | Web | View school/grade-wide data (higher access than teachers) |
| Education Authority | N/A | Project support only — no feature development required |

---

## 2. User Stories

### 2.1 Student (Mobile — React Native)
| ID | User Story | Priority |
|----|-----------|----------|
| US-001 | As a student, I want to log in via phone number / email / WeChat so I can access platform features. | P1 |
| US-002 | As a student, I want to select learning content by Subject → Chapter → Knowledge Point so I can study systematically. | P0 |
| US-003 | As a student, I want a unified AI interaction interface for free-form questions and guided knowledge-point learning with Socratic prompting, so I can resolve doubts while studying. | P0 |
| US-004 | As a student, I want to take a skills assessment (combining school exam scores and wrong answers) to quickly gauge my learning level. | P0 |
| US-005 | As a student, I want to have text + voice conversations with the AI-Agent so I can switch seamlessly between free chat and guided learning. | P0 |
| US-006 | As a student, I want to view my learning progress (displayed by knowledge-point mastery) so I can understand my strengths and weaknesses. | P0 |
| US-007 | As a student, I want to see the AI's mastery rating for each knowledge point so I can focus my revision. | P0 |
| US-008 | As a student, I do not want to encounter prohibited topics (pornography, violence, criminal content) so I can learn in a safe environment. | P0 (pre-configured block) |

### 2.2 Parent (Mobile — React Native)
| ID | User Story | Priority |
|----|-----------|----------|
| US-009 | As a parent, I want to log in via phone number / email / WeChat so I can view my child's learning activity. | P1 |
| US-010 | As a parent, I want to link my child's account so I can access their learning data. | P0 |
| US-011 | As a parent, I want to view a summary of my child's learning progress (completion rate, knowledge-point mastery rate, study duration). | P0 |
| US-012 | As a parent, I want to view my child's mental health status (frontend UI only; data is empty placeholder). | P1 (reserved interface) |
| US-013 | As a parent, I want to receive in-app push notifications for my child's learning reports. | P1 |

### 2.3 Teacher / School (Web)
| ID | User Story | Priority |
|----|-----------|----------|
| US-014 | As a teacher, I want to log in with email + password so I can manage my class. | P1 |
| US-015 | As a teacher, I want to view knowledge-point mastery rates for students in my class so I can adjust my teaching strategy. | P0 |
| US-016 | As a teacher, I want to view the average learning progress of my class so I can understand overall performance. | P0 |
| US-017 | As a school admin, I want to view school/grade-wide data (with higher-level access than teachers). | P0 |
| US-018 | As a teacher, I want to join my school/class via a "Join School" page after registration. | P0 |
| US-019 | As a teacher, I want to view an aggregated mental health report for my class so I can identify students who need attention early. | P1 (reserved interface) |
| US-020 | As a school admin, I want to view school/grade-wide mental health data to assist educational decision-making. | P1 (reserved interface) |

---

## 3. Functional Requirements & Acceptance Criteria

### 3.1 Student — Mobile (React Native)

#### Module: User Authentication
**Description**: Students register and log in via phone + OTP / email + password / third-party login (WeChat, QQ).  
**Acceptance Criteria**:
- [ ] Support phone number + SMS verification code login (SMS service integration)
- [ ] Support email + password login
- [ ] Support WeChat and QQ third-party login
- [ ] After login, guide users to the "Join School / Organization" page
- [ ] Token mechanism maintains login state

#### Module: Learning Topic Selection (Subject → Chapter → Knowledge Point)
**Description**: Students select learning content hierarchically; built-in curriculum covers Chinese, Math, and English.  
**Acceptance Criteria**:
- [ ] Home screen displays subject list (Chinese, Math, English)
- [ ] Tapping a subject expands the chapter list
- [ ] Tapping a chapter expands the knowledge point list (with descriptive text)
- [ ] Each knowledge point is linked to practice exercises (text format)
- [ ] Selecting a knowledge point navigates to the AI interaction interface

#### Module: AI Interaction (Free Chat + Socratic Guided Learning)
**Description**: Students access AI through a unified entry point for both free-form questions and Socratic-guided knowledge-point learning, with seamless switching between modes.  
**Acceptance Criteria**:
- [ ] Provide a unified AI interaction entry (bottom navigation bar) supporting Free Chat mode and Knowledge Point Guidance mode
- [ ] Free Chat mode: students can ask questions freely without restriction to specific knowledge points
- [ ] Knowledge Point Guidance mode: after selecting a knowledge point, the AI guides students through Socratic questioning (without giving direct answers)
- [ ] Support text input + voice input (speech-to-text)
- [ ] AI responses displayed as text (voice output reserved for future MVP versions)
- [ ] Pre-configured prohibited topic filter (keyword blocklist for pornography, violence, crime, etc.; context-aware per subject)
- [ ] Conversation history saved (free chat and guided chat stored separately)
- [ ] Integrate multiple AI model APIs (Claude, OpenAI, OpenRouter, DeepSeek)
- [ ] Admin-configurable active model (supports switching by cost + subject suitability)
- [ ] AI assesses student mastery of knowledge points based on conversation (labels: Not Mastered / Partially Mastered / Mastered)
- [ ] Maintain multi-turn conversation context

#### Module: Skills Assessment (Combining Exam Scores and Wrong Answers)
**Description**: Combining in-school exam scores and wrong-answer data, in-app assessments dynamically evaluate and display fluctuating knowledge-point mastery levels.  
**Acceptance Criteria**:
- [ ] Provide a "Skills Assessment" entry point
- [ ] Support students importing/entering in-school exam scores (by subject and exam type)
- [ ] Support students entering or photographing wrong answers (categorized by knowledge point)
- [ ] Test questions drawn from linked practice exercises, with intelligent weighting based on wrong-answer records
- [ ] After assessment, AI automatically evaluates current level combining exam scores + wrong answers + assessment results
- [ ] Dynamically display fluctuating knowledge-point mastery levels (e.g., a point drops after an exam loss, rises after a correct assessment)
- [ ] Visualize mastery trend changes (timeline + floating curve chart)
- [ ] Assessment results synced to the learning progress display

#### Module: Learning Progress Display
**Description**: Displays mastery levels hierarchically by Subject → Chapter → Knowledge Point.  
**Acceptance Criteria**:
- [ ] Learning progress page with collapsible subject sections
- [ ] Each subject shows chapters; each chapter shows knowledge points
- [ ] Each knowledge point shows mastery level (progress bar or label: Not Mastered / Partially Mastered / Mastered)
- [ ] Mastery levels automatically assessed and updated by AI
- [ ] Display summary data including study duration and completion rate

---

### 3.2 Parent — Mobile (React Native)

#### Module: User Authentication & Account Linking
**Description**: Parents log in and link their child's account.  
**Acceptance Criteria**:
- [ ] Support phone + OTP / email + password / third-party login
- [ ] Link child's account (via child's phone number / email or by scanning a QR code in the child's app)
- [ ] One parent can link multiple children
- [ ] Linking requires confirmation from the child (privacy protection)

#### Module: Learning Progress Monitoring (Summary Data)
**Description**: View a summary of the child's learning progress; cannot access conversation content.  
**Acceptance Criteria**:
- [ ] Display child's learning summary: completion rate, knowledge-point mastery rate, study duration
- [ ] Show mastery breakdown by subject
- [ ] Display a 7-day learning trend chart
- [ ] **Cannot view** the child's specific AI conversation content

#### Module: Mental Health Status (Reserved Interface)
**Description**: Frontend page displaying mental health status with empty data (API interface reserved).  
**Acceptance Criteria**:
- [ ] Provide a mental health status page (UI-first approach)
- [ ] Display sentiment polarity (positive/negative), stress keywords, risk level (low/medium/high)
- [ ] Show placeholder display when data is empty (AI analysis to be connected later)
- [ ] High-risk alerts (to be implemented later)

#### Module: Push Notifications
**Description**: In-app push delivery of learning reports.  
**Acceptance Criteria**:
- [ ] Integrate in-app push notification service
- [ ] Regularly push learning reports (weekly, configurable)
- [ ] Tapping a notification navigates to the corresponding data page

---

### 3.3 Teacher / School — Web

#### Module: User Authentication & School Association
**Description**: Teachers log in with email + password and associate with a school/class after registration.  
**Acceptance Criteria**:
- [ ] Email + password login
- [ ] After registration, guide users to the "Join School / Organization" page
- [ ] Enter a school code or search by school name to join
- [ ] Teachers create or join classes; students join via class code

#### Module: Class Data Monitoring
**Description**: View knowledge-point mastery rates and average learning progress for class students.  
**Acceptance Criteria**:
- [ ] Display list of classes taught
- [ ] Each class shows: student count, average knowledge-point mastery rate, average learning progress
- [ ] Clicking a class shows the student list and individual mastery rates
- [ ] Support filtering by knowledge point (identify which students have not mastered a specific point)

#### Module: School Admin View
**Description**: School admins can view school/grade-wide data.  
**Acceptance Criteria**:
- [ ] Role-based access control (teachers see only their own classes; admins see the whole school)
- [ ] Admins can view data for all classes
- [ ] Admins can view grade-level aggregate data
- [ ] Support data export (Excel format; reserved for MVP)

#### Module: Student Management
**Description**: Teachers manage students within their class.  
**Acceptance Criteria**:
- [ ] View class student list (name, account, join date)
- [ ] Remove student functionality
- [ ] View detailed learning data for individual students (via navigation or modal)

#### Module: Teacher-Side Mental Health Monitoring
**Description**: Teachers view an aggregated mental health report for their class to identify students who need early attention.  
**Acceptance Criteria**:
- [ ] Provide class mental health monitoring page (UI-first; data reserved)
- [ ] Display aggregate class mental health indicators (sentiment polarity distribution, average risk level)
- [ ] Show each student's mental health risk level (low/medium/high) in a student list; raw conversation data not displayed
- [ ] Support filtering by risk level (quickly locate high-risk students)
- [ ] Prominent highlight for high-risk students (label or color indicator)
- [ ] Clicking a student shows their mental health trend chart (timeline + risk level changes)
- [ ] Display placeholder when data is empty (AI emotion analysis to be integrated later)
- [ ] Reserve AI emotion analysis interface (sentiment polarity, stress keywords, risk level)

#### Module: School Mental Health Module (Admin View)
**Description**: School admins view school/grade-wide student mental health data to support educational decision-making.  
**Acceptance Criteria**:
- [ ] Provide a school-wide mental health dashboard (UI-first; data reserved)
- [ ] Display school/grade-wide aggregate mental health indicators (sentiment polarity distribution, risk level distribution, stress keyword cloud)
- [ ] Support drill-down by grade and class
- [ ] Display school-wide mental health trend chart (timeline + headcount changes by risk level)
- [ ] Support filtering by risk level to quickly identify classes or grades needing attention
- [ ] Display placeholder when data is empty (AI analysis to be connected later)
- [ ] Support data export (Excel format; reserved for MVP)
- [ ] Role-based access control (teachers see only their own classes; admins see the whole school)

---

### 3.4 Backend — Node.js + Express + MySQL

#### Module: User Management
**Acceptance Criteria**:
- [ ] Four roles: Student, Parent, Teacher, School Admin
- [ ] Role-based access control (JWT + middleware)
- [ ] Parent–child relationship table
- [ ] Teacher–class–student relationship table

#### Module: AI Model Integration
**Acceptance Criteria**:
- [ ] Integrate Claude API (Anthropic)
- [ ] Integrate OpenAI API (GPT)
- [ ] Integrate OpenRouter API (multi-model routing)
- [ ] Integrate DeepSeek API
- [ ] Admin-configurable active model (environment variable or database config)
- [ ] Model-switching logic (select model based on scenario)
- [ ] Encrypted storage of API keys

#### Module: Learning Progress Tracking
**Acceptance Criteria**:
- [ ] Record student learning behaviors (selecting knowledge points, conversations, assessments, etc.)
- [ ] AI callback to update knowledge-point mastery levels (interface design)
- [ ] Store mastery status hierarchically: Subject → Chapter → Knowledge Point
- [ ] Provide query interfaces for teachers/parents (summary data only; no conversation details)

#### Module: Mental Health Module
**Acceptance Criteria**:
- [ ] Design mental health data schema (sentiment polarity, keywords, risk level, timestamp)
- [ ] Provide storage interface (AI analysis not implemented in MVP; interface reserved)
- [ ] Parent-facing query interface (returns empty data or placeholder)
- [ ] Teacher-facing query interface (class-level aggregate data; raw conversations excluded)
- [ ] School admin query interface (school/grade-level aggregate data)
- [ ] Mental health data stores aggregate reports only; raw emotion data is not stored

#### Module: Prohibited Topic Filter
**Acceptance Criteria**:
- [ ] Pre-configure sensitive keyword blocklist (pornography, violence, crime, etc.)
- [ ] Filter user input (reject or redirect topic when blocklist match is detected)
- [ ] Blocklist configurable from admin backend

#### Module: Payment Frontend Page (Freemium)
**Acceptance Criteria**:
- [ ] Design subscription page UI (feature comparison: Free vs. Premium)
- [ ] No actual payment integration (button click shows "Coming Soon" prompt)
- [ ] Users can view their current subscription status

---

## 4. Recommended Tech Stack (Optimized for Speed)

### 4.1 Mobile (Student + Parent)
| Component | Choice | Notes |
|-----------|--------|-------|
| Framework | **React Native** | Cross-platform, mature ecosystem, supports native capability extensions |
| Language | TypeScript | Type-safe; facilitates team collaboration |
| State Management | Redux Toolkit | Full-featured; suitable for unified MVP implementation |
| HTTP Client | Axios | Standard HTTP client |
| Local Storage | AsyncStorage | Lightweight key-value store (token, user preferences) |
| Voice Input | react-native-voice | Speech-to-text capability |
| Push Notifications | Firebase Cloud Messaging (FCM) | In-app push (requires domestic adaptation for China) |
| Third-Party Login | Official SDK wrappers (WeChat / QQ) | WeChat and QQ login |

### 4.2 Web (Teacher / School)
| Component | Choice | Notes |
|-----------|--------|-------|
| Framework | **React + TypeScript** | Mature ecosystem; rich component library |
| UI Library | Ant Design / Material-UI | Enterprise-grade UI components; fast prototyping |
| State Management | Redux Toolkit / Zustand | Lightweight state management |
| Router | React Router | Standard routing solution |
| Charts | ECharts / Recharts | Data visualization (learning progress charts) |
| HTTP Client | Axios | Network requests |
| Auth | JWT + localStorage | Token management |

### 4.3 Backend
| Component | Choice | Notes |
|-----------|--------|-------|
| Runtime | **Node.js** | JavaScript backend runtime |
| Framework | **Express** | Lightweight web framework |
| Language | TypeScript | Type-safe; reduces errors |
| Database | **MySQL** | Relational database; strong data consistency |
| ORM | Prisma / TypeORM | Simplified database operations |
| Auth | JWT (jsonwebtoken) | Stateless authentication |
| Password Hashing | bcrypt | Secure password hashing |
| AI Integration | anthropic / openai SDK | Official SDKs |
| Env Config | dotenv | Configuration management |
| Logging | winston | Log recording |

### 4.4 Third-Party Services
| Service | Choice | Notes |
|---------|--------|-------|
| AI Models | Claude API, OpenAI API, OpenRouter, DeepSeek | External large model APIs |
| SMS Service | Alibaba Cloud SMS / Tencent Cloud SMS | Phone number OTP |
| Push Notifications | Firebase Cloud Messaging | In-app push (domestic fallback needed for China) |
| Third-Party Login | WeChat Open Platform, QQ Connect | Social account login |

---

## 5. Business Model Canvas

### 5.1 Value Propositions
- **Students**: 24/7 AI personalized learning guidance; Socratic questioning cultivates independent thinking; visualized learning progress
- **Parents**: Real-time visibility into child's learning progress and mental health without constant supervision
- **Teachers**: Understand class-level knowledge mastery and mental health; adjust teaching strategies proactively; identify at-risk students early
- **Schools**: School-wide learning and mental health analytics to support educational decision-making

### 5.2 Customer Segments
| Customer Type | Description |
|---------------|-------------|
| Students (Individual) | Primary and secondary school students needing after-school tutoring |
| Parents (Individual) | Parents invested in their children's education, willing to pay for quality tools |
| Schools / Teachers | Teachers and administrators at public or private schools |
| Education Authority (Government) | Regional education administrators; supports project applications |

### 5.3 Channels
- **Online**: App stores (App Store, Google Play), official website, social media (WeChat, Douyin)
- **Offline**: School partnerships, education institution outreach
- **B2B2C**: Reach parents and students through school partnerships

### 5.4 Customer Relationships
- **Self-Service**: Students and parents use the app independently
- **Automated Service**: AI learning assistant available 24/7
- **Dedicated Support**: School admins receive dedicated support (paid tier)

### 5.5 Revenue Streams — Freemium Model
| Tier | Features | Price |
|------|----------|-------|
| Free | Basic AI chat, learning progress tracking, limited parent monitoring | Free |
| Premium (Student) | Unlimited AI chat, detailed learning reports, mental health analysis | ¥29/month or ¥299/year |
| Premium (Parent) | Multiple child accounts, detailed mental health reports, learning recommendations | ¥39/month or ¥399/year |
| School Plan | Class management, school-wide data, teacher tools, dedicated support | From ¥999/month (priced by student count) |

### 5.6 Key Resources
- AI model APIs (Claude, OpenAI, etc.)
- Curriculum content library (Chinese, Math, English knowledge points)
- Technical team (React Native, Node.js, React development)
- Servers and databases

### 5.7 Key Activities
- AI-Agent conversation system development and maintenance
- Learning progress tracking algorithm optimization
- Multi-platform product development (mobile and web)
- Curriculum content library updates

### 5.8 Key Partners
- AI model providers (Anthropic, OpenAI, etc.)
- Schools and educational institutions (B2B2C channel)
- Education authorities (policy support and project applications)
- Cloud service providers (servers, databases)

### 5.9 Cost Structure
| Cost Item | Notes |
|-----------|-------|
| AI Model API Usage | Token-based billing; Claude/GPT are more expensive, DeepSeek is cheaper |
| Servers & Database | Cloud service fees (Alibaba Cloud / Tencent Cloud / AWS) |
| SMS Costs | Phone number OTP delivery |
| Labor Costs | Development team salaries |
| Curriculum Content Production | Knowledge point organization, exercise writing |
| Third-Party Services | Push notifications, speech recognition, etc. |

---

## 6. Project Timeline (MVP — Target Launch: May 20)

### 6.1 Key Milestones
| Date | Milestone | Notes |
|------|-----------|-------|
| May 8 | PRD confirmed; technical architecture designed | Completed today |
| May 9–10 | Database design + API interface design + UI prototyping | 2 days |
| May 11–15 | Core feature development (Student + Parent apps + Backend) | 5 days (parallel development) |
| May 14–17 | Teacher/School web development | 4 days (parallel with backend) |
| May 16–18 | Integration testing + bug fixes | 3 days |
| May 19 | Internal testing + performance optimization | 1 day |
| May 20 | MVP launch | Target date |

### 6.2 Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| AI model API latency / failure | Poor student conversation experience | Multi-model fallback (OpenRouter routing), retry mechanism |
| 12-day development timeline insufficient | Feature delays | Drop non-core features (mental health analysis, voice output); deliver UI only |
| Limited React Native development experience | Slow development pace | Use ready-made component libraries; simplify UI design |
| Multi-platform data sync issues | Parents and teachers see stale data | Use WebSocket or periodic polling |

---

## 7. Open Items (Clarified: May 9, 2026)

1. **AI Model Priority**: Which model to use for MVP? DeepSeek (cheaper) or Claude (better for teaching)?  
   ✅ Confirmed: No priority preference; default to cost + subject-suitability logic (e.g., Math → DeepSeek; Chinese → Claude).

2. **Voice Capability (MVP)**: Which plugin for input; what are the output boundaries?  
   ✅ Confirmed: Voice input uses `react-native-voice`; voice output reserved for MVP only — plugin evaluation deferred.

3. **Push Notifications**: Firebase may have issues in mainland China; fallback to Getui or JPush?  
   ✅ Confirmed: Push notifications not implemented in MVP; to be integrated in a future release.

4. **WeChat Login**: Requires WeChat Open Platform certification (corporate entity required). Mandatory for MVP?  
   ✅ Confirmed: WeChat login is optional for MVP; default support is phone + OTP and email + password only.

5. **Curriculum Content**: Who provides Chinese, Math, and English knowledge points — existing content or open-source resources needed?  
   ✅ Confirmed: Adopt Hong Kong DSE + China Compulsory Education curriculum standards; open-source curriculum resources to be sourced.

6. **Mental Health UI**: What style for high-risk alerts — modal, red label, or notification?  
   ✅ Confirmed: MVP delivers frontend placeholder UI only; no raw data stored or displayed; only aggregate reports shown; high-risk alerts implemented later.

7. **Student Skills Assessment**: How many test questions per knowledge point? Suggested 5–10.  
   ✅ Confirmed: Skills assessment combines exam scores + AI conversation-based mastery judgment; AI evaluates conversation success rate; specific question count TBD.

---

## 8. Confirmed Implementation Details (Post-Clarification: May 9, 2026)

### 8.1 AI Logic Rules
- **Socratic Questioning**: Enforced via a fixed global system prompt
- **Knowledge Point Mastery Assessment**: Exam scores + AI evaluation of conversation success rate (combined approach)
- **Model Switching Logic**: Default to cost + subject-suitability; no special preferences
- **AI Interface Degradation**: If interface is unavailable or times out, return an error message only; no automatic fallback to a backup model
- **Sensitive Word Filtering**: Rule-based, context-aware filtering per subject (e.g., biology class allows reproductive/anatomical terminology)

### 8.2 Content Scope
- **Grade Levels Covered**: Primary (Grades 1–6), Junior Secondary (Grades 7–9), Senior Secondary (Grades 10–12)
- **Curriculum Standards**: Hong Kong DSE + China Compulsory Education curriculum
- **Free Tier Limit**: Free users can access a maximum of 5 knowledge points per day
- **Curriculum Resources**: Open-source knowledge points and practice exercises aligned to curriculum standards to be sourced

### 8.3 Privacy & Permissions
- **Compliance**: Parental informed consent required; users self-declare age at registration; data retained for 3 years after account deletion (default)
- **Parent–Child Linking**: Automatically linked upon parent verification; no child confirmation required
- **Role Permissions**:
  - School Admin: can manually edit student knowledge-point mastery levels
  - Teacher: cannot view student–AI conversation content
  - Parent: cannot view any conversation content; can only view aggregate learning data
- **Mental Health Module**: Raw emotional data is not stored or displayed; only aggregate risk reports are shown

### 8.4 Technical Implementation Requirements
- **Development Workflow**: Define core database schema and API interface specifications before writing code
- **Mobile Compatibility**: React Native supports Android 8+ and iOS 13+; no offline mode
- **Push Notifications**: Not implemented in MVP
- **Third-Party Login**: WeChat login optional for MVP; default support is phone and email login only
- **Tech Stack**: As specified in Section 4; no changes

### 8.5 Edge Case Handling
- **Scope Trimming**: No special prioritization; non-core features may be trimmed as needed
- **Sensitive Word False Positives**: Subject-specific rule-based filtering to avoid misclassification (e.g., biology-class terminology)
- **Model Switching**: No user preference; default to cost + subject-suitability logic
