export interface Comment {
  id: number;
  user: number;
  posting: number;
  content: string;
  created_at: string;
  parent: number | null;
  replies: Comment[];
  like_count: number;
}
