// Define your interfaces in this file

import type { Key } from 'react';

export interface TagItem {
  link_tag: string;
  tag_title?: string;
}

export interface UserItem {
  link_user: string;
  text_user: string;
}

export interface CommentItem {
  [x: string]: Key | null | undefined;
  message: string;
}

export interface Item {
  id: string;
  img_url?: string;
  text_title: string;
  tags: TagItem[];
  User: UserItem[];
  info: string;
  comments: CommentItem[];
}

export interface IconData {
  background_image_url?: string;
  text_eng?: string;
}
