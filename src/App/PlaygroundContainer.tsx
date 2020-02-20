import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { Editor } from './PlaygroundContainer/Editor'
import { TestList } from './PlaygroundContainer/TestList'
import { defaultCode } from '../defaultValues'

export function PlaygroundContainer() {
    const [code, setCode] = useState(defaultCode)

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