**Button Themes**

*Default theme*
```js
<Button theme="primary">Push Me</Button> &ensp;
<Button theme="primary" customButton={<span>aaa</span>}>Push Me</Button> &ensp;
<Button theme="success">Push Me</Button> &ensp;
<Button theme="info">Push Me</Button> &ensp;
<Button theme="warning">Push Me</Button> &ensp;
<Button theme="danger">Push Me</Button> &ensp;
<Button theme="default">Push Me</Button> &ensp;
<Button theme="white">Push Me</Button> &ensp;
<Button>Push Me</Button>
```
*Link theme*
```js
<Button theme="primary-link">Push Me</Button> &ensp;
<Button theme="success-link">Push Me</Button> &ensp;
<Button theme="info-link">Push Me</Button> &ensp;
<Button theme="warning-link">Push Me</Button> &ensp;
<Button theme="danger-link">Push Me</Button> &ensp;
<Button theme="default-link">Push Me</Button> &ensp;
<Button>Push Me</Button>
```
*Outline theme*
```js
<Button theme="primary-outline">Push Me</Button> &ensp;
<Button theme="success-outline">Push Me</Button> &ensp;
<Button theme="info-outline">Push Me</Button> &ensp;
<Button theme="warning-outline">Push Me</Button> &ensp;
<Button theme="danger-outline">Push Me</Button> &ensp;
<Button theme="default-outline">Push Me</Button> &ensp;
```
*Gradient theme*
```js
<Button theme="primary-gradient">Push Me</Button> &ensp;
<Button theme="success-gradient">Push Me</Button> &ensp;
<Button theme="info-gradient">Push Me</Button> &ensp;
<Button theme="warning-gradient">Push Me</Button> &ensp;
<Button theme="danger-gradient">Push Me</Button> &ensp;
<Button theme="default-gradient">Push Me</Button> &ensp;
```

**Button Disabled States**

*Default theme disabled*
```js
<Button theme="primary" disabled={true}>Push Me</Button> &ensp;
<Button theme="success" disabled={true}>Push Me</Button> &ensp;
<Button theme="info" disabled={true}>Push Me</Button> &ensp;
<Button theme="warning" disabled={true}>Push Me</Button> &ensp;
<Button theme="danger" disabled={true}>Push Me</Button> &ensp;
<Button theme="default" disabled={true}>Push Me</Button> &ensp;
<Button>Push Me</Button>
```
*Outline theme disabled*
```js
<Button theme="primary-outline" disabled={ true }>Push Me</Button> &ensp;
<Button theme="success-outline" disabled={ true }>Push Me</Button> &ensp;
<Button theme="info-outline" disabled={ true }>Push Me</Button> &ensp;
<Button theme="warning-outline" disabled={ true }>Push Me</Button> &ensp;
<Button theme="danger-outline" disabled={ true }>Push Me</Button> &ensp;
<Button theme="default-outline" disabled={ true }>Push Me</Button> &ensp;
```
*Gradient theme disabled*
```js
<Button theme="primary-gradient" disabled={ true }>Push Me</Button> &ensp;
<Button theme="success-gradient" disabled={ true }>Push Me</Button> &ensp;
<Button theme="info-gradient" disabled={ true }>Push Me</Button> &ensp;
<Button theme="warning-gradient" disabled={ true }>Push Me</Button> &ensp;
<Button theme="danger-gradient" disabled={ true }>Push Me</Button> &ensp;
<Button theme="default-gradient" disabled={ true }>Push Me</Button> &ensp;
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
