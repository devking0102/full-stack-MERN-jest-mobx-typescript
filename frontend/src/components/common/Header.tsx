import React from 'react';
import { Link } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../../store'

const LoggedOutView = (props: any) => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/user" className="nav-link">
            Users
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/question" className="nav-link">
            Questions
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/answer" className="nav-link">
            Answers
          </Link>
        </li>

      </ul>
    );
  }
  return null;
};

const LoggedInView = (props: any) => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose" />&nbsp;New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a" />&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.username}`}
            className="nav-link"
          >
            <img src={props.currentUser.image} className="user-pic" alt="" />
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    );
  }

  return null;
};

const Header: React.FC = () => {
  const { commonStore, userStore } = useStore()
  return <Observer>{() => (
    <nav className="navbar navbar-light">
      <div className="container">

        <Link to="/" className="navbar-brand">
          {commonStore.appName}
        </Link>

        <LoggedOutView currentUser={userStore.currentUser} />

        <LoggedInView currentUser={userStore.currentUser} />
      </div>
    </nav>
  )}</Observer>
}

export default Header;
