import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';

function Header() {
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
          <div className="header_option">
            <span className="header_optionLine1">Hello Guest</span>
            <span className="header_optionLine2">Sign In</span>
          </div>

          <div className="header_option">
            <span className="header_optionLine1">Returns</span>
            <span className="header_optionLine2">& Orders</span>
          </div>

          <div className="header_option">
            <span className="header_optionLine1">Your</span>
            <span className="header_optionLine2">Prime</span>

          </div>

          <Link to='/checkout'>
            <div className="header_optionBasket">
                <ShoppingBasketIcon />
                <span className='header_optionLine2 header_basketCount'>0</span>
            </div>
          </Link>
      </div>
    </div>
  )
}

export default Header