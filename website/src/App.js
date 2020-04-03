import React,{Component} from 'react';
import Header from './components/header'
import Main from './components/Main'
import Footer from './components/footer'
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return ( <React.Fragment>
              <Router>
                <Header />
                <Main />
                <Footer/>
              </Router>
          </React.Fragment> );
}
 
export default App;