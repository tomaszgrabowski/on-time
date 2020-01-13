import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faBus, faArrowRight, faClock, faList, faHistory } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faBus, faArrowRight, faClock, faList, faHistory)

ReactDOM.render( <Routes/>, document.getElementById( 'root' ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
