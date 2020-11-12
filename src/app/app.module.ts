import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserFormComponent} from './components/user-form/user-form.component';
import {UserService} from './services/user.service';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
