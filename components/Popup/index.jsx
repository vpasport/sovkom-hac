/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { Button } from '@components';
import { toClassName } from '@utils';

import * as popupTypes from './Types';

import styles from './style.module.scss';

const Popup = (props) => {
  const value = props?.isOpenNow ? props.isOpenNow : false;

  const setConfirm = (val) => {
    const answer = val?.target.id === 'confirm';
    props.confirm(answer);
    return setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = useState(value);

  const propsContentPopup = {
    ...props,
    toggle: setConfirm,
  };

  return (
    <>
      {props.button !== 'none' && (
        <Button
          type={props.button}
          className={props.classNameButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          {props.buttonText}
        </Button>
      )}

      <Modal
        isOpen={isOpen}
        onRequestClose={propsContentPopup.toggle}
        className={
          props.type === 'confirm'
            ? toClassName(styles.popup, styles.confirm)
            : props.type === 'custom'
            ? toClassName(styles.popup, styles.custom)
            : styles.popup
        }
        overlayClassName={styles.popup_overlay}
        closeTimeoutMS={0}
        ariaHideApp={false}
        {...props}
      >
        {React.createElement(popupTypes[props.type], propsContentPopup)}
      </Modal>
    </>
  );
};

Popup.propTypes = {
  type: PropTypes.oneOf(Object.keys(popupTypes)).isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.string]),
};

export { Popup };
