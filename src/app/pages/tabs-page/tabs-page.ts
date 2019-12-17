import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  templateUrl: 'tabs-page.html',
  styleUrls: ['tabs-page.scss']
})
export class TabsPage implements OnInit {

  constructor(
    private router: Router,
  ) { }


  ngOnInit() {

  }

  onTabClick(path: string) {
    this.router.navigateByUrl(`app/tabs/${path}`)
  }
}
