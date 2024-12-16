import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiodataComponent } from './biodata.component';
import { BiodataService } from '../../services/biodata.service';



@NgModule({
  declarations: [
    BiodataComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [BiodataService]
})
export class BiodataModule { }
