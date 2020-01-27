import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = "0f9c8772bf65ed48e3722267ada9e0e3";

  constructor(private http: HttpClient) { }
  
  LoadCurrentWeather(zip: string): Observable<any> {
    // Call for Current Weather
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?q="+zip+"&units=metric&appid=0f9c8772bf65ed48e3722267ada9e0e3" );
  }

  // Call for Forecast Weather
  LoadForecastWeather(zip: any): Observable<any> {
    return this.http.get("https://api.openweathermap.org/data/2.5/forecast?q="+zip+",&units=metric&appid=0f9c8772bf65ed48e3722267ada9e0e3" );
  }
}
