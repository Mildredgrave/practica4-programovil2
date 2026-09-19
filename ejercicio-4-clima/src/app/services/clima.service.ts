import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Pais {
  nombre: string;
  capital: string;
  latitud: number;
  longitud: number;
}

export interface ClimaActual {
  pais: string;
  capital: string;
  temperatura: number;
  sensacionTermica: number;
  humedad: number;
  velocidadViento: number;
  fechaHora: string;
}

interface RespuestaOpenMeteo {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://api.open-meteo.com/v1/forecast';

  obtenerClima(pais: Pais): Observable<ClimaActual> {

    const params = new HttpParams()
      .set('latitude', pais.latitud.toString())
      .set('longitude', pais.longitud.toString())
      .set(
        'current',
        [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'wind_speed_10m'
        ].join(',')
      )
      .set('timezone', 'auto');

    return this.http
      .get<RespuestaOpenMeteo>(this.apiUrl, { params })
      .pipe(
        map((respuesta) => ({
          pais: pais.nombre,
          capital: pais.capital,
          temperatura: respuesta.current.temperature_2m,
          sensacionTermica: respuesta.current.apparent_temperature,
          humedad: respuesta.current.relative_humidity_2m,
          velocidadViento: respuesta.current.wind_speed_10m,
          fechaHora: respuesta.current.time
        }))
      );
  }

  obtenerClimaPorCoordenadas(
    latitud: number,
    longitud: number
  ): Observable<ClimaActual> {

    const params = new HttpParams()
      .set('latitude', latitud.toString())
      .set('longitude', longitud.toString())
      .set(
        'current',
        [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'wind_speed_10m'
        ].join(',')
      )
      .set('timezone', 'auto');

    return this.http
      .get<RespuestaOpenMeteo>(this.apiUrl, { params })
      .pipe(
        map((respuesta) => ({
          pais: 'Ubicación actual',
          capital: 'GPS',
          temperatura: respuesta.current.temperature_2m,
          sensacionTermica: respuesta.current.apparent_temperature,
          humedad: respuesta.current.relative_humidity_2m,
          velocidadViento: respuesta.current.wind_speed_10m,
          fechaHora: respuesta.current.time
        }))
      );
  }
}