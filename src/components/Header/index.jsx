import { Link, useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../../app/api/apiSlice';
import React from 'react';
import Logo from '../../assets/img/argentBankLogo.png';
import './_header.scss';

const HeaderElements = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('jwtToken')
  const { data: profile, isLoading, isError } = useGetProfileQuery(undefined, { skip: !token })

  const handeLogout = () => {
    localStorage.removeItem('jwtToken')
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
        {token ? (
          <div className="user_loggedin">
            <div className="user_avatar">
              <i className='fa fa-user-circle'></i>
              <Link to='/user' className='main-nav-item'>
              <p>{profile?.firstName || 'User'}</p>
              </Link>
            </div>
            <Link to='/'
              onClick={handeLogout}
              className="main-nav-item"
              aria-label="Sign out"
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </div>
        ) : (
          <Link to="/login" className="main-nav-item">
            <i className='fa fa-user-circle padR'></i>
            Sign In
          </Link>
        )}
    </nav>
  )
}

const Header = React.memo(HeaderElements)
export default Header
