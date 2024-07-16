**Button Themes**

*Default theme*
```js
<Button theme="primary">Push Me</Button> &ensp;
<Button theme="secondary">Push Me</Button> &ensp;
<Button theme="danger">Push Me</Button> &ensp;
<Button theme="success">Push Me</Button> &ensp;
<Button theme="info">Push Me</Button> &ensp;
<Button theme="warning">Push Me</Button> &ensp;
```
*Link theme*
```js
<Button theme="primary-link">Push Me</Button> &ensp;
<Button theme="secondary-link">Push Me</Button> &ensp;
<Button theme="danger-link">Push Me</Button> &ensp;
<Button theme="success-link">Push Me</Button> &ensp;
<Button theme="info-link">Push Me</Button> &ensp;
<Button theme="warning-link">Push Me</Button> &ensp;
<Button>Push Me</Button>
```
*Outline theme*
```js
<Button theme="primary-outline">Push Me</Button> &ensp;
<Button theme="secondary-outline">Push Me</Button> &ensp;
<Button theme="danger-outline">Push Me</Button> &ensp;
<Button theme="success-outline">Push Me</Button> &ensp;
<Button theme="info-outline">Push Me</Button> &ensp;
<Button theme="warning-outline">Push Me</Button> &ensp;
```

**Button Disabled States**

*Default theme disabled*
```js
<Button theme="primary" disabled={true}>Push Me</Button> &ensp;
<Button theme="primary" disabled={true} iconType="check">Push Me</Button> &ensp;
<Button theme="primary" disabled={true} iconOnly iconType="check" />&ensp;
<Button>Push Me</Button>
```
*Link theme disabled*
```js
<Button theme="primary-link" disabled={ true }>Push Me</Button> &ensp;
```
*Outline theme disabled*
```js
<Button theme="primary-outline" disabled={ true }>Push Me</Button> &ensp;
```

**Button Sizes**
```js
<Button size="sm" theme="primary">Push Me</Button> &ensp;
<Button size="md" theme="primary">Push Me</Button> &ensp;
<Button size="lg" theme="primary">Push Me</Button> &ensp;
```
**Button Click event**
```js
<Button size="md" theme="primary" onClick={(e) => {
  console.log('Button has been clicked', e);
}}>Click me & Check the console</Button>
```
