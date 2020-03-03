import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from '../shared/services/main.service';
import { PlaneInterface } from '../shared/models/plane-interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})

export class PainelComponent {
  title = 'proj-endpoint';
  aeronave: PlaneInterface = {} as PlaneInterface;

  constructor(
    private MainService: MainService,
    private toastr: ToastrService
  ){}

  messageSave() {this.toastr.success('', 'Salvo com sucesso!');}

  save() {
    this.messageSave();
    this.MainService.register(this.aeronave).subscribe();   
    // location.reload()
  }
}