import React from 'react';
import { createRoot } from 'react-dom/client';

import './assets/css/style.css';
import './assets/css/style.less';

import Test1 from './components/test1';
import Test2 from './components/test2';
import Test3 from './components/test3';

const root = createRoot(document.querySelector('#app'));
root.render(<div>
  <div>'webpack5 + react18'</div>
  <Test1></Test1>
  <Test2></Test2>
  <Test3></Test3>
</div>);
