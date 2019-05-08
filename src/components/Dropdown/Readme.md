```js
<Dropdown
  label="Period"
  name="period"
  btnTitle="Dropdown"
  showTriggerButton={ false }
  open={true}
  offset={{
    left: 100,
    top: 100
  }}
>
  <Dropdown.Item
    key='1'
    eventKey='1'
    title='First'
  />
  <Dropdown.Item
    key='2'
    eventKey='2'
    title='Second'
  />
  <Dropdown.Item
    key='3'
    eventKey='3'
    title='Third'
  />
</Dropdown>
```

```js
<Dropdown
  appendTo="#dropdownContainer1"
  label="Period"
  name="period"
  customBtnTitle={
    (
      <span>
        <span>22, Feb 2016</span>
        <span> > </span>
        <span>22, Feb 2016</span>
      </span>
    )
  }
  btnTitle="22, Feb 2016 > 23, Feb 2016"
  hasCustomContent={ true }
  display="block"
  showDropdownIcon={ false }
>
  prct
</Dropdown>
<div id="dropdownContainer1"></div>
```
```js
<Dropdown
  appendTo="#dropdownContainer2"
  label="Period"
  name="period"
  btnTitle="Dropdown"
  hasCustomContent={ true }
  display="block"
  position="relative"
>
  prct
</Dropdown>
<div id="dropdownContainer2"></div>
```
