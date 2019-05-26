import React, { Fragment } from 'react';
import ToastCreator from './js/ToastCreator';

const toast = new ToastCreator();

const TestToast = () => (
  <Fragment>
    <button type="button" onClick={() => { toast.notify('success', { theme: 'success' }); }}>CLICK Success</button>
    <button type="button" onClick={() => { toast.notify('danger', { theme: 'danger' }); }}>CLICK danger</button>
  </Fragment>
);

export default TestToast;

export { toast };
