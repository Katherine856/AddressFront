import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{

  @Input() lat!: number; //Latitud inicial
  @Input() lng!: number; //Longitud inicial
  @Input() draggableNew!: boolean; //Habilitar y desabilitar que se pueda mover el marcador
  @Input() heightNew!: string; //Altura del mapa

  @Output() newEventLat = new EventEmitter<number>(); //Enviar la latitud nueva
  @Output() newEventLng = new EventEmitter<number>(); //Enviar la longitud nueva
  
  ngOnInit(): void {
    this.options.center = {lat: this.lat, lng: this.lng}
    this.markerPosition = {lat: this.lat, lng: this.lng}
    this.height = this.heightNew;
    this.marker.draggable = this.draggableNew;
  }

  //Definirmos especificaciones del mapa
  height = '300px'
  zoom = 8;
  center: google.maps.LatLngLiteral
  info: google.maps.InfoWindow
  options: google.maps.MapOptions = {
    center: { lat: -34, lng: 151 },
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 1
  };

  //Definir el si el marcador se puede mover
  marker: google.maps.MarkerOptions = {
    draggable: false,
  }

  //Definir posición por defecto
  markerPosition: google.maps.LatLngLiteral = { lat: -34, lng: 151 };

  //Actualizar el mapa con el marcador seleccionado
  getGeo(event: google.maps.MapMouseEvent){
    if(this.marker.draggable == true){
      let newGeo = event.latLng?.toJSON()
      this.markerPosition = { lat: newGeo?.lat ?? 0, lng: newGeo?.lng ?? 0}
      this.newEventLat.emit(newGeo?.lat)
      this.newEventLng.emit(newGeo?.lng)
    }
  }
}
