export interface Posting {
  id: number;
  writer_nickname: string;
  board_type: string;
  title: string;
  content: string;
  images: File[];
  created_at: string;
  like_count: number;
  comments: string[];
  comment_count: number;
  view_count: number;
}
