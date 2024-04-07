import React from 'react';

type Props = {
  appName: string;
  title: string | null;
}

const Banner: React.FC<Props> = ({ appName, title }) => {
  // if (token) {
  //   return null;
  // }
  return (
    <div className='home-page'>
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">
            {appName}
          </h1>
          <h3 className='text-pink text-center'>{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default Banner;
