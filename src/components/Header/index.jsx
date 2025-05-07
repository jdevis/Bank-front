import { Link, useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../../services/api';
import React from 'react';
import Logo from '../../assets/img/argentBankLogo.png';
import './_header.scss';

const HeaderElements = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')
  const { data: profile, isLoading, isError } = useGetProfileQuery(undefined, { skip: !token })

  const handeLogout = () => {
    localStorage.removeItem('jwtToken')
    sessionStorage.removeItem('jwtToken')
    navigate('/')
  }
  return (
    <nav className='main-nav'>
      <Link to='/' className='main-nav-logo'>
        <img
          className='main-nav-logo-image'
          src={Logo}
          alt='Argent Bank Logo'
        />
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          <div className="user_loggedin">
            <div className="user_avatar">
              <i className='fa fa-user-circle'></i>
              <p>{profile?.firstName || 'User'}</p>
            </div>
            <button
              onClick={handeLogout}
              className="logout-button"
              aria-label="Sign out"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="main-nav-item">
            <i className='fa fa-user-circle'></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

const Header = React.memo(HeaderElements)
export default Header
