import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-header',
    templateUrl: './app-header.html',
    styleUrls: ['./app-header.scss']
})
export class AppHeader implements OnInit {
    @Input()
    public title: string;
    @Input()
    public showBack: boolean = true;

    constructor(
        //private router: Router,
    ) { }

    ngOnInit(): void {
        console.log(this.showBack)
    }

    public goBack(): void {
        if (history.length == 1) {
            //this.router.navigate(['']);//go to default page
        } else {
            history.back();
        }
    }
}
