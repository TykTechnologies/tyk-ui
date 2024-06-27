import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/Button';
import ButtonGroup from '../../../components/ButtonGroup';

function DropdownTrigger({
  title,
  theme = 'primary',
  splitTrigger,
  toggle,
  onTriggerClick,
  value,
}, ref) {
  return (
    !splitTrigger ? (
      <Button
        className="dropdown__trigger"
        iconType="chevron-down"
        iconPosition="right"
        theme={theme}
        ref={ref}
        onClick={toggle}
      >
        {title}
      </Button>
    ) : (
      <ButtonGroup ref={ref}>
        <Button
          theme={theme}
          {...onTriggerClick && { onClick: () => onTriggerClick(value) }}
        >
          {title}
        </Button>
        <Button
          className="dropdown__trigger"
          iconType="chevron-down"
          iconPosition="right"
          theme={theme}
          onClick={toggle}
          iconOnly
        />
      </ButtonGroup>
    )
  );
}

DropdownTrigger.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.string,
  splitTrigger: PropTypes.bool,
  toggle: PropTypes.func,
  dropdownRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
  onTriggerClick: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default forwardRef(DropdownTrigger);
