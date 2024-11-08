import React, {
  Component, createRef,
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import DropdownItem from './js/DropdownItem';
import Button from '../../../components/Button';
import { DropdownContext } from './dropdown-context';

class Dropdown extends Component {
  static isElemInRightView(el, dropdownWidth) {
    const windowWidth = window.innerWidth;
    const offset = el.getBoundingClientRect();
    const elemRight = offset.left + dropdownWidth;

    return elemRight <= windowWidth;
  }

  static isElemInBottomView(el, dropdownHeight) {
    const windowHeight = window.innerHeight;
    const offset = el.getBoundingClientRect();
    const elHeight = el.clientHeight;
    const elemBottom = offset.top + elHeight + dropdownHeight;

    return elemBottom <= windowHeight;
  }

  constructor(props) {
    super(props);

    const {
      selectedItem,
      open,
    } = this.props;

    this.state = {
      opened: open,
      selectedItem: selectedItem || null,
    };

    this.dropdownRef = createRef();
    this.dropdownListRef = createRef();
    this.dropdownButtonRef = createRef();
    this.onSelectItem = this.onSelectItem.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);

    if (this.dropdownListRef.current) {
      this.getStyles();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      open,
    } = this.props;
    const {
      opened,
    } = this.state;

    if (this.dropdownListRef.current) {
      this.getStyles();
    }

    if (
      !prevProps.open
      && open === true
      && !opened
    ) {
      this.toggleDropdown();
    }

    if (
      prevProps.open
      && open === false
      && opened
    ) {
      this.closeDropdown();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (
      this.dropdownListRef.current && !this.dropdownListRef.current.contains(event.target)
      && this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)
    ) {
      this.closeDropdown();
    }
  }

  onSelectItem(itemId, itemProps) {
    const { closeOnSelect, onSelect } = this.props;
    const changes = {
      selectedItem: itemId,
      selectedItemProps: itemProps,
    };

    if (closeOnSelect) {
      changes.opened = false;
    }

    this.setState(changes);

    if (onSelect && typeof onSelect === 'function') {
      onSelect(itemId);
    }
  }

  getStyles() {
    const {
      display,
      position,
      offset,
    } = this.props;

    const dropdownEl = this.dropdownListRef.current;

    if (offset) {
      dropdownEl.style.top = `${offset.top}`;
      dropdownEl.style.left = `${offset.left}`;
      return;
    }

    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop,
      window.scrollY,
    );
    const el = this.dropdownRef.current;
    const elHeight = el.clientHeight;
    const dropdownHeight = dropdownEl ? dropdownEl.clientHeight : 0;
    const dropdownWidth = dropdownEl ? dropdownEl.clientWidth : 0;
    const offsetPosition = el.getBoundingClientRect();
    const { left, top } = offsetPosition;
    let customTop = 0;
    let customLeft = left;

    // calculate top position, depending on the element position on the page
    if (Dropdown.isElemInBottomView(el, dropdownHeight)) {
      customTop = top + scrollTop + elHeight;
    } else {
      customTop = top + scrollTop - dropdownHeight - 5;
    }

    if (!Dropdown.isElemInRightView(el, dropdownWidth)) {
      customLeft = left + el.clientWidth - dropdownWidth;
    }

    if (position !== 'relative') {
      dropdownEl.style.top = `${customTop}px`;
      if (display !== 'block') {
        dropdownEl.style.left = `${customLeft}px`;
      }
    }
    if (display !== 'block') {
      dropdownEl.style.minWidth = `${this.dropdownButtonRef.current.clientWidth}px`;
    }
  }

  getWrapperCssClasses() {
    const {
      btnGroup,
      btnGroupSize,
      className,
      btnTheme,
      wrapperClassName = '',
    } = this.props;
    let cssClasses = [wrapperClassName, 'tyk-dropdown'];

    cssClasses.push(`theme-${btnTheme || 'secondary'}`);

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    if (btnGroup) {
      cssClasses.push('tyk-button-group');
      cssClasses.push(btnGroupSize ? `tyk-button-group--${btnGroupSize}` : 'tyk-button-group--md');
    }

    return cssClasses.join(' ');
  }

  getCssClasses() {
    const {
      opened,
    } = this.state;
    const {
      hasCustomContent,
      display,
      listclassnames,
      position,
      maxHeight,
    } = this.props;
    let cssClasses = ['tyk-dropdown-menu', 'tyk-dropdown'];

    if (maxHeight) {
      cssClasses.push('tyk-dropdown--scrollable');
    }

    if (opened) {
      cssClasses.push('opened');
    }

    if (listclassnames) {
      cssClasses = cssClasses.concat(listclassnames.split(' '));
    }

    if (display) {
      cssClasses.push('tyk-dropdown--block');
    }

    if (hasCustomContent) {
      cssClasses.push('tyk-dropdown--custom');
    }

    if (position === 'relative') {
      cssClasses.push('tyk-dropdown--relative');
    }

    return cssClasses.join(' ');
  }

  getBtnTitle() {
    const { btnTitle, stopButtonTextChange } = this.props;
    const { selectedItemProps } = this.state;

    if (!stopButtonTextChange && selectedItemProps?.title) {
      return selectedItemProps.title;
    }

    return btnTitle;
  }

  closeDropdown() {
    const { onClose } = this.props;

    this.setState({
      opened: false,
    }, () => {
      if (onClose) {
        onClose();
      }
    });
  }

  toggleDropdown() {
    const {
      opened,
    } = this.state;
    if (opened) {
      this.closeDropdown();

      return;
    }

    this.setState({
      opened: true,
    });
  }

  render() {
    const {
      appendTo,
      btnClassName,
      btnSize,
      customBtnTitle,
      hasCustomContent,
      btnTheme,
      children,
      label,
      showDropdownIcon,
      showTriggerButton,
      showCheckmark,
      disabled = false,
      maxHeight,
    } = this.props;
    const {
      selectedItem,
      opened,
    } = this.state;
    const DropdownWrapperTag = hasCustomContent ? 'div' : 'ul';
    return (
      <div
        className={this.getWrapperCssClasses()}
        ref={this.dropdownRef}
      >
        {
          label
            ? (
              <label className="font-family-medium">
                {label}
              </label>
            )
            : null
        }
        {
          showTriggerButton
            ? (
              <Button
                className={`tyk-dropdown__trigger ${(opened) ? 'tyk-dropdown__trigger--opened ' : ' '} ${btnClassName}`}
                theme={btnTheme || 'secondary'}
                onClick={this.toggleDropdown}
                iconType={showDropdownIcon ? 'chevron-down' : null}
                iconPosition="right"
                size={btnSize || 'md'}
                type="button"
                disabled={disabled}
                ref={this.dropdownButtonRef}
              >
                { customBtnTitle || this.getBtnTitle() }
              </Button>
            )
            : null
        }
        {
          opened
            ? ReactDOM.createPortal(
              <DropdownContext.Provider
                value={{
                  onSelectItem: this.onSelectItem,
                  selectedItem,
                  showCheckmark,
                }}
              >
                {
                  opened
                    ? (
                      <DropdownWrapperTag
                        className={this.getCssClasses()}
                        ref={this.dropdownListRef}
                        {
                          ...maxHeight && {
                            style: {
                              maxHeight,
                            },
                          }
                        }
                      >
                        {
                          (typeof children === 'function')
                            ? children({
                              closeDropdown: this.closeDropdown.bind(this),
                            })
                            : children
                        }
                      </DropdownWrapperTag>
                    )
                    : null
                }
              </DropdownContext.Provider>,
              document.querySelector(appendTo || 'body'),
            )
            : null
        }
      </div>
    );
  }
}

Dropdown.propTypes = {
  appendTo: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
    PropTypes.func,
  ]),
  closeOnSelect: PropTypes.bool,
  btnClassName: PropTypes.string,
  btnSize: PropTypes.string,
  btnGroupSize: PropTypes.string,
  btnTheme: PropTypes.string,
  btnTitle: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  customBtnTitle: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  btnGroup: PropTypes.bool,
  className: PropTypes.string,
  display: PropTypes.string,
  disabled: PropTypes.bool,
  hasCustomContent: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),
  listclassnames: PropTypes.string,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  open: PropTypes.bool,
  offset: PropTypes.instanceOf(Object),
  position: PropTypes.string,
  selectedItem: PropTypes.string,
  showDropdownIcon: PropTypes.bool,
  stopButtonTextChange: PropTypes.bool,
  showTriggerButton: PropTypes.bool,
  showCheckmark: PropTypes.bool,
  maxHeight: PropTypes.string,
  wrapperClassName: PropTypes.string,
};

Dropdown.defaultProps = {
  closeOnSelect: false,
  showDropdownIcon: true,
  showTriggerButton: true,
  showCheckmark: true,
  open: false,
};

Dropdown.Item = DropdownItem;

export default Dropdown;
