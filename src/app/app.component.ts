import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  //#region Properties

  // Page title
  public title = 'my-app';

  canvas: any;

  //#endregion

  //#region Constructor

  public constructor(protected httpClient: HttpClient) {}

  //#endregion

  //#region Methods

  public ngAfterViewInit() {
    this.canvas = new fabric.Canvas('canvas');
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
    });

    // "add" rectangle onto canvas
    this.canvas.add(rect);

    window.addEventListener('paste', (e: any) => {
      this.pasteImage(e);
    });
  }

  public pasteImage(e: any): void {
    e.preventDefault();
    e.stopPropagation();
    const items = e.clipboardData.items;

    //Loop through files
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') == -1) continue;
      const file = items[i];
      const imageData = file.getAsFile();
      const objUrl = window.URL || window.webkitURL;
      const img = new Image();
      img.src = objUrl.createObjectURL(imageData);

      fabric.Image.fromURL(img.src, (img) => {
        this.canvas.add(img);
      });
    }
  }

  public exportJSON(): void {
    fabric.Image.prototype.toObject = (function (toObject) {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          src: this.toDataURL(),
          width: this.width * this.scaleX,
          height: this.height * this.scaleY,
          scaleX: 1,
          scaleY: 1,
        });
      };
    })(fabric.Image.prototype.toObject);

    // To object data
    const json_data = JSON.stringify(this.canvas.toDatalessJSON());
    console.log(json_data);

    localStorage.setItem('canvasSection', json_data);
  }

  public importJSON(): void {
    const json_data = localStorage.getItem('canvasSection');
    console.log(json_data);
    this.canvas.clear();

    this.canvas.loadFromJSON(
      json_data,
      this.canvas.renderAll.bind(this.canvas)
    );
  }
  //#endregion
}
