export interface User {
  univcert: boolean;
  email: string;
  password: string;
  nickname: string;
  major: string;
  nationality: string;
  sex: string | null;
  birth: string | null;
  languages: string;
  introduce: string;
  mbti: string | null;
  profile_image: string | null;
  univ_certified: boolean;
  created_at: string;
  is_staff: boolean;
  start_date: string;
  end_date: string;
}
