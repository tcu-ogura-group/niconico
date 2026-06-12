export interface Comment {
  text: string;
}

export interface CommentSource {
  start(): void;
  stop(): void;
  subscribe(handler: (comment: Comment) => void): () => void;
}
