import type { UserMetadata } from "@supabase/supabase-js";

export interface User {
  id?: string;
  username?: string;
  avatar_url?: string;
  full_name?: string;
  email?: string;
  bio?: string;
  postsId?: number[];
  commentsId?: number[];
  updated_at?: Date
}

export interface FormUser extends User {
  otp?: string,
  password?: string,
  confirm_password?: string
}

export const ProperProfileInfoKeys: { [K in keyof UserMetadata]?: string } = {
  username: 'Username',
  full_name: 'Name',
  email: 'Email',
  bio: 'Bio',
} as const;