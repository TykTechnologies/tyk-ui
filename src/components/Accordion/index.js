import React from 'react';
import PropTypes from 'prop-types';
import AccordionItem from './js/AccordionItem';
import AccordionItemHeader from './js/AccordionItemHeader';
import AccordionItemContent from './js/AccordionItemContent';
import AccordionContext from './js/AccordionContext';


const Accordion = (props) => {
  const {
    className,
    children,
    usearrowastrigger,
    arrow = { position: 'right', expandToContent: false },
  } = props;

  const getCssClasses = () => {
    let cssClasses = ['tyk-accordion'];

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  };

  return (
    <div className={getCssClasses()}>
      <AccordionContext.Provider
        value={{
          usearrowastrigger,
          arrow,
        }}
      >
        {children}
      </AccordionContext.Provider>
    </div>
  );
};

Accordion.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  usearrowastrigger: PropTypes.bool,
  arrow: PropTypes.shape({
    position: PropTypes.oneOf('left', 'right'),
    expandToContent: PropTypes.bool,
  }),
};

Accordion.defaultProps = {
  usearrowastrigger: false,
};

// For Readme.md : Start
Accordion.Item = AccordionItem;
Accordion.Item.Header = AccordionItemHeader;
Accordion.Item.Content = AccordionItemContent;
// For Readme.md : End

export default Accordion;
