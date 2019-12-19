```jsx
import {Fragment, useState} from 'react';
import { config } from './config.js';

<Table 
  value={config}
  onChange={
    (message, data, tableApi) => {
      console.log({message, data, tableApi})
    }
  }
/>
```