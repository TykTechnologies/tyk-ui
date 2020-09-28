import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import WizardContext from './WizardContext';

const Section = ({ children, sectionNo }) => {
  const {
    currentSection,
    onPanelCollapse,
    navigate,
  } = useContext(WizardContext);
  const [valid, setValid] = useState(false);
  const setContentValidation = (validity) => {
    setValid(validity);
  };

  return (
    <>
      {children({
        currentSection,
        onPanelCollapse,
        navigate,
        sectionNo,
        valid,
        setContentValidation,
      })}
    </>
  );
};

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
    PropTypes.func,
  ]),
  sectionNo: PropTypes.number,
};

export default Section;
