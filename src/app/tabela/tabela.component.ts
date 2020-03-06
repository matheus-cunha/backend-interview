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
  search: ''; 

  constructor(
    private MainService: MainService, 
    private toastr: ToastrService,
    public dialog: MatDialog,
    private dataShareService: DataShareService
  ){}

  ngOnInit() {
    this.dataShareService.getRefresh().subscribe((value: boolean) => {
      if (value) {
        this.get();
      }
    });
  }
  
  buscar() { 
    this.dataSource = this.MainService.list(this.search).pipe(
      map((data: HttpResponse<PlaneInterface[]>) => data.body
      ));
    this.search = ''; 
  }

  get() {
    this.dataSource = this.MainService.list('').pipe(
      map((data: HttpResponse<PlaneInterface[]>) => data.body)
    );
  }

  delete(id: number) {
    this.MainService.delete(id).subscribe(() => {
      this.toastr.success('', 'Registro apagado!');
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
      this.toastr.success('Edição concluída!');
      (async () => { 
        await this.delay(100);
        this.get();
      })();
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  // openDialog(element: any): void {
  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
    
  //   dialogConfig.data = {
  //       elementEdit: cloneDeep(element)
  //   };

  //   this.dialog.open(ModalComponent, dialogConfig).afterClosed().subscribe(() => {
  //     this.get();
  //   });
  // }

}