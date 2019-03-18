import React from 'react';
import PropTypes from 'prop-types';

const PanelFooter = (props) => {
  const { children } = props;
  return (
    <div className="tyk-panel__footer">
      { children }
    </div>
  );
};

PanelFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default PanelFooter;
