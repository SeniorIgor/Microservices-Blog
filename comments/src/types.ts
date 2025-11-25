export interface Comment {
  id: string;
  content: string;
}

export interface GetCommentsParams {
  id: string;
}

export interface CreateCommentsRequest {
  content: string;
}

export interface CreateCommentsParams {
  id: string;
}
