import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ LoginComponent} from './components/login/login.component';
import{ SignupComponent} from'./components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import{ ForgotComponent} from './components/forgot/forgot.component'
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

import { NotesComponent } from './components/notes/notes.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { SearchComponent } from './components/search/search.component';
import { LableWindowComponent } from './components/lable-window/lable-window.component';
import { QuestionAndAnswerComponent } from './components/question-and-answer/question-and-answer.component';







const routes:Routes=
[
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
 
  { path: 'login', component : LoginComponent},
  { path: 'signup', component : SignupComponent},
  { path: 'forgot', component:ForgotComponent },
  {path : 'resetpassword/:id', component:ResetpasswordComponent},
  
  { path: 'home', component : HomeComponent,
  
  children:[
       { path: '', redirectTo: 'notes', pathMatch: 'full' },
       { path:'notes',component: NotesComponent},
       { path: 'reminders',component: RemindersComponent},
       { path :'archive', component : ArchiveComponent},
       { path:'trash',component : TrashComponent},
       {path : 'search',component : SearchComponent},
       {path : 'label/:params',component: LableWindowComponent},
       {path : 'notes/:noteId/questionAndAnswers',component: QuestionAndAnswerComponent},
      
      
  ]
}
  


  
]



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
 
})
export class AppRoutingModule { }
