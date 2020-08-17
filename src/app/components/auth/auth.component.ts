import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }

  onLogin(form) {
     const username =  localStorage.getItem('username');
     const password =  localStorage.getItem('password');

    console.log(form)
    console.log(username)
    console.log(password)
    if(username === form.username && password === form.password ) {
      this.router.navigateByUrl('dashboard/list');
      // form.reset();
    } else {
      alert('Invalid User');
    }
  }

  onRegister(form) {
    if(form.invalid || form.password != form.confirmPassword) {
      alert('Passwords must be same!')
      return
    }

    localStorage.setItem('username', form.username);
    localStorage.setItem('password', form.password);
    // form.reset();
    alert('Resitration success, please switch to login!')

  }

}
