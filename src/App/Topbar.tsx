import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
}));

export function Topbar() {
    const classes = useStyles()

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Moo Playground
                </Typography>
                <Button
                    aria-label="github link of the moo lexer"
                    color="inherit"
                    endIcon={<GitHubIcon/>}
                    href="https://github.com/no-context/moo"
                >Moo lexer Github</Button>
                <Button
                    aria-label="github link of this playground"
                    color="inherit"
                    endIcon={<GitHubIcon/>}
                    href="https://github.com/AblingerOscar/moo-playground"
                >Moo playground Github</Button>
            </Toolbar>
        </AppBar>
    );
}
