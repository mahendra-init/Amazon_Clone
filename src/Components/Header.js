import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Header() {
  const [ { basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      signOut(auth);
    }
  }
  return (
    <div className="header">
      <Link to='/'>
        <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" className='header_logo' alt="" />
      </Link>

      <div className="header_search">
        <input type="text" className="header_searchInput" />
        <SearchIcon className='header_searchIcon'/>
      </div>

      <div className="header_nav">
        <Link to={!user && '/login'}>
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_optionLine1">Hello {user ? user.email : 'Guest'}</span>
            <span className="header_optionLine2">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>


        <Link to='/orders'>
          <div className="header_option">
            <span className="header_optionLine1">Returns</span>
            <span className="header_optionLine2">& Orders</span>
          </div>
        </Link>

          <div className="header_option">
            <span className="header_optionLine1">Your</span>
            <span className="header_optionLine2">Prime</span>

          </div>

          <Link to='/checkout'>
            <div className="header_optionBasket">
                <ShoppingBasketIcon />
                <span className='header_optionLine2 header_basketCount'>{basket?.length}</span>
            </div>
          </Link>
      </div>
    </div>
  )
}

export default Header