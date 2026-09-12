// A curated, valid example route, not a simulation of the app's random draw.
// IDs, tiers and upgrade prerequisites: looplogic/src/features/looplogic/data/buffs.ts.
export const adventureBuffs = {
 lines: { id: 'B_CORRECT_LINES_START_LV1', tier: 1, mark: '⌁', ja: '正解線スタート', en: 'Correct Lines Start' },
 lines2: { id: 'B_CORRECT_LINES_START_LV2', tier: 2, mark: '⌁', ja: '正解線スタート Lv2', en: 'Correct Lines Start Lv2' },
 hints: { id: 'B_EXTRA_HINT_LV1', tier: 1, mark: '3', ja: '追加ヒントスタート', en: 'Extra Hints Start' },
 shield: { id: 'B_MISS_WARNING_LV1', tier: 2, mark: '×', ja: 'ミス防止シールド', en: 'Mistake Prevention Shield' },
 auto: { id: 'B_AUTO_CORRECT_LINE_LV1', tier: 2, mark: '⌁', ja: 'オート正解線', en: 'Auto Correct Line' },
 smaller: { id: 'B_BOARD_SIZE_DOWN_LV1', tier: 4, mark: '↘', ja: '盤面サイズ縮小', en: 'Board Size Reduction' },
 hints2: { id: 'B_EXTRA_HINT_LV2', tier: 2, mark: '3', ja: '追加ヒントスタート Lv2', en: 'Extra Hints Start Lv2' },
} as const;
export type AdventureBuffKey = keyof typeof adventureBuffs;
export const adventureRun: { options: AdventureBuffKey[]; pick: AdventureBuffKey; build: AdventureBuffKey[]; title: [string,string]; reason: [string,string]; effect: [string,string] }[] = [
 { options: ['lines','hints','shield'], pick: 'lines', build: ['lines'], title: ['最初の一手を、速く。','Get a head start.'], reason: ['今回は、正解線スタートを選択。最初から置かれる正解線を足がかりに、1問目を解いていく。','This run starts with Correct Lines Start. Use the prefilled correct lines to get moving on the first puzzle.'], effect: ['開始時に、一部の正解線を配置。','Some correct lines are placed at the start.'] },
 { options: ['hints','lines2','auto'], pick: 'lines2', build: ['lines2'], title: ['さっきの選択が、次の強みに。','Your first pick opens an upgrade.'], reason: ['正解線スタートを持っているので、Lv2が候補に。今回は別のバフを増やすより、開始時の助けを強化する。','Because you picked Correct Lines Start, Lv2 can now appear. This time, upgrade your head start instead of adding another effect.'], effect: ['Lv2が元のバフと入れ替わり、正解線の配置を強化。','Lv2 replaces the original buff with a stronger head start.'] },
 { options: ['auto','shield','hints'], pick: 'hints', build: ['lines2','hints'], title: ['線に、数字の手がかりを重ねる。','Add clues to your head start.'], reason: ['今度は追加ヒントスタートを選択。持ち越した正解線スタート Lv2に、隠れた数字を明かす効果が加わる。','Pick Extra Hints Start next. It reveals hidden numbers alongside the correct lines from the Lv2 buff you carried forward.'], effect: ['正解線＋追加の数字。2つの効果で次の盤面へ。','Correct lines plus extra clues. Two effects for the next puzzle.'] },
 { options: ['smaller','hints2','shield'], pick: 'smaller', build: ['lines2','hints','smaller'], title: ['育てた組み合わせで、最後の一問へ。','Bring your build to the final stage.'], reason: ['最後は盤面サイズ縮小を選択。線と数字の助けを保ったまま、小さくなった盤面で合計タイムの短縮を狙う。','Finish with Board Size Reduction. Keep your lines and clues, take on a smaller board, and aim for a faster total time.'], effect: ['持ち越した効果＋盤面縮小で、最終ステージに挑む。','Your existing effects plus a smaller board for the final stage.'] },
];
