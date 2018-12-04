import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Collapsible } from '../../Collapsible';
import { PortalContext } from './Panel';

export default class PanelBody extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string
    ]),
    noPadding: PropTypes.bool,
  };

  getCssClasses() {
    const { noPadding } = this.props;
    let cssClasses = ['tyk-panel__body'];

    if(noPadding) {
      cssClasses.push('no-padding');
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <PortalContext.Consumer>
      {
        (portalContext) => (
          portalContext.collapsable
            ? <Collapsible
                collapsed={ portalContext.collapsed }
                className={ this.getCssClasses() }
              >
                { this.props.children }
              </Collapsible>
            : <div
                className={ this.getCssClasses() }
              >
                { this.props.children }
              </div>
        )
      }
      </PortalContext.Consumer>
    );
  }
}
