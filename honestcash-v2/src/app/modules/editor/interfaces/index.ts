export interface DraftContext {
  parentPostId?: number;
  postId?: number;
}

export interface UploadImageResponse {
  files: [{ url: string; }];
}

export interface UploadRemoteImageResponse {
  success: number;
  file: {
    url: string;
  };
}
