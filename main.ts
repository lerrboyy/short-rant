// Angry Judge: The Short Rant Contest
// Writes one short, funny rant to /output/entry.txt and verifies it.
//
// The rant: a hotel sells you "a night" and hands you nineteen hours.
// Check-in at three, check-out at ten — five hours kept for themselves.
// The joke escalates (theft metaphor -> speedrun of unconsciousness) and
// lands on the final jab: they still want a five-star review.
//
// Gate (from the kit): /output/entry.txt must be UTF-8 text of 1 to 400
// characters and not only white space. This program enforces that and
// more, then reads the file back and verifies it byte-for-byte.

import { mkdirSync, readdirSync, rmSync, writeFileSync, readFileSync, statSync } from "node:fs";

const RANT =
  "I paid for a night in a hotel and got nineteen hours. " +
  "Check-in at three, check-out at ten \u2014 they sold me a night and kept " +
  "five hours for themselves, like a landlord skimming rent. " +
  "I didn't sleep. I performed a speedrun of unconsciousness, and they " +
  "still want a five-star review.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;
const MAX_CHARS = 400;

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function main() {
  // --- Validate the rant before touching the output directory. ---
  const charCount = [...RANT].length; // code points, matching the gate
  if (charCount < 1 || charCount > MAX_CHARS) {
    fail(`rant is ${charCount} characters, outside the 1-${MAX_CHARS} gate`);
  }
  if (RANT.trim().length === 0) {
    fail("rant is only white space");
  }
  if (RANT.includes("\n") || RANT.includes("\r")) {
    fail("rant must be a single line");
  }
  if (RANT.endsWith(" ") || RANT.startsWith(" ")) {
    fail("rant has a leading or trailing space");
  }
  // No control characters other than plain printable text: a stray tab or
  // escape would survive the gate but look like a glitch to the judge.
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001F\u007F]/.test(RANT)) {
    fail("rant contains a control character");
  }
  // UTF-8 round-trip: encode and decode and demand the exact same string,
  // so no lone surrogate or unencodable character can slip through.
  const encoded = new TextEncoder().encode(RANT);
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(encoded);
  if (decoded !== RANT) {
    fail("rant does not survive a strict UTF-8 round-trip");
  }

  // --- Clear only the CONTENTS of the output directory. ---
  // /output is the grader's mount point: never remove the directory itself.
  mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const name of readdirSync(OUTPUT_DIR)) {
    rmSync(`${OUTPUT_DIR}/${name}`, { recursive: true, force: true });
  }

  // --- Write the entry with no trailing newline. ---
  writeFileSync(OUTPUT_FILE, RANT, "utf8");

  // --- Read it back and verify byte-for-byte. ---
  const readBack = readFileSync(OUTPUT_FILE, "utf8");
  if (readBack !== RANT) {
    fail("read-back mismatch: /output/entry.txt differs from the rant");
  }
  // Byte-size cross-check: the file on disk must hold exactly the bytes
  // the rant encodes to — no added newline, BOM, or truncation.
  const fileBytes = statSync(OUTPUT_FILE).size;
  if (fileBytes !== Buffer.byteLength(RANT, "utf8")) {
    fail(`file is ${fileBytes} bytes, expected ${Buffer.byteLength(RANT, "utf8")}`);
  }

  console.log(`Wrote ${OUTPUT_FILE}`);
  console.log(`Characters: ${charCount} (cap ${MAX_CHARS})`);
  console.log(`Bytes: ${Buffer.byteLength(RANT, "utf8")}`);
  console.log("Read-back verification: OK");
  console.log("Entry is valid for the gate.");
}

main();
