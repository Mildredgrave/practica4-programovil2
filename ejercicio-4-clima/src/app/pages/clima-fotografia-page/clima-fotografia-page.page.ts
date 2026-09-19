import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonText,
  IonTitle,
  IonToolbar,
  ToastController
} from '@ionic/angular/standalone';

interface RegistroClima {
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
  selector: 'app-clima-fotografia-page',
  templateUrl: './clima-fotografia-page.page.html',
  styleUrls: ['./clima-fotografia-page.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonItem,
    IonList,
    IonText,
    IonButton
  ]
})
export class ClimaFotografiaPagePage implements OnInit, OnDestroy {
  readonly toastController = inject(ToastController);
  registros: RegistroClima[] = [];
  private readonly storageKey = 'registrosClima';
  private readonly registroListener = () => this.cargarRegistros();

  ngOnInit(): void {
    this.cargarRegistros();
    window.addEventListener('clima-registro-cambio', this.registroListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('clima-registro-cambio', this.registroListener);
  }

  private cargarRegistros(): void {
    try {
      this.registros = JSON.parse(localStorage.getItem(this.storageKey) ?? '[]');
    } catch {
      this.registros = [];
    }
  }

  private guardarRegistros(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.registros));
    window.dispatchEvent(new Event('clima-registro-cambio'));
  }

  async tomarFotografia(index: number): Promise<void> {
    try {
      const permisosCamara = await Camera.requestPermissions();

      if (permisosCamara.camera !== 'granted' || permisosCamara.photos !== 'granted') {
        throw new Error('Permiso de cámara o galería no concedido');
      }

      const foto = await Camera.getPhoto({
        quality: 85,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        saveToGallery: true
      });

      this.registros[index].fotografia = foto.dataUrl ?? '';
      this.guardarRegistros();

      const toast = await this.toastController.create({
        message: 'Fotografía guardada correctamente.',
        duration: 2200,
        color: 'success'
      });

      await toast.present();
    } catch {
      const toast = await this.toastController.create({
        message: 'No se pudo guardar la fotografía.',
        duration: 2200,
        color: 'danger'
      });

      await toast.present();
    }
  }
}
