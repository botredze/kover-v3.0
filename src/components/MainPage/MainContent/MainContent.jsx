import React from "react";
import ordering from "../../../assets/images/Main/ordering.png";
import delivery from "../../../assets/images/Main/delivery.png";
import styles from "./MainContent.module.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../Preloader/Preloader";
import {
  changeActiveType,
  changePathCatalog,
} from "../../../store/reducers/statesSlice";

const MainContent = ({ arrImg }) => {
  const { allCategory } = useSelector((state) => state.requestFoodSlice);
  const dispatch = useDispatch();

  const clickEstablishment = (name) => {
    dispatch(changePathCatalog(name));
    localStorage.setItem("pathCatalog", name);
    dispatch(changeActiveType(0));
  };

  // console.log(allCategory, "allCategory");

  return (
    <div className={styles.mainContent}>
      <div className="container">
        <div className={styles.mainContent__inner}>
          <NavLink
            to={`/detailed/${"0"}/${"Рестораны"}`}
            className={styles.everyCategory}
            onClick={() => clickEstablishment("Рестораны")}
          >
            <img src={arrImg[9]} alt="Рестораны" />
            <h4>Рестораны</h4>
          </NavLink>
          {allCategory?.length === 0 ? (
            <Preloader />
          ) : (
            allCategory?.map((i, ind) => (
              <NavLink
                to={`/detailed/${i.codeid}/${i.category_name}`}
                key={i.codeid}
                className={styles.everyCategory}
                onClick={() => clickEstablishment(i?.category_name)}
              >
                <img src={arrImg[ind]} alt="категория" />
                <h4>{i.category_name}</h4>
              </NavLink>
            ))
          )}
          <NavLink
            to={`/delivery`}
            className={styles.everyCategory}
            onClick={() => clickEstablishment("Курьерская доставка")}
          >
            <img src={delivery} alt="" />
            <h4>Курьерская доставка</h4>
          </NavLink>
          <NavLink
            to={`/listorder`}
            className={styles.everyCategory}
            onClick={() => clickEstablishment("Доставка с гипермаркетов")}
          >
            <img src={ordering} alt="" />
            <h4>Доставка с гипермаркетов</h4>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
