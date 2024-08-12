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
