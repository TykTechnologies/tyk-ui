`debounce` "postpones" the execution of a callback after the specified amount of time in milliseconds.

```js static
debounce(callback, wait, immediate)
```

If you type in the text input below its value will be logged to the console.

```js
import DebounceExample from './styleguidist-example';

const [wait, setWait] = React.useState(1000);
<>
  <label>
    <span style={{ marginRight: '10px' }}>Wait:</span>
    <input type="text" value={wait} onChange={e => setWait(e.target.value)} />
  </label>
  <DebounceExample wait={Number(wait)} />
</>
```