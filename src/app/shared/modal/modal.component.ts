import {Component, OnInit, Inject} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MainService } from '../services/main.service';
import { PlaneInterface } from '../models/plane-interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
      private MainService: MainService,
      private toastr: ToastrService,
      @Inject(MAT_DIALOG_DATA) data
    )
    {
      this.elementEdit = data.elementEdit;
    }

  messageEdit() {this.toastr.success('', 'Editado com sucesso!');}

  ngOnInit() {

  }

  save() {
    this.MainService.edit(this.elementEdit.id , this.elementEdit).subscribe();
    this.messageEdit();
    this.dialogRef.close();
  }

  close() {
      this.dialogRef.close();
  }
}
