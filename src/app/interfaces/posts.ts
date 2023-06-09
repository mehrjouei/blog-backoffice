export interface Post {
  _id?: string;
  title: string;
  content: string;
  image: string;
  author: { fullName: string; image: string };
  created_at: Date;
}
