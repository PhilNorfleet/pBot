import React from 'react';
import ReactDOM from 'react-dom';
import Markets from './pages/Markets';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory } from 'react-router';
const Root = () => {

    return (
        <div>
            <Router history={browserHistory}>
                <Route path="/" component={Markets}/>
            </Router>
        </div>
    )

}


ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
