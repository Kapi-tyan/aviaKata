import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { activeButton } from '../../store/slices/TicketsButtonSlice';

import styles from './TicketsButton.module.scss';

const TicketsButton = () => {
  const ticketsButton = useSelector((state) => state.ticketsButton);
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapperButton}>
      <button
        type="button"
        className={`${styles.buttonMain} ${ticketsButton.cheapest ? styles.active : ''}`}
        onClick={() => dispatch(activeButton('cheapest'))}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        type="button"
        className={`${styles.buttonMain} ${ticketsButton.fastest ? styles.active : ''}`}
        onClick={() => dispatch(activeButton('fastest'))}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
    </div>
  );
};

export default TicketsButton;
