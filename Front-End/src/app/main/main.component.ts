import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private http: Http, private route: Router) { }

  ngOnInit() {
    this.tokenValidation()
  }

  tokenValidation(){

    const tokenSession = sessionStorage.getItem("token");
    const tokenLocal = localStorage.getItem("token")

    if(!tokenSession && !tokenLocal ){
      this.route.navigate(['/login']);
    }
    else{
      // jika token session null maka ambil tokenlocal
      if(tokenSession==null){
        let header = new Headers({"Authorization":"Bearer "+tokenLocal});
        let options = new RequestOptions({headers:header});
        this.http.post("http://localhost:3000/api/validatetoken",{},options)
        .subscribe(
          result =>{
            console.log(result.json())
          },
          error=>{
            localStorage.removeItem("token");
            this.route.navigate(['/login'])
          }
        )
      }
      else{

        let header = new Headers({"Authorization":"Bearer "+tokenSession});
        let options = new RequestOptions({headers:header});
        this.http.post("http://localhost:3000/api/validatetoken",{},options)
        .subscribe(
          result =>{
            console.log(result.json())
          },
          error=>{
            sessionStorage.removeItem("token");
            this.route.navigate(['/login'])
          }
        )

      }
    }
  }

}
