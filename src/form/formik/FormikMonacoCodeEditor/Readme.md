```js
import {Formik, Field} from 'formik';
import FormikMonacoCodeEditor from './index';

<Formik initialValues={{a: 3}}>
<Field
  component={FormikMonacoCodeEditor}
  label="Standard code editor"
  height={ "200px" }
  name="test"
  language="json"
  width="100%"
  language="json"
/>
</Formik>
```