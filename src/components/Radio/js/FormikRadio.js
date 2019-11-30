import wrapper from '../../../common/js/utils/formik';
import Radio from './Radio';

export default wrapper(Radio, {
  getOnChangeProps: (value, field, form, properties) => ({ checked: value === properties.value }),
  getCompProps: (field, form, properties) => ({ checked: field.value === properties.value }),
});
