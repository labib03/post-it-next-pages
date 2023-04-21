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
