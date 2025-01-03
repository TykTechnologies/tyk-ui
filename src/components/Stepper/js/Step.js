import React from "react";
import PropTypes from "prop-types";

const Step = ({ children }) => {
  return <>{children}</>;
};

Step.displayName = "StepperStep";

Step.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
};

export default Step;
