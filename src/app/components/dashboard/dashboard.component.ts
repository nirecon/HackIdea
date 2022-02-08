import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { DataServices } from 'src/app/services/data-service.service';
import { LoginServices } from 'src/app/services/login-service.service';
import { ProductService } from 'src/app/services/product.service';
import { RelationService } from 'src/app/services/relation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;
  public ideas: any = [];

  constructor(
    private loginService: LoginServices,
    private router: Router,
    private productService: ProductService,
    private dataService: DataServices,
    private relationService: RelationService
  ) {}

  ngOnInit(): void {
    this.user = this.loginService.getUserInfo();
    this.fetchAllIdeas();
  }

  fetchAllIdeas() {
    var result = this.productService.getIdeas();
    result.then((Response: any) => {
      if (Response.val()) {
        var items = Response.val();
        this.ideas = items.map((x: any) => x);
        this.ideas.map((x: any) => {
          x.voted = false;
        });
      }

      var relationsSup = this.relationService.getIdeas(this.user.empId);
      relationsSup.then((relations: any) => {
        if (relations.val()) {
          this.ideas.forEach((element: any) => {
            for (let i = 0; i < relations.val().length; i++) {
              if (element.ideaId === relations.val()[i]) {
                element.voted = true;
              }
            }
          });
        }
      });
    });
  }

  addIdea() {
    this.router.navigateByUrl('add-Idea');
  }

  upVote(value: number, itemId: any) {
    this.ideas.map((x: any) => {
      if (x.ideaId === itemId) {
        x.upVotes = x.upVotes + value;
        x.voted = !x.voted;
        this.productService.updateUpVotes(value, itemId, this.user.empId);
        //this.productService.updateRelation(value, itemId, this.user.empId);
      }
    });
  }

  public trackByFn(index: number, item: any) {
    return item.ideaId;
  }

  sortByUpVotes() {
    this.ideas.sort(this.compare);
  }

  compare(a: any, b: any) {
    if (a.upVotes < b.upVotes) {
      return 1;
    }
    if (a.upVotes > b.upVotes) {
      return -1;
    }
    return 0;
  }

  sortByCreatedOn() {
    this.ideas.sort(
      (a: any, b: any) =>
        new Date(b.CREATE_TS).getTime() - new Date(a.CREATE_TS).getTime()
    );
  }
}
