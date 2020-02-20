import React from 'react'
import { Topbar } from './App/Topbar'
import { PlaygroundContainer } from './App/PlaygroundContainer';
import './App.css';

export function App() {
    return (
        <div className="full-height app-wrapper">
            <Topbar/>
            <PlaygroundContainer />
        </div>
    );
}
