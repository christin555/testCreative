import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Game from './components/Game';
import Flats from './components/Flats';
import Main from './components/Main';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => (
                        <Main {...props} />
                    )}
                />
                <Route
                    exact
                    path="/game"
                    render={(props) => (
                        <Game {...props} />
                    )}
                />
                <Route
                    exact
                    path="/flats"
                    render={(props) => (
                        <Flats {...props} />
                    )}
                />
                <Route render={() => <div>{'not found'}</div>}/>
            </Switch>
        </BrowserRouter>
    );
};
