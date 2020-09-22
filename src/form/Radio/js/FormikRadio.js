import wrapper from '../../../utils/formik';
import Radio from './Radio';

export default wrapper(Radio, {
  getOnChangeProps: (value, field, form, properties) => ({
    checked: value === properties.value,
    value: properties.value,
  }),
});
