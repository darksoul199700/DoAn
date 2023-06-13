import { lyl, LyTheme2, StyleRenderer, WithStyles } from '@alyle/ui';
import { ImgCropperConfig, ImgCropperErrorEvent, ImgCropperEvent, ImgCropperLoaderConfig, LyImageCropper } from '@alyle/ui/image-cropper';
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const STYLES = () => ({
  cropper: lyl `{
    max-width: 503px
    height: 300px
  }`,
  sliderContainer: lyl `{
    text-align: center
    max-width: 400px
    margin: 14px
  }`
});

@Component({
  selector: 'app-modal-edit-image',
  templateUrl: './modal-edit-image.component.html',
  styleUrls: ['./modal-edit-image.component.css'],
  providers: [StyleRenderer]
})
export class ModalEditImageComponent implements WithStyles, OnInit, AfterViewInit {


  classes = this.sRenderer.renderSheet(STYLES);
  croppedImage?: string;
  scale = 3;
  ready: boolean;
  minScale: number;
  @ViewChild(LyImageCropper) cropper: LyImageCropper;
  myConfig: ImgCropperConfig = {
    // autoCrop: true,
    width: 150, // Default `250`
    height: 150, // Default `200`
    fill: '#ff2997', // Default transparent if type = png else #000
    type: 'image/png', // Or you can also use `image/jpeg`
  };

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalEditImageComponent>,
    private theme: LyTheme2,
    private _platform: Platform,
    readonly sRenderer: StyleRenderer,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  croppedImg: string;
  ngOnInit(): void {
  }

  ngAfterViewInit() {

    // demo: Load image from URL and update position, scale & rotate
    // this is supported only for browsers
    if (this._platform.isBrowser) {
      const config: ImgCropperLoaderConfig = {
        scale: 0.745864772531767,
        xOrigin: 642.380608078103,
        yOrigin: 236.26357452128866,
        // areaWidth: 100,
        // areaHeight: 100,
        rotation: 0,
        originalDataURL: 'https://firebasestorage.googleapis.com/v0/b/alyle-ui.appspot.com/o/img%2Flarm-rmah-47685-unsplash-1.png?alt=media&token=96a29be5-e3ef-4f71-8437-76ac8013372c'
      };
      this.cropper.loadImage(config);
    }

  }

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
    this.data.urlImage = e.dataURL;
    console.log(e)
  }

  onLoaded(e: ImgCropperEvent) {
    console.log('img loaded', e);
  }
  onError(e: ImgCropperErrorEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
  }
}
