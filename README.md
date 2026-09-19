# Practica 4 - Programación Móvil 2

## Descripción del proyecto

Este proyecto consiste en una aplicación móvil desarrollada con Ionic + Angular + Capacitor para consultar el clima actual de la ubicación del usuario.

La app permite:

- Obtener la ubicación actual del dispositivo mediante GPS.
- Consultar el clima usando coordenadas geográficas.
- Mostrar información del clima actual, como temperatura, sensación térmica, humedad y velocidad del viento.
- Registrar consultas en almacenamiento local.
- Tomar una fotografía relacionada con el clima y almacenarla junto con el registro.
- Ejecutarse como aplicación híbrida en Android.

La aplicación principal se encuentra dentro de la carpeta [ejercicio-4-clima](ejercicio-4-clima).

## Plugins utilizados

Los plugins de Capacitor integrados en el proyecto son los siguientes:

- @capacitor/core
- @capacitor/app
- @capacitor/geolocation
- @capacitor/camera
- @capacitor/haptics
- @capacitor/keyboard
- @capacitor/status-bar
- @capacitor/android
- @capacitor/ios

Además, la aplicación utiliza Ionic Angular como framework principal para la interfaz de usuario y la navegación entre pantallas.

## Permisos configurados

### Android

En el archivo AndroidManifest.xml se configuraron los siguientes permisos:

- android.permission.INTERNET
- android.permission.ACCESS_COARSE_LOCATION
- android.permission.ACCESS_FINE_LOCATION
- android.hardware.location.gps
- android.permission.READ_EXTERNAL_STORAGE (hasta Android 32)
- android.permission.WRITE_EXTERNAL_STORAGE (hasta Android 29)

Estos permisos permiten acceder a Internet, consultar la ubicación del dispositivo y gestionar la cámara/galería para guardar fotos relacionadas con el clima.



## Estructura relevante

- [ejercicio-4-clima/src/app/home/home.page.ts](ejercicio-4-clima/src/app/home/home.page.ts): lógica para consultar clima por ubicación.
- [ejercicio-4-clima/src/app/pages/clima-fotografia-page/clima-fotografia-page.page.ts](ejercicio-4-clima/src/app/pages/clima-fotografia-page/clima-fotografia-page.page.ts): acceso a la cámara y gestión de fotografías.
- [ejercicio-4-clima/android/app/src/main/AndroidManifest.xml](ejercicio-4-clima/android/app/src/main/AndroidManifest.xml): permisos de Android.

