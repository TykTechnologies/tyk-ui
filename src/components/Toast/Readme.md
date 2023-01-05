Toast is a service that displays dialogs on the bottom right part of the screen.

The dialogs can have one of the Tyk UI themes, so that it would match it's purpose (i.e success message, error message)

Toast service exposes the `notify` method, which should be called when you want to display the dialog.

It also exposes alias methods that you can call for specific themes.
For example calling **`toast.notify('message', { theme: 'success' })`** and **`toast.success('message')`** are equivalent.
```js
import toast from './index.js'
const TestToast = () => (
  <>
    <button type="button" onClick={() => {toast.success('success'); toast.success('success');}}>CLICK Success</button>
    <button type="button" onClick={() => toast.danger('danger')}>CLICK Danger</button>
    <button type="button" onClick={() => toast.warning('warning')}>CLICK Warning</button>
    <button type="button" onClick={() => toast.info('info')}>CLICK Info</button>
  </>
);
<TestToast />
```
