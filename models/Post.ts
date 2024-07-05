export interface Post {
  id: number;
  body: string;
  userId: number;
  commentsId: number[];
  likes: number;
  numberOfComments: number;
}

export interface Comment {
  id: number;
  body: string;
  userId: number;
  postId: number;
  recent?: true
}
