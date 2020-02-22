import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Token } from 'moo'

function isError(tokens: string|Token[]): boolean {
    return typeof tokens === 'string'
}

function tokensToHTML(tokens: string|Token[]): string {
    if (tokens instanceof Array) {
        return tokens.map(token => JSON.stringify(token)).join('\n')
    } else {
        return tokens
    }
}

const useStyles = makeStyles(theme => ({
    tokenWrapper: {
        overflowX: 'auto'
    },
    errorMessage: {
        color: 'red',
    },
}))

export function TokenList({ tokens }: { tokens: string|Token[]}) {
    const classes = useStyles()

    return <div
        aria-label="list of resulting tokens or the error message"
        className={`${classes.tokenWrapper} ${isError(tokens) ? classes.errorMessage : ''}`}
    >
        <pre>
            <code dangerouslySetInnerHTML={{__html: tokensToHTML(tokens)}}></code>
        </pre>
    </div>

    /*
    function interpretAsAListOfTokens(tokens: Token[]) {
        return tokens.map((token, idx) => <ListItem dense key={idx}>
            <ListItemText primary={<pre><code dangerouslySetInnerHTML={{__html: JSON.stringify(token)}}></code></pre>} />
            </ListItem>)
    }

    function interpretAsAnError(errorMsg: string) {
        return <ListItem>
            <pre>
                <code dangerouslySetInnerHTML={{__html: errorMsg}} style={{color: 'red'}}></code>
            </pre>
        </ListItem>
    }

    const inner = tokens instanceof Array
        ? interpretAsAListOfTokens(tokens)
        : interpretAsAnError(tokens)

    return <List component="nav" aria-label="list of resulting tokens (or the error message)">
        {inner}
      </List>
      */
}