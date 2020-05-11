**Panel**

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
<Panel collapsable theme="success">
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
