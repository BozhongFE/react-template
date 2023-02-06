import React from 'react';
import { createRoot } from 'react-dom/client';

import './assets/css/style.css';
import './assets/css/style.less';

const root = createRoot(document.querySelector('#app'));
root.render(<div>'webpack5 + react18'</div>);
