import wrapper from '../../../utils/formik';
import Checkbox from '../../components/Checkbox';

export default wrapper(Checkbox, {
  getOnChangeProps: (value) => ({
    checked: value,
  }),
});
