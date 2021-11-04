import React from 'react';

import styles from './message.module.css';

const Message = ({ onRender, onError }) => {
  return (
    <>
      {onError && (
        <p className={styles.error}>Sorry, but User wasn`t added...</p>
      )}
      {!onError && (
        <div className={styles.successMsg}>
          <h2 className={styles.success}>
            User {onRender.title} {onRender.firstName} {onRender.lastName} added
            successfully!
          </h2>
          {onRender.picture && (
            <div className={styles.thumb}>
              <img
                className={styles.img}
                src={onRender.picture}
                alt="new User"
              ></img>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Message;
