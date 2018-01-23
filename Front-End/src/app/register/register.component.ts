import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  checkbox = false
  submitError = false
  emailError = false

  constructor(private http: Http, private route: Router) { }

  ngOnInit() {
  }

  checkboxChecked(n) {
    if (n.target.checked) {
      this.checkbox = true
    } else {
      this.checkbox = false
    }
    console.log(this.checkbox)
  }

  register(f: NgForm) {

    if (f.value.username != null && f.value.username != "" && f.value.password != null && f.value.password != "" && f.value.email != null && f.value.email != "" && this.checkbox == true) {

      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(f.value.email)) {

        console.log(this.checkbox)

        let obj = {
          username: f.value.username,
          password: f.value.password,
          email: f.value.email,
        }
        console.log(f.value.email)

        let header = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: header });

        this.http.post("http://localhost:3000/api/user/register", obj, options)
          .subscribe(
          result => {
            this.route.navigate(["/login"]);
          },
          error => {
            console.log("Please Try Again")
          }
          )
      }else{
        this.emailError = true
        this.submitError = false
        console.log("Email Pattern Error")
      }
    }else {
      console.log("Please input all fields")
      this.submitError = true
      this.emailError = false
    }

  }



}
