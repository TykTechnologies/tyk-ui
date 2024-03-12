import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../../../components/Tooltip';
import Icon from '../../../../components/Icon';


const InvalidToken = (props) => {
  const { token, findInvalidTokenSubstitute } = props;
  return (
    <span
      role="main"
      onClick={() => findInvalidTokenSubstitute(token)}
      onKeyDown={() => {}}
    >
      <Tooltip render="invalid token detected" position="top">
        <span className="invalid_token">
          {`${token}`}
          <Icon type="exclamation-circle" />
        </span>
      </Tooltip>
    </span>
  );
};

InvalidToken.propTypes = {
  token: PropTypes.string,
  findInvalidTokenSubstitute: PropTypes.func,
};

export default InvalidToken;
