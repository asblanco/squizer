import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnDestroy {
  emptyState = true;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router) {
    router.events
    .filter(event => event instanceof NavigationEnd)
    .takeUntil(this.ngUnsubscribe)
    .subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/manage-courses') {
        this.emptyState = true;
      } else {
        this.emptyState = false;
      }
    });
  }

  /* Unsubscribe from all to prevent memory leak when component is destroyed */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
