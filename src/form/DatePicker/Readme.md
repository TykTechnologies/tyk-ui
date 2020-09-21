```js
import Button from '../../components/Button';
<DatePicker
  label="Custom date picker trigger"
  name="datepicker"
  note="Some note on the datepicker"
  onChange={ (value) => { console.log(value) }}
  placeholder="Please select a value"
  config={{
    minDate: "today",
    dateFormat: "Y-m-d"
  }}
>
  {
    ({
      openCalendar,
      ref,
    }) => (
      <Button ref={ref} onClick={openCalendar} theme="primary">
        Open Calendar
      </Button>
    )
  }
</DatePicker>
```
```js
<DatePicker
  label="Default Date picker"
  name="datepicker"
  note="Some note on the datepicker"
  onChange={ (value) => { console.log(value) }}
  placeholder="Please select a value"
  config={{
    minDate: "today",
    dateFormat: "Y-m-d"
  }}
  theme="default rounded-corners"
/>
```
```js
<DatePicker
  label="Date Range picker"
  name="datepicker"
  note="Some note on the datepicker"
  onChange={ (value) => { console.log(value) }}
  placeholder="Please select a value"
  config={{
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d"
  }}
  theme="default rounded-corners"
/>
```
```js
<DatePicker
  label="Opened date picker"
  name="datepicker"
  note="Some note on the datepicker"
  onChange={ (value) => { console.log(value) }}
  placeholder="Please select a value"
  config={{
    inline: true,
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d"
  }}
  theme="default rounded-corners"
/>
```
```js
<DatePicker
  label="Date time picker"
  name="datepicker"
  note="Some note on the datepicker"
  onChange={ (value) => { console.log(value) }}
  placeholder="Please select a value"
  config={{
    minDate: "today",
    enableTime: true,
    dateFormat: "Y-m-d H:i",
  }}
  theme="default rounded-corners"
/>
```
```js
<DatePicker
  label="Date time picker with error"
  name="datepicker"
  note="Some note on the datepicker"
  onChange={ (value) => { console.log(value) }}
  error="Some error on datepicker"
  placeholder="Please select a value"
  config={{
    minDate: "today",
    enableTime: true,
    dateFormat: "Y-m-d H:i",
  }}
  theme="default rounded-corners"
/>
```
```js
<DatePicker
  label="Date time picker disabled"
  name="datepicker"
  disabled
  note="Some note on the datepicker"
  onChange={ (value) => { console.log(value) }}
  placeholder="Please select a value"
  config={{
    minDate: "today",
    enableTime: true,
    dateFormat: "Y-m-d H:i",
  }}
  theme="default rounded-corners"
/>
```
