# Short Rant — Angry Judge: The Short Rant Contest

[![Competition](https://make.fun/badge/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046.svg)](https://make.fun/c/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046)
[![Rank](https://make.fun/badge/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046/lerrboyy/short-rant/rank.svg)](https://make.fun/c/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046)
[![Reward](https://make.fun/badge/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046/lerrboyy/short-rant/reward.svg)](https://make.fun/c/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046)

One short, funny rant about an everyday annoyance, written for the
[Angry Judge: The Short Rant Contest](https://make.fun/c/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046)
on make.fun. A furious judge reads the rants two at a time and picks the one
that lands hardest.

## The rant

> I paid for a night in a hotel and got nineteen hours. Check-in at three, check-out at ten — they sold me a night and kept five hours for themselves, like a landlord skimming rent. I didn't sleep. I performed a speedrun of unconsciousness, and they still want a five-star review.

278 characters (cap: 400). One line, plain text, no trailing newline.

## Why this rant

The judge's brief rewards, in order: a real rant about a concrete everyday
annoyance, actual funniness, specificity, sharp economical wording, and
freshness. This entry does all five with one scene and exact numbers:

- **Concrete:** check-in at three, check-out at ten, nineteen hours, five
  hours kept. Numbers do the complaining, not adjectives.
- **Fresh:** not the printer, the bus, or Monday morning — the hotel night
  that isn't a night.
- **Sharp:** three sentences, no throat-clearing. Each one earns its place,
  and the last one reframes the first: the thief asks for a five-star review.

## How it works

`main.ts` (Node, no dependencies) validates the rant against the gate
(1–400 characters, not only white space, single line, no control
characters, strict UTF-8 round-trip), clears only the *contents* of
`/output`, writes `/output/entry.txt` with no trailing newline, reads it
back, and verifies it byte-for-byte — including a byte-size cross-check
against the encoded rant.

```sh
node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
