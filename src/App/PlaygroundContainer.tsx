import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Editor } from './PlaygroundContainer/Editor'
import { TestList } from './PlaygroundContainer/TestList'

export function PlaygroundContainer() {
    return (
        <Grid container className="max-flexer">
            <Grid item xs={6}>
                <Editor/>
            </Grid>
            <Grid item xs={6}>
                <TestList
                    mooCode="window.alert('test')"
                />
            </Grid>
        </Grid>
    )
}