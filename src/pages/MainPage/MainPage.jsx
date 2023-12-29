import React from 'react';
import SliderMain from '../../components/SliderMain/SliderMain';
import styles from './MainPage.module.scss';
import MainContent from '../../components/MainPage/MainContent/MainContent';
import { useDispatch } from 'react-redux';
import { getCategory } from '../../store/reducers/requestFoodSlice';

import img1 from '../../assets/images/noneData/everyFood.png';
import img2 from '../../assets/images/noneData/Rectangle4.png';
import img3 from '../../assets/images/noneData/Rectangle5.png';
import img4 from '../../assets/images/noneData/Rectangle6.png';
import img5 from '../../assets/images/noneData/Rectangle7.png';
import img6 from '../../assets/images/noneData/Rectangle8.png';

const MainPage = () => {
  const dispatch = useDispatch();

  const arrImg = [img2, img6, img5, img6, img2, img4, img3, img5, img5, img1];
  // удалить

  React.useEffect(() => {
    dispatch(
      getCategory(
        'http://kover-site.333.kg/get_estab_category?category_type=main'
      )
    );
    /// все категории (магазины,рестораны)
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.mainBlock}>
      <SliderMain />
      <MainContent arrImg={arrImg} />
    </div>
  );
};

export default MainPage;
