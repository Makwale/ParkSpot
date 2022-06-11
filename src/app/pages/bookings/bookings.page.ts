/* eslint-disable @typescript-eslint/naming-convention */
import { Component, DoCheck, OnInit } from '@angular/core';
import { Booking, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ParkingLotService } from 'src/app/services/parking-lot/parking-lot.service';
import { ParkingLot } from 'src/app/models/parking-lot.modal';
import { forkJoin } from 'rxjs';

@Component({
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.css']
})
export class BookingsPage implements OnInit, DoCheck {
  user: User;
  isLoading: boolean;
  bookings: Booking[];
  parkingLots: ParkingLot[];
  constructor(
    private userService: UserService,
    private launchNavigator: LaunchNavigator,
    private toastController: ToastController,
    public alertController: AlertController,
    private parkingLotService: ParkingLotService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.getParkingLots();
  }

  getParkingLots() {
    this.parkingLotService.getParkingLots().subscribe(response => {
      this.parkingLots = (response.data as any).parkingLots;
    });
  }

  ngDoCheck(): void {
    this.user = this.userService.user;
    this.bookings = this.user?.bookings;
  }

  async cancel(booking: Booking) {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'You will not be able to revert this!',
      buttons: [
        {
          text: 'Continue',
          id: 'confirm-button',
          handler: () => {
            this.isLoading = true;
            const parkingLot: ParkingLot = this.parkingLots.find(pl => pl.id === booking.parkingLot.id);
            const parking = {
              number_available_spot: parkingLot.availableSpots + 1
            };
            forkJoin({
              booking: this.userService.deleteBooking(booking.id),
              pl: this.parkingLotService.updateAvailableSpaces(parkingLot.id, parking)
            }).subscribe(async response => {
              this.isLoading = false;
              const toast = await this.toastController.create({
                message: 'Booking is canceled',
                duration: 4000,
                color: 'success'
              });
              toast.present();
              this.userService.userQueryRef.refetch();
              this.parkingLotService.parkingLotsQueryRef?.refetch();
              this.parkingLotService.parkingLotQueryRef?.refetch();
            }, async error => {
              this.isLoading = false;
              const toast = await this.toastController.create({
                message: error,
                duration: 4000,
                color: 'danger'
              });
              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  navigate(booking: Booking) {
    navigator.geolocation.getCurrentPosition(pos => {
      this.launchNavigator.navigate([booking.parkingLot.geo.lat, booking.parkingLot.geo.lon], {
        start: [pos.coords.latitude, pos.coords.longitude]
      }).catch(async error => {
        const toast = await this.toastController.create({
          message: error,
          duration: 4000,
          color: 'danger'
        });
        toast.present();
      });
    });
  }

}
