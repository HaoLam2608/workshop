export interface Author {
  id: number;
  hoten: string;
  email: string;
  vai_tro: string;
}

export interface Article {
  mabaibao: number;
  tenbaibao: string;
  linhvuc: string | null;
  tomtat: string | null;
  tacgia: Author[];
}