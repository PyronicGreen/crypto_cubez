import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';
import { version } from 'react-dom';
import 'boxicons';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
    })
    .catch(error => alert('yoo error!'));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">
        <box-icon size='lg' type='solid' name='cube' animation='burst'></box-icon> Welcome to Crypto Cubes <box-icon size='lg' type='solid' name='cube' animation='burst'></box-icon></h1>
        <h3 className="coin-text">Your home for finding real-time cryptocurrency prices.</h3>
        <h3 className="coin-text">Search for a currency<box-icon className='fart' size='md' name='down-arrow-alt' animation='tada-hover' ></box-icon></h3>
        <form>
          <input 
          type="text" 
          className="coin-input" 
          placeholder="Search" 
          onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin 
            key={coin.id} 
            name={coin.name} 
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}

export default App;
