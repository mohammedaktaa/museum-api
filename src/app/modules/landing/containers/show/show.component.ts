import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MainService} from '../../../../core/services/main.service';
import {ModalService} from '../../../../core/services/modal.service';
import {MuseumObject} from '../../../../core/interfaces';

// import Swiper core and required modules
import SwiperCore, {Navigation, Thumbs} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Thumbs]);

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowComponent implements OnInit {
  thumbsSwiper: any;
  object: MuseumObject = {} as MuseumObject;

  constructor(private route: ActivatedRoute, private mainService: MainService, private modalService: ModalService,
              private router: Router, private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.mainService.getObject(params.id).subscribe(object => {
          this.modalService.open('department-modal');
          this.object = object;
          console.log(this.object)
          this.ref.detectChanges();
        });
      }
    });
  }

  close(): void {
    this.modalService.close();
    this.router.navigate(['/']);
  }

}
