import React, {
  useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';

import ToastMessage from './ToastMessage';

function ToastContainer(props) {
  const [messages, setMessages] = useState({});
  const {
    notify,
  } = props;

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
    <div className="tyk-toast__container">
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
};

export default ToastContainer;
