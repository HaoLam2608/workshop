export interface Reviewer {
  id: number;
  hoten: string;
  linhvu: string | null;
  assignedPapers: number;
  email?: string;
  diachi?: string;
  coquan?: string;
  hocvi?: string;
  username?: string;
}