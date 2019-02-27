import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class NavBar extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    left: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
    ]),
    right: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
    ]),
  }

  render() {
    return (
      <section className="tyk-nav-bar">
        <div className="tyk-nav-bar__wrapper">
          {
            this.props.title
              ? <h1>{ this.props.title }</h1>
              : ''
          }
          <div className="tyk-nav-bar__container">
            {
              this.props.left
                ? <div className="tyk-nav-bar__left">{ this.props.left }</div>
                : ''
            }
            {
              this.props.right
                ? <div className="tyk-nav-bar__right">{ this.props.right }</div>
                : ''
            }
          </div>
        </div>
        { this.props.children }
      </section>
    );
  }
}
