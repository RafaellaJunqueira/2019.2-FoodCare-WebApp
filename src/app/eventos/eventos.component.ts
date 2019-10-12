import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Evento } from './evento.interface';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  items: Evento[];
  error: any;

  constructor(
    private api: ApiService,
    private router: Router 
  ){
    moment.locale('pt-BR');
  }

  ngOnInit() {
    this.api.getEvento().subscribe(
      (items: Evento[]) => this.items = items,
      (error: any) => this.error = error
    );
  }
  delete(id: number) {
    this.api.deleteEvento(id).subscribe(
      (success: any) => this.items.splice(
        this.items.findIndex(item => item.id === id)
      )
    );
  }

  // edit(id:number){
  //   this.api.
  // }

  getFormateDate(date) {
    return moment(date).format('LLL');
  }

}
