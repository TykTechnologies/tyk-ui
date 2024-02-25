import wrapper from '../../../utils/formik';
import EditableList from '../../components/EditableList';

export default wrapper(EditableList, {
  getOnChangeProps: (value) => ({ value: value || [] }),
});
