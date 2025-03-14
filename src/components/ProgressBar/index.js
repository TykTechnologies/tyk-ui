import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({
  value,
  max = 100,
  theme = "primary",
  size = "md",
  label,
  showPercentage = false,
  percentagePosition = "bottom",
  formatPercentage,
  showBottomLabel,
  formatBottomLabel,
  className,
  id,
  ...rest
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  const percentageValue = Math.round(percentage);

  const getCssClasses = () =>
    [
      "tyk-progress-bar",
      className,
      `tyk-progress-bar--${size}`,
      `tyk-progress-bar--${theme}`,
    ]
      .filter(Boolean)
      .join(" ");

  const defaultPercentageFormatter = (value) => `${value}%`;

  const defaultBottomLabelFormatter = (value) => `${value}%`;

  const getPercentageText = () => {
    if (typeof formatPercentage === "function") {
      return formatPercentage(percentageValue);
    }
    return defaultPercentageFormatter(percentageValue);
  };

  const getBottomLabelText = () => {
    if (typeof formatBottomLabel === "function") {
      return formatBottomLabel(percentageValue);
    }
    return defaultBottomLabelFormatter(percentageValue);
  };

  const renderPercentage = () => {
    if (!showPercentage) return null;

    return (
      <div
        className={`tyk-progress-bar__percentage tyk-progress-bar__percentage--${percentagePosition}`}
      >
        {getPercentageText()}
      </div>
    );
  };

  return (
    <div className={getCssClasses()} id={id} {...rest}>
      {label && <div className="tyk-progress-bar__label">{label}</div>}
      {percentagePosition === "top" && renderPercentage()}
      <div className="tyk-progress-bar__container">
        <div
          className="tyk-progress-bar__progress"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax={max}
        >
          {percentagePosition === "inside" && renderPercentage()}
        </div>
      </div>
      {percentagePosition === "bottom" && renderPercentage()}
      {showBottomLabel && (
        <div className="tyk-progress-bar__bottom-label">
          {getBottomLabelText()}
        </div>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  /**
   * Current value of the progress bar
   */
  value: PropTypes.number.isRequired,
  /**
   * Maximum value of the progress bar
   */
  max: PropTypes.number,
  /**
   * Theme of the progress bar (primary, secondary, danger, success, warning, info)
   */
  theme: PropTypes.string,
  /**
   * Size of the progress bar (sm, md, lg)
   */
  size: PropTypes.string,
  /**
   * Optional label to display above the progress bar
   */
  label: PropTypes.string,
  /**
   * Whether to show the percentage text
   */
  showPercentage: PropTypes.bool,
  /**
   * Position of the percentage text (top, bottom, inside)
   */
  percentagePosition: PropTypes.oneOf(["top", "bottom", "inside"]),
  /**
   * Function to format the percentage text. Receives the percentage value and should return a string.
   * Example: (value) => `${value}% complete`
   */
  formatPercentage: PropTypes.func,
  /**
   * Display a label under the progress bar
   */
  showBottomLabel: PropTypes.bool,
  /**
   * Function to format the bottom label text. Receives the percentage value and should return a string.
   * Example: (value) => `${value}% compliant`
   */
  formatBottomLabel: PropTypes.func,
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
  /**
   * ID attribute
   */
  id: PropTypes.string,
};

export default ProgressBar;
