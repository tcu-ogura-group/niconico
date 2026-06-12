import type { CommentSource } from "./comment.js";
import { CommentStage } from "./comment-stage.js";
import { RandomCommentSource } from "./random-comment-source.js";

const stage = new CommentStage(
  document.getElementById("stage") as HTMLDivElement,
);
const source: CommentSource = new RandomCommentSource();

source.subscribe((comment) => stage.spawn(comment));
source.start();

