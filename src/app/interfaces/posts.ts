export interface Post {
  title: string;
  content: string;
  image: string;
  author: { fullName: string; image: string };
  created_at: Date;
}
