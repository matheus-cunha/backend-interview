import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MainService } from '../shared/services/main.service';
import { PlaneInterface } from '../shared/models/plane-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})

export class TabelaComponent implements OnInit {

  displayedColumns: string[] = ['id' , 'marca' , 'modelo' , 'ano' , 'disponibilidade' , 'excluir' ];
  dataSource: Observable <PlaneInterface[]>;

  constructor(private MainService: MainService) {
  }

  ngOnInit() {
    this.dataSource = this.MainService.list('').pipe(
      map((data: HttpResponse<PlaneInterface[]>) => data.body)
    );
  }

}