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
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">
          {appName}
        </h1>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Banner;
