import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../../Icon';
import { PortalContext } from './Panel';

export default class PanelHeader extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string
    ]).isRequired
  }

  getCssClasses(props) {
    const { className } = this.props;
    let cssClasses = ['panel__header'];

    if(props.collapsable) {
      cssClasses.push('collapsable');
    }

    if(className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <PortalContext.Consumer>
        {
          (portalContext) => {
            let HeaderTag = portalContext.theme === 'blank' ? 'h4' : 'div';
            let iconType = portalContext.collapsed ? 'chevron-up' : 'chevron-down';

            return (
                <HeaderTag
                  className={ this.getCssClasses(portalContext) }
                  onClick={ portalContext.collapsable ? portalContext.onToggle : undefined }
                >
                  { this.props.children }
                  {
                    portalContext.collapsable
                      ? <Icon className="collapsable__arrow" type={ iconType } />
                      : null
                  }
                </HeaderTag>
              );
            }
          }
      </PortalContext.Consumer>
    );
  }
}
