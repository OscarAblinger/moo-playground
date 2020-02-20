import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { Editor } from './PlaygroundContainer/Editor'
import { TestList } from './PlaygroundContainer/TestList'

const defaultText =
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
export function PlaygroundContainer() {
    const [code, setCode] = useState(defaultText)

    return (
        <Grid container className="max-flexer">
            <Grid item xs={6}>
                <Editor
                    code={[code, setCode]}
                />
            </Grid>
            <Grid item xs={6}>
                <TestList
                    mooCode={code}
                />
            </Grid>
        </Grid>
    )
}