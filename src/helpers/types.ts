export interface User {
  email: string;
  emailVerified: any;
  id: string;
  image: string;
  name: string;
  post?: Post[];
}

export interface Post {
  createdAt: string;
  id: string;
  published: boolean;
  title: string;
  updatedAt: string;
  userId: string;
  user?: User;
  comment: string[];
  like: Like[];
}

export interface Comment {
  createdAt: string;
  id: string;
  message: string;
  postId: string;
  updatedAt: string;
  user: User;
  userId: string;
}
export interface Like {
  createdAt: string;
  id: string;
  postId: string;
  updatedAt: string;
  name?: string;
  user: User;
  userId: string;
}
