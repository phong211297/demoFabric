import { BaseComponent } from './base/base.component';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { fabric } from 'fabric';
import { FabricControllerService } from './fabric-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements AfterViewInit {
  //#region Properties

  // Page title
  public title = 'my-app';

  canvas: any;

  //#endregion

  //#region Constructor

  public constructor(
    protected httpClient: HttpClient,
    private fabricControlService: FabricControllerService
  ) {
    super();
  }

  //#endregion

  //#region Methods

  public ngAfterViewInit() {
    this.fabricControlService.createCanvasWorkspace('canvas');
  }

  public exportJSON(): void {
    this.fabricControlService.exportJSON();
  }

  public importJSON(): void {
    this.fabricControlService.importJSON();
  }
  //#endregion
}
