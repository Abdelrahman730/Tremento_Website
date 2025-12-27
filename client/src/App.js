import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'

import Header from './landing/header';
import Footer from './landing/footer';
import Error from './landing/error';

import Home from './landing/home';
import Menu from './landing/menu';
import Signin from './landing/signin';
import Signup from './landing/signup';
import Checkout from './landing/checkout';
import Summary from './landing/summary';

function App() {
  return (
    <Router>
      <Header/>

      <Routes>
        <Route path = '/' element = { <Home/> } />
        <Route path = '/menu' element = {<Menu/> } />
        <Route path = '/signin' element = {<Signin/> } />
        <Route path = '/signup' element = {<Signup/> } />
        <Route path = '/checkout' element = {<Checkout/> } />
        <Route path = '/summary' element = {<Summary/> } />

        <Route path = '*' element = {<Error/> } />
      </Routes>
      
      <Footer/>
    </Router>
  );
}

export default App;
