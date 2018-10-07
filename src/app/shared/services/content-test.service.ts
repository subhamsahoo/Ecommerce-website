import { Injectable } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
import { map, delay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentTestService {

  tester: Observable<any>;
  testSubject: Subject<any> = new Subject();
  private last: number=0;

  constructor() {
    this.testSubject.next('crap');
    this.tester = this.testSubject.asObservable();
    this.sendStuff();
    // this.tester = interval(1000).pipe(take(10)).pipe(delay(1000)).pipe(map(val=>val*val));
   }

   sendStuff() {
     for (let i=this.last; i < this.last + 10; i++) {
       setTimeout(()=>{
        this.testSubject.next(`bs number ${i}`);
        this.last = i;
       }, 3000)
     }
   }
}
