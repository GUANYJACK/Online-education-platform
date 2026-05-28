-- AddUniqueConstraint: Chapter(subjectId, name)
ALTER TABLE `Chapter` ADD UNIQUE INDEX `Chapter_subjectId_name_key`(`subjectId`, `name`);

-- AddUniqueConstraint: KnowledgePoint(chapterId, name)
ALTER TABLE `KnowledgePoint` ADD UNIQUE INDEX `KnowledgePoint_chapterId_name_key`(`chapterId`, `name`);
