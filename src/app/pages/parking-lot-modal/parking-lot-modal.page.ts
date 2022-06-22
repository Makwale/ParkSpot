/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { ParkingLot, Pricing } from 'src/app/models/parking-lot.modal';
import { ParkingLotService } from 'src/app/services/parking-lot/parking-lot.service';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { render } from 'creditcardpayments/creditCardPayments';

@Component({
  templateUrl: './parking-lot-modal.page.html',
  styleUrls: ['./parking-lot-modal.page.css']
})
export class ParkingLotModalPage implements OnInit {
  @Input() id: string;
  pricingsForm: FormGroup;
  parkingLot: ParkingLot;
  isLoading: boolean;
  pricings: Pricing[];
  paypal: any;
  isDisabled: boolean;
  isPaymentSuccessful: boolean;
  isPayingOnline = {
    display: 'none'
  };
  constructor(
    private parkingService: ParkingLotService,
    private toastController: ToastController,
    private userService: UserService,
    private launchNavigator: LaunchNavigator,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.paypal = {
        id: '#paypal',
        currency: 'ZAR',
        value: '0',
        onApprove: async () => {
          this.isPayingOnline = {
            display: 'none'
          };
          const toast = await this.toastController.create({
            message: 'Payment was successful',
            duration: 4000,
            color: 'success'
          });
          toast.present();
          this.isPaymentSuccessful = true;
        }
    };

    this.pricingsForm = this.fb.group({
      price: [null, [Validators.required]],
      payOnline: [false]
    });
    this.getParkingLot();
  }

  getParkingLot() {
    this.parkingService.getParkingLot(this.id).subscribe({
      next: ((response) => {
        this.parkingLot = (response.data as any).parkingLot;
        this.pricings = this.parkingLot.pricings;
        console.log(this.pricings);
        render(this.paypal);
      }),
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

  async onPayOnlineChange() {
    if (!this.userService.user) {
      const toast = await this.toastController.create({
        message: 'Sign in and try again',
        duration: 4000,
        color: 'warning'
      });
      toast.present();
      return;
    }
    if (this.pricingsForm.value.payOnline) {
      this.isPayingOnline = {
        display: 'block'
      };
    } else {
      this.isPayingOnline = {
        display: 'none'
      };

    }

  }

  onSelectDuration(){
    this.paypal.value = String(this.pricingsForm.value.price * 0.06);
    localStorage.setItem('price', String(this.pricingsForm.value.price * 0.06));
    console.log(String(localStorage.getItem('price')));
  }

  async book() {
    console.log(this.pricingsForm.value);
    if (!this.userService.user) {
      const toast = await this.toastController.create({
        message: 'Sign in and try again',
        duration: 4000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    if (!this.pricingsForm.valid) {
      const toast = await this.toastController.create({
        message: 'Select parking duration',
        duration: 4000,
        color: 'danger'
      });
      toast.present();
      return;
    }

    if (this.pricingsForm.value.payOnline && !this.isPaymentSuccessful) {
      const toast = await this.toastController.create({
        message: 'Make payment and try again',
        duration: 4000,
        color: 'danger'
      });
      toast.present();
      return;
    }
    this.isLoading = true;
    let booking: any = {
      user_id: this.userService.user.id,
      parking_lot_id: this.id,
      amount: this.pricingsForm.value.price.price,
      duration: this.pricingsForm.value.price.duration
    };

    if (this.isPaymentSuccessful) {
      booking = {
        ...booking,
        payments: {
          data: {
            user_id: this.userService.user.id,
            amount: this.pricingsForm.value.price
          }
        }
      };
    }
    this.parkingService.createBooking(booking).subscribe({
      next: ((response) => {
        const parking = {
          number_available_spot: this.parkingLot.availableSpots - 1
        };
        this.parkingService.updateAvailableSpaces(this.id, parking).subscribe({
          next: (async () => {
            this.isLoading = false;
            this.parkingService.parkingLotQueryRef.refetch();
            this.parkingService.parkingLotsQueryRef.refetch();
            this.userService.userQueryRef.refetch();
            const toast = await this.toastController.create({
              message: 'Booking is successful',
              duration: 4000,
              color: 'success'
            });
            toast.present();
          }),
          error: (async (error) => {
            this.isLoading = false;
            const toast = await this.toastController.create({
              message: error.message,
              duration: 4000,
              color: 'danger'
            });
            toast.present();
          })
        });
      }),
      error: (async (error) => {
        this.isLoading = false;
        const toast = await this.toastController.create({
          message: error.message,
          duration: 4000,
          color: 'danger'
        });
        toast.present();
      })
    });
  }

  navigate() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.launchNavigator.navigate([this.parkingLot.geo.lat, this.parkingLot.geo.lon], {
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
