import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MainService } from '../shared/services/main.service';
import { PlaneInterface } from '../shared/models/plane-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig , MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';
import { DataShareService } from '../shared/services/data-share.service'

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
  trigger:string;  

  constructor(
    private MainService: MainService, 
    private toastr: ToastrService,
    public dialog: MatDialog,
    private data: DataShareService
  ){}

  ngOnInit() {
    this.get();
    this.newRegister();
  }

  newRegister() {
    this.data.currentMessage.subscribe(trigger => this.trigger = trigger);
    console.log(this.trigger);
  }

  get() {
    this.dataSource = this.MainService.list('').pipe(
      map((data: HttpResponse<PlaneInterface[]>) => data.body)
    );
  }

  delete(id: number) {
    this.MainService.delete(id).subscribe(() => {
      this.toastr.success('', 'Deletado com sucesso!');
      this.get();
    });
  }

  openDialog(element): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        elementEdit: element
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.toastr.success('Editado com sucesso!');
      (async () => { 
        await this.delay(100);
        this.get();
      })();
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}