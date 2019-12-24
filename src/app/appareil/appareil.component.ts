import { Component, OnInit, Input } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {
@Input() appareilName: string;
@Input() apparaeilStatus: string;
@Input() index: number;
@Input() id: number;

constructor(private appareilService: AppareilService) { }

  ngOnInit() {
  }

  getStatus(){
    return this.apparaeilStatus;
  }
  getColor(){
    if(this.apparaeilStatus === 'allumé'){
      return 'green';
    }
    return 'red';
  }

  onSwitch() {
    if(this.apparaeilStatus === 'allumé') {
      this.appareilService.switchOffOne(this.index);
    } else if(this.apparaeilStatus === 'éteint') {
      this.appareilService.switchOnOne(this.index);
    }
}
}
