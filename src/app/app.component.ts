import {Component} from '@angular/core';
import {MainService} from './core/services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'museum-api';

  constructor(private mainService: MainService) {

  }
}
