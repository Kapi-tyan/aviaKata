import React from 'react';
import { Alert } from 'antd';
import { useSelector } from 'react-redux';

import styles from './index.module.scss';
import Logo from './img/Logo.svg';
import AsideBar from './components/AsideBar/AsideBar';
import TicketsButton from './components/TicketsButton/TicketsButton';
import TicketsList from './components/TicketsList/TicketsList';

const App = () => {
  const { error } = useSelector((state) => state.tickets);
  const { nothing } = useSelector((state) => state.filters);
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
            {error ? (
              <>
                <Alert
                  className={styles.alert}
                  message="Ошибка"
                  description="Произошла ошибка, перезагрузите страницу"
                  type="error"
                  showIcon
                />
                <TicketsList />
              </>
            ) : nothing ? (
              <>
                <Alert
                  className={styles.alert}
                  message="Предупреждение"
                  description="Вы не выбрали количество пересадок"
                  type="warning"
                  showIcon
                  closable
                />
                <TicketsList />
              </>
            ) : (
              <TicketsList />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
