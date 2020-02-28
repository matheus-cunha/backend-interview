import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from '../shared/services/main.service';
import { PlaneInterface } from '../shared/models/plane-interface';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})

export class PainelComponent {
  title = 'proj-endpoint';
  aeronave: PlaneInterface = {} as PlaneInterface;

  constructor(private MainService: MainService) {

  }

  save() {
    this.MainService.register(this.aeronave).subscribe(() => alert('Salvo com sucesso!'));
  }
}
