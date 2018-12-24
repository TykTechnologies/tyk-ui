```js
const Button = require('../Button').Button;
const Row = require('../Row').Row;
const Column = require('../Column').Column;
const Field = require('redux-form/immutable').Field;
const FieldInput = require('../Input').FieldInput;
const Provider = require('react-redux').Provider;
const createStore = require('redux').createStore;

function reducer(state = {
  q: ''
}, action) {
  return state
}

const store = createStore(reducer);
<Provider store={ store }>
  <Table
    form="apiActivitySearch"
    initialValues={{
      q: ''
    }}
    searchOnChange={ true }
    pages={ 10 }
    onSearch={ (value) => { console.log(value); } }
  >
    <Table.Search>
      <div className="inline-form-wrapper">
        <div className="inline-form">
          <Field
            component={
              FieldInput
            }
            name="q"
            label="Search by value"
          />
        </div>
        <Button
          type="submit"
          theme="default"
        >
          Search
        </Button>
      </div>
    </Table.Search>
    <table className="tyk-table">
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
        </tr>
      </tbody>
    </table>
  </Table>
</Provider>
```
