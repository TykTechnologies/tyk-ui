```js
import { config } from './config.js';

<Table 
  config={config} 
  onMessage={
    (message, data, tableApi) => {
      console.log({message, data, tableApi})
    }
  }
/>
```