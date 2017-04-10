import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Restaurant } from '../../models/model.restaurant';

@Component({
  selector: 'modal-component',
  templateUrl: './modal.component.html',
  styleUrls: [ './modal.component.css' ]
})
export class ModalComponent {
  @Input() header: string;
  @Input() body: string;
  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter();

  private confirm() {
    this.isConfirmed.emit(true);
  }

  private close() {
    this.isConfirmed.emit(false);
  }
}
