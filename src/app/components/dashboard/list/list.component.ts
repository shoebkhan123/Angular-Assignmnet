import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dashboard } from '../dashboard.model';
import { DashbordService } from '../dashbord.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  LISTS: Dashboard[] = [];

  constructor( private router: Router, private dashboardService: DashbordService ) { }

  ngOnInit(): void {
    this.getList();

  }

  getList() {
    this.dashboardService.getList().subscribe(res=> {
      this.LISTS = res;
    }, err => console.error(err)
    )
  }

  onDelete(listId: string) {
    this.dashboardService.deleteList(listId).subscribe(() => {
      this.getList();
    })
  }

  onupdate(listId: string) {
    this.router.navigate(['/dashboard/register'], { queryParams: { listId: listId } });
  }


}
