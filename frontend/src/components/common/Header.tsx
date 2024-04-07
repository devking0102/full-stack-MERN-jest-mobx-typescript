import React from 'react';
import { Link } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../../store'
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const localtion = useLocation()
  const {pathname} = localtion
  const { commonStore } = useStore()
  return <Observer>{() => (
    <nav className="navbar navbar-light">
      <div className="container">

        <Link to="/" className="navbar-brand">
          {commonStore.appName}
        </Link>

        <ul className="nav navbar-nav flex-row pull-xs-right">

          <li className="nav-item">
            <Link to="/" className="nav-link">
              <span className={pathname === '/' ? 'fw-bolder' : ''}>Users</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/question" className="nav-link">
              <span className={pathname === '/question' ? 'fw-bolder' : ''}>Questions</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/answer" className="nav-link">
              <span className={pathname === '/answer' ? 'fw-bolder' : ''}>Answers</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )}</Observer>
}

export default Header;
