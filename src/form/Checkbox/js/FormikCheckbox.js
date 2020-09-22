import wrapper from '../../../utils/formik';
import Checkbox from './Checkbox';

export default wrapper(Checkbox, {
  getOnChangeProps: value => ({ checked: value }),
});
