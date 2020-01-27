import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import {WeatherModel} from '../models/weather.model';

import {ForecastData} from '../models/forecast-data.model';
import {ForecastDetails} from '../models/forecast-details.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit {
  zip: string;  
  weatherDetails: WeatherModel = new WeatherModel();
  forecastData : ForecastData;
  
  showCurrent: boolean = false;
  showForecast: boolean = false;
  
  constructor(private weatherService: WeatherService,) { }

  ngOnInit() {
  }

  loadCurrentWeather(){
    this.zip.toString;
    this.weatherService.LoadCurrentWeather(this.zip).subscribe(
      res => {
       // console.log("res",res);
        this.weatherDetails.cityName = res.name;
        this.weatherDetails.country = res.sys.country;
        this.weatherDetails.shortDescription = res.weather[0].main;
        this.weatherDetails.description = res.weather[0].description;
        this.weatherDetails.currentTemperature=   res.main.temp;
        this.weatherDetails.icon = res.weather[0].icon;
        this.weatherDetails.maxTemperature=res.main.temp_max;
         this.weatherDetails.minTemperature = res.main.temp_min;
        this.showCurrent = true;
      } 
    )
  }

  loadForecastWeather(){
    this.weatherService.LoadForecastWeather(this.zip).subscribe(
      res => {
       // console.log("Forecast res", res);

        this.forecastData = new ForecastData();
        this.forecastData.name = res.city.name;
        for(var i=7; i<res.list.length;i=i+8) {
          var details = new ForecastDetails();
          details.date = res.list[i].dt_txt;
          details.maxTemperature = res.list[i].main.temp_max;
          details.minTemperature = res.list[i].main.temp_min;
          details.shortDescription = res.list[i].weather[0].main;
          details.description = res.list[i].weather[0].description;
          details.icon = res.list[i].weather[0].icon;
          this.forecastData.details.push(details);
    }
    // this.showCurrent = false;
    this.showForecast = true;
      }
    )             
  }
}
