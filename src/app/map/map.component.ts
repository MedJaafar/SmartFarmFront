import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../_services/connection.service';
import { AlertService } from '../_services/alert.service';
declare var ol: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  latitude: number;
  longitude: number;
  map: any;
  systemFarm : any;

  constructor(private connService : ConnectionService,private alertService: AlertService) { }
  
  ngOnInit() {
    // Get Longitude and Latitude from SessionStorage -> Stored on Dashboard Load
    this.latitude = Number(sessionStorage.getItem("latitude"));
    this.longitude = Number(sessionStorage.getItem("longitude"));
    this.getSystemDetails();
    // Map Settings
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 12
      })
    });
    this.addPoint(this.latitude, this.longitude);
  }

  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.addMarker(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(12);
  }

  addPoint(lat: number, lng: number) {
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "assets/img/pointerresz2.png"
        })
      })
    });
    this.map.addLayer(vectorLayer);
    }

    // System Details 
public getSystemDetails(){
  return this.connService.getCurrentSystemMonitor().subscribe((data: {}) => {
    this.systemFarm = data;
    console.log(this.systemFarm);
  },
  (err) => {console.log(err)
  this.alertService.error(err);});
  }


}
