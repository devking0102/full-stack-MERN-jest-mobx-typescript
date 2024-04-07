import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../../store';

const PrivateRoute: React.FC<any> = (props: any) => {
  const { commonStore } = useStore();
  return (
    <Observer>{() => {
      if (commonStore.user && commonStore.user._id) return <Route {...props} />;
      return <Redirect to="/" />;
    }}</Observer>
  );
};

export default PrivateRoute;
