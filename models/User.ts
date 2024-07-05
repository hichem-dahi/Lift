export interface User extends FormUser {
  id: number;
  postsId: number[];
  commentsId: number[];
}

export interface FormUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
  image: string;
}

export const ProperProfileFormKeys: { [K in keyof FormUser]?: string } = {
  first_name: 'First name',
  last_name: 'Last name',
  email: 'Email',
  bio: 'Bio',
  username: 'Username'
} as const;