import { ElementRef, Directive, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AuthService } from '../services/authService';
import { Router } from '@angular/router';

@Directive({
    selector: '[LoginCheck]',
})
export class LoginCheck {

    constructor(
        private element: ElementRef,
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit() {
        let el = <HTMLElement>this.element.nativeElement;
        fromEvent(el, "click")
            .subscribe((event: Event) => {
                if (!this.authService.isLoggedIn()) {
                    this.router.navigateByUrl("/login");
                    console.log("等等我 我还没上车呢.png");
                }
            });
    }

}
