import { FabricControllerService } from './fabric-controller.service';
import { BaseComponent } from './base/base.component';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { fabric } from 'fabric';

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
    private fabricControllerService: FabricControllerService
  ) {
    super();
  }

  //#endregion

  //#region Methods

  public ngAfterViewInit() {
    // this.canvas = new fabric.Canvas('canvas');
    this.fabricControllerService.createCanvasWorkspace('canvas');

    // window.addEventListener('paste', (e: any) => {
    //   this.pasteImage(e);
    // });

    // this.canvas.on('mouse:wheel', (opt: any) => {
    //   const delta = opt.e.deltaY;
    //   let zoom = this.canvas.getZoom();
    //   zoom *= 0.999 ** delta;
    //   if (zoom > 10) zoom = 10;
    //   if (zoom < 0.1) zoom = 0.1;
    //   this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    //   opt.e.preventDefault();
    //   opt.e.stopPropagation();
    // });
  }

  // public pasteImage(e: any): void {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const items = e.clipboardData.items;

  //   //Loop through files
  //   for (var i = 0; i < items.length; i++) {
  //     if (items[i].type.indexOf('image') == -1) continue;
  //     const file = items[i];
  //     const imageData = file.getAsFile();
  //     const objUrl = window.URL || window.webkitURL;
  //     const img = new Image();
  //     img.src = objUrl.createObjectURL(imageData);

  //     fabric.Image.fromURL(
  //       img.src,
  //       (img) => {
  //         this.canvas.add(img);
  //       },
  //       {
  //         lockRotation: true,
  //       }
  //     );
  //   }
  // }

  public exportJSON(): void {
    // fabric.Image.prototype.toObject = (function (toObject) {
    //   return function () {
    //     return fabric.util.object.extend(toObject.call(this), {
    //       src: this.toDataURL(),
    //       width: this.width * this.scaleX,
    //       height: this.height * this.scaleY,
    //       scaleX: 1,
    //       scaleY: 1,
    //       hasRotatingPoint: false,
    //       lockRotation: true,
    //     });
    //   };
    // })(fabric.Image.prototype.toObject);

    // // To object data
    // const json_data = JSON.stringify(this.canvas.toJSON());
    // console.log(json_data);

    // localStorage.setItem('canvasSection', json_data);
    this.fabricControllerService.exportJSON();
  }

  public importJSON(): void {
    // const json_data = localStorage.getItem('canvasSection');
    // console.log(json_data);
    // this.canvas.clear();

    // this.canvas.loadFromJSON(
    //   json_data,
    //   this.canvas.renderAll.bind(this.canvas)
    // );
    this.fabricControllerService.importJSON();
  }
  //#endregion
}
