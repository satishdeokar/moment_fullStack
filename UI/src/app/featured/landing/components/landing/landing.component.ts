import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/http-services/http.service';
import { ApiUrls } from 'src/app/config/api-urls.enum';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {

  name = 'Your';
  constructor(
    private title: Title,
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Home');
  }
  login(){
    this.router.navigate(['/user/user/login']);
  }
  signUp(){
    this.router.navigate(['/user/user/create-user']);
  }
}
