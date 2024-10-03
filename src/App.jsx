import React from 'react';
import { Alert } from 'antd';
import { useSelector } from 'react-redux';

import styles from './index.module.scss';
import Logo from './img/Logo.svg';
import AsideBar from './components/AsideBar/AsideBar';
import TicketsButton from './components/TicketsButton/TicketsButton';
import TicketsList from './components/TicketsList/TicketsList';
import ProgressBar from './components/ProgressBar/ProgressBar';

const App = () => {
  const { error } = useSelector((state) => state.tickets);
  const { nothing } = useSelector((state) => state.filters);
  const ErrorAlert = (
    <Alert
      className={styles.alert}
      message="Ошибка"
      description="Произошла ошибка при получении билетов, перезагрузите страницу"
      type="error"
      showIcon
    />
  );
  const NothingAlert = (
    <Alert
      className={styles.alert}
      message="Предупреждение"
      description="Вы не выбрали количество пересадок"
      type="warning"
      showIcon
      closable
    />
  );

  return (
    <div className={styles.wrapperAll}>
      <header>
        <img className="logo" src={Logo} alt="logo" />
      </header>
      <div className={styles.wrapperContent}>
        <AsideBar />
        <main>
          <TicketsButton />
          <div className="main">
            {error ? ErrorAlert : ''}
            {nothing ? NothingAlert : ''}
            <ProgressBar />
            <TicketsList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
