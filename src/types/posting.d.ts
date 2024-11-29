import { Comment } from './comment';

export interface Posting {
  id: number;
  writer_nickname: string;
  board_type: string;
  title: string;
  content: string;
  created_at: string;
  like_count: number;
  comments: Comment[];
  comment_count: number;
  view_count: number;
  is_mine: boolean;
  status: string;
  price: string;
  images: { id: number; image: string; post: number }[];
}
