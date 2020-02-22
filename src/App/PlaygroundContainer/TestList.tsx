import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
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
        display: 'inline-block',
        width: '30%',
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        display: 'inline-block',
        width: '60%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    textWrapper: {
        position: 'absolute',
        left: 0,
        right: theme.typography.pxToRem(30),
        top: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

interface Test {
    input: string
    tokens: string|Token[]
}

function createLexer(code: string): Lexer|undefined {
    try {
        // eslint-disable-next-line no-new-func
        return Function('moo', `${code}`)(moo)
    } catch (ex) {
        // while writing the code is expected to be invalid (incomplete) often
        // therefore -> fail silently
        return undefined
    }
}

export function TestList({mooCode}: {mooCode: string}) {
    const lexer = useMemo(() => createLexer(mooCode), [mooCode])

    const calculateTokens = useCallback((input: string): string|Token[] => {
            // eslint-disable-next-line eqeqeq
            if (lexer == undefined) {
                return 'code is not valid'
            }

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
        },
        [lexer])

    const [lastLexer, setLastLexer] = useState(lexer)
    const [tests, setTests] = useState<Test[]>(defaultTests.map(str => Object({input: str, tokens: calculateTokens(str)})))
    const [newTestInput, setNewTestInput] = useState<string>('')
    const classes = useStyles()

    useEffect(() => {
        if (lastLexer !== lexer) {
            setLastLexer(lexer)

            tests.forEach(token => token.tokens = calculateTokens(token.input))
            setTests(tests)
        }
    }, [lastLexer, lexer, calculateTokens, tests])

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

    function deleteTest(test: Test) {
        setTests(tests.filter(t => t !== test))
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

            {tests.map((test, idx) => {
                const testShortDescription = test.tokens instanceof Array ? test.tokens.map(t => t.type).join(',') : test.tokens
                return (
                <ExpansionPanel key={`panel-${idx}`}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <div className={classes.textWrapper}>
                            <TextField
                                className={classes.heading}
                                value={test.input}
                                error={!(test.tokens instanceof Array)}
                                onChange={onTextFieldChange(test)}
                            ></TextField>
                            <Typography className={classes.secondaryHeading} title={testShortDescription}>
                                {testShortDescription}
                            </Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <TokenList tokens={test.tokens} />
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <Button size="small" color="secondary" onClick={() => deleteTest(test)}>
                            Delete Test
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            )})}
        </div>
    )
}