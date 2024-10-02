import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Progress } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import { getSearchId, getTickets } from '../../services/aviaServ';
import { formatMinutes } from '../../format/formatMinutes';
import { formatDateAndDuration } from '../../format/formatDateAndDuration';

import styles from './Ticket.module.scss';

const Ticket = ({ visibleTickets }) => {
  const dispatch = useDispatch();
  const { searchId, tickets, stop, loading } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(getSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (searchId && !stop) {
      dispatch(getTickets(searchId));
    }
  }, [dispatch, searchId, stop]);

  const maxTickets = 11000;
  const calcProgress = (ticketsLength) => {
    if (ticketsLength === 0) return 0;
    const percent = Math.min((ticketsLength / maxTickets) * 100, 100);
    return Math.floor(percent);
  };
  const progressPercent = calcProgress(tickets.length);
  return (
    <>
      <Flex gap="small" vertical>
        {loading ? (
          <Progress percent={progressPercent} status={progressPercent < 100 ? 'active' : 'normal'} />
        ) : (
          <Progress percent={100} />
        )}
      </Flex>
      {visibleTickets.map((ticket) => (
        <div className={styles.ticket} key={uuidv4()}>
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
