import React, { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import URLPart from "./URLPart";
import "./url-builder.css";

const DEFAULT_OPTIONS = {
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  hosts: [],
  listenPaths: [],
  endpoints: [],
  paths: [],
};

const PLACEHOLDERS = {
  method: "Select Method",
  host: "Enter API URL",
  listenPath: "Enter API version or base path",
  endpoint: "Enter endpoint or resource path",
  path: "Enter ID or parameter",
};

const URLBuilder = ({
  initialValue = {},
  options = {},
  onChange,
  disabled = false,
  error,
}) => {
  const mergedOptions = useMemo(
    () => ({
      methods: options.methods || DEFAULT_OPTIONS.methods,
      hosts: options.hosts || DEFAULT_OPTIONS.hosts,
      listenPaths: options.listenPaths || DEFAULT_OPTIONS.listenPaths,
      endpoints: options.endpoints || DEFAULT_OPTIONS.endpoints,
      paths: options.paths || DEFAULT_OPTIONS.paths,
    }),
    [options]
  );

  const [selectedParts, setSelectedParts] = useState({
    method: initialValue.method || "",
    host: initialValue.host || "",
    listenPath: initialValue.listenPath || "",
    endpoint: initialValue.endpoint || "",
    path: initialValue.path || "",
  });

  const [focusedPart, setFocusedPart] = useState(null);
  const [editingPart, setEditingPart] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && editingPart) {
      inputRef.current.focus();
    }
  }, [editingPart]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedParts);
    }
  }, [selectedParts, onChange]);

  const handleEdit = (e, type) => {
    e.stopPropagation();
    const value = e.target.value;
    setSelectedParts((prev) => ({
      ...prev,
      [type]: type === "path" ? value.replace(/^\//, "") : value,
    }));
  };

  const startEditing = (e, type) => {
    if (disabled) return;

    e.stopPropagation();
    setEditingPart(type);
    setFocusedPart(null);
  };

  const handlePartClick = (type, e) => {
    if (disabled) return;
    e.stopPropagation();

    if (editingPart === type) {
      return;
    }

    setFocusedPart(type);
    setEditingPart(null);
  };

  const finishEditing = () => {
    setEditingPart(null);
  };

  const handlePartChange = (part, value) => {
    const processedValue = part === "path" ? value.replace(/^\//, "") : value;
    setSelectedParts((prev) => ({
      ...prev,
      [part]: processedValue,
    }));
    setFocusedPart(null);
    setEditingPart(null);
  };

  const clearSelection = (e, type) => {
    if (disabled) return;
    e.stopPropagation();
    setSelectedParts((prev) => ({
      ...prev,
      [type]: "",
    }));
  };

  const urlParts = useMemo(
    () => [
      {
        type: "method",
        value: selectedParts.method,
        options: mergedOptions.methods,
      },
      { type: "host", value: selectedParts.host, options: mergedOptions.hosts },
      {
        type: "listenPath",
        value: selectedParts.listenPath,
        options: mergedOptions.listenPaths,
      },
      {
        type: "endpoint",
        value: selectedParts.endpoint,
        options: mergedOptions.endpoints,
      },
      { type: "path", value: selectedParts.path, options: mergedOptions.paths },
    ],
    [selectedParts, mergedOptions]
  );

  return (
    <div
      className="url-builder"
      onClick={() => {
        setFocusedPart(null);
        setEditingPart(null);
      }}
    >
      <div
        className={`url-builder__container ${
          error ? "url-builder__container--error" : ""
        }`}
      >
        <div className="url-builder__parts">
          {urlParts.map(({ type, value, options }) => (
            <URLPart
              key={type}
              type={type}
              value={value}
              options={options}
              isEditing={editingPart === type}
              isFocused={focusedPart === type}
              isDisabled={disabled}
              onEdit={handleEdit}
              onChange={handlePartChange}
              onClear={clearSelection}
              onPartClick={handlePartClick}
              onStartEditing={startEditing}
              onFinishEditing={finishEditing}
              inputRef={inputRef}
              placeholder={PLACEHOLDERS[type]}
            />
          ))}
        </div>
      </div>
      {error && <div className="url-builder__error">{error}</div>}
    </div>
  );
};

URLBuilder.propTypes = {
  initialValue: PropTypes.shape({
    method: PropTypes.string,
    host: PropTypes.string,
    listenPath: PropTypes.string,
    endpoint: PropTypes.string,
    path: PropTypes.string,
  }),
  options: PropTypes.shape({
    methods: PropTypes.arrayOf(PropTypes.string),
    hosts: PropTypes.arrayOf(PropTypes.string),
    listenPaths: PropTypes.arrayOf(PropTypes.string),
    endpoints: PropTypes.arrayOf(PropTypes.string),
    paths: PropTypes.arrayOf(PropTypes.string),
  }),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};

URLBuilder.defaultProps = {
  initialValue: {},
  options: {},
  onChange: null,
  disabled: false,
  error: null,
};

export default React.memo(URLBuilder);
