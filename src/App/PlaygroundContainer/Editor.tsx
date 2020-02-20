import React, { useState } from 'react'
import SimpleEditor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css'

const defaultText =
`const lexer = moo.compile({
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

export function Editor() {
    const [testJSON, setTestJSON] = useState(defaultText)

    return (
        <SimpleEditor
            value={testJSON}
            onValueChange={code => setTestJSON(code)}
            highlight={code => highlight(code, languages.js)}
            tabSize={4}
        />
    )
}