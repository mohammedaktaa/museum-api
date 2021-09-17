import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MainService} from '../../../../core/services/main.service';
import {Department} from '../../../../core/interfaces';
import SwiperCore, {Navigation, Pagination} from 'swiper/core';
import {forkJoin} from 'rxjs';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {
  departments: Department[] = [];
  query = '';

  constructor(private mainService: MainService, private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getDepartments();
  }

  search(): void {
    this.getObjectByDepartments(this.query);
  }

  getObjectByDepartments(query: string): void {
    this.departments.forEach((dep => {
      this.mainService.getObjectsByDepartment(dep.departmentId, query).subscribe(objects => {
        if (!objects.objectIDs.length) {
          dep.objects = [];
          return;
        }
        const observers = objects.objectIDs.map(id => this.mainService.getObject(id));
        forkJoin(observers).subscribe(allObjs => {
          dep.objects = allObjs;
          this.ref.detectChanges();
        });
      });
    }));
  }

  private getDepartments(): void {
    this.mainService.getDepartments().subscribe((departments) => {
      this.departments = departments;
      this.getObjectByDepartments('');
    });
  }

}
