import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './pages/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  
  NavbarModule, 
  WavesModule, 
  ButtonsModule, 
  CheckboxModule, 
  InputsModule, 
  IconsModule, 
  CardsModule,
  DropdownModule,
  CollapseModule,
  ModalModule
} from 'angular-bootstrap-md'
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { CommentsComponent } from './pages/comments/comments.component';
import { PostsComponent } from './pages/posts/posts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    CommentsComponent,
    PostsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    CheckboxModule,
    InputsModule.forRoot(), 
    IconsModule,
    CardsModule,
    DropdownModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    CollapseModule,
    ModalModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
