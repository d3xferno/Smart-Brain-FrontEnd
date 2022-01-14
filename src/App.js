import './App.css';
import React,{Component} from 'react';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';
import Nav from './components/Navigation/Nav';
import Logo from './components/Logo/Logo';
import ImgLinkForm from './components/ImgLink/ImgLinkForm';
import Rank from './components/Ranks/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import 'tachyons';


const app = new Clarifai.App({
  apiKey:'2e2f10ee2b79402882cc8f643efb1248'
});

const particleOptions = {
    particles: {
      number:{
        value : 120,
        density:{
          enable : true,
          value_area: 800
        }
      }
    }
}

class App extends Component{
  constructor(){
    super();
    this.state = {
      input:'',
      imageUrl:'',
      box: {},
      route:'signin',
      isSignedIn:false,
    }
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }
  onButtonSubmit = () =>{
    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({isSignedIn:false});
    }else if(route === 'home'){
      this.setState({isSignedIn:true});
    }
    this.setState({route:route});
  }

  render(){
    return (
        <div className="App">
          <Particles className='particles'
              params={particleOptions} />
          <Nav isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>  
          { this.state.route === 'home'?
          <div>       
          <Logo />
          <Rank />
          <ImgLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
          <FaceRecognition box = {this.state.box} imageUrl = {this.state.imageUrl}/>
          </div>
          :(
            this.state.route === 'signin'
            ?<Signin onRouteChange={this.onRouteChange}/>
            :<Register onRouteChange={this.onRouteChange}/>
          )
          }
        </div>
          );
  }
}
export default App;
