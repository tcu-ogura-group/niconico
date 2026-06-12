import type { Comment, CommentSource } from "./comment.js";
import { pick, randInt } from "./random.js";

export class RandomCommentSource implements CommentSource {
  private static readonly MESSAGES: readonly string[] = [
    "うぽつ",
    "wwwwwww",
    "88888888",
    "かわいい",
    "草",
    "神回",
    "おつ",
    "それな",
    "ファーw",
    "あぁ^〜",
    "天才か",
    "尊い",
    "助かる",
    "つよい",
    "わかる",
    "なるほど",
    "やばい",
  ];

  private readonly handlers = new Set<(comment: Comment) => void>();
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly minDelayMs: number = 150,
    private readonly maxDelayMs: number = 1500,
  ) {}

  start(): void {
    if (this.timer !== null) return;
    this.scheduleNext();
  }

  stop(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  subscribe(handler: (comment: Comment) => void): () => void {
    this.handlers.add(handler);
    return () => {
      this.handlers.delete(handler);
    };
  }

  private scheduleNext(): void {
    const delay = randInt(this.minDelayMs, this.maxDelayMs);
    this.timer = setTimeout(() => {
      this.emit();
      this.scheduleNext();
    }, delay);
  }

  private emit(): void {
    const comment: Comment = { text: pick(RandomCommentSource.MESSAGES) };
    for (const handler of this.handlers) handler(comment);
  }
}
