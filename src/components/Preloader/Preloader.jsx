import React from 'react';
import './Preloader.scss';
import logo from '../../assets/images/Logo.png';

const Preloader = () => {
  return (
    <div className="preloader__container">
      <div>
        <img src={logo} alt="Лого" />
        <div className="preloader">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M57.6 30C58.9255 30 60.01 31.0763 59.9041 32.3975C59.4644 37.8821 57.5227 43.1573 54.2705 47.6336C50.5467 52.759 45.2958 56.574 39.2705 58.5317C33.2452 60.4894 26.7548 60.4894 20.7295 58.5317C14.7042 56.574 9.45333 52.759 5.72949 47.6336C2.00565 42.5081 -5.53856e-07 36.3354 0 30C5.53856e-07 23.6646 2.00565 17.4919 5.72949 12.3664C9.45333 7.24101 14.7042 3.42604 20.7295 1.4683C25.9917 -0.241488 31.6087 -0.458032 36.9607 0.818672C38.25 1.12623 38.9385 2.49023 38.5289 3.75084C38.1193 5.01145 36.7666 5.6893 35.4728 5.40143C31.09 4.4263 26.5105 4.63695 22.2128 6.03338C17.1515 7.67788 12.7408 10.8825 9.61277 15.1878C6.48475 19.4932 4.8 24.6783 4.8 30C4.8 35.3217 6.48475 40.5068 9.61277 44.8122C12.7408 49.1175 17.1515 52.3221 22.2128 53.9666C27.274 55.6111 32.726 55.6111 37.7872 53.9666C42.8485 52.3221 47.2592 49.1175 50.3872 44.8122C53.0434 41.1563 54.6589 36.866 55.0858 32.3965C55.2119 31.077 56.2745 30 57.6 30Z"
              fill="url(#paint0_angular_211_15650)"
            />
            <defs>
              <radialGradient
                id="paint0_angular_211_15650"
                cx="0"
                cy="0"
                r="3"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(30 30) rotate(-70.8444) scale(30.1705)"
              >
                <stop stopColor="#222222" />
                <stop offset="1" stopColor="#222222" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
