```js
import toast from './index.js'
const TestToast = () => (
  <>
    <button type="button" onClick={() => { toast.notify('success', { theme: 'success' }); }}>CLICK Success</button>
    <button type="button" onClick={() => { toast.notify('danger', { theme: 'danger' }); }}>CLICK danger</button>
  </>
);
<TestToast />
```
