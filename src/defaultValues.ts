export const defaultCode: string =
`return moo.compile({
    WS:      /[ \\t]+/,
    comment: /\\/\\/.*?$/,
    number:  /0|[1-9][0-9]*/,
    string:  /"(?:\\\\["\\\\]|[^\\n"\\\\])*"/,
    lparen:  '(',
    rparen:  ')',
    keyword: ['while', 'if', 'else', 'moo', 'cows'],
    NL:      { match: /\\n/, lineBreaks: true },
})
`
export const defaultTests: string[] = [
    'while (cows moo)',
    'while (cows caw)'
]