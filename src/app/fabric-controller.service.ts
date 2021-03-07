import { Injectable } from '@angular/core';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root',
})
export class FabricControllerService {
  //#region Properties

  // Canvas workspace
  private _canvasWorkspace: any;

  // Get canvas workspace
  public get canvasWorkspace(): any {
    return this._canvasWorkspace;
  }

  // Set canvas workspace
  public set canvasWorkspace(canvasWorkspace: any) {
    this._canvasWorkspace = canvasWorkspace;
  }

  //#endregion

  //#region Constructor
  public constructor() {}

  //#endregion

  //#region Methods

  // Create canvas workspace
  public createCanvasWorkspace(
    id: string,
    shouldSupportParsing: boolean = true,
    shouldSupportZoom: boolean = true
  ): void {
    // Create workspace
    this.canvasWorkspace = new fabric.Canvas(id);

    // Parsing event
    if (shouldSupportParsing) {
      window.addEventListener('paste', (e: any) => {
        this.pasteImage(e);
      });
    }

    // Zooming event
    if (shouldSupportZoom) {
      this.canvasWorkspace.on('mouse:wheel', (opt: any) => {
        const delta = opt.e.deltaY;
        let zoom = this.canvasWorkspace.getZoom();

        // Set zoom percent
        zoom *= 0.999 ** delta;
        if (zoom > 10) zoom = 10;
        if (zoom < 0.1) zoom = 0.1;
        this.canvasWorkspace.zoomToPoint(
          { x: opt.e.offsetX, y: opt.e.offsetY },
          zoom
        );
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
    }
  }

  // Paste image feature
  public pasteImage(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    const items = event.clipboardData.items;

    //Loop through files
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') == -1) continue;
      const file = items[i];
      const imageData = file.getAsFile();
      const objUrl = window.URL || window.webkitURL;
      const img = new Image();
      img.src = objUrl.createObjectURL(imageData);

      fabric.Image.fromURL(
        img.src,
        (img) => {
          this.canvasWorkspace.add(img);
        },
        {
          lockRotation: true,
        }
      );
    }
  }

  // Export json feature
  public exportJSON(): void {
    fabric.Image.prototype.toObject = this.createImageObject.call(
      fabric.Image.prototype,
      fabric.Image.prototype.toObject
    );
    // To object data
    const json_data = JSON.stringify(this.canvasWorkspace.toJSON());

    localStorage.setItem('canvasSection', json_data);
  }

  // Create image object
  public createImageObject(toObject: any): any {
    return function () {
      return fabric.util.object.extend(toObject.call(this), {
        src: this.toDataURL(),
        width: this.width * this.scaleX,
        height: this.height * this.scaleY,
        scaleX: 1,
        scaleY: 1,
        hasRotatingPoint: false,
        lockRotation: true,
      });
    };
  }

  // Import json feature
  public importJSON(): void {
    const json_data = localStorage.getItem('canvasSection');
    console.log(json_data);
    this.canvasWorkspace.clear();

    this.canvasWorkspace.loadFromJSON(
      json_data,
      this.canvasWorkspace.renderAll.bind(this.canvasWorkspace)
    );
  }
  //#endregion
}
