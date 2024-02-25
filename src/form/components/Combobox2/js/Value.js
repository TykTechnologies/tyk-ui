import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon';
import Pill from '../../../../components/Pill';

function Value(props) {
  const {
    value,
    max,
    tags,
    tagSeparators,
    addTagOnBlur,
    placeholder,
    disabled,
    renderValue,
    valueOverflow,
    focus,
    onMessage: sendMessage,
    readOnly,
  } = props;
  const INPUT_MIN_WIDTH = 60;
  const inputRef = useRef(null);
  const dummyElementRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [inputWidth, setInputWidth] = useState(`${INPUT_MIN_WIDTH + 10}px`);

  function entryFieldOnChange(val) {
    if (tagSeparators.some((ts) => val.slice(-1) === ts)) return;
    const dummy = dummyElementRef.current;
    dummy.innerHTML = val;
    setInputWidth(`${Math.max(dummy.clientWidth, INPUT_MIN_WIDTH) + 10}px`);
    setInputValue(val);
    sendMessage('tag.input.change', val);
  }

  function entryFieldOnKeyDown(key, val) {
    if (!tags) return;
    if (val === '' && key === 'Backspace' && value.length) {
      sendMessage('tag.remove', value[value.length - 1].id);
      return;
    }
    if (key === 'Enter') {
      sendMessage('tag.input.enter', val);
      entryFieldOnChange('');
      return;
    }
    if (key === 'ArrowUp') {
      sendMessage('tag.input.arrowUp');
      return;
    }
    if (key === 'ArrowDown') {
      sendMessage('tag.input.arrowDown');
      return;
    }
    if (key === 'Escape') {
      sendMessage('tag.input.escape');
      return;
    }
    if (tagSeparators.includes(key)) {
      sendMessage('tag.add', val);
      entryFieldOnChange('');
    }
  }

  function triggerAction() {
    sendMessage('text-value.click');
  }

  function textValue(val, isPlaceholder = false) {
    if (readOnly) return val || '-';

    const classes = [
      'tyk-combobox2__text-value',
      `overflow-${valueOverflow}`,
      isPlaceholder && 'is-placeholder',
    ].filter(Boolean).join(' ');
    return (
      <span
        className={classes}
        title={valueOverflow === 'single' ? val : undefined}
        role="none"
        tabIndex={disabled ? '-1' : '0'}
        onClick={triggerAction}
        onKeyPress={triggerAction}
      >
        {val}
      </span>
    );
  }

  function renderCustomValue(v) {
    const config = {
      tags,
      tagSeparators,
      placeholder,
      disabled,
      renderValue,
      sendMessage,
    };
    return renderValue(v, config);
  }

  function renderTag(v) {
    if (renderValue) return renderCustomValue(v);

    return (
      <Pill
        key={v.id}
        theme="combobox"
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            sendMessage('tag.remove', v.id);
          }}
          aria-label="remove"
        >
          <Icon type="times" />
        </button>
        <span title={v.name}>{ v.name }</span>
      </Pill>
    );
  }

  function getTags() {
    return (
      <>
        {value.map(renderTag)}
        {value.length < max && (
          <>
            <input
              className="tyk-combobox2__entry-field"
              ref={inputRef}
              placeholder={value.length ? '' : placeholder}
              disabled={disabled}
              value={inputValue}
              style={{ width: value.length ? inputWidth : '100%' }}
              onChange={(e) => entryFieldOnChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault();
                entryFieldOnKeyDown(e.key, e.target.value);
              }}
              onFocus={() => sendMessage('tag.input.focus')}
              onBlur={(e) => {
                sendMessage('tag.input.blur', e.target.value);
                if (addTagOnBlur) entryFieldOnChange('');
              }}
            />
            <span
              ref={dummyElementRef}
              style={{
                visbility: 'hidden',
                position: 'absolute',
                top: '-9999px',
              }}
            />
          </>
        )}
      </>
    );
  }

  useEffect(() => {
    if (focus && inputRef.current) inputRef.current.focus();
  }, [focus]);

  if (readOnly) {
    return <div className="tyk-form-control--readonly">{textValue(value.map((v) => v.name).join(', '))}</div>;
  }

  if (tags) return getTags();
  if (renderValue) {
    return value.length === 0 ? textValue(placeholder, true) : value.map(renderCustomValue);
  }
  return value.length === 0
    ? textValue(placeholder, true)
    : textValue(value.map((v) => v.name).join(', '));
}

Value.propTypes = {
  value: PropTypes.instanceOf(Array),
  max: PropTypes.number,
  tags: PropTypes.instanceOf(Array),
  tagSeparators: PropTypes.instanceOf(Array),
  addTagOnBlur: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  renderValue: PropTypes.func,
  valueOverflow: PropTypes.string,
  focus: PropTypes.bool,
  onMessage: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default Value;
