import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './vistas/home/home.component';
import { AcercaComponent } from './vistas/acerca/acerca.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JsonComponent } from './vistas/json/json.component';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AcercaComponent,
    JsonComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'', component:HomeComponent},
      {path:'acerca', component:AcercaComponent},
      {path:'json', component:JsonComponent},
      {path:'**', redirectTo:'/', pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
