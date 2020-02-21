import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Token } from 'moo'

export function TokenList({ tokens }: { tokens: string|Token[]}) {
    function interpretAsAListOfTokens(tokens: Token[]) {
        return tokens.map((token, idx) => <ListItem dense key={idx}>
            <ListItemText primary={JSON.stringify(token)} />
            </ListItem>)
    }

    function interpretAsAnError(errorMsg: string) {
        return <ListItem>
            <ListItemText primary={errorMsg} primaryTypographyProps={{color: 'error'}} />
        </ListItem>
    }

    const inner = tokens instanceof Array
        ? interpretAsAListOfTokens(tokens)
        : interpretAsAnError(tokens)

    return <List component="nav" aria-label="list of resulting tokens (or the error message)">
        {inner}
      </List>
}