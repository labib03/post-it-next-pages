export interface User {
  email: string;
  emailVerified: any;
  id: string;
  image: string;
  name: string;
  post?: Post[] | undefined;
}

export interface Post {
  createdAt: string;
  id: string;
  published: boolean;
  content: string;
  updatedAt: string;
  userId: string;
  user?: User | undefined;
  comment?: string[] | undefined;
  like?: Like[] | undefined;
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
