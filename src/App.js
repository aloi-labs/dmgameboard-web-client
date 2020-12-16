import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Home from './views/Home/Home.js';
import About from './views/About/About.js';
import Join from './views/Join/Join.js';
import HowTo from './views/HowTo/HowTo.js';
import Host from './views/Host/Host.js';
import PlayerView from './views/PlayerView/PlayerView.js';
import HostView from './views/HostView/HostView.js';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
            </div>
            <Switch>
                <Route path="/hostview" component={HostView} />
                <Route path="/playerview" component={PlayerView} />
                <Route path="/about" component={About} />
                <Route path="/join" component={Join} />
                <Route path="/howto" component={HowTo} />
                <Route path="/host" component={Host} />
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
};

export default App;
