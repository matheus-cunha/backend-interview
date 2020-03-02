import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MainService } from '../shared/services/main.service';
import { PlaneInterface } from '../shared/models/plane-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: [
    './tabela.component.css'
  ]
})

export class TabelaComponent implements OnInit {

  displayedColumns: string[] = ['id' , 'marca' , 'modelo' , 'ano' , 'disponibilidade' , 'editar' , 'excluir' ];
  dataSource: Observable <PlaneInterface[]>;

  constructor(private MainService: MainService , private toastr: ToastrService) {}

  registroApagado() {this.toastr.success('', 'Deletado com sucesso!');}

  ngOnInit() {
    this.dataSource = this.MainService.list('').pipe(
      map((data: HttpResponse<PlaneInterface[]>) => data.body)
    );
  }

  deletar(id: number) {
    this.MainService.delete(id).subscribe();
    this.registroApagado();
    // location.reload();
  }

  editar(id: number) {
    this.MainService.delete(id).subscribe(() => alert('Excluído com sucesso!'));
  }
}