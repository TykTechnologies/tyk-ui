import React, {
  useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';

import ToastMessage from './ToastMessage';

const ToastContainer = (props) => {
  const [messages, setMessages] = useState([]);
  const {
    notify,
  } = props;

  const updateNotifications = (message, options) => {
    const tempMessages = messages.slice(0);
    tempMessages.push({
      message,
      options,
    });
    setMessages(tempMessages);
  };

  useEffect(() => {
    notify(updateNotifications);
  }, [messages]);

  const onMessageClosed = (index) => {
    const tempMessages = messages.slice(0);
    tempMessages[index] = null;
    setMessages(tempMessages);
  };

  return (
    <div className="tyk-toast__container">
      {
        messages.map((msg, index) => (
          msg
            ? (
              <ToastMessage
                options={msg.options}
                // eslint-disable-next-line react/jsx-no-bind
                onClose={onMessageClosed.bind(null, index)}
                index={index}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                {msg.message}
              </ToastMessage>
            )
            : null
        ))
      }
    </div>
  );
};

ToastContainer.propTypes = {
  notify: PropTypes.func,
};

export default ToastContainer;
