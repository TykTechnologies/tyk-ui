import React from "react";
import PropTypes from "prop-types";

const ProgressBar = (props) => {
  const {
    value,
    max,
    theme,
    size,
    label,
    showPercentage,
    percentagePosition,
    percentageText,
    className,
    id,
    ...rest
  } = props;

  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  const getCssClasses = () => {
    const cssClasses = ["tyk-progress-bar"].concat(
      className ? className.split(" ") : []
    );
    const sizeClass = size
      ? `tyk-progress-bar--${size}`
      : "tyk-progress-bar--md";
    const themeClass = theme
      ? `tyk-progress-bar--${theme}`
      : "tyk-progress-bar--primary";

    cssClasses.push(sizeClass);
    cssClasses.push(themeClass);

    return cssClasses.join(" ");
  };

  const renderPercentage = () => {
    if (!showPercentage) return null;

    const percentageValue = Math.round(percentage);
    const text = percentageText
      ? percentageText.replace("{value}", percentageValue)
      : `${percentageValue}%`;

    return (
      <div
        className={`tyk-progress-bar__percentage tyk-progress-bar__percentage--${percentagePosition}`}
      >
        {text}
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
   * Custom text format for the percentage. Use {value} as a placeholder for the percentage value.
   * Example: "{value}% complete"
   */
  percentageText: PropTypes.string,
  /**
   * Additional CSS classes
   */
  className: PropTypes.string,
  /**
   * ID attribute
   */
  id: PropTypes.string,
};

ProgressBar.defaultProps = {
  max: 100,
  theme: "primary",
  size: "md",
  showPercentage: false,
  percentagePosition: "bottom",
};

export default ProgressBar;
