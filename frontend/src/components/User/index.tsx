import React from 'react';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import Banner from '../common/Banner';
import MainView from './MainView'

const Home: React.FC = () => {
  const { commonStore } = useStore();
  
  return <Observer>{() => {
    const { appName } = commonStore;
    return (
      <div className="home-page">

        <Banner appName={appName} title="Users"/>

        <div className="container page">
          <div className="row">

            <MainView />

          </div>
        </div>
      </div>
    )
  }}</Observer>
}

export default Home;