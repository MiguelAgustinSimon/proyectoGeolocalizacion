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
import { CsvComponent } from './vistas/csv/csv.component';
import { XmlComponent } from './vistas/xml/xml.component';
import { XlsComponent } from './vistas/xls/xls.component';
import { ShpComponent } from './vistas/shp/shp.component';
import { MapboxComponent } from './components/mapbox/mapbox.component';
import { TableComponent } from './components/table/table.component';
import { BitacoraComponent } from './vistas/bitacora/bitacora.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AcercaComponent,
    JsonComponent,
    CarouselComponent,
    CsvComponent,
    XmlComponent,
    XlsComponent,
    ShpComponent,
    MapboxComponent,
    TableComponent,
    BitacoraComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'', component:HomeComponent},
      {path:'acerca', component:AcercaComponent},
      {path:'json', component:JsonComponent},
      {path:'csv', component:CsvComponent},
      {path:'xml', component:XmlComponent},
      {path:'xls', component:XlsComponent},
      {path:'shp', component:ShpComponent},
      {path:'mapbox', component:MapboxComponent},
      {path:'bitacora', component:BitacoraComponent},
      {path:'**', redirectTo:'/', pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
