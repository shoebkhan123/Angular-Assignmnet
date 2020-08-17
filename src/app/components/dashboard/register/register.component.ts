import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashbordService } from '../dashbord.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  listId: string = null;

  constructor( private route: ActivatedRoute, private router: Router, private dashboardService: DashbordService) { }

  ngOnInit(): void {
    this.listId = this.route.snapshot.queryParamMap.get('listId');
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required])
    })

    if(this.listId) {
      this.dashboardService.getListById(this.listId).subscribe(list => {
        console.log(list);
        this.registerForm.patchValue({
          name: list.name,
          email: list.email,
          phone: list.phonenumbe,
          city: list.city,
        })
      })
    }

  }

  onRegister() {
    if(this.registerForm.invalid) {
      return
    }

    const name = this.registerForm.value.name;
    const email = this.registerForm.value.email;
    const phone = this.registerForm.value.phone;
    const city = this.registerForm.value.city;


    if(!this.listId) {
      this.dashboardService.addList(name, email, phone, city);
      this.router.navigateByUrl('dashboard/list');
    }  else {
      this.dashboardService.updateList( this.listId, name, email, phone, city).subscribe(() => {
        this.router.navigateByUrl('dashboard/list');
      })
    }




  }

}
