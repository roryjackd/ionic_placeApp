import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, LoadingController, ToastController } from "ionic-angular";
import { Location } from "../../models/locations";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { SetLocationPage } from "../set-location/set-location";


@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
   location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;


  constructor(private modalCtrl: ModalController,
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private camera: Camera) {}

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage,
      {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition().then((resp) => {
          loader.dismiss();
          this.location.lat = resp.coords.latitude;
          this.location.lng = resp.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
           loader.dismiss();
           const toast = this.toastCtrl.create({
            message: 'Could not get location, please pick it manually!',
            duration: 2500
            });
            toast.present();
          }
         );
        }
     
    onTakePhoto() {
      
    }
}
