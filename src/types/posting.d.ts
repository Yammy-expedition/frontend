import { Comment } from './comment';

export interface Posting {
  id: number;
  writer_nickname: string;
  board_type: string;
  title: string;
  content: string;
  images: File[];
  created_at: string;
  like_count: number;
  comments: Comment[];
  comment_count: number;
  view_count: number;
  is_mine: boolean;
}
