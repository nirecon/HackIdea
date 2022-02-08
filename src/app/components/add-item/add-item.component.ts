import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataServices } from 'src/app/services/data-service.service';
import { LoginServices } from 'src/app/services/login-service.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  user: any;
  ideaForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private productService: ProductService,
    private loginService: LoginServices
  ) {}

  ngOnInit(): void {
    this.user = this.loginService.getUserInfo();
  }

  back() {
    this.router.navigateByUrl('dashboard');
  }
  onSubmit() {
    if (this.ideaForm.valid) {
      var value = this.ideaForm.getRawValue();
      var item = this.productService.preFetchLastId();
      item.then((Response) => {
        let result: any;
        for (var item in Response.val()) {
          result = [...item];
        }
        let savedDataRespomse = this.productService.addItem(
          value,
          result,
          this.user.empId
        );
        savedDataRespomse.then((resp: any) => {
          this.router.navigateByUrl('dashboard');
        });
      });
    }
  }
}
