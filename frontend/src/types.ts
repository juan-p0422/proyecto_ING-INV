export type User = { id: string; name: string; email: string; role: 'STUDENT' | 'TEACHER' | 'ADMIN' };
export type Course = { id: string; title: string; description?: string; color: string; code: string; membershipRole: 'STUDENT' | 'TEACHER'; memberCount: number };
export type AuthResponse = { token: string; user: User };

