import { Component } from '@angular/core';
import { BiodataService } from '../../services/biodata.service';

@Component({
  selector: 'app-biodata',
  standalone: false,
  
  templateUrl: './biodata.component.html',
  styleUrl: './biodata.component.css'
})
export class BiodataComponent {
  profileData: any;

  constructor(
    private BiodataService: BiodataService
  ) {
    this.profileData = this.BiodataService.getDataProfile();
  }
}
