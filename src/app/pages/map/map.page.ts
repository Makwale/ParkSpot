/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ParkingLot } from 'src/app/models/parking-lot.modal';
import { ParkingLotService } from 'src/app/services/parking-lot/parking-lot.service';
import { ParkingLotModalPage } from '../parking-lot-modal/parking-lot-modal.page';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';

declare const mapboxgl: any;
declare const MapboxGeocoder: any;
@Component({
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.css']
})
export class MapPage implements OnInit {
  map: any;
  parkingLots: ParkingLot[];
  constructor(
    private modalController: ModalController,
    private parkingService: ParkingLotService,
    private userService: UserService,
    private toastController: ToastController
  ) { }

  ngOnInit(): void {
  }

  ionViewDidEnter() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFudWVsbWFrd2FsZSIsImEiOiJja2hsc3lmYWUyZzRnMnRsNnY2NWIyeGR6In0.1MGnfpXj_dV2QBO3SchfqA';
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos.coords);
      this.map = new mapboxgl.Map({
        container: 'map',
        countries: 'za',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [pos.coords.longitude, pos.coords.latitude],
        zoom: 13
      });

      this.map.addControl(
        new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl
        })
      );
      console.log('test');
      this.getParkingLots();
    });
  }

  getParkingLots() {
    this.parkingService.getParkingLots().subscribe({
      next: ((response => {
        this.parkingLots = (response.data as any).parkingLots;
        console.log(this.parkingLots);
        this.parkingLots.forEach(parkingLot => {
          const div = window.document.createElement('div');
          div.id = parkingLot.id;
          div.addEventListener('click', async (event) => {
            const modal = await this.modalController.create({
              component: ParkingLotModalPage,
              initialBreakpoint: 0.5,
              cssClass: 'container',
              breakpoints: [0, 0.5, 1],
              componentProps: {
                id: parkingLot.id,
              }
            });
            return await modal.present();
          });
          const h1 = window.document.createElement('h6');
          h1.innerHTML = parkingLot.name;
          div.appendChild(h1);
          const p = window.document.createElement('p');
          const numberSpan = window.document.createElement('span');
          numberSpan.id = 'number';
          numberSpan.innerHTML = parkingLot.availableSpots.toString();
          p.appendChild(numberSpan);
          const pSpan = window.document.createElement('span');
          pSpan.innerHTML = 'space(s) available';
          p.appendChild(pSpan);
          // p.innerHTML = 'Hello world';
          div.appendChild(p);
          new mapboxgl.Popup({ offset: 'buttom', closeButton: false })
            .setDOMContent(div).addClassName('popup')
            .setLngLat([parkingLot.geo.lon, parkingLot.geo.lat])
            .addTo(this.map);
        });
      })),
      error: (async (error) => {
        const toast = await this.toastController.create({
          message: error.message,
          duration: 4000,
          color: 'danger'
        });
        toast.present();
      })
    });
  }

}
