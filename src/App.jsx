import React from 'react';
import { Alert } from 'antd';
import { useSelector } from 'react-redux';

import './index.scss';
import Logo from './img/Logo.svg';
import AsideBar from './components/AsideBar/AsideBar';
import TicketsButton from './components/TicketsButton/TicketsButton';
import TicketsList from './components/TicketsList/TicketsList';

const App = () => {
  const { error } = useSelector((state) => state.tickets);
  const { nothing } = useSelector((state) => state.filters);
  return (
    <div className="wrapper-all">
      <header>
        <img className="logo" src={Logo} alt="logo" />
      </header>
      <div className="wrapper-content">
        <AsideBar />
        <main>
          <TicketsButton />
          <div className="main">
            {error ? (
              <Alert message="Ошибка" description="Произошла ошибка, перезагрузите страницу" type="error" showIcon />
            ) : nothing ? (
              <Alert
                message="Предупреждение"
                description="Вы не выбрали количество пересадок"
                type="warning"
                showIcon
              />
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
