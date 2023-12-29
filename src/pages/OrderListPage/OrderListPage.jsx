import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDataListOrders,
  sendOrderFoods,
} from "../../store/reducers/ordersListSlice";
import { changeListOrdersUser } from "../../store/reducers/statesSlice";
import { chnageAlertText } from "../../store/reducers/EditDataUser";

/// img
import arrow from "../../assets/icons/arrowTypeFood.svg";
import krest from "../../assets/icons/Cancel.svg";

import styles from "./OrderListPage.module.scss";
import { transformDataOrderList } from "../../helpers/transformDataOrderList";
import InputMask from "react-input-mask";
import { rearg } from "lodash";
import PathToFiles from "../../components/PathToFiles/PathToFiles";

const OrderListPage = () => {
  const dispatch = useDispatch();
  const [inputProd, setInputProd] = useState("");
  const [quantity, setquantity] = useState("");
  const [counter, setCounter] = useState(1);
  const [typeFood, setTypeFood] = useState("шт");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { dataListOrders } = useSelector((state) => state.ordersListSlice);
  const { listOrdersUser } = useSelector((state) => state.statesSlice);

  const typeData = () => {
    counter >= 2 ? setCounter(0) : setCounter(counter + 1);
  };

  React.useEffect(() => {
    if (counter === 0) {
      setTypeFood("кг");
    } else if (counter === 1) {
      setTypeFood("шт");
    } else if (counter === 2) {
      setTypeFood("л");
    }
  }, [counter]);

  const changeInput = (e) => {
    e.preventDefault();
    dispatch(
      changeDataListOrders({
        ...dataListOrders,
        [e.target.name]: e.target.value,
      })
    );
  };

  const addOrder = () => {
    if (quantity !== "" && inputProd !== "") {
      if (listOrdersUser?.length === 0) {
        dispatch(
          changeListOrdersUser([
            ...listOrdersUser,
            { prod: inputProd, quantity, ves: typeFood, id: 1 },
          ])
        );
      } else {
        dispatch(
          changeListOrdersUser([
            ...listOrdersUser,
            {
              prod: inputProd,
              quantity,
              ves: typeFood,
              id: listOrdersUser?.[listOrdersUser?.length - 1].id + 1,
            },
          ])
        );
      }
      setquantity("");
      setInputProd("");
    } else {
      dispatch(
        chnageAlertText({
          text: "Заполните все поля!",
          backColor: "red",
          state: true,
        })
      );
    }
  };

  const del = (id) => {
    const newData = listOrdersUser?.filter((i) => i.id !== id);
    dispatch(changeListOrdersUser(newData));
  };

  // console.log(listOrdersUser, 'listOrdersUser');
  // console.log(counter);
  // console.log(dataListOrders, 'dataListOrders');

  const sendData = (e) => {
    e.preventDefault();
    const phoneNumberPattern = /^\+\d{3}\(\d{3}\)\d{2}-\d{2}-\d{2}$/;

    if (listOrdersUser?.length === 0) {
      dispatch(
        chnageAlertText({
          text: "Ваш список заказов пустой!",
          backColor: "red",
          state: true,
        })
      );
    } else {
      if (phoneNumberPattern.test(dataListOrders?.phone)) {
        const newData = transformDataOrderList(listOrdersUser);
        dispatch(
          sendOrderFoods({
            ...dataListOrders,
            product_list: newData,
            phone: dataListOrders?.phone?.replace(/[-()]/g, "")?.slice(-9),
          })
        );
      } else {
        dispatch(
          chnageAlertText({
            text: "Введите правильный номер!",
            backColor: "red",
            state: true,
          })
        );
      }
    }
  };

  const clickType = (num) => {
    dispatch(changeDataListOrders({ ...dataListOrders, oplata_type: num }));
  };

  return (
    <div className={styles.orderList}>
      <div className="container">
        <div className={styles.path}>
          <PathToFiles estab={"Доставка с гипермаркетов"} />
        </div>
        <div className={styles.orderList__inner}>
          <div>
            <h4>
              Нет времени <i> оформлять доставку?</i>
            </h4>
            <h5>
              Отправьте нам список покупок и мы доставим всё к вам домой через 3
              часа!
            </h5>
            <p>
              Мы работаем с большим количеством партнеров, чтобы предложить вам
              широкий выбор продуктов и услуг. Вы можете заказать еду из
              разнообразных ресторанов, включая итальянскую, японскую, китайскую
              кухни и многое другое.
            </p>
            <p>
              Мы также предлагаем доставку товаров из магазинов, аптек и других
              учреждений - все, что вам может понадобиться для вашего
              повседневного рутинного покупок.
            </p>
            <h6>Доставка от 200 сом</h6>
          </div>
          <form onSubmit={sendData}>
            <label>Отправитель</label>
            <InputMask
              mask="+999(999)99-99-99"
              placeholder="+996700754454"
              name="phone"
              value={dataListOrders?.phone}
              onChange={changeInput}
              required
            />
            <input
              type="text"
              required
              placeholder="ФИО"
              name="fio"
              onChange={changeInput}
              value={dataListOrders?.fio}
            />
            <label>Доставка</label>
            <input
              type="text"
              required
              placeholder="Адрес"
              name="client_adress"
              onChange={changeInput}
              value={dataListOrders?.client_adress}
            />
            <input
              type="text"
              required
              placeholder="Время"
              name="client_time_delivery"
              onChange={changeInput}
              value={dataListOrders?.client_time_delivery}
            />

            <label>Оплата</label>
            <div className={styles.inputBtn}>
              <div onClick={() => clickType(1)}>
                <div
                  className={
                    dataListOrders?.oplata_type === 1 ? styles.activeBtn : ""
                  }
                ></div>
                <p>Картой</p>
              </div>
              <div onClick={() => clickType(2)}>
                <div
                  className={
                    dataListOrders?.oplata_type === 2 ? styles.activeBtn : ""
                  }
                ></div>
                <p>Наличные</p>
              </div>
            </div>

            {dataListOrders?.oplata_type === 2 ? (
              <input
                type="text"
                required
                placeholder="Нужна сдача с..."
                onChange={changeInput}
                name="sdacha"
                value={dataListOrders?.sdacha}
              />
            ) : (
              ""
            )}

            <label>Комментарий к заказу</label>
            <input
              type="text"
              required
              placeholder="Комментарий к заказу"
              onChange={changeInput}
              name="comment_zakaz"
              value={dataListOrders?.comment_zakaz}
            />

            <div className="line"></div>

            <div>
              <h6>Список покупок</h6>
            </div>

            <div className={styles.listProd}>
              {listOrdersUser?.length === 0 ? (
                <p>Список пустой</p>
              ) : (
                listOrdersUser?.map((prod) => (
                  <div key={prod.id}>
                    <b>{prod?.prod}</b>
                    <div>
                      <span>{`${prod?.quantity} ${prod?.ves}`}</span>
                      <img src={krest} alt="x" onClick={() => del(prod.id)} />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className={styles.listOrder}>
              <input
                type="text"
                placeholder="Товар"
                className={styles.product}
                onChange={(e) => setInputProd(e.target.value)}
                value={inputProd}
              />
              <label className={styles.koll}>
                <input
                  type="text"
                  placeholder="0"
                  onChange={(e) => setquantity(e.target.value)}
                  value={quantity}
                />
                <div className={styles.type} onClick={typeData}>
                  <i>{typeFood}</i>
                  <img src={arrow} alt="<" />
                </div>
              </label>
              <div className={styles.btn} onClick={addOrder}>
                +
              </div>
            </div>
            <button type="submit" className="standartBtn">
              Оформить заказ
            </button>
            <p className={styles.endtext}>
              После оформления заказа наши менеджеры свяжутся с вами для
              уточнения деталей!
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderListPage;
