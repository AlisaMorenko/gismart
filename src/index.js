import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { createGlobalStyle } from 'styled-components';

import App from './App';
import reportWebVitals from './reportWebVitals';

import 'modern-normalize/modern-normalize.css';

const Global = createGlobalStyle`
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ffffcb;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

ul {
  list-style: none;
  padding: 0px;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}
`;
ReactDOM.render(
  <React.StrictMode>
    <Global />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
