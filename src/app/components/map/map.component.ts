import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{

  @Input() lat!: number;
  @Input() lng!: number;
  @Input() draggableNew!: boolean;
  @Input() heightNew!: string;

  @Output() newEventLat = new EventEmitter<number>();
  @Output() newEventLng = new EventEmitter<number>();
  
  ngOnInit(): void {
    this.options.center = {lat: this.lat, lng: this.lng}
    this.markerPosition = {lat: this.lat, lng: this.lng}
    this.height = this.heightNew;
    console.log(this.draggableNew)
    this.marker.draggable = this.draggableNew;
  }

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

  marker: google.maps.MarkerOptions = {
    draggable: false,
  }

  markerPosition: google.maps.LatLngLiteral = { lat: -34, lng: 151 };

  getGeo(event: google.maps.MapMouseEvent){
    if(this.marker.draggable == true){
      let newGeo = event.latLng?.toJSON()
      this.markerPosition = { lat: newGeo?.lat ?? 0, lng: newGeo?.lng ?? 0}
      this.newEventLat.emit(newGeo?.lat)
      this.newEventLng.emit(newGeo?.lng)
    }
  }
}
