Toast is a service that displays dialogs on the bottom right part of the screen.

The dialogs can have one of the Tyk UI themes, so that it would match it's purpose (i.e success message, error message)

Toast service exposes the `notify` method, which should be called when you want to display the dialog.
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
