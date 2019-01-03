import React, { Component, Fragment, createContext, createRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Button } from '../../Button';

const DropdownContext = createContext();

export default class Dropdown extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string
    ]),
    btnClassName: PropTypes.string,
    btnSize: PropTypes.string,
    btnTheme: PropTypes.string,
    btnTitle: PropTypes.string,
    btnGroup: PropTypes.bool,
    label: PropTypes.string,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
    selectedItem: PropTypes.string,
    stopButtonTextChange: PropTypes.bool
  };

  state = {
    opened: false,
    selectedItem: this.props.selectedItem || null
  };

  constructor(props) {
    super(props);

    this.dropdownRef = createRef();
    this.dropdownListRef = createRef();
    this.dropdownButtonRef = createRef();
    this.onSelectItem = this.onSelectItem.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate() {
    if(this.dropdownListRef.current) {
      this.getStyles();
    }
  }

  handleClickOutside() {
    if (
      this.dropdownListRef.current && !this.dropdownListRef.current.contains(event.target) &&
      this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)
    ) {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    const { onClose } = this.props;

    this.setState({
      opened: false
    }, () => {
      onClose && onClose();
    });
  }

  onSelectItem(itemId, itemProps) {
    const { stopButtonTextChange, onSelect } = this.props;

    this.setState({
      selectedItem: itemId,
      selectedItemProps: itemProps
    });

    if(onSelect && typeof onSelect === 'function') {
      onSelect(itemId);
    }
  }

  isElemInBottomView(el, dropdownHeight) {
    let windowHeight = window.innerHeight;
    let offset = el.getBoundingClientRect();
    let elHeight = el.clientHeight;
    let elemBottom = offset.top + elHeight + dropdownHeight;

    return elemBottom <= windowHeight;
  }

  isElemInRightView(el, dropdownWidth) {
    let windowWidth = window.innerWidth;
    let offset = el.getBoundingClientRect();
    let elemRight = offset.left + dropdownWidth;

    return elemRight <= windowWidth;
  }

  getStyles() {
    let scrollTop = document.documentElement.scrollTop;
    let el = this.dropdownRef.current;
    let elHeight = el.clientHeight;
    let dropdownEl = this.dropdownListRef.current;
    let dropdownHeight = dropdownEl ? dropdownEl.clientHeight : 0;
    let dropdownWidth = dropdownEl ? dropdownEl.clientWidth : 0;
    let offset = el.getBoundingClientRect();
    let left = offset.left;
    let top = 0;

    //calculate top position, depending on the element position on the page
    if(this.isElemInBottomView(el, dropdownHeight)) {
      top = offset.top + scrollTop + elHeight;
    } else {
      top = offset.top + scrollTop - dropdownHeight - 5;
    }

    if(this.isElemInRightView(el, dropdownWidth)) {
      left = offset.left;
    } else {
      left = offset.left + el.clientWidth - dropdownWidth;
    }

    dropdownEl.style.top = top + 'px';
    dropdownEl.style.left = left + 'px';

    let buttonNode = ReactDOM.findDOMNode(this.dropdownButtonRef.current);
    console.log(buttonNode.clientWidth);
    dropdownEl.style.minWidth = buttonNode.clientWidth + 'px';
  }

  openDropdown() {
    if(this.state.opened) {
      this.setState({
        opened: false
      });

      return;
    }

    this.setState({
      opened: true
    });
  }

  getWrapperCssClasses() {
    const { btnGroup, btnGroupSize } = this.props;
    let cssClasses = ['tyk-dropdown'];

    cssClasses.push('theme-' + (this.props.btnTheme || 'default'));

    if(btnGroup) {
      cssClasses.push('tyk-button-group');
      cssClasses.push(btnGroupSize ? 'tyk-button-group--' + btnGroupSize : 'tyk-button-group--md');
    }

    return cssClasses.join(' ');
  }

  getCssClasses() {
    let cssClasses = ['tyk-dropdown-menu', 'tyk-dropdown'];

    if(this.state.opened) {
      cssClasses.push('opened');
    }

    return cssClasses.join(' ');
  }

  getBtnTitle() {
    const { btnTitle, stopButtonTextChange } = this.props;
    const { selectedItemProps } = this.state;

    if(!stopButtonTextChange && selectedItemProps && selectedItemProps.title) {
      return selectedItemProps.title;
    }

    return btnTitle;
  }

  render() {
    const { btnClassName, btnSize, btnTitle, hasCustomContent, btnTheme, label, onSelect } = this.props;
    let DropdownWrapperTag = hasCustomContent ? 'div' : 'ul';

    return (
      <div
        className={ this.getWrapperCssClasses() }
        ref={ this.dropdownRef }
      >
        {
          label
            ? <label className="title-label"> { label }</label>
            : null
        }
        <Button
          className={ btnClassName }
          theme={ btnTheme || 'default'}
          onClick={ this.openDropdown }
          iconType="chevron-down"
          iconPosition="right"
          size={ btnSize || 'md' }
          type="button"
          ref={ this.dropdownButtonRef }
        >
          { this.getBtnTitle() }
        </Button>
        {
          ReactDOM.createPortal(
            <DropdownContext.Provider
              value={{
                onSelectItem: this.onSelectItem,
                selectedItem: this.state.selectedItem
              }}
            >
              {
                this.state.opened
                ? <DropdownWrapperTag
                    className={ this.getCssClasses() }
                    ref={ this.dropdownListRef }
                  >
                    { this.props.children }
                  </DropdownWrapperTag>
                : null
              }
            </DropdownContext.Provider>
            , document.querySelector('body')
          )
        }
      </div>
    );
  }
}

export { DropdownContext };
