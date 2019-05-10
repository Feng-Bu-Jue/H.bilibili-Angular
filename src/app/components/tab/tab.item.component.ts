import { OnInit, Component, ViewChild, ContentChildren, QueryList, ElementRef, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit, ViewChildren, HostBinding, HostListener, Self, Input, Output, EventEmitter } from '@angular/core';

export class TabEvent extends MouseEvent {
    public name: string;
    public index: number;
}


@Component({
    selector: "tab-item",
    templateUrl: './tab.item.component.html',
    styleUrls: ['./tab.item.component.scss']
})
export class TabItem implements OnInit, AfterViewInit, AfterViewChecked, AfterContentInit {

    @HostBinding("class")
    get active() {
        return this.isActive ? "tab-item-active" : "";
    }

    @HostBinding("style.width")
    public width: string;

    @HostBinding("style.height")
    public height: string;

    @HostBinding("style.lineHeight")
    get lineHeight() {
        return this.height;
    }

    @HostListener('click', ["$event"])
    private _onClickWapper(event: TabEvent) {
        this.isActive = true;

        event.index = this.index;
        event.name = this.name;
        this.onClick(event);
    };

    public onClick: (event: TabEvent) => void;


    @Input()
    public name: string;

    public isActive: boolean = false;

    public index: number;


    ngOnInit(): void {

    }

    ngAfterContentInit(): void {

    }


    ngAfterViewInit(): void {

    }

    ngAfterViewChecked(): void {

    }
}