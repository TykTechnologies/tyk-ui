```js
const Button = require('../Button').Button;
const Row = require('../Row').Row;
const Column = require('../Column').Column;
const Dropdown = require('../Dropdown').Dropdown;
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
    onSearch={ (value) => { console.log(value.toJS()); } }
  >
    <Table.Search>
      <div className="inline-form-wrapper">
        <div className="inline-form">
          <Field
            component={
              FieldInput
            }
            name="q"
            placeholder="Search by value"
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
          <th>
            <Field
              component={
                Dropdown
              }
              name="sort"
              btnTitle="Sort"
              stopButtonTextChange={ true }
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
            </Field>
          </th>
          <th className="right-align">Column 4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td className="right-align">
            <Dropdown
              btnGroup={ true }
              btnTheme="list"
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
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td className="right-align">
            <Dropdown
              btnGroup={ true }
              btnTheme="list"
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
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td className="right-align">
            <Dropdown
              btnGroup={ true }
              btnTheme="list"
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
          </td>
        </tr>
      </tbody>
    </table>
  </Table>
</Provider>
```
