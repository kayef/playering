import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {Parameters} from "../shared/models/parameters.model";
import {UserService} from "../shared/services/user.service";
import {UserParameterService} from "../shared/services/cognito/user-parameter.service";


const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private parameters: Array<Parameters> = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private userParameters: UserParameterService
  ) {}

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (result) => {
        if(result) {
          this.userParameters.getParameters()
            .subscribe((data) => {
              for (let key in data) {
                let parameter = new Parameters();
                parameter.name = data[key].getName();
                parameter.value = data[key].getValue();
                this.parameters.push(parameter);
              }
            });
        }
      }
    )

  }



}
