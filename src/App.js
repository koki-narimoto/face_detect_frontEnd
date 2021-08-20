import React from 'react';
import ParticleBackground from './Components/Particles/ParticleBackground'
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank'
import ImageLinkForm from './Components/LinkForm/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import SignIn from './Components/Navigation/SignIn'
import Register from './Components/Navigation/Register'
import './App.css';

const initialState = {
  input:'',
  imageURL: '',
  box:{},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends React.Component{
  constructor(){
    super();
    this.state= initialState;
  }

  // componentDidMount(){
  //   fetch('http://localhost:3000')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    // console.log(data);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box : box});
  }

  onInputChange = (event) => {
    // gets the actual value being passed in via input
    // console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then( response => {
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route : route})
  }
 
  render() {
    const {isSignedIn, imageURL, route, box} = this.state;
    return (
      <div className="App">
        <ParticleBackground/>
        <div className = 'absPosition'>
            
            <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
            { route === 'home'
              ? <div> 
                  <Logo />
                  <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
                  <ImageLinkForm onInputChange = {this.onInputChange}
                                onButtonSubmit = {this.onButtonSubmit}/>
                  <FaceRecognition box = {box} imageURL = {imageURL}/>
                </div>
              : (
                route === 'signin'
                ? <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
                : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
              )
            }
        </div>
      </div>
    );
  }  
}

export default App;
