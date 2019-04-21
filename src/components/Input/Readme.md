```js
<Input
  label="This is a demo Input"
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
  onChange={ (e) => { console.log(e); }}
/>
```
```js
<Input
  label="This is a demo Input"
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
  inline={ true }
  onChange={ (e) => { console.log(e); }}
/>
```
```js
<Input
  label="This is a demo Input"
  name="input"
  placeholder="Please type something"
  type="text"
  theme="primary inline"
  onChange={ (e) => { console.log(e); }}
/>

<Input
  label="This is a demo Input"
  name="input"
  placeholder="Please type something"
  type="text"
  theme="success inline"
  onChange={ (e) => { console.log(e); }}
/>
<Input
  label="This is a demo Input"
  name="input"
  placeholder="Please type something"
  type="text"
  theme="primary inline rounded-corners"
  onChange={ (e) => { console.log(e); }}
/>

<Input
  label="This is a demo Input"
  labelWidth="60%"
  name="input"
  placeholder="Please type something"
  type="text"
  theme="success inline rounded-corners"
  onChange={ (e) => { console.log(e); }}
/>
```
```js

<Input
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
<Input
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
<Input
  inputgroupaddonleft={
    <Icon type="search" />
  }
  label="Input with addon"
  name="input"
  placeholder="Please type something"
  type="text"
  onChange={ (e) => { console.log(e); }}
/>
<Input
  inputgroupaddonright={
    <Icon type="search" />
  }
  name="input"
  placeholder="Please type something"
  type="text"
  onChange={ (e) => { console.log(e); }}
/>
<Input
  inputgroupaddonright={
    <Icon type="search" />
  }
  name="input"
  placeholder="Please type something"
  type="text"
  onChange={ (e) => { console.log(e); }}
  theme="extra-dark inline rounded-corners"
/>
```
