import React from "react";
import styles from "./SearchPage.module.scss";
import SelectInput from "../../components/SearchPage/SelectInput/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import {
  changeEmptySearch,
  changeMainSearch,
  changeSearch,
  mainSearch,
} from "../../store/reducers/requestFoodSlice";
import MiniPreloader from "../../components/MiniPreloader/MiniPreloader";
import DataSearch from "../../components/SearchPage/DataSearch/DataSearch";

const SearchPage = () => {
  const dispatch = useDispatch();
  const { miniLoader, dataSearchMain, emptySearch, search, typeSearch } =
    useSelector((state) => state.requestFoodSlice);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    dispatch(changeEmptySearch(false));
    search === "" ? dispatch(changeMainSearch([])) : "";
  }, [search]);

  React.useEffect(() => {
    if (search !== "") {
      dispatch(changeMainSearch([]));
      dispatch(mainSearch({ search, typeSearch }));
    }
  }, [typeSearch]);

  const searchDataFn = (e) => {
    e.preventDefault();
    dispatch(changeMainSearch([]));
    dispatch(mainSearch({ search, typeSearch }));
  };

  // console.log(typeSearch, 'typeSearch');
  // console.log(dataSearchMain, 'dataSearchMain');

  return (
    <div className={styles.sarchBlock}>
      <div className="container">
        <div className={styles.sarchBlock__inner}>
          <form onSubmit={searchDataFn}>
            <input
              // type="search"
              id="search"
              placeholder="Поиск"
              required
              onChange={(e) => dispatch(changeSearch(e.target.value))}
              value={search}
            />
            <div className={styles.selectInput}>
              <SelectInput />
            </div>
            <button id="search" type="submit">
              Найти
            </button>
          </form>
          {miniLoader && <MiniPreloader />}
          {emptySearch && (
            <i className="noneData">По вашему заросу ничего не найдено!</i>
          )}
          <DataSearch />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
