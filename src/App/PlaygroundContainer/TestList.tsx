import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add'
import './TestList.css'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

interface Test {
    input: string
    tokens: string[]
}

export function TestList({mooCode}: {mooCode: string}) {
    const [tests, setTests] = useState<Test[]>([{input: 'first test', tokens: []},{input: 'second test', tokens: ['hi']}])
    const [newTestInput, setNewTestInput] = useState<string>('')
    const classes = useStyles()

    function calculateTokens(input: string) {
        return ['token1', 'token2', 'token3']
    }

    function onTextFieldChange(changedTest: Test) {
        return (event: any /*React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>*/) => {
            console.log({event})
            const newTests = tests.map(t =>
                (t !== changedTest)
                    ? t
                    : { input: event.target.value, tokens: calculateTokens(event.target.value) })

            setTests(newTests)
        }
    }

    function addNewTest() {
        tests.push({input: newTestInput, tokens: calculateTokens(newTestInput)})
        setTests(tests)
        setNewTestInput('')
    }

    return (
        <div>
            <div className="add-test-wrapper">
                <TextField
                    label="Add new Test"
                    className="add-input-field"
                    value={newTestInput}
                    onChange={event => setNewTestInput(event.target.value)}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            addNewTest()
                            ev.preventDefault();
                        }
                    }}
                ></TextField>
                <IconButton
                    className="add-button"
                    onClick={addNewTest}
                ><AddIcon/></IconButton>
            </div>

            {tests.map((test, idx) => (
                <ExpansionPanel key={`panel-${idx}`}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <TextField
                            className={classes.heading}
                            value={test.input}
                            error={test.tokens.length === 0}
                            onChange={onTextFieldChange(test)}
                        ></TextField>
                        <Typography className={classes.secondaryHeading}>{test.tokens.join(',')}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {test.tokens.map((token, tokenIdx) => (
                            <Typography key={`token-${idx}-${tokenIdx}`} variant="body1">{token}</Typography>
                        ))}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    )
}