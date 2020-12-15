<!-- ### Value (configuration object) schema -->

## Table configuration explained

Table component depends on `value` prop which consist of following schema.

```json
{
  "columns": [{}], 
  "rows": [{}],
  "selectable" : {},
  "pagination": {
    "totalPages": 0,
    "perPage": 0,
    "current": 0,
  },
  "maxHeight": "",
  "styling": {
    "className": "",
  }
}

```


### 1. Columns (`value.column`)

```md
columns[n].id
```
- Should be an unique id (of type String) for the table column that will be used to renders the row cells in appropriate columns in the defined way

```md
columns[n].name
```
- Defines the column name / table header

```md
columns[n].type
```
- Defines the column type. Can be used to render the column / row cells of elements. By default renders string

```md
columns[n].sortable
```
- Gives sorting capabilities for to the table and can be extended to change the default sorting behavior.

eg. 
```json

// Make table sortable
"column" : {
  //...
  "sortable": true
}

// Make table sortable and change the default sortable direction to Ascending 
"column" :  {
  //...
  "sortable": {
    "default": "ASC"
  }
}
```

### 2. Rows (`value.rows`)
```md
rows[n].values
```

- Defines the the values to be rendered for the table. You can also pass props and values using this if your `columns[n].type` is a custom component. 
- Values is an object who's keys should match the `columns[n].id` for table to understand what values need to be rendered under what column
- You can consider rows[n].values[{yourColumnId}] as a single cell which you can completely customize

```md
rows[n].styling
```
- Used to style a specific row. You can pass a class using `rows[n].styling` that would be applied on the row

```md
rows[n].selected
```
- If you are rendering a table with selectable rows this can be used to make a row selected by default

```md
rows[n].events
```
- Used to attach events to a row

### 3. Pagination (`value.pagination`)

- Table component uses tyk-ui's `<Pagination />` component to render pagination for table.
- Pagination is not rendered if table's `infiniteScrolling` prop is set to true
- You can subscribe to pagination change event using `pagination.change` message passed to `onChange`

```json
  "pagination": {
    "totalPages": 40,
    "perPage": 5,
    "current": 1,
  },
```


### 4.Selectable (`value.selectable`)

You render a table that is selectable by row using the following configuration options. You can also subscribe to row select or all rows selected event of table using following messages

```md
selectable.position
```
- Defines where to render the selectable column RIGHT / LEFT

```md
selectable.style
```
- Style the selectable cells

```md
selectable.allowSelectAll
```
- Allows users to select all rows, true by default

### 5.Height (`value.maxHeight`)

```md
value.maxHeight
```

- You can define max height for a table using this

### 6.Table Styling (`value.styling`)

```md
value.styling.className
```
- You can customize the table wrapper using this
##### Existing classes
- `tyk-table__wrapper`, this will wrap your table with borders
- `tyk-table__wrapper--no-border`, will remove wrapping borders
- `tyk-table__wrapper no-innner-right-borders`, will remove the right border of `th` and `td`

### Interactive Table Component
```jsx
import {Fragment, useState} from 'react';

import Checkbox from '../../form/components/Checkbox';
import Button from '../Button';
import Icon from '../Icon';
import Input from '../../form/components/Input';
import TextEllipsis from '../TextEllipsis';

const config = {
  columns: [
    // {
    //   id: 'active', name: 'Active', type: Icon, sortable: true,
    // },
    {
      id: 'name', name: 'Policy Name', type: 'string', sortable: { default: 'DESC' },
    },
    { id: 'access_rights', name: 'Access Rights', type: TextEllipsis },
    {
      id: 'auth_type', name: 'Auth Type', type: 'string', sortable: true,
    },
    {
      id: 'date', name: 'Date Created', type: 'string', sortable: true,
    },
    {
      id: 'delete_btn', name: 'Delete', type: Button, sortable: true,
    },
    {
      id: 'input_test', name: 'Input Test', type: Input,
    },
  ],
  rows: [
    {
      values: {
        active: {
          family: 'tykon',
          type: 'target',
          className: 'success',
        },
        name: {
          value: 'Freemium Policy (A)',
          events: {
            onClick: () => console.log('Name Clicked'),
          },
        },
        access_rights: {
          props: {
            text:
              'api alpha, api bravo, api charlie, api delta, api eclair, api foxtrot',
            limit: 10,
          },
          styling: {
            className: 'alpha',
          },
        },
        auth_type: {
          value: 'tag1, tag2, tag3, tag4',
        },
        date: {
          value: '01/01/2019',
        },
        delete_btn: null,
        input_test: {
          props: {
            type: 'number',
            value: '1',
            onChange: v => console.log('changing input', v),
          },
        },
      },
      selected: false,
      events: {
        onClick: () => console.log('Row Clicked {config}'),
      },
      styling: {
        className: 'A',
      },
    },
    {
      values: {
        active: {
          family: 'tykon',
          type: 'target',
          className: 'success',
        },
        name: {
          value: 'Freemium Policy',
          events: {
            onClick: () => console.log('Name Clicked'),
          },
        },
        access_rights: {
          props: {
            text:
              'api alpha, api bravo, api charlie, api delta, api eclair, api foxtrot',
            limit: 10,
          },
          styling: {
            className: 'alpha',
          },
        },
        auth_type: {
          value: 'tag1, tag2, tag3, tag4',
        },
        date: {
          value: '01/01/2019',
        },
        delete_btn: {
          props: {
            theme: 'danger',
            size: 'sm',
            onClick: () => console.log('Delete Btn Click'),
          },
          children: 'Delete',
        },
        input_test: {
          props: {
            type: 'number',
            value: '1',
          },
        },
      },
      selected: false,
      events: {
        onClick: () => console.log('Row Clicked {config}'),
      },
      styling: {
        className: 'ALPHA',
      },
    },
    {
      values: {
        active: {
          family: 'tykon',
          type: 'target',
          className: 'success',
        },
        name: {
          value: 'Freemium Policy',
          events: {
            onClick: () => console.log('Name Clicked'),
          },
        },
        access_rights: {
          props: {
            text:
              'api alpha, api bravo, api charlie, api delta, api eclair, api foxtrot',
            limit: 10,
          },
          styling: {
            className: 'alpha',
          },
        },
        auth_type: {
          value: 'tag1, tag2, tag3, tag4',
        },
        date: {
          value: '01/01/2019',
        },
        delete_btn: {
          props: {
            theme: 'danger',
            size: 'sm',
            onClick: () => console.log('Delete Btn Click'),
          },
          children: 'Delete',
        },
        input_test: {
          props: {
            type: 'number',
            value: '1',
          },
        },
      },
      selected: false,
      events: {
        onClick: () => console.log('Row Clicked {config}'),
      },
    },
  ],
  selectable: {
    position: 'LEFT',
    // type: Button,
    // type: 'default',
    type: Checkbox,
    style: 'dummy-style',
    allowSelectAll: true,
    // name: 'Select'
    // values: {
    //   theme: 'primary',
    //   value: 'Select All',
    //   size: 'sm'
    // },
  },
  pagination: {
    totalPages: 40,
    perPage: 5,
    current: 1,
  },
  maxHeight: '320px',
  styling: {
    className: 'tyk-table__wrapper no-innner-right-borders',
  },
};


<Table 
  value={config}
  onChange={
    (message, data, tableApi) => {
      console.log({message, data, tableApi})
    }
  }
  noDataMessage="Hello World !"
/>
```


## Advanced Usage

### Table Api

You access the table api directly to `get` and `set` table state by accessing the third arg passed to `onChange`

- `api.getState` 
To get current table state

- `api.setState`
To get current state of table

### FAQ's

#### 1. Can I attach an event to only one specific cell in the table 

Yes, you can add events or custom styles to a specific cell using `events` and `styling` for the cell. 

Syntax
```js static
value.rows[index][col_id].events = {
  // your events
  onClick: () => console.log('Cell Clicked');
}
```

```md
Note : Click on `Freemium Policy (A)` in the above interactive table example and check the developer console and rows config `(value.rows[0].values.name)` for code 
```