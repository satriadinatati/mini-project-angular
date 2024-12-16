import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BiodataService {

  constructor() { }

  getDataProfile(){
    return {
      name: 'Satriadinata',
      phone: '08123456789',
      email: 'email@mail.com',
      hobbies: ['fishing', 'reading', 'swimming']
    }
  }
  
}
