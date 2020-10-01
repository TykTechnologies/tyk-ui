```js
import Button from '../Button';
import Dropdown from '../../form/components/Dropdown';
<ButtonGroup
  label="Button Group"
>
  <Button theme="default">button 1</Button>
  <Button theme="default">button 2</Button>
  <Button theme="default">button 3</Button>  
  <Dropdown
      btnGroup={ true }
      name="period"
      btnTitle="Dropdown"
    >
      <Dropdown.Item
        key='1'
        eventKey='1'
        title='First option'
      />
      <Dropdown.Item
        key='2'
        eventKey='2'
        title='Second option'
      />
      <Dropdown.Item
        key='3'
        eventKey='3'
        title='Third option'
      />
    </Dropdown>
</ButtonGroup>
```
```js
import Button from '../Button';
import {Dropdown} from '../../form/components/Dropdown';
<ButtonGroup
  label="Button Group"
>
  <Button size="sm" theme="default">button 1</Button>
  <Button size="sm" theme="default">button 2</Button>
  <Button size="sm" theme="default">button 3</Button>  
  <Dropdown
      btnGroup={ true }
      btnSize="sm"
      name="period"
      btnTitle="Dropdown"
    >
      <Dropdown.Item
        key='1'
        eventKey='1'
        title='First option'
      />
      <Dropdown.Item
        key='2'
        eventKey='2'
        title='Second option'
      />
      <Dropdown.Item
        key='3'
        eventKey='3'
        title='Third option'
      />
    </Dropdown>
</ButtonGroup>
```
