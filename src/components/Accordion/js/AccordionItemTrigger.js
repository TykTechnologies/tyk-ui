import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';
import AccordionItemContext from './AccordionItemContext';

function ItemTrigger(props) {
  const { wrap } = props;
  const {
    collapsed,
    disabled,
    toggleChange,
  } = useContext(AccordionItemContext);

  const iconType = collapsed ? 'chevron-down' : 'chevron-up';
  const classes = [
    'tyk-accordion__trigger',
    disabled && 'tyk-accordion__trigger--disabled',
  ].filter(Boolean).join(' ');
  const trigger = (
    <button
      className={classes}
      onClick={toggleChange}
      type="button"
    >
      <Icon className="collapsable__arrow" type={iconType} />
    </button>
  );

  return wrap
    ? <div className="tyk-accordion__trigger-wrapper">{trigger}</div>
    : trigger;
}

ItemTrigger.propTypes = {
  wrap: PropTypes.bool,
};

export default ItemTrigger;
