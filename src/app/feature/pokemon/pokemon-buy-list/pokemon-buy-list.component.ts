import { Component, OnInit } from '@angular/core';
import { RealtimeDatabaseService } from '../../../services/realtime-database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-buy-list',
  standalone: false,
  
  templateUrl: './pokemon-buy-list.component.html',
  styleUrl: './pokemon-buy-list.component.css'
})
export class PokemonBuyListComponent implements OnInit {

  buyList: any[] = [];

  constructor(private realtimeDb: RealtimeDatabaseService, private router: Router) { }

  async ngOnInit() {
    await this.fetchBuyList();
  }

  async fetchBuyList(){
    this.buyList = [];
    const buyObject = await this.realtimeDb.getFormSubmissions();

    // Konversi objek ke array menggunakan Object.entries()
    this.buyList = Object.entries(buyObject).map(([key, value]) => {
      return { id: key, ...(value ?? {}) };
    });

    console.log('PokemonBuyListComponent: ngOnInit called', this.buyList);
  }

  async delete(id: string){
    const userConfirmed = window.confirm('Are you sure?');
    if (userConfirmed) {
      await this.realtimeDb.deleteFormSubmission(id);
      await this.fetchBuyList();
      console.log('Item berhasil dihapus.');
    } else {
      console.log('Penghapusan dibatalkan oleh pengguna.');
    }
  }

  edit(id: string){
    this.router.navigate(['/list-buy/edit', id]);
  }

}
