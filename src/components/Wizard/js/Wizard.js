import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WizardContext from './WizardContext';

const Wizard = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const navigate = (adjacent, sectionNo) => {
    if (adjacent === 'next') return setCurrentSection(sectionNo + 1);
    return setCurrentSection(sectionNo - 1);
  };
  return (
    <>
      <WizardContext.Provider
        value={{
          currentSection,
          navigate,
        }}
      >
        {
          React.Children
            .map(children, (child, index) => (
              <child.type
                {...child.props}
                currentSection
                sectionNo={index}
              />
            ))
        }
      </WizardContext.Provider>
    </>
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
