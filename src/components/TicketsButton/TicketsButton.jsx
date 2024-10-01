import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { activeButton } from '../../store/slices/TicketsButtonSlice';
import './TicketsButton.scss';

const TicketsButton = () => {
  const ticketsButton = useSelector((state) => state.ticketsButton);
  const dispatch = useDispatch();

  return (
    <div className="wrapper-button">
      <button
        type="button"
        className={`button-main ${ticketsButton.cheapest ? 'active' : ''}`}
        onClick={() => dispatch(activeButton('cheapest'))}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        type="button"
        className={`button-main ${ticketsButton.fastest ? 'active' : ''}`}
        onClick={() => dispatch(activeButton('fastest'))}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
    </div>
  );
};

export default TicketsButton;
