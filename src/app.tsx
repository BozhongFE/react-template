import React, { Suspense } from 'react';
{{#if router}}

{{#if routerHistoryMode}}
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
{{else}}
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
{{/if}}

import routes from './routes';
{{/if}}
import './app.css';
import logo from './logo.svg';

function App() {
  return (
    <div className='App'>
      <img src={logo} className="App-logo" alt="logo" />
      <p>Welcome to Your React.js App</p>
      {{#if router}}
      {{#if routerHistoryMode}}
      <Router basename={window.routerBaseUrl}>
      {{else}}
      <Router>
      {{/if}}
        <Switch>
          {routes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              render={() => (
                // 防其组件树中的某些子组件尚未具备渲染条件
                // 与React.lazy 搭配使用
                <Suspense fallback={<div>loading</div>}>
                  <route.component />
                </Suspense>
              )}
            />
          ))}
        </Switch>
      </Router>
      {{/if}}
    </div>
  );
}

export default App;
