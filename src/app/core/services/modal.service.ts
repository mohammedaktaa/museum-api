import {Injectable} from '@angular/core';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  myModal: any;

  constructor() {
  }

  open(id): void {
    this.myModal = new bootstrap.Modal(document.getElementById(id));
    this.myModal.show();
  }

  close(): void {
    this.myModal.hide();
  }
}
