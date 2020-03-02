import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MainService } from '../shared/services/main.service';
import { PlaneInterface } from '../shared/models/plane-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';

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
    
  constructor(
    private MainService: MainService, 
    private toastr: ToastrService,
    public dialog: MatDialog
  ){}

  messageDelete() {this.toastr.success('', 'Deletado com sucesso!');}

  ngOnInit() {
    this.get();
  }

  get() {
    this.dataSource = this.MainService.list('').pipe(
      map((data: HttpResponse<PlaneInterface[]>) => data.body)
    );
  }

  delete(id: number) {
    this.MainService.delete(id).subscribe();
    this.messageDelete();
    this.get();
  }

  openDialog(element): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        elementEdit: element
    };

    this.dialog.open(ModalComponent, dialogConfig);
    this.get();
  }
}