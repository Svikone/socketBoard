import React from 'react';
import logo from './logo.svg';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import { connect, Provider } from 'react-redux';
import Auth from './components/auth/auth';
import Main from './components/main/main';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './store/reducers';
import { watchLoadData } from './sagas/sagas';
import { composeWithDevTools } from 'redux-devtools-extension';
import history from './shared/history';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const sagaMiidleware = createSagaMiddleware()
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, sagaMiidleware)));
sagaMiidleware.run(watchLoadData)

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/main" component={Main}/>
          </Switch>
        </div>
      </Router>  
    </Provider>
  );
}

export default App;
