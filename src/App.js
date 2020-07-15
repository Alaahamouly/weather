import React, { Component } from 'react';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "10e43d3bf2f757a47fb74b83e31d4bf2";

//http://api.openweathermap.org/data/2.5/weather?q=cairo,egypt&appid=e36ed364400282e43250b6c4c0274d44

class App extends Component {

  state= {
    temperature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    erorr: ''
  }


  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
    const data = await api.json();

    if(city && country) {
      this.setState({
        temperature: ((data.main.temp) - 273).toFixed(0),
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        erorr: ''
      })
    } else {
      this.setState({
        temperature: '',
        city: '',
        country: '',
        humidity: '',
        description: '',
        erorr: 'Please enter Data'
      }) 
    }
  }


  render() {
    return (
      <div className="wrapper">
        <div className="form-container">
          <Form getWeather={this.getWeather}/>
          <Weather 
            temperature= {this.state.temperature}
            city= {this.state.city}
            country= {this.state.country}
            humidity= {this.state.humidity}
            description= {this.state.description}
            error= {this.state.erorr}
          />
        </div>
      </div>
    );
  }
}

export default App;
