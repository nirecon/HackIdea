import { Component, OnInit } from '@angular/core';
import { DataServices } from 'src/app/services/data-service.service';
import { LoginServices } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dataService: DataServices,
    private loginService: LoginServices
  ) {}
  ideas: any = [];
  ngOnInit(): void {
    this.loginService.isLoggedIn$.subscribe((x) => {
      if (x) {
        this.fetchAllIdeas();
      }
    });
  }

  fetchAllIdeas() {
    this.dataService.getIdeas();
    this.dataService.idesList$.subscribe((response) => {
      this.ideas = response;
    });
  }
}
