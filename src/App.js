import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import Particles from 'react-particles-js';
import Signin from './components/Signin';
import Register from './components/Register';
import Data from './components/Data/Data';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component{

constructor() {
  super();
  this.state = {
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: ''
      }
  }
}
loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email
    }})
  }


onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

render(){
  const { isSignedIn, route } = this.state;
  return (
    <div className="App">

      <Particles className="particles"
              params={particlesOptions}
            />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route === 'home'
      ?  <div>
          <Logo />
          <Data />
        </div> : 
        (route === 'signin' ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
        
      }
    </div>
  );
}
}

export default App;
