export interface Comment {
  id: number;
  user_id: number;
  user_name: string;
  posting: number;
  content: string;
  created_at: string;
  parent: number | null;
  replies: Comment[];
  like_count: number;
  is_deleted: boolean;
  is_liked: boolean;
  profile_image: string;
  is_mine: boolean;
}
