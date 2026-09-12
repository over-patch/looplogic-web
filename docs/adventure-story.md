# Adventure-first website

The first viewport introduces the basic puzzle with the app’s actual 3×3 tutorial board and a six-step guided interaction. Three basic rules come next, then a transition into Adventure Mode, buff effects, daily challenges/rankings, Standard Mode, and download links. Both locales use the same structure. Adventure remains the main differentiator, after visitors understand the puzzle.

## Product evidence

The three buff names and qualitative effects appear in the current Japanese store selection image and are corroborated by the app's localized buff descriptions. The page deliberately avoids exact line counts, probabilities, timing, stacking claims, or promises that these three choices always appear together. Diagrams explicitly identify themselves as explanations, not product UI. Standard puzzle count and daily/ranking claims come from the official store descriptions already recorded in README.

## Adventure run explanation (2026-09-12)

Adventure now leads with random drafting, a persistent build over four stages, and total clear time on a monthly leaderboard. Store posters have been replaced with a localized, four-stage example in `AdventureMedia.astro`. Stage buttons reveal a curated route; without JavaScript all four stages are readable. The example is explicitly labeled as illustrative and does not simulate random draws or report invented times. Supporting copy explains upgrades, limited rerolls, and the Stage Skip trade-off. The top viewport links directly to Adventure.

Source evidence in the sibling `looplogic` app:
- `app/(tabs)/adventure/index.tsx`: daily runs start at stage 1 of 4; daily limits and Legend training access.
- `app/(screens)/(adventure)/buff-selection.tsx`: three options, one selection, rerolls, acquired-buff carryover, replacement on upgrade, loss of earlier buffs on Stage Skip.
- `src/features/looplogic/utils/buffUtils.ts`: random weighted draws; later stages favor higher tiers; prerequisites; Stage Skip only at stages 2 and 3.
- `src/features/looplogic/data/buffs.ts`: example IDs/tiers and upgrade chains; Stage Skip requires Buff Reroll Increase.
- `app/(screens)/(adventure)/play.tsx`: cumulative clear time passed between stages and submitted on completion.
- `src/features/looplogic/utils/rankingService.ts`: run times stored for monthly rankings.
- `src/locales/{ja,en}/buffs.json` and `game.json`: localized names and mode descriptions.

The example follows a valid possible route: Correct Lines Start → its Lv2 replacement → Extra Hints Start → Board Size Reduction. Actual draws are random, and no probability, exact time saving, or shared daily puzzle is promised. Daily attempts are distinguished from monthly rankings. The old “32 special effects” copy is removed because the master list includes multiple levels of the same effect.

Future actual recordings can supplement this explanation with locale-matched app footage. Production domain setup remains separate.

## Guided board

Board clues and move sequence match the app tutorial data (2026-09-11). `src/data/tutorial.ts` stores the website adaptation; FirstLoop renders native edge buttons with keyboard support, step guidance and reset. Only the current step’s edges are enabled. This is a guided explanation, not free play. Validation confirms all final clues and a single connected loop.

## Watch → challenge revision

The introduction now automatically demonstrates four beats of the app tutorial, with pause and skip controls, then offers a mirrored board with nine fixed lines and three missing lines. Users opt into the challenge; edges are not highlighted, lines can be toggled, and a hint is available. Completion checks every clue, node degrees and loop connectivity. Exhaustive enumeration verifies one three-line completion. Reduced-motion preference starts playback paused. Video remains deferred.

## Purpose-built, line-only introduction

The current experience replaces the app tutorial with three independently authored 3×3 website examples. No crosses or zero clues are introduced. The first board counts three lines around a highlighted 3 before closing one loop. A distinct two-line completion gives a first success; a four-line completion then requires a detour around a central 3. Challenges stay optional. Both have exactly one completion, verified by enumerating every subset of non-fixed edges, with no assumed move-count limit. Clues change color when their count is satisfied. These examples are labeled website practice puzzles and are not presented as app stages. JavaScript is required for interaction; pause, reduced motion, offscreen suspension, reset and hints remain available.

## Correctness correction

The earlier sparse demo had five solutions from clues alone. Its clue set is now complete and unique. Both challenges were already unique from clues alone; the earlier tests unnecessarily restricted them to supplied fixed lines. `tests/loop-demo.test.mjs` independently enumerates all 213 simple cycles on the board and verifies clue-only uniqueness for all three examples. It also checks that the demonstration is derivable by clue-count and vertex-degree propagation from three explicitly pre-established lines. The demonstration now states that it starts midway, highlights relevant clues and adds one edge per step, using an 800ms drawing animation and a 2800ms interval. This replaces the prior arbitrary three-line placement and bulk reveal. Run: `node --experimental-strip-types tests/loop-demo.test.mjs`.

## First-visit pacing

The intro now shows the valid solution sequence in about seven seconds (one 450ms line animation per step), with two short captions instead of per-edge reasoning prose. The final frame remains visible. The optional play action starts an entirely empty, clue-only unique puzzle; no fixed lines and no last-N-moves countdown remain. All edges can be toggled. Requested hints highlight one wrong line to remove or a correct missing edge. Longer reasoning remains in the data/test history, not the first-view copy. This is a demonstration of completing a loop, not a claim that the displayed order teaches every deduction.
