import React, {
  useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';

import ToastMessage from './ToastMessage';

const ToastContainer = (props) => {
  const [messages, setMessages] = useState({});
  const {
    notify,
  } = props;

  const updateNotifications = (message, options) => {
    const msgID = Math.floor(Math.random() * 1000000);
    console.log('PUSH MESSAGE (msg nr):', Object.keys({...messages}).length);
    console.log('SET MESSAGES LIST:', {...messages});
    
    setMessages((prevMessages) => ({
      ...prevMessages,
      [msgID]: {
        message,
        options,
      }
    }));
  };

  useEffect(() => {
    notify(updateNotifications);
  }, [messages]);

  const onMessageClosed = (index) => {
    console.log('REMOVE MESSAGE at position:', index);
    const tempMessages = {...messages};
    delete tempMessages[index];
    console.log('AFTER REMOVE:', {...tempMessages});
    setMessages(tempMessages);
  };

  return (
    <div className="tyk-toast__container">
      {
        Object.keys(messages).map((msgID) => (
          messages[msgID]
            ? (
              <ToastMessage
                options={messages[msgID].options}
                // eslint-disable-next-line react/jsx-no-bind
                onClose={onMessageClosed.bind(null, msgID)}
                index={msgID}
                // eslint-disable-next-line react/no-array-index-key
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
};

ToastContainer.propTypes = {
  notify: PropTypes.func,
};

export default ToastContainer;
