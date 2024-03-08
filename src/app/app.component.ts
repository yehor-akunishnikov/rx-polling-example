import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AsyncPipe, JsonPipe} from '@angular/common';

import {map, Observable, startWith} from 'rxjs';

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
export class AppComponent {
  public settingsForm: FormGroup<SettingsForm> = new FormGroup({
    id: new FormControl('ID'),
    isSuccessProgress: new FormControl(true),
    canObtainData: new FormControl(true),
  });

  public inputPayload$: Observable<InitPayload> = this.settingsForm.valueChanges.pipe(
    map(() => this.settingsForm.getRawValue()),
    startWith(this.settingsForm.getRawValue()),
  );
}
