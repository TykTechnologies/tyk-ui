A wrapper around `Input2` that adds masking capability for `type="password"` fields.

- **Editable mode**: renders `Input2` with the password masked by default; a toggle button (eye icon) reveals or re-masks the value.
- **Read-only mode**: renders `<MaskSecret>` so the value is masked by default and can be revealed with a toggle.
- **All other types**: delegates directly to `Input2` with no changes.

```js
<MaskedInput
  label="Password"
  name="password"
  placeholder="Enter your password"
  type="password"
  onChange={ (e, value) => { console.log(value); }}
/>
```
```js
<MaskedInput
  label="Password (disabled)"
  disabled
  name="password"
  type="password"
  onChange={ (e, value) => { console.log(value); }}
/>
```
```js
<MaskedInput
  error="Password is required"
  label="Password (with error)"
  name="password"
  type="password"
  onChange={ (e, value) => { console.log(value); }}
/>
```
```js
<MaskedInput
  label="Password (readonly)"
  name="password"
  type="password"
  value="mysecretpassword"
  readOnly
/>
```
```js
<MaskedInput
  label="Regular text input (unchanged)"
  name="username"
  type="text"
  onChange={ (e, value) => { console.log(value); }}
/>
```
