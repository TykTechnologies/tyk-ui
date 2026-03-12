Toast is a service that displays dialogs on the screen.

By default, dialogs appear at the bottom-center, but the placement can be globally customized.

The dialogs can have one of the Tyk UI themes, so that it would match it's purpose (i.e success message, error message)

Toast service exposes the `notify` method, which should be called when you want to display the dialog.

It also exposes alias methods that you can call for specific themes.
For example calling **`toast.notify('message', { theme: 'success' })`** and **`toast.success('message')`** are equivalent.

```js
import toast from "./index.js";

toast.configure({
  general: {
    delay: 1000,
    placement: { from: "top", align: "right" },
  },
  themes: {
    danger: { delay: 5000 },
    warning: { delay: 2000 },
  },
});

const TestToast = () => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button type="button" onClick={() => toast.success("success")}>
        Show Success
      </button>
      <button type="button" onClick={() => toast.danger("danger")}>
        Show Danger
      </button>
      <button type="button" onClick={() => toast.warning("warning")}>
        Show Warning
      </button>
      <button type="button" onClick={() => toast.info("info")}>
        Show Info
      </button>
    </div>
  );
};

<TestToast />;
```
