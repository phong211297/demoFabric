import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit, OnDestroy {
  //#region Properties

  // Unsubscribe subject
  private _unsubscribe$ = new Subject<boolean>();

  //#endregion

  //#region Constructor
  public constructor() {}

  //#endregion

  //#region Methods
  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.unsubscribe();
  }

  //#endregion
}
