import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import Ticket from '../Ticket/Ticket';

import styles from './TicketsList.module.scss';

const TicketsList = () => {
  const { fastest, cheapest } = useSelector((state) => state.ticketsButton);
  const { allTransfer, withoutTransfer, oneTransfer, twoTransfer, threeTransfers } = useSelector(
    (state) => state.filters
  );
  const { tickets } = useSelector((state) => state.tickets);
  const [visibleTickets, setVisibleTickets] = useState(5);

  const filteredTickets = useMemo(() => {
    const filterTickets = (tickets) => {
      if (!allTransfer && !withoutTransfer && !oneTransfer && !twoTransfer && !threeTransfers) {
        return tickets;
      }
      return tickets.filter((ticket) => {
        const stops = ticket.segments[0].stops.length;
        const returnStops = ticket.segments[1].stops.length;
        if (allTransfer) return true;
        if (withoutTransfer && stops === 0 && returnStops === 0) return true;
        if (oneTransfer && (stops === 1 || returnStops === 1)) return true;
        if (twoTransfer && (stops === 2 || returnStops === 2)) return true;
        if (threeTransfers && (stops === 3 || returnStops === 3)) return true;
        return false;
      });
    };
    return filterTickets(tickets);
  }, [tickets, allTransfer, withoutTransfer, oneTransfer, twoTransfer, threeTransfers]);

  const sortedTickets = useMemo(() => {
    const sortTickets = (tickets) => {
      return [...tickets].sort((a, b) => {
        if (cheapest) {
          return a.price - b.price;
        } else if (fastest) {
          const durationA = a.segments[0].duration + a.segments[1].duration;
          const durationB = b.segments[0].duration + b.segments[1].duration;
          return durationA - durationB;
        }
        return 0;
      });
    };

    return sortTickets(filteredTickets);
  }, [filteredTickets, cheapest, fastest]);

  const showMoreTickets = () => {
    setVisibleTickets((count) => count + 5);
  };

  return (
    <>
      <Ticket visibleTickets={sortedTickets.slice(0, visibleTickets)} />
      <button className={styles.moreTickets} onClick={showMoreTickets}>
        ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ
      </button>
    </>
  );
};

export default TicketsList;
