import {
  chmodSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";

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

// Output dir overridable for local runs (MAKEFUN_OUTPUT_DIR); the grader
// runs with /output. Read-back check fails loudly on any write mismatch
// instead of silently leaving a bad entry file.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = `${outDir}/entry.txt`;
mkdirSync(outDir, { recursive: true });
writeFileSync(entryPath, JOKE, "utf8");
chmodSync(entryPath, 0o644);
const written = readFileSync(entryPath, "utf8");
if (written !== JOKE) {
  throw new Error("read-back mismatch: entry.txt differs from the joke");
}
console.log(`wrote ${entryPath}: ${Buffer.byteLength(written, "utf8")} bytes`);
