import React from 'react';
import { useSelector } from 'react-redux';
import { Flex, Progress } from 'antd';

const ProgressBar = () => {
  const { tickets, loading, error } = useSelector((state) => state.tickets);
  const maxTickets = 11000;
  const calcProgress = (ticketsLength) => {
    if (ticketsLength === 0) return 0;
    const percent = Math.min((ticketsLength / maxTickets) * 100, 100);
    return Math.floor(percent);
  };
  const progressPercent = calcProgress(tickets.length);
  if (error) {
    return <Progress percent={10} status="active" />;
  }
  return (
    <Flex gap="small" vertical>
      {loading ? (
        <Progress percent={progressPercent} status={progressPercent < 100 ? 'active' : 'normal'} />
      ) : (
        <Progress percent={100} />
      )}
    </Flex>
  );
};

export default ProgressBar;
