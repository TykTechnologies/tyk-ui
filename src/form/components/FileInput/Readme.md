```js
<FileInput
  accept=".pem"
  label="This is a demo FileInput"
  name="input"
  note="Some helpful message to be displayed on this FileInput"
  placeholder="Please type something"
  theme="default rounded-corners"
  onChange={ (e) => { console.log(e); }}
/>
```
```js
<FileInput
  accept=".pem"
  label="This is a demo FileInput"
  name="input"
  note="Some helpful message to be displayed on this FileInput"
  placeholder="Please type something"
  theme="default  rounded-corners"
  onChange={ (e) => { console.log(e); }}
/>
```
```js
<FileInput
  accept=".pem"
  label="This is a demo FileInput"
  labelwidth="50%"
  name="input"
  note="Some helpful message to be displayed on this FileInput"
  placeholder="Please type something"
  theme="default  rounded-corners"
  onChange={ (e) => { console.log(e); }}
/>
```
```js

<FileInput
  accept=".jpg"
  multiple={ true }
  error="Please fix the error"
  label="Multiple file upload"
  name="input"
  note="Some helpful message to be displayed on this FileInput"
  placeholder="Please type something"
  onChange={ (e) => { console.log(e); }}
/>

```
```js
<FileInput
  disabled={ true }
  label="This a disabled FileInput"
  name="input"
  note="Some helpful message to be displayed on this FileInput"
  placeholder="Please type something"
  onChange={ (e) => { console.log(e); }}
/>

```
