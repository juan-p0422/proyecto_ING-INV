-- Align global roles with the two roles supported by EduRoom.
UPDATE "User" SET "role" = 'TEACHER' WHERE "role" = 'ADMIN';
ALTER TYPE "Role" RENAME TO "Role_old";
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role" USING ("role"::text::"Role");
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'STUDENT';
DROP TYPE "Role_old";

-- Keep existing memberships while using the requested domain name.
ALTER TABLE "Enrollment" RENAME COLUMN "role" TO "roleInCourse";

-- The old model represented ownership with a TEACHER enrollment. Promote that
-- relationship to an explicit Course.teacherId before making it required.
ALTER TABLE "Course" ADD COLUMN "teacherId" TEXT;
UPDATE "Course" AS c
SET "teacherId" = e."userId"
FROM "Enrollment" AS e
WHERE e."courseId" = c."id" AND e."roleInCourse" = 'TEACHER';
ALTER TABLE "Course" ALTER COLUMN "teacherId" SET NOT NULL;

-- Fields no longer used by the expanded API.
ALTER TABLE "User" DROP COLUMN "updatedAt";
ALTER TABLE "Course" DROP COLUMN "updatedAt";
ALTER TABLE "Course" ALTER COLUMN "description" SET DEFAULT '';
UPDATE "Course" SET "description" = '' WHERE "description" IS NULL;
ALTER TABLE "Course" ALTER COLUMN "description" SET NOT NULL;

CREATE TYPE "SubmissionStatus" AS ENUM ('SUBMITTED', 'GRADED');

CREATE TABLE "Announcement" (
  "id" TEXT NOT NULL,
  "courseId" TEXT NOT NULL,
  "authorId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Assignment" (
  "id" TEXT NOT NULL,
  "courseId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL DEFAULT '',
  "dueDate" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Submission" (
  "id" TEXT NOT NULL,
  "assignmentId" TEXT NOT NULL,
  "studentId" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "status" "SubmissionStatus" NOT NULL DEFAULT 'SUBMITTED',
  "grade" DOUBLE PRECISION,
  "feedback" TEXT,
  "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Comment" (
  "id" TEXT NOT NULL,
  "courseId" TEXT NOT NULL,
  "assignmentId" TEXT,
  "authorId" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Attachment" (
  "id" TEXT NOT NULL,
  "ownerId" TEXT NOT NULL,
  "courseId" TEXT,
  "assignmentId" TEXT,
  "submissionId" TEXT,
  "fileName" TEXT NOT NULL,
  "fileUrl" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Course_teacherId_idx" ON "Course"("teacherId");
CREATE INDEX "Announcement_courseId_createdAt_idx" ON "Announcement"("courseId", "createdAt");
CREATE INDEX "Announcement_authorId_idx" ON "Announcement"("authorId");
CREATE INDEX "Assignment_courseId_createdAt_idx" ON "Assignment"("courseId", "createdAt");
CREATE UNIQUE INDEX "Submission_assignmentId_studentId_key" ON "Submission"("assignmentId", "studentId");
CREATE INDEX "Submission_studentId_idx" ON "Submission"("studentId");
CREATE INDEX "Comment_courseId_createdAt_idx" ON "Comment"("courseId", "createdAt");
CREATE INDEX "Comment_assignmentId_idx" ON "Comment"("assignmentId");
CREATE INDEX "Comment_authorId_idx" ON "Comment"("authorId");
CREATE INDEX "Attachment_ownerId_idx" ON "Attachment"("ownerId");
CREATE INDEX "Attachment_courseId_idx" ON "Attachment"("courseId");
CREATE INDEX "Attachment_assignmentId_idx" ON "Attachment"("assignmentId");
CREATE INDEX "Attachment_submissionId_idx" ON "Attachment"("submissionId");

ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
