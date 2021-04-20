import { Createdby } from './Post';

export interface Comment {
  created_on: string;
  _id: string;
  comment: string;
  created_by: Createdby;
}
