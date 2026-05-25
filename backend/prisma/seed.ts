import { PrismaClient, Role, Gender, MasteryLevel } from '@prisma/client';
import bcrypt from 'bcryptjs';
import {
  mathPrimaryChapters,
  mathJuniorChapters,
  mathSeniorChapters,
  englishPrimaryChapters,
  englishJuniorChapters,
  englishSeniorChapters,
  chinesePrimaryChapters,
  chineseJuniorChapters,
  chineseSeniorChapters,
} from './courseData';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with DSE course content...');

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('password123', salt);

  // ============================================================
  // 1. Schools
  // ============================================================
  const school1 = await prisma.school.upsert({
    where: { code: 'HS001' },
    update: {},
    create: { name: 'No. 1 High School', code: 'HS001', address: '123 Education Street' }
  });

  const school2 = await prisma.school.upsert({
    where: { code: 'HS002' },
    update: {},
    create: { name: 'Sunshine Middle School', code: 'HS002', address: '456 Sunshine Road' }
  });

  // ============================================================
  // 2. Users (保留原有4个默认账户 + 新增测试账户)
  // ============================================================
  const admin = await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: { name: 'Admin User', password, role: Role.SCHOOL_ADMIN },
    create: { name: 'Admin User', email: 'admin@school.com', password, role: Role.SCHOOL_ADMIN }
  });

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@school.com' },
    update: { name: 'Mr. Smith', password, role: Role.TEACHER },
    create: { name: 'Mr. Smith', email: 'teacher@school.com', password, role: Role.TEACHER }
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@school.com' },
    update: { name: 'Alice', phone: '1234567890', password, role: Role.STUDENT },
    create: {
      name: 'Alice', email: 'student@school.com', phone: '1234567890', password,
      role: Role.STUDENT,
      gender: Gender.FEMALE, age: 14, country: 'CN', grade: 'G8'
    }
  });

  const parent = await prisma.user.upsert({
    where: { email: 'parent@family.com' },
    update: { name: 'Alice Parent', password, role: Role.PARENT },
    create: { name: 'Alice Parent', email: 'parent@family.com', password, role: Role.PARENT }
  });

  const student2 = await prisma.user.upsert({
    where: { email: 'bob@school.com' },
    update: {},
    create: {
      name: 'Bob', email: 'bob@school.com', phone: '1112223334', password,
      role: Role.STUDENT,
      gender: Gender.MALE, age: 16, country: 'HK', grade: 'S4'
    }
  });

  const student3 = await prisma.user.upsert({
    where: { email: 'carol@school.com' },
    update: {},
    create: {
      name: 'Carol', email: 'carol@school.com', phone: '5556667778', password,
      role: Role.STUDENT,
      gender: Gender.FEMALE, age: 12, country: 'CN', grade: 'P6'
    }
  });

  const teacher2 = await prisma.user.upsert({
    where: { email: 'li@school.com' },
    update: {},
    create: { name: 'Ms. Li', email: 'li@school.com', password, role: Role.TEACHER }
  });

  // ============================================================
  // 3. Parent – Child Bindings
  // ============================================================
  await prisma.userParent.upsert({
    where: { parentId_childId: { parentId: parent.id, childId: student.id } },
    update: {},
    create: { parentId: parent.id, childId: student.id }
  });

  // ============================================================
  // 4. Classes
  // ============================================================
  const mathClass = await prisma.class.upsert({
    where: { code: 'MATH101' },
    update: {},
    create: {
      name: 'Math Class 1', code: 'MATH101',
      schoolId: school1.id, teacherId: teacher.id,
      grade: 'G8', subject: 'Mathematics'
    }
  });

  const englishClass = await prisma.class.upsert({
    where: { code: 'ENG201' },
    update: {},
    create: {
      name: 'English Advanced', code: 'ENG201',
      schoolId: school1.id, teacherId: teacher2.id,
      grade: 'S4', subject: 'English'
    }
  });

  const chineseClass = await prisma.class.upsert({
    where: { code: 'CHN301' },
    update: {},
    create: {
      name: 'Chinese Literature', code: 'CHN301',
      schoolId: school1.id, teacherId: teacher.id,
      grade: 'G8', subject: 'Chinese'
    }
  });

  // ============================================================
  // 5. Enroll Students in Classes
  // ============================================
  await prisma.classStudent.upsert({
    where: { classId_studentId: { classId: mathClass.id, studentId: student.id } },
    update: {},
    create: { classId: mathClass.id, studentId: student.id }
  });
  await prisma.classStudent.upsert({
    where: { classId_studentId: { classId: englishClass.id, studentId: student2.id } },
    update: {},
    create: { classId: englishClass.id, studentId: student2.id }
  });
  await prisma.classStudent.upsert({
    where: { classId_studentId: { classId: chineseClass.id, studentId: student3.id } },
    update: {},
    create: { classId: chineseClass.id, studentId: student3.id }
  });
  await prisma.classStudent.upsert({
    where: { classId_studentId: { classId: mathClass.id, studentId: student2.id } },
    update: {},
    create: { classId: mathClass.id, studentId: student2.id }
  });

  // ============================================================
  // 6. Subjects
  // ============================================================
  const mathSubject = await prisma.subject.upsert({
    where: { name: 'Mathematics' },
    update: {},
    create: { name: 'Mathematics', icon: 'calculator', sortOrder: 1 }
  });

  const englishSubject = await prisma.subject.upsert({
    where: { name: 'English' },
    update: {},
    create: { name: 'English', icon: 'book', sortOrder: 2 }
  });

  const chineseSubject = await prisma.subject.upsert({
    where: { name: 'Chinese' },
    update: {},
    create: { name: 'Chinese', icon: 'pen', sortOrder: 3 }
  });

  // ============================================================
  // 7. Chapters & Knowledge Points (from DSE course_info JSON)
  // ============================================================

  // Helper: create chapters and knowledge points for a subject
  async function seedChapters(
    subjectId: string,
    chapters: { name: string; sortOrder: number; knowledgePoints: { name: string; desc: string; sortOrder: number }[] }[]
  ) {
    for (const ch of chapters) {
      const chapter = await prisma.chapter.create({
        data: {
          name: ch.name,
          subjectId,
          sortOrder: ch.sortOrder,
          knowledgePoints: {
            create: ch.knowledgePoints.map(kp => ({
              name: kp.name,
              desc: kp.desc,
              sortOrder: kp.sortOrder,
            }))
          }
        }
      });
      console.log(`  Chapter: ${ch.name} (${ch.knowledgePoints.length} KPs)`);
    }
  }

  console.log('\nSeeding Mathematics chapters...');
  await seedChapters(mathSubject.id, mathPrimaryChapters);
  await seedChapters(mathSubject.id, mathJuniorChapters);
  await seedChapters(mathSubject.id, mathSeniorChapters);

  console.log('Seeding English chapters...');
  await seedChapters(englishSubject.id, englishPrimaryChapters);
  await seedChapters(englishSubject.id, englishJuniorChapters);
  await seedChapters(englishSubject.id, englishSeniorChapters);

  console.log('Seeding Chinese chapters...');
  await seedChapters(chineseSubject.id, chinesePrimaryChapters);
  await seedChapters(chineseSubject.id, chineseJuniorChapters);
  await seedChapters(chineseSubject.id, chineseSeniorChapters);

  // ============================================================
  // 8. Textbooks (教材版本)
  // ============================================================
  const textbookPep = await prisma.textbook.upsert({
    where: { id: 'textbook-pep' },
    update: {},
    create: { id: 'textbook-pep', name: '人教版 (PEP)', grade: 'G8' }
  });
  const textbookBsd = await prisma.textbook.upsert({
    where: { id: 'textbook-bsd' },
    update: {},
    create: { id: 'textbook-bsd', name: '北师大版 (BNU)', grade: 'G8' }
  });
  const textbookHk = await prisma.textbook.upsert({
    where: { id: 'textbook-hk' },
    update: {},
    create: { id: 'textbook-hk', name: '香港教育出版社 (HKEd)', grade: 'G7' }
  });
  const textbookCambridge = await prisma.textbook.upsert({
    where: { id: 'textbook-cam' },
    update: {},
    create: { id: 'textbook-cam', name: 'Cambridge', grade: 'G9' }
  });

  // Associate knowledge points with textbooks
  const allKps = await prisma.knowledgePoint.findMany();
  for (const kp of allKps) {
    const tbIds = [textbookPep.id, textbookBsd.id];
    if (kp.name.includes('Poetry') || kp.name.includes('Ci') || kp.name.includes('Narrative') || kp.name.includes('Rhetorical') || kp.name.includes('文言') || kp.name.includes('经典')) {
      tbIds.push(textbookHk.id);
    }
    for (const tbId of tbIds) {
      await prisma.knowledgePointTextbook.upsert({
        where: { knowledgePointId_textbookId: { knowledgePointId: kp.id, textbookId: tbId } },
        update: {},
        create: { knowledgePointId: kp.id, textbookId: tbId, pageRef: `${Math.floor(Math.random() * 100) + 1}-${Math.floor(Math.random() * 100) + 50}` }
      });
    }
  }

  // ============================================================
  // 9. Progress (学习进度)
  // ============================================================
  const kps = await prisma.knowledgePoint.findMany();

  function findKp(name: string) {
    return kps.find(k => k.name === name);
  }

  // Alice's math progress (中一至中三 level)
  const aliceKpPairs = [
    { name: '有理数的概念', mastery: MasteryLevel.MASTERED, time: 2400, date: '2026-05-20' },
    { name: '有理数的加减法', mastery: MasteryLevel.MASTERED, time: 1800, date: '2026-05-21' },
    { name: '一元一次方程', mastery: MasteryLevel.PARTIAL, time: 1200, date: '2026-05-23' },
    { name: '方程的解法', mastery: MasteryLevel.PARTIAL, time: 900, date: '2026-05-24' },
    { name: '三角形的分类', mastery: MasteryLevel.MASTERED, time: 1500, date: '2026-05-22' },
    { name: '全等三角形', mastery: MasteryLevel.PARTIAL, time: 600, date: '2026-05-24' },
    { name: '平均数', mastery: MasteryLevel.MASTERED, time: 800, date: '2026-05-19' },
    { name: '条形图', mastery: MasteryLevel.MASTERED, time: 500, date: '2026-05-18' },
  ];
  for (const p of aliceKpPairs) {
    const kp = findKp(p.name);
    if (kp) {
      await prisma.progress.upsert({
        where: { studentId_knowledgePointId: { studentId: student.id, knowledgePointId: kp.id } },
        update: {},
        create: { studentId: student.id, knowledgePointId: kp.id, mastery: p.mastery, studyTimeSeconds: p.time, lastStudiedAt: new Date(p.date) }
      });
    }
  }

  // Bob's English progress (中四至中六 DSE level)
  const bobKpPairs = [
    { name: 'Language in Context', mastery: MasteryLevel.MASTERED, time: 3000, date: '2026-05-24' },
    { name: 'Personal Growth and Development', mastery: MasteryLevel.PARTIAL, time: 1800, date: '2026-05-23' },
    { name: 'Social Issues and Values', mastery: MasteryLevel.PARTIAL, time: 1200, date: '2026-05-25' },
    { name: 'Critical Thinking and Reasoning', mastery: MasteryLevel.UNMASTERED, time: 600, date: '2026-05-22' },
    { name: 'Media and Information Literacy', mastery: MasteryLevel.PARTIAL, time: 900, date: '2026-05-24' },
    { name: 'Advanced Language Proficiency', mastery: MasteryLevel.UNMASTERED, time: 300, date: '2026-05-20' },
  ];
  for (const p of bobKpPairs) {
    const kp = findKp(p.name);
    if (kp) {
      await prisma.progress.upsert({
        where: { studentId_knowledgePointId: { studentId: student2.id, knowledgePointId: kp.id } },
        update: {},
        create: { studentId: student2.id, knowledgePointId: kp.id, mastery: p.mastery, studyTimeSeconds: p.time, lastStudiedAt: new Date(p.date) }
      });
    }
  }

  // Carol's Chinese progress (小一至小六 level)
  const carolKpPairs = [
    { name: '识字写字', mastery: MasteryLevel.MASTERED, time: 3600, date: '2026-05-25' },
    { name: '口语表达', mastery: MasteryLevel.MASTERED, time: 2400, date: '2026-05-24' },
    { name: '倾听理解', mastery: MasteryLevel.MASTERED, time: 1800, date: '2026-05-23' },
    { name: '阅读理解', mastery: MasteryLevel.PARTIAL, time: 1200, date: '2026-05-25' },
    { name: '写作能力', mastery: MasteryLevel.PARTIAL, time: 1500, date: '2026-05-24' },
    { name: '文言文阅读', mastery: MasteryLevel.UNMASTERED, time: 400, date: '2026-05-22' },
  ];
  for (const p of carolKpPairs) {
    const kp = findKp(p.name);
    if (kp) {
      await prisma.progress.upsert({
        where: { studentId_knowledgePointId: { studentId: student3.id, knowledgePointId: kp.id } },
        update: {},
        create: { studentId: student3.id, knowledgePointId: kp.id, mastery: p.mastery, studyTimeSeconds: p.time, lastStudiedAt: new Date(p.date) }
      });
    }
  }

  // ============================================================
  // 10. Exam Scores
  // ============================================================
  await prisma.examScore.createMany({
    data: [
      { studentId: student.id, subjectId: mathSubject.id, examName: 'Midterm Exam', score: 78, maxScore: 100, examDate: new Date('2026-04-15') },
      { studentId: student.id, subjectId: mathSubject.id, examName: 'Monthly Test', score: 85, maxScore: 100, examDate: new Date('2026-05-10') },
      { studentId: student2.id, subjectId: englishSubject.id, examName: 'Midterm Exam', score: 92, maxScore: 100, examDate: new Date('2026-04-15') },
      { studentId: student2.id, subjectId: englishSubject.id, examName: 'DSE Mock Paper 1', score: 75, maxScore: 100, examDate: new Date('2026-05-08') },
      { studentId: student3.id, subjectId: chineseSubject.id, examName: 'Midterm Exam', score: 95, maxScore: 100, examDate: new Date('2026-04-15') },
      { studentId: student3.id, subjectId: chineseSubject.id, examName: 'Unit Test', score: 88, maxScore: 100, examDate: new Date('2026-05-12') },
    ]
  });

  // ============================================================
  // 11. Wrong Questions
  // ============================================================
  const yiyuanKp = findKp('一元一次方程');
  if (yiyuanKp) {
    await prisma.wrongQuestion.create({
      data: {
        studentId: student.id,
        knowledgePointId: yiyuanKp.id,
        questionText: 'Solve: 3x + 5 = 20. Student answered x = 6, correct answer is x = 5.'
      }
    });
  }
  const criticalKp = findKp('Critical Thinking and Reasoning');
  if (criticalKp) {
    await prisma.wrongQuestion.create({
      data: {
        studentId: student2.id,
        knowledgePointId: criticalKp.id,
        questionText: 'Identify the logical fallacy in the argument. Student confused ad hominem with straw man.'
      }
    });
  }

  // ============================================================
  // 12. Ability Tests
  // ============================================================
  await prisma.abilityTest.create({
    data: {
      studentId: student.id, subjectId: mathSubject.id,
      totalQuestions: 20, correctAnswers: 14, score: 70.0,
      masteryChanges: JSON.stringify([
        { knowledgePoint: '一元一次方程', from: 'UNMASTERED', to: 'PARTIAL' },
        { knowledgePoint: '有理数的概念', from: 'PARTIAL', to: 'MASTERED' }
      ]),
      completedAt: new Date('2026-05-20')
    }
  });
  await prisma.abilityTest.create({
    data: {
      studentId: student2.id, subjectId: englishSubject.id,
      totalQuestions: 15, correctAnswers: 12, score: 80.0,
      masteryChanges: JSON.stringify([
        { knowledgePoint: 'Language in Context', from: 'PARTIAL', to: 'MASTERED' }
      ]),
      completedAt: new Date('2026-05-22')
    }
  });

  // ============================================================
  // 13. Mental Health Records
  // ============================================================
  await prisma.mentalHealth.createMany({
    data: [
      { studentId: student.id, emotionPolarity: 'POSITIVE', riskLevel: 'LOW', keywords: 'happy, engaged', createdAt: new Date('2026-05-24') },
      { studentId: student2.id, emotionPolarity: 'NEUTRAL', riskLevel: 'MEDIUM', keywords: 'stressed, exam pressure', createdAt: new Date('2026-05-23') },
      { studentId: student3.id, emotionPolarity: 'POSITIVE', riskLevel: 'LOW', keywords: 'confident, motivated', createdAt: new Date('2026-05-25') },
    ]
  });

  // ============================================================
  // 14. Chat History
  // ============================================================
  const equationKp = findKp('方程的解法');
  if (equationKp) {
    await prisma.chatHistory.createMany({
      data: [
        { studentId: student.id, message: 'I need help with solving equations.', sender: 'user', mode: 'GUIDED', knowledgePointId: equationKp.id, modelUsed: 'claude-3', createdAt: new Date('2026-05-24T10:00:00') },
        { studentId: student.id, message: 'Great! Let\'s think step by step. If we have 3x + 5 = 20, what should we do first to isolate x?', sender: 'ai', mode: 'GUIDED', knowledgePointId: equationKp.id, modelUsed: 'claude-3', createdAt: new Date('2026-05-24T10:00:05') },
        { studentId: student.id, message: 'Subtract 5 from both sides?', sender: 'user', mode: 'GUIDED', knowledgePointId: equationKp.id, modelUsed: 'claude-3', createdAt: new Date('2026-05-24T10:01:00') },
        { studentId: student.id, message: 'What\'s the weather like today?', sender: 'user', mode: 'FREE', modelUsed: 'claude-3', createdAt: new Date('2026-05-24T14:00:00') },
        { studentId: student.id, message: 'I can\'t check the weather, but I\'d be happy to help with your studies!', sender: 'ai', mode: 'FREE', modelUsed: 'claude-3', createdAt: new Date('2026-05-24T14:00:05') },
      ]
    });
  }

  // ============================================================
  // 15. Forbidden Keywords
  // ============================================================
  for (const word of ['violence', 'gambling', 'drugs', 'pornography', 'weapon']) {
    await prisma.forbiddenKeyword.upsert({ where: { word }, update: {}, create: { word } });
  }

  // ============================================================
  // 16. System Config
  // ============================================================
  await prisma.systemConfig.upsert({ where: { key: 'ai_model' }, update: {}, create: { key: 'ai_model', value: 'claude-3' } });
  await prisma.systemConfig.upsert({ where: { key: 'daily_free_limit' }, update: {}, create: { key: 'daily_free_limit', value: '5' } });

  // ============================================================
  // Summary
  // ============================================================
  const [kpCount, chCount, subCount] = await Promise.all([
    prisma.knowledgePoint.count(),
    prisma.chapter.count(),
    prisma.subject.count(),
  ]);

  console.log('\n✅ Database seeded successfully with DSE course content!');
  console.log('');
  console.log('=== Login Credentials (all: password123) ===');
  console.log('- Admin:    admin@school.com');
  console.log('- Teacher:  teacher@school.com (Mr. Smith)');
  console.log('- Teacher:  li@school.com (Ms. Li)');
  console.log('- Student:  student@school.com (Alice, G8, F)');
  console.log('- Student:  bob@school.com (Bob, S4, M)');
  console.log('- Student:  carol@school.com (Carol, P6, F)');
  console.log('- Parent:   parent@family.com');
  console.log('');
  console.log('=== DSE Course Data ===');
  console.log(`- Subjects:   ${subCount} (Mathematics, English, Chinese)`);
  console.log(`- Chapters:   ${chCount}`);
  console.log(`- Knowledge Points: ${kpCount}`);
  console.log('- Coverage:   小一至小六 | 中一至中三 | 中四至中六 (DSE)');
  console.log('');
  console.log('=== Other Data ===');
  console.log('- Schools: 2 | Classes: 3 | Users: 7');
  console.log('- Textbooks: 4 (PEP, BNU, HKEd, Cambridge)');
  console.log('- Exam Scores: 6 | Wrong Questions: 2 | Ability Tests: 2');
  console.log('- Mental Health: 3 | Chat Messages: 5');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
