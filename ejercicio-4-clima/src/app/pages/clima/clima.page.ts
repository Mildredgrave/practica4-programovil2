import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';

import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

import { ClimaActual, ClimaService } from '../../services/clima.service';
import { TarjetaClimaComponent } from '../../components/tarjeta-clima/tarjeta-clima.component';

@Component({
  selector: 'app-clima',
  standalone: true,
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonSpinner,
    IonText,
    IonButton,
    TarjetaClimaComponent
  ]
})
export class ClimaPage {
  private readonly climaService = inject(ClimaService);

  clima?: ClimaActual;
  cargando = false;
  mensajeError = '';

  async consultarClima(): Promise<void> {
    this.cargando = true;
    this.clima = undefined;
    this.mensajeError = '';

    try {
      const posicion = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000
      });

      const latitud = posicion.coords.latitude;
      const longitud = posicion.coords.longitude;

      this.climaService.obtenerClimaPorCoordenadas(latitud, longitud).subscribe({
        next: (resultado) => {
          this.clima = resultado;
          this.cargando = false;
        },
        error: () => {
          this.mensajeError = 'No fue posible consultar el clima.';
          this.cargando = false;
        }
      });
    } catch {
      this.mensajeError = 'No fue posible obtener la ubicación del dispositivo.';
      this.cargando = false;
    }
  }
}
