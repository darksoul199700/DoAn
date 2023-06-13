import { LyExpansionIconModule } from '@alyle/ui';
import { LyButtonModule } from '@alyle/ui/button';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LySliderModule } from '@alyle/ui/slider';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalEditImageComponent } from './modal-edit-image.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LyImageCropperModule,
        LySliderModule,
        LyButtonModule,
        LyExpansionIconModule,
        MatDialogModule],
    declarations: [ModalEditImageComponent],
    exports: [ModalEditImageComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class ModalEditImageModule {}