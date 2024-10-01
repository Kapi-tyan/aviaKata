import React from 'react';
import { useSelector } from 'react-redux';

import Ticket from '../Ticket/Ticket';

const TicketsList = () => {
  const { fastest, cheapest } = useSelector((state) => state.ticketsButton);

  return <Ticket fastest={fastest} cheapest={cheapest} />;
};

export default TicketsList;
