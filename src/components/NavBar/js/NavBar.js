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
    pre: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
    ]),
    left: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
    ]),
    right: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
    ]),
    withTabs: PropTypes.bool,
    styles: PropTypes.instanceOf(Object),
  }

  render() {
    const {
      align = 'center',
      children,
      left,
      right,
      title,
      pre,
      subtitle,
      withTabs,
      styles,
    } = this.props;

    return (
      <section className={`tyk-nav-bar  ${withTabs ? 'tyk-nav-bar__with-tabs' : ''}`}>
        <div className={`tyk-nav-bar__wrapper tyk-nav-bar--align-${align}`}>
          {
            pre
              ? <div className="tyk-nav-bar__pre">{pre}</div>
              : null
          }
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
              left && <div className={`tyk-nav-bar__left ${styles?.left || ''}`}>{ left }</div>
            }
            {
              right && <div className={`tyk-nav-bar__right ${styles?.right || ''}`}>{ right }</div>
            }
          </div>
        </div>
        { children }
      </section>
    );
  }
}
