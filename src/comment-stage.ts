import type { Comment } from "./comment.js";
import { pick, randInt } from "./random.js";

export class CommentStage {
  private static readonly COLORS: readonly string[] = [
    "#ffffff",
    "#ffeb3b",
    "#ff5252",
    "#69f0ae",
    "#40c4ff",
    "#ff80ab",
    "#b388ff",
  ];
  private static readonly FONT_SIZES: readonly number[] = [24, 32, 40, 56];

  constructor(private readonly root: HTMLElement) {}

  spawn(comment: Comment): void {
    const el = document.createElement("div");
    el.className = "comment";
    el.textContent = comment.text;

    const fontSize = pick(CommentStage.FONT_SIZES);
    el.style.fontSize = `${fontSize}px`;
    el.style.color = pick(CommentStage.COLORS);

    const top = randInt(0, Math.max(0, this.root.clientHeight - fontSize - 8));
    el.style.top = `${top}px`;

    el.style.animationDuration = `${randInt(5, 10)}s`;
    el.addEventListener("animationend", () => el.remove());
    this.root.appendChild(el);
  }
}
