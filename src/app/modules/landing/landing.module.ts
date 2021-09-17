import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './containers/index/index.component';
import {RouterModule, Routes} from '@angular/router';
import {SwiperModule} from 'swiper/angular';
import {ShowComponent} from './containers/show/show.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'departments/:id',
        component: ShowComponent
      }
    ]
  }
];

@NgModule({
  declarations: [IndexComponent, ShowComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LazyLoadImageModule,
    SwiperModule,
    FormsModule
  ],
  exports: [RouterModule]
})
export class LandingModule {
}
