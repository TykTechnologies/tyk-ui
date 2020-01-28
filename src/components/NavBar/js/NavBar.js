import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class NavBar extends PureComponent {
  static propTypes = {
    align: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.element,
      PropTypes.string,
    ]),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    left: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
    ]),
    right: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
    ]),
    withTabs: PropTypes.bool,
  }

  render() {
    const {
      align = 'center',
      children,
      left,
      right,
      title,
      subtitle,
      withTabs,
    } = this.props;

    return (
      <section className={`tyk-nav-bar  ${withTabs ? 'tyk-nav-bar__with-tabs' : ''}`}>
        <div className={`tyk-nav-bar__wrapper tyk-nav-bar--align-${align}`}>
          {
            title
              ? (
                <div>
                  <h1>{ title }</h1>
                  {
                    subtitle
                      ? <h4>{subtitle}</h4>
                      : null
                  }
                </div>
              )
              : null
          }
          <div className="tyk-nav-bar__container">
            {
              left
                ? <div className="tyk-nav-bar__left">{ left }</div>
                : ''
            }
            {
              right
                ? <div className="tyk-nav-bar__right">{ right }</div>
                : ''
            }
          </div>
        </div>
        { children }
      </section>
    );
  }
}
