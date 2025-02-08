import './App.css';
import Home from './Components/Home';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './css/App.css';
import Deploy from './Components/Deploy';
import Analytics from './Components/Analytics';
import { BrowserRouter as Router, Switch, Route, HashRouter,} from "react-router-dom";
import Navbar from './Components/Navbar';
import API from './Components/API';



function App() {

  const [isWalletInstalled, setIsWalletInstalled] = useState(false)
  const [account, setAccount] = useState(null)

  useEffect( () =>{
    if(window.ethereum){
      setIsWalletInstalled(true);
      connectWallet()
    }
  },[]);

    const connectWallet = async() =>{
        window.ethereum.request( {method: "eth_requestAccounts"})
        .then((accounts) => {
          setAccount(accounts[0]);
        }).catch( (e) => {
          alert(e)
        })
    }

    if(account === null){
      return (
        <div className="App">
          {
            isWalletInstalled ? (<button onClick={connectWallet} >Connect</button>) : (
              <p>Please Install Metamask Wallet first :) </p>
            )
          }
        </div>
      )
    }

    else{

      return (
         // <div className="App">
    //   <h1>Home</h1>
    // </div>
    <div className="App">
       
       
    {/* <p> Connected as : {account}</p> */}

    <HashRouter basename='/'>
    {/* <HashRouter > */}
    <div className="App">
  
      <Navbar/>

    <Switch>

        <Route exact path="/" component={Home}>
            {/* <Home/> */}
        </Route>
  

        <Route exact path="/Deploy" component={Deploy}> 
        </Route>

        <Route  path="/Analytics" component={Analytics}>
        </Route>

        <Route  path="/API" component={API}>
        </Route>

        
      </Switch>


    </div>
    </HashRouter>

  </div>

      );
      


    }


}

export default App;