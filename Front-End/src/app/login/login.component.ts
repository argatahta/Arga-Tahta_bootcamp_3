import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //untuk memberitahu apakah checkbox terchecklist atau tidak
  checkbox = false
  //untuk memberitahu apakah submit error atau tidak, jika error maka error message akan pop up
  submitError = false
  usernameError = false
  

  constructor(private http: Http, private route: Router) { }

  ngOnInit() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  checkboxChecked(n) {
    if (n.target.checked) {
      this.checkbox = true
    } else {
      this.checkbox = false
    }
    console.log(this.checkbox)
  }

  login(f: NgForm) {

    let obj = {};
    if (f.value.usernameOrEmail == null || f.value.password == null || f.value.usernameOrEmail =="" || f.value.password == "") {
      console.log("All field must be filled")
      this.usernameError = true
    } else {


      //memastikan yang di input username atau email
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(f.value.usernameOrEmail)) {
        obj = {
          email: f.value.usernameOrEmail,
          password: f.value.password
        }
      } else {
        obj = {
          username: f.value.usernameOrEmail,
          password: f.value.password
        }
      }

      let header = new Headers({ "Content-Type": "application/json" });
      let options = new RequestOptions({ headers: header });

      this.http.post("http://localhost:3000/api/user/login", obj, options)
        .subscribe(
        result => {
          console.log(result.json());
          if (this.checkbox == true) {
            localStorage.setItem("token", result.json().token);
            localStorage.setItem("username", result.json().username)
          } else {
            sessionStorage.setItem("token", result.json().token);
            sessionStorage.setItem("username", result.json().username)
          }
          // untuk mereset ulang password dan username or email
          f.value.usernameOrEmail = null
          f.value.password = null
          this.submitError = false
          this.route.navigate(["/"]);
        },
        error => {
          this.submitError = true
          this.usernameError = false
          console.log("User Not Found");
        }
        )

    }
  }

}
