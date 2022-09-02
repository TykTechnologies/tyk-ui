import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Collapsible from '../../Collapsible';
import { PortalContext } from '../panel-context';

function PanelBody({
  children,
  noPadding,
  className,
  ...rest
}) {
  const getCssClasses = useCallback(
    () => [
      'tyk-panel__body',
      className,
      noPadding && 'no-padding',
    ].filter(Boolean).join(' '),
    [className, noPadding],
  );

  return (
    <PortalContext.Consumer>
      {
        (portalContext) => (
          portalContext.collapsable
            ? (
              <Collapsible
                {...rest}
                collapsed={portalContext.collapsed}
                className={getCssClasses()}
              >
                { children }
              </Collapsible>
            )
            : (
              <div
                {...rest}
                className={getCssClasses()}
              >
                { children }
              </div>
            )
        )
      }
    </PortalContext.Consumer>
  );
}

PanelBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  noPadding: PropTypes.bool,
  className: PropTypes.string,
};

export default PanelBody;
