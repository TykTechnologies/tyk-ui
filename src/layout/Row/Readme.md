Example of a Row with 3 columns
```jsx
import React from 'react';
import Column from '../Column';
import Row from './index';

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
    size="md-4 lg-4"
  >
    <div style={columnStyle}>
      1
    </div>
  </Column>
  <Column
    size="md-4 lg-4"
  >
    <div style={columnStyle}>
      2
    </div>
  </Column>
  <Column
    size="md-4 lg-4"
  >
    <div style={columnStyle}>
      3
    </div>
  </Column>
</Row>
```

Row with no distance between columns
```jsx
import React from 'react';
import Column from '../Column';
import Row from './index';

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
  nogutters
>
  <Column
    size="md-4 lg-4"
  >
    <div style={columnStyle}>
      1
    </div>
  </Column>
  <Column
    size="md-4 lg-4"
  >
    <div style={columnStyle}>
      2
    </div>
  </Column>
  <Column
    size="md-4 lg-4"
  >
    <div style={columnStyle}>
      3
    </div>
  </Column>
</Row>
```