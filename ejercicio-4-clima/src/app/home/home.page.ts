import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AlertController,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';

import { ClimaService } from '../services/clima.service';

interface RegistroClimaGuardado {
  latitud: number;
  longitud: number;
  temperatura: number;
  sensacionTermica: number;
  humedad: number;
  velocidadViento: number;
  fechaConsulta: string;
  fotografia: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardContent,
    IonSpinner,
    IonText
  ]
})
export class HomePage implements OnInit, OnDestroy {
  private readonly climaService = inject(ClimaService);
  private readonly alertController = inject(AlertController);
  private readonly storageKey = 'registrosClima';
  private readonly registroListener = () => this.actualizarTotalRegistros();

  totalRegistros = 0;
  cargando = false;
  mensajeError = '';

  ngOnInit(): void {
    this.actualizarTotalRegistros();
    window.addEventListener('clima-registro-cambio', this.registroListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('clima-registro-cambio', this.registroListener);
  }

  private obtenerRegistros(): RegistroClimaGuardado[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) ?? '[]');
    } catch {
      return [];
    }
  }

  private actualizarTotalRegistros(): void {
    this.totalRegistros = this.obtenerRegistros().length;
  }

  async consultarClima(): Promise<void> {
    this.cargando = true;
    this.mensajeError = '';

    try {
      const permisosUbicacion = await Geolocation.requestPermissions();

      if (permisosUbicacion.location !== 'granted') {
        throw new Error('Permiso de ubicación no concedido');
      }

      const posicion = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000
      });

      const latitud = posicion.coords.latitude;
      const longitud = posicion.coords.longitude;

      this.climaService.obtenerClimaPorCoordenadas(latitud, longitud).subscribe({
        next: (resultado) => {
          this.mostrarDialogo({
            latitud,
            longitud,
            temperatura: resultado.temperatura,
            sensacionTermica: resultado.sensacionTermica,
            humedad: resultado.humedad,
            velocidadViento: resultado.velocidadViento,
            fechaConsulta: new Date().toISOString(),
            fotografia: ''
          });
          this.cargando = false;
        },
        error: () => {
          this.mensajeError = 'No fue posible consultar el clima en este momento.';
          this.cargando = false;
        }
      });
    } catch {
      this.mensajeError = 'No fue posible obtener la ubicación del dispositivo.';
      this.cargando = false;
    }
  }

  private async mostrarDialogo(registro: RegistroClimaGuardado): Promise<void> {
    const dialogo = await this.alertController.create({
      header: 'Clima actual',
      message: `
        Latitud: ${registro.latitud.toFixed(4)}
        Longitud: ${registro.longitud.toFixed(4)}
        Temperatura actual: ${registro.temperatura.toFixed(1)} °C
        Sensación térmica: ${registro.sensacionTermica.toFixed(1)} °C<
        Humedad:${registro.humedad}%
        Velocidad del viento: ${registro.velocidadViento.toFixed(1)} km/h
      `,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        },
        {
          text: 'Registrar',
          handler: () => this.registrarClima(registro)
        }
      ]
    });

    await dialogo.present();
  }

  registrarClima(registro: RegistroClimaGuardado): void {
    const registros = this.obtenerRegistros();
    registros.push({ ...registro, fotografia: '' });
    localStorage.setItem(this.storageKey, JSON.stringify(registros));
    this.actualizarTotalRegistros();
    window.dispatchEvent(new Event('clima-registro-cambio'));
  }
}