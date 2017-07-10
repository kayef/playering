import {Component, Input} from '@angular/core';

@Component({
  selector: 'loading-container',
  templateUrl: './loading-container.component.html',
  styleUrls: ['./loading-container.component.css']
})
export class LoadingContainerComponent {

  @Input() loading:boolean;

  constructor() { }


}
