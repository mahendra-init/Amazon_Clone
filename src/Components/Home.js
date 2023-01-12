import React from 'react'
import './Home.css';
import Product from './Product';

function Home() {
  return (
    <div className="home">
        <div className="home_container">
            <img src="https://static.lpnt.fr/images/2022/11/10/23827003lpw-23827009-article-jpg_9170228_660x287.jpg" alt="" className='home_image' />

            <div className="home_row">
                <Product 
                id='21325423'
                title='The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback – 6 October 2011' 
                price={29.99} 
                image='https://m.media-amazon.com/images/I/81RCff1NpnL._AC_UY218_.jpg' 
                rating={5}
                />
                <Product 
                id='1512513'
                title="Tecno Phantom X2 5G Stardust Grey (8GB RAM,256GB Storage) | World's 1st 4nm Dimensity 9000 5G Processor | Dual Curved AMOLED Display | 64MP RGBW Camera" 
                price={290.99} 
                image='https://m.media-amazon.com/images/I/418v3eb9NZL._SX300_SY300_QL70_FMwebp_.jpg' 
                rating={4}
                />

            </div>
            <div className="home_row">
                <Product 
                id='84846543'
                title='Coolife Nylon Hard 20 inch SUITCASE (CL-20In-Multi_multi color)' 
                price={23.99} 
                image='https://m.media-amazon.com/images/I/81UfKnF-S3L._SY879_.jpg' 
                rating={3}
                />
                
                <Product 
                id='25565231'
                title='WildHorn Brown RFID Blocking Leather Wallet for Men I Ultra Strong Stitching I 6 Credit Card Slots I 2 Currency Compartments I 1 Coin Pocket' 
                price={20.04} 
                image='https://images-eu.ssl-images-amazon.com/images/I/81iGAcKzHVL._AC_UL450_SR450,320_.jpg' 
                rating={4}
                />

                <Product 
                id='564656462'
                title='Da URBAN® Jackson High Back Revolving Leatherette Ergonomic Home & Office Executive Chair with High Comfort Seating, Height Adjustable Seat & Heavy Duty Metal Base (Wine)' 
                price={59.99} 
                image='https://m.media-amazon.com/images/I/611LHt9wcaL._SX679_.jpg' 
                rating={4}
                />
            </div>
            <div className="home_row">
                <Product 
                id='56511563'
                title='Amazon Brand - Umi Paddling Pool, 208cm Giant Inflatable Deep Pool, Family Swimming Pool with Inflatable Soft Floor for Backyard, Garden, Indoor(Blue)' 
                price={45.99} 
                image='https://m.media-amazon.com/images/I/31m43yLB4wL._SX300_SY300_QL70_FMwebp_.jpg' 
                rating={2}
                />
            </div>
        </div>
    </div>
  )
}

export default Home