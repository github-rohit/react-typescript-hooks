export interface PostRootObject {
  posts: Post[];
  total: number;
}

export interface Post {
  category: string[];
  tags: (Tag | string)[];
  created_on: string;
  _id: string;
  created_by: Createdby;
  status: string;
  title: string;
  description: string;
  image?: string;
  __v: number;
  short_description?: string;
  schedule_at?: any;
  post_reference_id?: any;
}

export interface Createdby {
  _id: string;
  name: string;
}

interface Tag {
  text: string;
}
