```js
<Input2
  label="This is a demo Input"
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
  onChange={ (e) => { console.log(e); }}
  value="prct"
/>
```
```js
<Input2
  label="Disabled"
  disabled
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
  onChange={ (e) => { console.log(e); }}
  value="prct"
/>
```
```js
<Input2
  label="Read only"
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
  onChange={ (e) => { console.log(e); }}
  value="prct"
  readOnly
/>
```
```js
<Input2
  label="This is a demo Input"
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
  onChange={ (e) => { console.log(e); }}
/>
```
```js

<Input2
  error="Please fix the error"
  label="This an Input with error"
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
  onChange={ (e) => { console.log(e); }}
/>
```
```js
<Input2
  disabled={ true }
  label="This a disabled Input"
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
  onChange={ (e) => { console.log(e); }}
/>

```
```js
import Icon from '../../../components/Icon';
<div>
  <Input2
    inputgroupaddonleft={
      <Icon type="search" />
    }
    label="Input with addon left"
    name="input"
    placeholder="Please type something"
    type="text"
    onChange={ (e) => { console.log(e); }}
  />

  <Input2
    inputgroupaddonleft={
      <Icon type="search" />
    }
    error="Please fix the error"
    label="This an Input with error"
    name="input"
    note="Some helpful message to be displayed on this Input"
    placeholder="Please type something"
    type="text"
    onChange={ (e) => { console.log(e); }}
  />

  <Input2
    inputgroupaddonright={
      <Icon type="search" />
    }
    error="Please fix the error"
    label="This an Input with error"
    name="input"
    note="Some helpful message to be displayed on this Input"
    placeholder="Please type something"
    type="text"
    onChange={ (e) => { console.log(e); }}
  />
  <Input2
    inputgroupaddonright={
      <Icon type="search" />
    }
    label="Input with addon left"
    name="input"
    placeholder="Please type something"
    type="text"
    onChange={ (e) => { console.log(e); }}
  />
  <Input2
    inputgroupaddonright={
      <Icon type="search" />
    }
    disabled
    label="Input with addon right and disabled"
    name="input"
    placeholder="Please type something"
    type="text"
    onChange={ (e) => { console.log(e); }}
  />
  <Input2
    inputgroupaddonleft={
      <Icon type="search" />
    }
    disabled
    label="Input with addon right and disabled"
    name="input"
    placeholder="Please type something"
    type="text"
    onChange={ (e) => { console.log(e); }}
  />
</div>
```

### Password input

When `type="password"` is set, the component automatically renders a toggle button inside the field. Clicking the eye icon reveals the password; clicking it again masks it.

```js
<Input2
  label="Password"
  name="password"
  placeholder="Enter your password"
  type="password"
  onChange={ (e) => { console.log(e); }}
/>
```
```js
<Input2
  label="Password (disabled)"
  disabled
  name="password"
  placeholder="Enter your password"
  type="password"
  onChange={ (e) => { console.log(e); }}
/>
```
```js
<Input2
  error="Password is required"
  label="Password (with error)"
  name="password"
  placeholder="Enter your password"
  type="password"
  onChange={ (e) => { console.log(e); }}
/>
```
```js
<Input2
  label="Password (readonly)"
  name="password"
  type="password"
  value="mysecretpassword"
  readOnly
/>
```
