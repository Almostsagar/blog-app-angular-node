import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../services/authguard-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[AuthGuard]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
