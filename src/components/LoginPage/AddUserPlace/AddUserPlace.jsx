import React, { useState } from 'react';
import styles from './AddUserPlace.module.scss';
import mapImg from '../../../assets/images/noneData/Map.png';
import warning from '../../../assets/icons/warning.svg';
import { useNavigate } from 'react-router-dom';
import { authName } from '../../../store/reducers/postRequestSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddUserPlace = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [placeUser, setPlaceUser] = useState({
    mainAdres: '',
    noMainAdres: '',
    infoDop: '',
  });

  const { dataUser, tokenNum, tokenName } = useSelector(
    (state) => state.accountSlice
  );

  const changeInput = (e) => {
    e.preventDefault();
    setPlaceUser({ ...placeUser, [e.target.name]: e.target.value });
  };

  const sendData = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        await dispatch(authName({ dataUser, placeUser }));
        navigate('/main');
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  };

  return (
    <div className={styles.delivery}>
      <h4>Укажите адрес</h4>
      <div>
        <img src={warning} alt="warning!" />
      </div>
      <p>
        В случае если адрес доставки не указан, то стоимость и время доставки
        считаемся неточно!
      </p>
      <form onSubmit={sendData}>
        <input
          type="text"
          name="mainAdres"
          required
          placeholder="Киевская улица, 71"
          onChange={changeInput}
        />
        <input
          type="text"
          name="noMainAdres"
          required
          placeholder="Квартира и этаж"
          onChange={changeInput}
        />
        {/* <input
          type="text"
          required
          name="noMainAdres"
          placeholder="Время доставки"
          onChange={changeInput}
        /> */}
        <input
          type="text"
          required
          name="infoDop"
          placeholder="Доп. информация (код двери, домофон и т.п.)"
          onChange={changeInput}
        />
        <img src={mapImg} alt="map" />
        <button type="submit" className="standartBtn">
          Завершить
        </button>
      </form>
    </div>
  );
};

export default AddUserPlace;
