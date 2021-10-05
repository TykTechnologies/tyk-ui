**Button Themes**

*Web Component*
```js
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', columnGap: '10px', rowGap: '10px' }}>
  <div style={{ gridRow: 'auto / span 2' }}>Default</div>
  <tyk-button theme="default">Push Me</tyk-button>
  <tyk-button theme="default link">Push Me</tyk-button>
  <tyk-button theme="default outline">Push Me</tyk-button>
  <tyk-button theme="default gradient">Push Me</tyk-button>
  <tyk-button theme="default" disabled>Push Me</tyk-button>
  <tyk-button theme="default link" disabled>Push Me</tyk-button>
  <tyk-button theme="default outline" disabled>Push Me</tyk-button>
  <tyk-button theme="default gradient" disabled>Push Me</tyk-button>

  <div style={{ gridRow: 'auto / span 2' }}>Primary</div>
  <tyk-button theme="primary">Push Me</tyk-button>
  <tyk-button theme="primary link">Push Me</tyk-button>
  <tyk-button theme="primary outline">Push Me</tyk-button>
  <tyk-button theme="primary gradient">Push Me</tyk-button>
  <tyk-button theme="primary" disabled>Push Me</tyk-button>
  <tyk-button theme="primary link" disabled>Push Me</tyk-button>
  <tyk-button theme="primary outline" disabled>Push Me</tyk-button>
  <tyk-button theme="primary gradient" disabled>Push Me</tyk-button>

  <div style={{ gridRow: 'auto / span 2' }}>Success</div>
  <tyk-button theme="success">Push Me</tyk-button>
  <tyk-button theme="success link">Push Me</tyk-button>
  <tyk-button theme="success outline">Push Me</tyk-button>
  <tyk-button theme="success gradient">Push Me</tyk-button>
  <tyk-button theme="success" disabled>Push Me</tyk-button>
  <tyk-button theme="success link" disabled>Push Me</tyk-button>
  <tyk-button theme="success outline" disabled>Push Me</tyk-button>
  <tyk-button theme="success gradient" disabled>Push Me</tyk-button>

  <div style={{ gridRow: 'auto / span 2' }}>Warning</div>
  <tyk-button theme="warning">Push Me</tyk-button>
  <tyk-button theme="warning link">Push Me</tyk-button>
  <tyk-button theme="warning outline">Push Me</tyk-button>
  <tyk-button theme="warning gradient">Push Me</tyk-button>
  <tyk-button theme="warning" disabled>Push Me</tyk-button>
  <tyk-button theme="warning link" disabled>Push Me</tyk-button>
  <tyk-button theme="warning outline" disabled>Push Me</tyk-button>
  <tyk-button theme="warning gradient" disabled>Push Me</tyk-button>

  <div style={{ gridRow: 'auto / span 2' }}>Danger</div>
  <tyk-button theme="danger">Push Me</tyk-button>
  <tyk-button theme="danger link">Push Me</tyk-button>
  <tyk-button theme="danger outline">Push Me</tyk-button>
  <tyk-button theme="danger gradient">Push Me</tyk-button>
  <tyk-button theme="danger" disabled>Push Me</tyk-button>
  <tyk-button theme="danger link" disabled>Push Me</tyk-button>
  <tyk-button theme="danger outline" disabled>Push Me</tyk-button>
  <tyk-button theme="danger gradient" disabled>Push Me</tyk-button>

  <div style={{ gridRow: 'auto / span 2' }}>Info</div>
  <tyk-button theme="info">Push Me</tyk-button>
  <tyk-button theme="info link">Push Me</tyk-button>
  <tyk-button theme="info outline">Push Me</tyk-button>
  <tyk-button theme="info gradient">Push Me</tyk-button>
  <tyk-button theme="info" disabled>Push Me</tyk-button>
  <tyk-button theme="info link" disabled>Push Me</tyk-button>
  <tyk-button theme="info outline" disabled>Push Me</tyk-button>
  <tyk-button theme="info gradient" disabled>Push Me</tyk-button>
</div>
```
*Web Component with Icons*
```js
<tyk-button theme="primary">
  <tyk-icon family="tykon" type="profile"></tyk-icon>
  <span>Icon Left</span>
</tyk-button>
{' '}
<tyk-button theme="primary">
  <span>Icon Right</span>
  <tyk-icon family="tykon" type="profile"></tyk-icon>
</tyk-button>
{' '}
<tyk-button theme="primary">
  <tyk-icon family="tykon" type="profile"></tyk-icon>
  <span>Icon Both Sides</span>
  <tyk-icon family="tykon" type="profile"></tyk-icon>
</tyk-button>
{' '}
<tyk-button theme="primary">
  <tyk-icon slot="left-icon" family="tykon" type="profile"></tyk-icon>
</tyk-button>
```
*Web Component Form Submission*
```js
<form onSubmit={function (e) {
  e.preventDefault();
  console.log('form submitted with value', e.target.elements.email.value);
}}>
<label>
  <div>Email</div>
  <input type="text" name="email" />
</label>
<br />
<tyk-button class="my-button" onClick={() => console.log('on click handler')} theme="primary" type="submit">
  submit form
</tyk-button>
</form>
```
*Web Component as Link*
```js
<tyk-button href="http://tyk.io" noStyle>
  Go to Tyk website
</tyk-button>
```
*Web Component sizes*
```js
<tyk-button theme="success" size="sm">Push Me</tyk-button>{' '}
<tyk-button theme="success" size="md">Push Me</tyk-button>{' '}
<tyk-button theme="success" size="lg">Push Me</tyk-button>
```

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
<!-- *Gradient theme*
```js
<Button theme="primary-gradient">Push Me</Button> &ensp;
<Button theme="success-gradient">Push Me</Button> &ensp;
<Button theme="info-gradient">Push Me</Button> &ensp;
<Button theme="warning-gradient">Push Me</Button> &ensp;
<Button theme="danger-gradient">Push Me</Button> &ensp;
<Button theme="default-gradient">Push Me</Button> &ensp;
``` -->

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
<!-- *Gradient theme disabled*
```js
<Button theme="primary-gradient" disabled={ true }>Push Me</Button> &ensp;
<Button theme="success-gradient" disabled={ true }>Push Me</Button> &ensp;
<Button theme="info-gradient" disabled={ true }>Push Me</Button> &ensp;
<Button theme="warning-gradient" disabled={ true }>Push Me</Button> &ensp;
<Button theme="danger-gradient" disabled={ true }>Push Me</Button> &ensp;
<Button theme="default-gradient" disabled={ true }>Push Me</Button> &ensp;
``` -->
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
