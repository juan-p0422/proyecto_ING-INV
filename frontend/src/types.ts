export type Role = 'STUDENT' | 'TEACHER';

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
};

export type AuthResponse = { token: string; user: User };

export type Course = {
  id: string;
  title: string;
  description: string;
  color: string;
  code: string;
  membershipRole: Role;
  memberCount?: number;
  assignmentCount?: number;
  createdAt: string;
  teacher?: User;
  _count?: {
    enrollments: number;
    announcements: number;
    assignments: number;
  };
};

export type Member = {
  id: string;
  roleInCourse: Role;
  createdAt: string;
  user: User;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: User;
};

export type SubmissionStatus = 'SUBMITTED' | 'GRADED';

export type Submission = {
  id: string;
  assignmentId: string;
  studentId: string;
  content: string;
  status: SubmissionStatus;
  grade: number | null;
  feedback: string | null;
  submittedAt: string;
  student?: User;
};

export type Assignment = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string | null;
  createdAt: string;
  submissions?: Submission[];
  _count?: { submissions: number };
  course?: Pick<Course, 'id' | 'title'> & { teacherId: string };
};

export type Comment = {
  id: string;
  courseId: string;
  assignmentId: string | null;
  content: string;
  createdAt: string;
  author: User;
};
