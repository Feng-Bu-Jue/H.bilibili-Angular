import { OnInit, Component, ViewChild, ContentChildren, QueryList, ElementRef, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit, ViewChildren, HostBinding, HostListener, Self, Input, EventEmitter, Output } from '@angular/core';
import { TabItem, TabEvent } from './tab.item.component';

@Component({
    selector: "tab",
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class Tab implements OnInit, AfterViewInit, AfterViewChecked, AfterContentInit {

    @Input()
    public height: string = "45px";
    @Input()
    public activeTabIndex: number;
    @Output()
    public onChange: EventEmitter<TabEvent> = new EventEmitter()
    @Output()
    public onClick: EventEmitter<TabEvent> = new EventEmitter()

    @ContentChildren(TabItem, { descendants: true })
    public tabItems: QueryList<TabItem>;

    ngOnInit(): void {

    }

    onItemClick(event: TabEvent): void {
        const isChanged = this.activeTabIndex != undefined && this.activeTabIndex != event.index;

        if (isChanged) {
            //set old active as opposite value
            var item = this.tabItems.find(x => x.index == this.activeTabIndex);
            item.isActive = !item.isActive;

            this.onChange.emit(event);
        }
        this.onClick.emit(event);
        this.activeTabIndex = event.index;
    }

    ngAfterContentInit(): void {
        var length = this.tabItems.length;
        this.tabItems.forEach((el, index) => {
            el.onClick = this.onItemClick;
            //use the bind action to change point of this 
            el.onClick = el.onClick.bind(this);
            el.index = index;
            el.width = `${100 / length}%`;
            el.height = this.height;
            el.isActive = index === this.activeTabIndex;
        });
    }

    ngAfterViewInit(): void {

    }

    ngAfterViewChecked(): void {

    }
}