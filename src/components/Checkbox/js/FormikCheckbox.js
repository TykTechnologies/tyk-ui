import wrapper from '../../../common/js/utils/formik';
import Checkbox from './Checkbox';

export default wrapper(Checkbox, {
  getOnChangeProps: value => ({ checked: value }),
  getCompProps: field => ({ checked: field.value }),
});
