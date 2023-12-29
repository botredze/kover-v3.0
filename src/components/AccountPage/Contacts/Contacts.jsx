import React from 'react';
import './Contacts.scss';
import Modals from '../../Modals/Modals';

const Contacts = (props) => {
  return (
    <Modals
      state={props.state}
      title={'Контакты'}
      changeState={props.changeState}
    >
      <div className="contacts">
        <ul>
          <li>
            0 (553) <span> 93-16-31</span>
            <p>WhatsApp</p>
          </li>
          <li>
            0 (553) <span>53-56-81</span>
          </li>
          <li>
            0 (553) <span>84-16-01</span>
          </li>
          <li>
            0 (553) <span>87-16-55</span>
          </li>
        </ul>
        <h5>Время работы</h5>
        <p>Работаем с 8 утра до 2 ночи</p>
      </div>
    </Modals>
  );
};

export default Contacts;
