import { OnInit, Component, ContentChildren, QueryList, AfterViewInit, AfterViewChecked, Input, EventEmitter, Output, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { TabItem, TabEvent } from './tab.item.component';

@Component({
    selector: "tab",
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class Tab implements OnInit, AfterViewInit, AfterViewChecked, AfterContentInit {

    @Input()
    public activeIndex: number = 0;
    @Output()
    public onChange: EventEmitter<TabEvent> = new EventEmitter()
    @Output()
    public onClick: EventEmitter<TabEvent> = new EventEmitter()

    @ContentChildren(TabItem, { descendants: true }) tabItems: QueryList<TabItem>;
    @ViewChild('underline') underline: ElementRef;

    private get width() {
        return 100 / this.tabItems.length || 0;
    }
    private get left() {
        return (100 / this.tabItems.length) * this.activeIndex;
    }

    ngOnInit(): void {

    }

    onItemClick(event: TabEvent): void {
        const isChanged = this.activeIndex != event.index;
        if (isChanged) {
            var item = this.tabItems.find(x => x.index == this.activeIndex);
            item.isActive = !item.isActive;

            this.onChange.emit(event);
        }
        this.onClick.emit(event);
        this.activeIndex = event.index;
    }

    ngAfterContentInit(): void {
        this.tabItems.forEach((item, index) => {
            item.onClick = this.onItemClick.bind(this);
            item.index = index;
            item.width = `${this.width}%`;
            item.isActive = index === this.activeIndex;
        });
    }

    ngAfterViewInit(): void {

    }

    ngAfterViewChecked(): void {

    }
}