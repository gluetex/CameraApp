import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

interface ImageData {
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  clickedImage!: string;
  images: ImageData[] = []; 

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
  };

  constructor(private camera: Camera) {}

  captureImage() {
    this.camera.getPicture(this.options).then(
      (imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;

        const imageDataObject: ImageData = {
          imageUrl: base64Image,
        };
        this.images.push(imageDataObject);

        this.clickedImage = base64Image;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
