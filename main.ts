import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// One-line office joke, 93 characters / 93 bytes, verified against the gate:
// UTF-8 text of 1 to 200 characters, a single line, not only whitespace.
// The joke turns twice: first the reply-all used to protest reply-all itself,
// then the thread escalating beyond email into its own meeting invite.
// Pure ASCII: every character is one byte, so chars == bytes.
const JOKE =
  "I replied-all to say please stop replying-all, and now the thread has its own meeting invite.";

if (JOKE.length < 1 || JOKE.length > 200 || JOKE.trim().length === 0) {
  throw new Error(`entry must be 1-200 characters, got ${JOKE.length}`);
}
if (JOKE.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");
chmodSync("/output/entry.txt", 0o644);
