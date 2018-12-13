```js
<DateTimePicker
  label="Date Time picker"
  name="datepicker"
  note="Some note on the datepicker"
  onChange={ (e) => { console.log(e) }}
  placeholder="Please select a value"
/>
```
```js
<DateTimePicker
  label="Date Time error"
  error="Some date picker error, probably a wrong date"
  name="datepicker"
  onChange={ (e) => { console.log(e) }}
  placeholder="Please select a value"
/>
```
```js
<DateTimePicker
  label="Disabled Date Time"
  disabled={ true }
  name="datepicker"
  onChange={ (e) => { console.log(e) }}
  placeholder="Please select a value"
/>
```
```js
<DateTimePicker
  label="Just Date picker"
  timeFormat={ false }
  name="datepicker"
  onChange={ (e) => { console.log(e) }}
  placeholder="Please select a value"
/>
```
