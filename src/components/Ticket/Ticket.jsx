import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getSearchId } from '../../services/aviaServ';
import { formatMinutes } from '../../format/formatMinutes';
import { formatDateAndDuration } from '../../format/formatDateAndDuration';

import styles from './Ticket.module.scss';

const Ticket = ({ visibleTickets }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSearchId());
  }, [dispatch]);
  return (
    <>
      {visibleTickets.map((ticket) => (
        <div
          className={styles.ticket}
          key={`${ticket.carrier}-${ticket.price}-${ticket.segments[0].origin}-${ticket.segments[0].destination}`}
        >
          <div className={styles.ticketWrapper}>
            <div className={styles.ticketPrice}>
              {new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0, style: 'currency', currency: 'RUB' }).format(
                ticket.price
              )}
              <img
                className={styles.ticketAirline}
                src={`https://images.daisycon.io/airline/?iata=${ticket.carrier}`}
                alt={ticket.carrier}
              />
            </div>
            <table>
              <tbody>
                <tr className={styles.ticketHeadlines}>
                  <td>
                    {ticket.segments[0].origin}-{ticket.segments[0].destination}
                  </td>
                  <td>В ПУТИ</td>
                  <td>
                    {ticket.segments[0].stops.length >= 2
                      ? `${ticket.segments[0].stops.length} ПЕРЕСАДКИ`
                      : ticket.segments[0].stops.length === 1
                        ? '1 ПЕРЕСАДКА'
                        : 'БЕЗ ПЕРЕСАДОК'}
                  </td>
                </tr>
                <tr>
                  <td>{formatDateAndDuration(ticket.segments[0].date, ticket.segments[0].duration)}</td>
                  <td>{formatMinutes(ticket.segments[0].duration)}</td>
                  <td>
                    {ticket.segments[0].stops.length === 0
                      ? '-'
                      : ticket.segments[0].stops.map((stop) => stop).join(', ')}
                  </td>
                </tr>
                <tr className={styles.ticketHeadlines}>
                  <td>
                    {ticket.segments[1].origin}-{ticket.segments[1].destination}
                  </td>
                  <td>В ПУТИ</td>
                  <td>
                    {ticket.segments[1].stops.length >= 2
                      ? `${ticket.segments[1].stops.length} ПЕРЕСАДКИ`
                      : ticket.segments[1].stops.length === 1
                        ? '1 ПЕРЕСАДКА'
                        : 'БЕЗ ПЕРЕСАДОК'}
                  </td>
                </tr>
                <tr>
                  <td>{formatDateAndDuration(ticket.segments[1].date, ticket.segments[1].duration)}</td>
                  <td>{formatMinutes(ticket.segments[1].duration)}</td>
                  <td>
                    {ticket.segments[1].stops.length === 0
                      ? '-'
                      : ticket.segments[1].stops.map((stop) => stop).join(', ')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
};

export default Ticket;
