import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AsyncPipe, JsonPipe, KeyValuePipe, NgForOf, NgIf} from '@angular/common';

import {BehaviorSubject} from 'rxjs';

import {UserData} from 'data-layers';

@Component({
  selector: 'app-data-alert',
  standalone: true,
  imports: [
    NgForOf,
    KeyValuePipe,
    JsonPipe,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './data-alert.component.html',
  styleUrl: './data-alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataAlertComponent {
  @Input() userData: UserData;
  @Input() isShowBtnDisabled = false;

  private showStateSubject = new BehaviorSubject(false);

  public isShown$ = this.showStateSubject.asObservable();

  public show(): void {
    this.showStateSubject.next(true);
  }

  public hide(): void {
    this.showStateSubject.next(false);
  }
}
