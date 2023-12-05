import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { StudentdbService } from './studentdb.service';
import { CollegedbService } from './collegedb.service';
import { ProgramdbService } from './programdb.service';
import { StudentUpdateComponent } from './student-update/student-update.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    StudentUpdateComponent,
    
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [StudentdbService,CollegedbService,ProgramdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
