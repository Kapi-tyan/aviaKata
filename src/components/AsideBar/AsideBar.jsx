import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleAllTransfer, toggleFilterTransfer } from '../../store/slices/AsideBarSlice';
import './AsideBar.scss';

const AsideBar = () => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  return (
    <div className="wrapper-aside">
      <aside className="aside-bar">
        <ul>КОЛИЧЕСТВО ПЕРЕСАДОК</ul>
        <li>
          <input
            type="checkbox"
            id="all"
            onChange={() => dispatch(toggleAllTransfer())}
            checked={filters.allTransfer}
          />
          <label htmlFor="all">Все</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="withoutTransfer"
            onChange={() => dispatch(toggleFilterTransfer('withoutTransfer'))}
            checked={filters.withoutTransfer}
          />
          <label htmlFor="withoutTransfer">Без пересадок</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="oneTransfer"
            onChange={() => dispatch(toggleFilterTransfer('oneTransfer'))}
            checked={filters.oneTransfer}
          />
          <label htmlFor="oneTransfer">1 пересадка</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="twoTransfer"
            onChange={() => dispatch(toggleFilterTransfer('twoTransfer'))}
            checked={filters.twoTransfer}
          />
          <label htmlFor="twoTransfer">2 пересадки</label>
        </li>
        <li>
          <input
            type="checkbox"
            id="threeTransfers"
            onChange={() => dispatch(toggleFilterTransfer('threeTransfers'))}
            checked={filters.threeTransfers}
          />
          <label htmlFor="threeTransfers">3 пересадки</label>
        </li>
      </aside>
    </div>
  );
};

export default AsideBar;
