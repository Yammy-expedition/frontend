export interface User {
  id: number;
  email: string;
  password: string;
  check_password: string;
  nickname: string;
  major: string;
  nationality: string;
  sex: string | null;
  birth: string | null;
  languages: string | null;
  introduce: string;
  mbti: string | null;
  profile_image: string | null;
  created_at: string;
  is_staff: boolean;
  start_date: string;
  end_date: string;
}
