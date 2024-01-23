import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/Button';
import ButtonGroup from '../../../components/ButtonGroup';

const DropdownTrigger = forwardRef(({
  title,
  theme = 'primary',
  splitTrigger,
  toggle,
}, ref) => (
  !splitTrigger ? (
    <Button
      className="dropdown__trigger"
      iconType="arrowdown"
      iconFamily="tykon"
      iconPosition="right"
      theme={theme}
      ref={ref}
      onClick={toggle}
    >
      {title}
    </Button>
  ) : (
    <ButtonGroup ref={ref}>
      <Button theme={theme}>{title}</Button>
      <Button
        className="dropdown__trigger"
        iconType="arrowdown"
        iconFamily="tykon"
        iconPosition="right"
        theme={theme}
        onClick={toggle}
        iconOnly
      />
    </ButtonGroup>
  )
));

DropdownTrigger.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.string,
  splitTrigger: PropTypes.bool,
  toggle: PropTypes.func,
  dropdownRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
};

export default DropdownTrigger;
