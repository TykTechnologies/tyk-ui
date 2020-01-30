import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../Icon';
import Pill from '../../Pill';

function Value(props) {
  const {
    value,
    max,
    tags,
    tagSeparators,
    placeholder,
    disabled,
    renderValue,
    valueOverflow,
    focus,
    onMessage: sendMessage,
  } = props;
  const INPUT_MIN_WIDTH = 60;
  const inputRef = useRef(null);
  const dummyElementRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [inputWidth, setInputWidth] = useState(`${INPUT_MIN_WIDTH + 10}px`);

  function entryFieldOnChange(val) {
    if (tagSeparators.some(ts => val.slice(-1) === ts)) return;
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

  function textValue(val) {
    return (
      <span
        className={`tyk-combobox2__text-value overflow-${valueOverflow}`}
        title={valueOverflow === 'single' ? val : undefined}
        role="button"
        tabIndex="0"
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
        <button type="button" onClick={() => sendMessage('tag.remove', v.id)}>
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
              onChange={e => entryFieldOnChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault();
                entryFieldOnKeyDown(e.key, e.target.value);
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

  if (tags) return getTags();
  if (renderValue) {
    return value.length === 0 ? textValue(placeholder) : value.map(renderCustomValue);
  }
  return textValue(
    value.length === 0
      ? placeholder
      : value.map(v => v.name).join(', '),
  );
}

export default Value;
