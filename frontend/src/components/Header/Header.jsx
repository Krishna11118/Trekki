import React, { useRef, useEffect, useContext } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logoGif2.gif'
import './Header.css';
import { AuthContext } from '../../context/AuthContext'
// import  headerImg from '../../assets/images/headerimg.png'

const nav__links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/gallery',
    display: 'Gallery'
  },
  {
    path: '/tours',
    display: 'Tours'
  },

]



const Header = () => {

  const handleLogo = () =>  window.location = '/';

  const headerRef = useRef(null)
  const menuRef = useRef(null)

  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)


  const userData=  JSON.parse(localStorage.getItem('data'))
  

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
    localStorage.clear()

  }

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current?.classList.add('sticky__header')
      } else {
        headerRef.current?.classList.remove('sticky__header')
      }
    })
  }

  useEffect(() => {
    stickyHeaderFunc()

    return window.removeEventListener('scroll', stickyHeaderFunc)
  })

  const toggleMenu = () =>  menuRef.current.classList.toggle('show__menu')

  

  return <header className="header"  >
 
    <Container>
      <Row>
        <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/* logo  */}
          <div onClick={handleLogo} className="logo disable-selection">
            <img src={logo} alt="logo of the website" />
          </div>
         
           {/* logo end  */}

        {  /* menu start */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu d-flex align-items-center gap-5">
              {
                nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ""}>{item.display}</NavLink>
                  </li>
                ))
              }
            </ul>  
          </div>

         { /* menu end */}
        { /* menu start */}
          <div className="nav__right d-flex align-items-center gap-4">
            <div className="nav__btns d-flex align-items-center gap-4">

              { userData ? (
                <>
                 
                  <h5 className="mb=0">{userData?.username.toUpperCase()}</h5>

                  <Button className="btn btn-dark"
                    onClick={logout}>Logout
                  </Button>
                </> 
                ):(
                  <>
                  <Button className='btn secondary__btn login_button'>
                    <Link to='/login'>Login
                    </Link>
                  </Button>
                  <Button className='btn primary__btn'>
                    <Link to='/register'>Register
                    </Link>
                  </Button> 
                </>
                )
              }

            </div>
            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-2-line"></i>
            </span>

          </div>
        </div>
      </Row>
    </Container>
  </header>



}

export default Header