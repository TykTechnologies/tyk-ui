import wrapper from '../../../utils/formik';
import EditableList from './EditableList';

export default wrapper(EditableList, {
  getOnChangeProps: value => ({ value: value || [] }),
});
