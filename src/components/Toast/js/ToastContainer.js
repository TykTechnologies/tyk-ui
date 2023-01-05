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
    console.log('ADD MESSAGE:', message);
    const tempMessages = messages.slice(0);

    console.log('PUSH MESSAGE (msg nr):', tempMessages.slice(0).length);
    tempMessages.push({
      message,
      options,
    });

    console.log('SET MESSAGES LIST:', tempMessages.slice(0));
    setMessages(tempMessages);
  };

  useEffect(() => {
    notify(updateNotifications);
  }, [messages]);

  const onMessageClosed = (index) => {
    console.log('REMOVE MESSAGE at position:', index);
    const tempMessages = messages.slice(0);
    tempMessages[index] = null;
    console.log('AFTER REMOVE:', tempMessages.slice(0));
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
