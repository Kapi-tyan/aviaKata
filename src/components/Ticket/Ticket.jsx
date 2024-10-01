import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Progress } from 'antd';

import { getSearchId, getTickets } from '../../services/aviaServ';
import { formatMinutes } from '../../format/formatMinutes';
import { formatDateAndDuration } from '../../format/formatDateAndDuration';
import './Ticket.scss';

const Ticket = ({ fastest, cheapest }) => {
  const dispatch = useDispatch();
  const { searchId, tickets, stop, loading } = useSelector((state) => state.tickets);
  const { allTransfer, withoutTransfer, oneTransfer, twoTransfer, threeTransfers } = useSelector(
    (state) => state.filters
  );
  const [filteredTickets, setFilteredTickets] = useState([]);
  useEffect(() => {
    dispatch(getSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (searchId && !stop) {
      dispatch(getTickets(searchId));
    }
  }, [dispatch, searchId, stop]);
  const filterTickets = (tickets) => {
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
  const maxTickets = 11000;
  const calcProgress = (ticketsLength) => {
    if (ticketsLength === 0) return 0;
    const percent = Math.min((ticketsLength / maxTickets) * 100, 100);
    return Math.floor(percent);
  };
  const progressPercent = calcProgress(tickets.length);
  useEffect(() => {
    const filtered = sortTickets(filterTickets(tickets));
    setFilteredTickets(filtered);
  }, [tickets, fastest, cheapest, allTransfer, withoutTransfer, oneTransfer, twoTransfer, threeTransfers]);
  return (
    <>
      <Flex gap="small" vertical>
        {loading ? (
          <Progress percent={progressPercent} status={progressPercent < 100 ? 'active' : 'normal'} />
        ) : (
          <Progress percent={100} />
        )}
      </Flex>
      {filteredTickets.map((ticket, index) => (
        <div className="ticket" key={index}>
          <div className="ticket-wrapper">
            <div className="ticket__price">
              {new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0, style: 'currency', currency: 'RUB' }).format(
                ticket.price
              )}
              <img
                className="ticket__airline"
                src={`https://images.daisycon.io/airline/?iata=${ticket.carrier}`}
                alt={ticket.carrier}
              />
            </div>
            <table>
              <tbody>
                <tr className="ticket__headlines">
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
                <tr className="ticket__headlines">
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
