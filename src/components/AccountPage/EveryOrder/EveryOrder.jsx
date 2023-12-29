import React from 'react';
import goods from '../../../assets/images/noneData/foodsss.png';
import Modals from '../../Modals/Modals';
import './EveryOrder.scss';
import { useDispatch, useSelector } from 'react-redux';
import { takeDetailedHistory } from '../../../store/reducers/requestFoodSlice';

const EveryOrder = (props) => {
  const arrDataHistory = [
    {
      id: 1,
      img: goods,
      title: 'Ресторан Фаиза',
      price: '680 сом',
      status: 'В доставке',
      historyTime: 'Заказ 08.09.2023 в 12:54',
    },
    {
      id: 2,
      img: goods,
      title: 'Ресторан Фаиза',
      price: '680 сом',
      status: 'В доставке',
      historyTime: 'Заказ 08.09.2023 в 12:54',
    },
    {
      id: 3,
      img: goods,
      title: 'Ресторан Фаиза',
      price: '680 сом',
      status: 'В доставке',
      historyTime: 'Заказ 08.09.2023 в 12:54',
    },
    {
      id: 4,
      img: goods,
      title: 'Ресторан Фаиза',
      price: '680 сом',
      status: 'В доставке',
      historyTime: 'Заказ 08.09.2023 в 12:54',
    },
    {
      id: 5,
      img: goods,
      title: 'Ресторан Фаиза',
      price: '680 сом',
      status: 'В доставке',
      historyTime: 'Заказ 08.09.2023 в 12:54',
    },
    {
      id: 6,
      img: goods,
      title: 'Ресторан Фаиза',
      price: '680 сом',
      status: 'В доставке',
      historyTime: 'Заказ 08.09.2023 в 12:54',
    },
  ];
  const dispatch = useDispatch();

  const { detailedHistory } = useSelector((state) => state.requestFoodSlice);
  // console.log(detailedHistory, 'detailedHistory');

  React.useEffect(() => {
    if (props.idCounter !== 0) {
      dispatch(takeDetailedHistory(props.idCounter));
    }
  }, [props?.idCounter]);

  const calculateTotalPrice = () => {
    if (detailedHistory && detailedHistory.length > 0) {
      const totalPrice = detailedHistory.reduce(
        (accumulator, currentItem) => accumulator + +currentItem.price,
        0
      );
      return totalPrice;
    } else {
      return 0;
    }
  };
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const date = dateTime.toLocaleDateString(); // Форматирую дату
    const time = dateTime.toLocaleTimeString(); // Форматирую время
    return `${date} в ${time}`;
  };

  return (
    <Modals
      state={props.state}
      title={'Заказ 08.09.2023 в 12:54'}
      changeState={props.changeState}
    >
      <div className="historyModal">
        <p>Заказ создан</p>
        <div>
          <span>{calculateTotalPrice()} сом</span>
          <div>
            <i>{detailedHistory?.length} позиции</i>
          </div>
        </div>
        <ul>
          {detailedHistory?.map((i, ind) => (
            <li key={ind}>
              <div className="food">
                <img src={i.photo} alt="food" />
              </div>
              <div className="mainContent">
                <p>{i.product_name}</p>
                <span>{+i.price} сом</span>
              </div>
              <p>{i.price} сом</p>
            </li>
          ))}
        </ul>
        <div className="delivery">{/* <h5>Доставка</h5> */}</div>
        <button onClick={() => props.changeState(false)}>Закркыть</button>
      </div>
    </Modals>
  );
};

export default EveryOrder;
