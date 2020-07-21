import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../Icon';
import { PortalContext } from './Panel';

export default class PanelHeader extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string,
    ]).isRequired,
    className: PropTypes.string,
  }

  getCssClasses(props) {
    const { className } = this.props;
    let cssClasses = ['tyk-panel__header'];

    if (props.collapsable) {
      cssClasses.push('collapsable');
    }

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    const {
      children,
    } = this.props;

    return (
      <PortalContext.Consumer>
        {
          (portalContext) => {
            const HeaderTag = portalContext.theme === 'blank' ? 'h3' : 'div';
            const iconType = portalContext.collapsed ? 'chevron-down' : 'chevron-up';

            return (
              <HeaderTag
                className={this.getCssClasses(portalContext)}
                onClick={portalContext.collapsable ? portalContext.onToggle : undefined}
              >
                { children }
                {
                  portalContext.collapsable
                    ? <div className={`collapsable__arrow-${portalContext.collapsibleIconPosition}`}><Icon type={iconType} /></div>
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
