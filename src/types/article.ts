export interface Author {
  id: number;
  hoten: string;
  email: string;
  vai_tro: string;
}

export enum StatusPaper {
  Pending = 'da_phan_cong',
  Reviewed = 'da_phan_bien',
  Accepted = 'accepted',
  Rejected = 'rejected',
  NeedsReview = 'dang_phan_cong'
}
export interface Papers  {
  pending : Article[],
  reviewed : Article[],
  needsReview : Article[],
}
export interface Article {
  mabaibao: number;
  tenbaibao: string;
  linhvuc: string | null;
  tomtat: string | null;
  tacgia: Author[];
  ngaynop :Date;
  status : StatusPaper
}