import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PainelComponent } from './painel/painel.component';
import { TabelaComponent } from './tabela/tabela.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './shared/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PainelComponent,
    TabelaComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClientModule,
    TabelaComponent
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class AppModule { }
