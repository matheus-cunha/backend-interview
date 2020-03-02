import {Component, OnInit, Inject} from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { MainService } from '../services/main.service';
import { PlaneInterface } from '../models/plane-interface';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA , MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {

  form: FormGroup;
  elementEdit: PlaneInterface;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<ModalComponent>,
      @Inject(MAT_DIALOG_DATA) data) {

      this.elementEdit = data.elementEdit;
  }

  ngOnInit() {
    
  }

  save() {
      this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }

  // title = 'proj-endpoint';
  // aeronave: PlaneInterface = {} as PlaneInterface;

  // constructor(
  //   private MainService: MainService,
  //   private fb: FormBuilder,
  //   private dialogRef: MatDialogRef<CourseDialogComponent>,
  //   @Inject(MAT_DIALOG_DATA) data){this.description = data.description;}
  // ) {}

  // save() {
  //   this.MainService.register(this.aeronave).subscribe(() => alert('Salvo com sucesso!'));
  // }

}
