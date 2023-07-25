import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  getparamid: any;
  errormsg: any;
  sucessfulmsg: any;
  readdata: any;

  constructor(private service: ApiserviceService, private rout: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if (this.getparamid) {
      this.service.getSingleData(this.getparamid).subscribe((res) => {
        console.log(res, "res");
        this.userForm.patchValue({
          'name': res.data[0].name,
          'email': res.data[0].email,
          'number': res.data[0].number

        })
      })
    }

  }

  userForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'number': new FormControl('', Validators.required)

  })
  userSubmit() {
    debugger
    if (this.userForm.value) {
      console.log(this.userForm.value);
      this.service.createData(this.userForm.value).subscribe((res) => {
        console.log(res);
        this.userForm.reset();
        this.rout.navigate(['/read']);
        this.sucessfulmsg = res.message;
      });
    }
    else { this.errormsg = "All fields are Required"; }

  }
  userUpdate() {
    console.log(this.userForm.value, "Update User Data")
    if (this.userForm.value) {
      this.service.updateData(this.userForm.value, this.getparamid).subscribe((res) => {
        console.log(res, "resupdated");
        this.sucessfulmsg = res.message;
        this.rout.navigate(['/read']);
      })
    }
    else {
      this.errormsg = "All fields is required";
    }
  }
}
