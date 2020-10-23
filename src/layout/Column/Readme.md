Example of a column that has size 6 (which is half of Row width)
```jsx
import React from 'react';
import Column from './index';
import Row from '../Row';

const containerStyle = {
  backgroundColor: '#F0F0F0',
};
const rowStyle = {
  marginTop: '20px',
};
const columnStyle = {
  backgroundColor: '#ccc',
  padding: '10px',
  width: '100%',
};

<Row
  style={rowStyle}
>
  <Column
    size="md-6 lg-6"
  >
    <div style={columnStyle}>
      Content of a column
    </div>
  </Column>
</Row>

```
Column that has size 6 and a left gap of 3
```jsx
import React from 'react';
import Column from './index';
import Row from '../Row';

const containerStyle = {
  backgroundColor: '#F0F0F0',
};
const rowStyle = {
  marginTop: '20px',
};
const columnStyle = {
  backgroundColor: '#ccc',
  padding: '10px',
  width: '100%',
};

<Row
  style={rowStyle}
>
  <Column
    size="offset-md-3 offset-lg-3 md-6 lg-6"
  >
    <div style={columnStyle}>
      Content of a column
    </div>
  </Column>
</Row>

```