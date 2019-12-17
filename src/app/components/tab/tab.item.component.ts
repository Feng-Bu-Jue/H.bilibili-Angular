import { OnInit, Component, AfterViewInit, AfterViewChecked, AfterContentInit, HostBinding, HostListener, Input } from '@angular/core';

export class TabEvent extends MouseEvent {
    public name: string;
    public index: number;
}


@Component({
    selector: "tab-item",
    templateUrl: './tab.item.component.html',
    styleUrls: ['./tab.item.component.scss']
})
export class TabItem {

    @HostBinding("class.tab-item-active")
    get active() {
        return this.isActive;
    }

    @HostBinding("style.width")
    public width: string;

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
}