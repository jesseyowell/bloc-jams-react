import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      
      <div className='App'>
        <header>
          <h1 className='BlocJams'>Bloc Jams</h1>
        </header> 
        <nav className="nav-container">
          <Link to='/' className='landing-link'>Home</Link>
          <Link to='/library' className='library-link'>Library</Link>
        </nav>  
      <main>
        <Route exact path='/' component={Landing} />
        <Route path='/library' component={Library} />
        <Route path='/album/:slug' component={Album} />
      </main>
     </div> 
    );
  }
}

export default App;
