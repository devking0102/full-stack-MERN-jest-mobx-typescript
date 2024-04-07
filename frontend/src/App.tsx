import React, { useEffect } from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import { useStore } from '@/store'; // importing module using path alias
import Header from '@/components/common/Header'; // importing module using absolute paths
import User from '@/components/User';
import AddAnswer from '@components/Answer/AddAnswer';
import EditAnswer from '@components/Answer/EditAnswer';
import AddQuestion from '@components/Question/AddQuestion';
import EditQuestion from '@components/Question/EditQuestion';
import PrivateRoute from '@/components/common/PrivateRoute';
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
        <PrivateRoute path="/question/create" component={AddQuestion} />
        <PrivateRoute path="/question/:id" component={EditQuestion} />
        <PrivateRoute path="/answer/create" component={AddAnswer} />
        <PrivateRoute path="/answer/:id" component={EditAnswer} />
        <PrivateRoute path="/answer" component={Answer} />
        <PrivateRoute path="/question" component={Question} />
        <Route path="/" component={User} />
      </Switch>
    </Router>
  );
}

export default App;
