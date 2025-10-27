export type UserRole = 'admin' | 'manager' | 'vendor';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
}

export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Approver {
  userId: string;
  status: ApprovalStatus;
  date?: string;
  comments?: string;
}

export type TenderStatus = 'Draft' | 'Submitted' | 'In Review' | 'Approved' | 'Rejected' | 'Awarded';

export interface TenderDocument {
  name: string;
  url: string;
}

export interface Tender {
  id: string;
  title: string;
  description: string;
  department: string;
  amount: number;
  vendor: string;
  status: TenderStatus;
  submissionDate: string;
  deadline: string;
  documents: TenderDocument[];
  approvers: Approver[];
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  read: boolean;
}
