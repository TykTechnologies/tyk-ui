The `MaskSecret` component displays a sensitive value (API token, shared secret, password, client secret, etc.) masked by default. A toggle button allows the user to reveal or re-mask the plaintext. Because the reveal state is not persisted, the secret is always masked again on page refresh.

Use this component for **display-only** secret values. For secret values inside a form, use `<Input type="password">` or `<Input2 type="password">` instead.

```js
<MaskSecret value="my-api-key-12345" />
```
```js
<MaskSecret value="a-very-long-shared-secret-token" className="custom-class" />
```
```js
<MaskSecret />
```
