### Copy using Button
```js
import Button from '../Button';
<CopyToClipboard 
  onCopy={() => {console.log('copied');}}
  copy="Copied by Button!"
  display="charlie"
  theme="primary"
  element={Button}
/>
```

### Copy by Span
```js
<CopyToClipboard
  copy="Copied by Span!"
  element="span"
  display="copy with span"
/>
```