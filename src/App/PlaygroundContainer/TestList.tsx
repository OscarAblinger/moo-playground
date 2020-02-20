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
import moo, { Lexer, Token } from 'moo'
import './TestList.css'
import { TokenList } from './TestList/TokenList';
import { defaultTests } from '../../defaultValues'

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
    tokens: string|Token[]
}

function createLexer(code: string): Lexer {
    // eslint-disable-next-line no-new-func
    return Function('moo', `${code}`)(moo)
}

export function TestList({mooCode}: {mooCode: string}) {
    const lexer = createLexer(mooCode)

    function calculateTokens(input: string): string|Token[] {
        try {
            lexer.reset(input)
            const result: Token[] = []

            let current = lexer.next()
            // eslint-disable-next-line eqeqeq
            while(current != undefined) {
                result.push(current)
                current = lexer.next()
            }

            return result
        } catch(ex) {
            return ex.message
        }
    }

    const [tests, setTests] = useState<Test[]>(defaultTests.map(str => Object({input: str, tokens: calculateTokens(str)})))
    const [newTestInput, setNewTestInput] = useState<string>('')
    const classes = useStyles()

    function onTextFieldChange(changedTest: Test) {
        return (event: any /*React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>*/) => {
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
                            error={!(test.tokens instanceof Array)}
                            onChange={onTextFieldChange(test)}
                        ></TextField>
                        <Typography className={classes.secondaryHeading}>
                            {test.tokens instanceof Array ? test.tokens.map(t => t.type).join(',') : test.tokens}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <TokenList tokens={test.tokens} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    )
}