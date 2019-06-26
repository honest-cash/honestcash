export interface StoryLoadContext {
  parentPostId?: number;
  postId?: number;
}

export interface UploadImageResponse {
  success: number;
  file: {
    url: string;
  };
}
