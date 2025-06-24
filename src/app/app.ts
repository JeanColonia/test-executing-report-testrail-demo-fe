import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UrlForm } from './url-form/url-form';

declare var FinisherHeader: any;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UrlForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit{
  protected title = 'NITRO QA - Testrail Reporter';
  
  ngAfterViewInit(): void {
  new FinisherHeader({
    "count": 29,
    "size": {
      "min": 10,
      "max": 120,
      "pulse": 0.2
    },
    "speed": {
      "x": {
        "min": 0.1,
        "max": 0.2
      },
      "y": {
        "min": 0.1,
        "max": 0.2
      }
    },
    "colors": {
      "background": "#003247",
      "particles": [
        "#ffffff",
        "#ffffff"
      ]
    },
    "blending": "overlay",
    "opacity": {
      "center": 0,
      "edge": 0.02
    },
    "skew": 0,
    "shapes": [
      "c"
    ]
  });

}
}
