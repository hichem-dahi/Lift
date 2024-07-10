import type { User } from "./User";

export interface Post {
  id?: string;
  body?: string;
  user_id?: string | User;
  user_likes?: string[];
  created_at?: Date;
  updated_at?: Date;


}

export interface PostInfo extends Post, User {}

export interface Comment {
  id?: string;
  body: string;
  user_id: string;
  post_id: string;
  created_at?: Date,
  updated_at?: Date
  recent?: true
}

export interface CommentInfo extends Comment, User {}
