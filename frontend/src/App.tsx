import React, { useEffect } from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { useStore } from '@/store'; // importing module using path alias
import Header from '@/components/common/Header'; // importing module using absolute paths
import Home from '@components/Home';
import Login from '@components/Login';
import Register from '@components/Register';
import PrivateRoute from '@/components/common/PrivateRoute';
import Settings from '@components/Settings';
import Profile from '@components/Profile';
import Question from '@components/Question';
import Answer from '@components/Answer';

const App: React.FC = () => {
  const { commonStore, usersStore } = useStore()
  useEffect(() => {
    if (commonStore.user) {
      usersStore.getUser()
    }
  })
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/answer" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/settings" component={Settings} />
        <Route path="/@:username" component={Profile} />
        <Route path="/@:username/favorites" component={Profile} />
        <PrivateRoute path="/answer" component={Answer} />
        <PrivateRoute path="/question" component={Question} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
