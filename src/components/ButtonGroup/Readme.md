```js
import Button from '../Button';
import Dropdown from '../../form/components/Dropdown';

<>
<ButtonGroup
  label="Button Group"
>
  <Button theme="secondary">button 1</Button>
  <Button theme="secondary">button 2</Button>
  <Button theme="secondary">button 3</Button>  
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
<ButtonGroup
  label="Button Group"
>
  <Button theme="secondary">button 1</Button>
  <Button theme="secondary">button 2</Button>
  <Button theme="secondary">button 3</Button>
</ButtonGroup>
<ButtonGroup
  label="Button Group"
>
  <Button theme="primary">button 1</Button>
  <Button theme="primary">button 2</Button>
  <Button theme="primary">button 3</Button>  
  <Dropdown
      btnGroup={ true }
      name="period"
      btnTheme="primary"
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
</>
```
```js
import Button from '../Button';
import Dropdown from '../../form/components/Dropdown';
<ButtonGroup
  label="Button Group"
>
  <Button size="sm" theme="secondary">button 1</Button>
  <Button size="sm" theme="secondary">button 2</Button>
  <Button size="sm" theme="secondary">button 3</Button>  
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
