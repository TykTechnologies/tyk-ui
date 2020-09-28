import React, {
  Component, createContext, createRef,
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Button from '../../../components/Button';

const DropdownContext = createContext();

export default class Dropdown extends Component {
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

  static propTypes = {
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
    btnTitle: PropTypes.string,
    customBtnTitle: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.element,
      PropTypes.string,
    ]),
    btnGroup: PropTypes.bool,
    className: PropTypes.string,
    display: PropTypes.string,
    hasCustomContent: PropTypes.bool,
    label: PropTypes.string,
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
  };

  static defaultProps = {
    closeOnSelect: false,
    showDropdownIcon: true,
    showTriggerButton: true,
    showCheckmark: true,
    open: false,
  };

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
    this.openDropdown = this.openDropdown.bind(this);
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
      this.openDropdown();
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

    const { scrollTop } = document.documentElement;
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

    if (Dropdown.isElemInRightView(el, dropdownWidth)) {
      customLeft = left;
    } else {
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
    } = this.props;
    let cssClasses = ['tyk-dropdown'];

    cssClasses.push(`theme-${btnTheme || 'default'}`);

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
    } = this.props;
    let cssClasses = ['tyk-dropdown-menu', 'tyk-dropdown'];

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

    if (!stopButtonTextChange && selectedItemProps && selectedItemProps.title) {
      return selectedItemProps.title;
    }

    return btnTitle;
  }

  openDropdown() {
    const {
      opened,
    } = this.state;
    if (opened) {
      this.setState({
        opened: false,
      });

      return;
    }

    this.setState({
      opened: true,
    });
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

  handleClickOutside(event) {
    if (
      this.dropdownListRef.current && !this.dropdownListRef.current.contains(event.target)
      && this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)
    ) {
      this.closeDropdown();
    }
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
                theme={btnTheme || 'default'}
                onClick={this.openDropdown}
                iconType={showDropdownIcon ? 'chevron-down' : null}
                iconPosition="right"
                size={btnSize || 'md'}
                type="button"
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

export { DropdownContext };
