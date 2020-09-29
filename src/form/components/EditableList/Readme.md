```js
import { Combobox } from '../Combobox';
import {Combobox2} from '../Combobox2';
import {Input} from '../Input';
import {DatePicker} from '../DatePicker';
<EditableList
  label="Editable list inline display"
  name="editableListInline"
  onChange={ (list, index, prevValue, nextValue) => {
    console.log('list:', list);
    console.log('index:', index);
    console.log('prevValue:', prevValue);
    console.log('nextValue:', nextValue);
  }}
  config={{
    displayType: 'inline',
    formButtonStyle: 'inline-with-label',
    components: [
      {
        size: 8,
        name: Combobox2,
        props: {
          "label": <span>asasasdlahsdkja</span>,
          "name": "endpoints",
          "placeholder": "Enter custom regex or select an endpoint.",
          "value": null,
          "values": [
            {
              "version": "Default",
              "name": "/i",
              "id": "GET-/i",
              "method": "GET",
              "path": "/i",
            },
          ],
        }
      },
      {
        size: 6,
        name: Combobox,
        props: {
          label: "Main Combobox",
          name: "mainElCombobox",
          placeholder: "Select a value",
          value: null,
          values: [
            { id: '', name: "None" },
            { id: 'apione', name: 'API one'},
            { id: 'apitwo', name: 'API two'},
            { id: 'apithree', name: 'API three'},
            { id: 'apifour', name: 'API four'},
            { id: 'apifive', name: 'API five'},
            { id: 'apisix', name: 'API six'},
            { id: 'apiseven', name: 'API seven'},
            { id: 'apieight', name: 'API eight'}
          ]
        }
      }
    ]
  }}
/>
```
```js
import { Combobox } from '../Combobox';
<EditableList
  addValueOnFieldChange={ true }
  label="Editable list inline display"
  name="editableListInline"
  onChange={ (list, index, prevValue, nextValue) => {
    console.log('list:', list);
    console.log('index:', index);
    console.log('prevValue:', prevValue);
    console.log('nextValue:', nextValue);
  }}
  config={{
    displayType: 'inline',
    components: [
      {
        size: 12,
        name: Combobox,
        props: {
          label: "Main Combobox 2",
          name: "mainElCombobox",
          placeholder: "Select a value",
          value: null,
          values: [
            { id: '', name: "None" },
            { id: 'apione', name: 'API one'},
            { id: 'apitwo', name: 'API two'},
            { id: 'apithree', name: 'API three'},
            { id: 'apifour', name: 'API four'},
            { id: 'apifive', name: 'API five'},
            { id: 'apisix', name: 'API six'},
            { id: 'apiseven', name: 'API seven'},
            { id: 'apieight', name: 'API eight'}
          ]
        }
      }
    ]
  }}
/>
```
```js
import { Combobox } from '../Combobox';
import {Input} from '../Input';
<EditableList
  label="Editable list table display"
  name="editableListInline"
  onChange={ (list, index, prevValue, nextValue) => {
    console.log('list:', list);
    console.log('index:', index);
    console.log('prevValue:', prevValue);
    console.log('nextValue:', nextValue);
  }}
  config={{
    formButtonStyle: 'inline-with-label',
    components: [
      {
        size: 6,
        name: Input,
        props: {
          label: 'Input',
          placeholder: 'Pleas type smth',
          name: "elInput",
          type: "text",
          value: ""
        }
      },
      {
        size: 6,
        name: Combobox,
        props: {
          label: "Main Combobox",
          name: "mainElCombobox",
          placeholder: "Select a value",
          value: null,
          values: [
            { id: '', name: "None" },
            { id: 'apione', name: 'API one'},
            { id: 'apitwo', name: 'API two'},
            { id: 'apithree', name: 'API three'},
            { id: 'apifour', name: 'API four'},
            { id: 'apifive', name: 'API five'},
            { id: 'apisix', name: 'API six'},
            { id: 'apiseven', name: 'API seven'},
            { id: 'apieight', name: 'API eight'}
          ]
        }
      }
    ]
  }}
/>
```
```js
import {Fragment} from 'react';
import {Input} from '../Input';
<Fragment>
  <EditableList
    label="Editable list append the results to another element"
    name="editableListInline"
    onChange={ (list, index, prevValue, nextValue) => {
      console.log('list:', list);
      console.log('index:', index);
      console.log('prevValue:', prevValue);
      console.log('nextValue:', nextValue);
    }}
    config={{
      appendTo: '#prct',
      formButtonStyle: 'inline-with-label',
      components: [
        {
          size: 12,
          name: Input,
          props: {
            label: 'Input',
            placeholder: 'Pleas type smth',
            name: "elInput",
            type: "text",
            value: ""
          }
        }
      ]
    }}
  />
  <div id="prct"></div>
</Fragment>
```
