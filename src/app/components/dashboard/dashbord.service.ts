import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { Dashboard } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  private regisration = new BehaviorSubject<Dashboard[]>([
    new Dashboard( 'fffnj2323n3', 'name here!', 'email here!', 97876554443, 'City Hetre!'),
  ]);

  constructor() { }


  /* Get registation list */
  getList() {
    return this.regisration.asObservable();
  }

  /* get registration by id */
  getListById(listId: string) {
    return this.regisration.pipe(
      take(1),
      map(lists => {
        return { ...lists.find(list => list.id == listId ) };
      })
    )
  }
     /* Add registration */
     addList(name: string, email: string, phone: number, city: string) {
      const newlist =  new Dashboard(Math.random().toString(), name, email, phone, city);
      return this.regisration.pipe(take(1)).subscribe(lists => {
        this.regisration.next(lists.concat(newlist));
      });
    }

 /* Delete  list by id */
 deleteList(listId: string) {
  return this.regisration.pipe(
    take(1),
    tap(lists => {
      this.regisration.next(lists.filter(list => list.id !== listId));
    })
  );
}


 /* update list by id */
 updateList(listId: string, name: string, email: string, phone: number, city: string) {
  return this.regisration.pipe(take(1), tap(lists => {
    const updateListIndex = lists.findIndex(list => list.id === listId);
    const updatedList = [...lists];
    const oldlist = updatedList[updateListIndex];
    updatedList[updateListIndex] = new Dashboard(oldlist.id, name, email, phone, city);
    this.regisration.next(updatedList);
  }))
 }


}
