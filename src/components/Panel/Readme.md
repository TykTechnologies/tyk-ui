**Panel**

## With ReactJS
*Panel themes*
```js
import Button from '../Button';
<>
<Panel theme="primary">
  <Panel.Header>Panel example</Panel.Header>
  <Panel.Body>
    <label>label</label>
    Panel body content
  </Panel.Body>
</Panel>
<Panel collapsable theme="success" collapsibleIconPosition="left">
  {
    ({toggleCollapse}) => (
      <>
        <Panel.Header>Panel example</Panel.Header>
        <Panel.Body>
          <Button onClick={toggleCollapse} theme="primary">Collapse</Button>
          Panel body content 222
        </Panel.Body>
      </>
    )
  }
</Panel>
<Panel theme="danger">
  <Panel.Header>Panel example</Panel.Header>
  <Panel.Body>
    Panel body content
  </Panel.Body>
</Panel>
<Panel theme="warning">
  <Panel.Header>Panel example</Panel.Header>
  <Panel.Body>
    Panel body content
  </Panel.Body>
</Panel>
</>
```
*Collapsable panel*
```js
<Panel theme="primary" collapsable={ true }>
  <Panel.Header>Panel example</Panel.Header>
  <Panel.Body>
    Panel body content
  </Panel.Body>
</Panel>
```
```js
<Panel theme="primary" collapsable={ true } collapsed={ true } isLeft>
  <Panel.Header>Panel example</Panel.Header>
  <Panel.Body>
    Panel body content
  </Panel.Body>
</Panel>
```
```js
<Panel theme="blank" collapsable={ true } collapsed={ true } isLeft>
  <Panel.Header>Panel example</Panel.Header>
  <Panel.Body>
    Panel body content
  </Panel.Body>
</Panel>
```

## With HTML
To start with, `tyk-panel` class must always be used, as it will give the element the main styling.
Then it is used as a "prefix" followed by double hyphen to define the main container and double underscore to define the header and body containers.

So a complete panel of theme "primary" should be defined as below:
```js
<div class="tyk-panel tyk-panel--primary">
  <div class="tyk-panel__header">Panel Header</div>
  <div class="tyk-panel__body">Panel body content</div>
</div>
```

All available theme colors are refered in the "Panel Themes" section above.

