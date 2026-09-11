// Board and cumulative moves match the app's tutorialSteps.ts (2026-09-11).
export const clues = [[null, 1, 3], [null, null, null], [null, 2, 0]];
export const stages = [
 { type: 'cross', edges: ['v-2-2','v-2-3','h-2-2','h-3-2'], ja: '「0」の周りには線を引きません。光っている4辺をタップして、×を付けましょう。', en: 'No lines touch a 0. Tap the four highlighted edges to mark them with crosses.' },
 { type: 'cross', edges: ['v-1-3','h-3-1'], ja: '線が行き止まりになってしまう2辺にも、×を付けましょう。輪には行き止まりがありません。', en: 'These two edges would lead to dead ends. Mark them with crosses too: a loop has no dead ends.' },
 { type: 'line', edges: ['v-2-1','h-2-1'], ja: '「2」の周りには2本の線。×のない2辺をタップして、線を引きましょう。', en: 'A 2 needs two lines. Tap the two edges without crosses to draw them.' },
 { type: 'line', edges: ['v-2-0','v-1-0','v-1-2','h-3-0'], ja: '線を途切れさせないように、伸ばせる方向へつなぎます。光っている4辺をタップ。', en: 'Keep the line connected. Tap the four highlighted edges to extend it in the available directions.' },
 { type: 'line', edges: ['h-0-2','h-1-2','v-0-3'], ja: '右上の「3」は、周りに3本。光っている3辺をつなぎましょう。', en: 'The top-right 3 needs three lines. Connect the three highlighted edges.' },
 { type: 'line', edges: ['v-0-0','h-0-0','h-0-1'], ja: 'あと3本。「1」の条件も満たしながら、ひとつの輪を閉じましょう。', en: 'Three lines left. Close one loop while satisfying the 1 as well.' },
];
