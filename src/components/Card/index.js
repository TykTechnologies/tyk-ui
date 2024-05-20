import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardTitle from './CardTitle';
import CardTitleGroup from './CardTitleGroup';
import CardSubTitle from './CardSubTitle';
import CardSummary from './CardSummary';
import CardTitleIcon from './CardTitleIcon';

function Card({
  height = 'auto',
  children,
}) {
  return (
    <div style={{ height }} className="tyk-card">
      {children}
    </div>
  );
}

Card.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.TitleGroup = CardTitleGroup;
Card.Icon = CardTitleIcon;
Card.SubTitle = CardSubTitle;
Card.Summary = CardSummary;

export default Card;
