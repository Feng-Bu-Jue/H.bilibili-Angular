import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TabEvent } from 'src/app/Components/Tab/tab.item.component';


@Component({
    selector: 'app-tabs',
    templateUrl: './app-tabs.html',
    styleUrls: ['./app-tabs.scss']
})
export class AppTabsWidget implements OnInit {
    private routeMap: { [key: string]: string; } =
    {
        "draw": "/draw",
        "picture": "/picture",
        "rank": "/rank",
        "me": "/me"
    };

    public activeTabIndex: number = 0;

    constructor(
        private router: Router,
        private location: ActivatedRoute
    ) { }

    ngOnInit(): void {
        //make current route to active
        Object.values(this.routeMap).forEach((el, index) => {
            if (this.router.isActive(el, false)) {
                this.activeTabIndex = index;
            }
        });
    }
    onTabChange(event: TabEvent) {
        this.router.navigate([this.routeMap[event.name]])
    }
}
