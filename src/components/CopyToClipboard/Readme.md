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

### Copy with custom message
```js
<CopyToClipboard
  copy="Copied with custom message!"
  element="span"
  display="copy with custom message"
  message="roger"
/>