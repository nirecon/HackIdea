import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataServices } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({
    empId: new FormControl(null, [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl(null, [Validators.required]),
  });
  constructor(private dataService: DataServices) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.signUpForm.valid) {
      var value = this.signUpForm.getRawValue();
      this.dataService.writeUserData(value);
    }
  }
}
