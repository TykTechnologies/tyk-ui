import React, {
  useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';

import ToastMessage from './ToastMessage';

function ToastContainer(props) {
  const [messages, setMessages] = useState({});
  const {
    notify,
    placement,
  } = props;
  const containerClassName = `tyk-toast__container tyk-toast__container--${placement.from}-${placement.align}`;

  const updateNotifications = (message, options) => {
    const msgID = Math.floor(Math.random() * 1000000);

    setMessages((prevMessages) => ({
      ...prevMessages,
      [msgID]: {
        message,
        options,
      },
    }));
  };

  useEffect(() => {
    notify(updateNotifications);
  }, [messages]);

  const onMessageClosed = (index) => {
    const tempMessages = { ...messages };
    delete tempMessages[index];
    setMessages((prevMessages) => {
      const newMessages = { ...prevMessages };
      delete newMessages[index];
      return newMessages;
    });
  };

  return (
    <div className={containerClassName}>
      {
        Object.keys(messages).map((msgID) => (
          messages[msgID]
            ? (
              <ToastMessage
                options={messages[msgID].options}
                onClose={onMessageClosed.bind(null, msgID)}
                index={Number(msgID)}
                key={msgID}
              >
                {messages[msgID].message}
              </ToastMessage>
            )
            : null
        ))
      }
    </div>
  );
}

ToastContainer.propTypes = {
  notify: PropTypes.func,
  placement: PropTypes.shape({
    from: PropTypes.oneOf(['bottom', 'top']).isRequired,
    align: PropTypes.oneOf(['center', 'right']).isRequired
  }).isRequired
};

export default ToastContainer;
