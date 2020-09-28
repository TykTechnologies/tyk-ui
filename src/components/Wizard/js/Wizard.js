import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WizardContext from './WizardContext';

const Wizard = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(1);
  const onPanelCollapse = (sectionNo) => {
    setCurrentSection(sectionNo);
  };

  const navigate = (adjacent, sectionNo) => {
    if (adjacent === 'next') return setCurrentSection(sectionNo + 1);
    return setCurrentSection(sectionNo - 1);
  };

  return (
    <WizardContext.Provider
      value={{
        currentSection,
        onPanelCollapse,
        navigate,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

Wizard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
    PropTypes.func,
  ]),
};

export default Wizard;
