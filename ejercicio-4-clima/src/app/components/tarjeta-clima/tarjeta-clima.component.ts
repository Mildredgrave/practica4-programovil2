import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow
} from '@ionic/angular/standalone';

import { ClimaActual } from '../../services/clima.service';

@Component({
  selector: 'app-tarjeta-clima',
  standalone: true,
  templateUrl: './tarjeta-clima.component.html',
  styleUrls: ['./tarjeta-clima.component.scss'],
  imports: [
    DatePipe,
    DecimalPipe,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class TarjetaClimaComponent {
  @Input({ required: true })
  clima!: ClimaActual;
}