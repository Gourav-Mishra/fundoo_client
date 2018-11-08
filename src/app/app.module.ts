import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule, MatSnackBarModule,  } from '@angular/material';
import { MatRadioModule, MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule, MatCheckboxModule, MatListModule, MatGridListModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { SlidePanelComponent } from './components/slide-panel/slide-panel.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotComponent } from './components/forgot/forgot.component'
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';

import { DashboardComponent} from './components/dashboard/dashboard.component';

import { NotesComponent } from './components/notes/notes.component';
import{ RemindersComponent} from './components/reminders/reminders.component';
import{ ArchiveComponent } from './components/archive/archive.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RemindBtnComponent } from './components/remind-btn/remind-btn.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { ChangeColorComponent } from './components/change-color/change-color.component';
import { AddImageComponent } from './components/add-image/add-image.component';
import { ArchiveBtnComponent } from './components/archive-btn/archive-btn.component';
import { MoreBtnComponent } from './components/more-btn/more-btn.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { HttpService } from './service/http/http.service';
import { AuthGuard} from './auth.guard';

import { NoteCollectionComponent } from './components/note-collection/note-collection.component';
import { TrashComponent } from './components/trash/trash.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';
import { AddLablesComponent } from './components/add-lables/add-lables.component';
import {MatChipsModule} from '@angular/material/chips';
import { SearchPipe } from './search.pipe';
import { SearchComponent } from './components/search/search.component';
import { LabelSearchPipe } from './label-search.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LableWindowComponent } from './components/lable-window/lable-window.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MatNativeDateModule} from '@angular/material'






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SlidePanelComponent,
    HomeComponent,
    ForgotComponent,
    ResetpasswordComponent,
    DashboardComponent,
    NotesComponent ,
    RemindersComponent,
    ArchiveComponent,
    RemindBtnComponent,
    CollaboratorComponent,
    ChangeColorComponent,
    AddImageComponent,
    ArchiveBtnComponent,
    MoreBtnComponent,
    AddNoteComponent,
   
    NoteCollectionComponent,
    TrashComponent,
    PopupComponent,
    AddLablesComponent,
    SearchPipe,
    SearchComponent,
    LabelSearchPipe,
    LableWindowComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MatSnackBarModule,
    MatSidenavModule,
    LayoutModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    MatChipsModule,
    ImageCropperModule,
    MatDatepickerModule,
    MatNativeDateModule
   



  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpService,AuthGuard],
  bootstrap: [AppComponent],
  entryComponents:[PopupComponent,AddLablesComponent]
})
export class AppModule { }
