import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AsyncPipe, JsonPipe} from '@angular/common';

import {BehaviorSubject, Observable} from 'rxjs';

import {ProcessPollingComponent} from 'user-polling';
import {InitPayload} from 'data-layers';

export interface SettingsForm {
  id: FormControl<string>,
  isSuccessProgress: FormControl<boolean>,
  canObtainData: FormControl<boolean>,
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, RouterLink, ProcessPollingComponent, ReactiveFormsModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public settingsForm: FormGroup<SettingsForm> = new FormGroup({
    id: new FormControl('ID'),
    isSuccessProgress: new FormControl(true),
    canObtainData: new FormControl(true),
  });

  private settingsState = new BehaviorSubject<InitPayload>(this.settingsForm.getRawValue());

  public initPayload$: Observable<InitPayload> = this.settingsState.asObservable();

  public ngOnInit(): void {
    this.settingsForm.valueChanges.subscribe((initPayload: InitPayload) => {
      this.settingsState.next(initPayload);
    });
  }
}
