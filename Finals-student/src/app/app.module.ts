import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StudentComponentComponent } from './student-component/student-component.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponentComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
