import React from 'react'
import SimpleEditor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css'

export function Editor({ code: [code, updateCode]}: {code: [string, (newCode: string) => void]} ) {
    return (
        <SimpleEditor
            value={code}
            onValueChange={updateCode}
            highlight={code => highlight(code, languages.js)}
            tabSize={4}
        />
    )
}