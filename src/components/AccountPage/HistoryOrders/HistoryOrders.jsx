import React from 'react';
import styles from './HistoryOrders.module.scss';
import goods from '../../../assets/images/noneData/foodsss.png';
import { useDispatch, useSelector } from 'react-redux';
import { historyOrders } from '../../../store/reducers/requestFoodSlice';

export const HistoryOrders = ({ setStateModal, setIdCounter }) => {
  const dispatch = useDispatch();
  const { dataUser } = useSelector((state) => state.accountSlice);
  const { dataHistory } = useSelector((state) => state.requestFoodSlice);
  // console.log(dataHistory);

  React.useEffect(() => {
    dispatch(historyOrders(dataUser?.idUser));
  }, []);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString(); // Форматирую дату
    const time = dateTime.toLocaleTimeString(); // Форматирую время
    return `${date} в ${time}`;
  };

  return (
    <ul className={styles.history}>
      <li>
        <h5>История заказов</h5>
      </li>
      {dataHistory?.length === 0 ? (
        <li className={styles.noneData}>Список пуст</li>
      ) : (
        dataHistory?.map((food, ind) => (
          <li key={ind}>
            <div className={styles.viewFood}>
              <img src={goods} alt="временно" />
              <div>
                <span>{food.zakaz_status}</span>
                <p>Заказ {formatDateTime(food.zakaz_date)}</p>
                <b>{food.establishment_name}</b>
              </div>
            </div>
            <div className={styles.moreInfo}>
              <p>{food.zakaz_summ} сом</p>
              <button
                className="standartBtn"
                onClick={() => {
                  setIdCounter(food.codeid);
                  setStateModal(true);
                }}
              >
                Подробно
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};
