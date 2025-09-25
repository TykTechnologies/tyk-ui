import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";

const URLPartActions = ({
  type,
  isEditing,
  isPlaceholder,
  isDisabled,
  onEdit,
  onClear,
}) => {
  if (isEditing || isPlaceholder || isDisabled || type === "method") {
    return null;
  }

  return (
    <div className="url-builder__actions">
      <button
        type="button"
        className="url-builder__button"
        onClick={(e) => onEdit(e, type)}
        aria-label="Edit"
      >
        <Icon type="pencil" weight="light" />
      </button>
      <button
        type="button"
        className="url-builder__button url-builder__button--clear"
        onClick={(e) => onClear(e, type)}
        aria-label="Clear"
      >
        <Icon type="circle-xmark" weight="light" />
      </button>
    </div>
  );
};

URLPartActions.propTypes = {
  type: PropTypes.string.isRequired,
  isEditing: PropTypes.bool,
  isPlaceholder: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default URLPartActions;
