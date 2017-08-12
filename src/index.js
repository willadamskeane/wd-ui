import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {AppContainer} from 'react-hot-loader';

ReactDOM.render(<AppContainer><App /></AppContainer>, document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default; // eslint-disable-line global-require
        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}