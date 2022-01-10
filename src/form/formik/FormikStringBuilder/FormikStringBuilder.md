```js
import { Formik, Field } from 'formik';

<Formik
  initialValues={{
    url: 'http://{{.arguments.category}}.api.com/graphql'
  }}
  >
  {
    ((v) => {
      // console.log({v})
      return (
          <Field
            // debounce={2000}
            component={FormikStringBuilder}
            label="URL"
            name="url"
            allowSearch
            placeholder="http://httpbin.org"
            dropdownTriggerKey="{"
            theme="default rounded-corners"
            options={[
            {
              "id": "{{.arguments.category}}",
              "name": "category",
              "desc": "Argument category",
              "className": "data_source_argument"
            },
          ]}
        />
      )
    })
  }
</Formik>
```