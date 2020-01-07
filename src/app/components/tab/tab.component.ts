import { OnInit, Component, ContentChildren, QueryList, AfterViewInit, AfterViewChecked, Input, EventEmitter, Output, AfterContentInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { TabItem, TabEvent } from './tab.item.component';
import { Subject } from 'rxjs';

@Component({
    selector: "tab",
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class Tab implements OnInit, AfterContentInit {
    @Input()
    public activeIndex = 0;
    @Input()
    movingPosition: number;
    _isMoving: boolean = false;
    @Input()
    public get isMoving() {
        return this._isMoving;
    }
    public set isMoving(value) {
        if (this._isMoving !== value) {
            if (!value) {
                this.movingPosition = 0;
                this.underLineTransition = "";
            }
            else {
                this.underLineTransition = "0ms";
            }
            this._isMoving = value;
        }
    }
    @Output()
    public onChange: EventEmitter<TabEvent> = new EventEmitter()
    @Output()
    public onClick: EventEmitter<TabEvent> = new EventEmitter()

    @ContentChildren(TabItem, { descendants: true }) tabItems: QueryList<TabItem>;
    @ViewChild('underline', { static: true }) underline: ElementRef;

    public underLineTransition: string = "";

    public get width() {
        return `${100 / this.tabItems.length || 0}%`;
    }

    public get left() {
        return `${(100 / this.tabItems.length) * (this.activeIndex + (this.movingPosition ? this.movingPosition : 0))}%`;
    }

    constructor(
        private ref: ChangeDetectorRef
    ) {
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
        setTimeout(() => {
            this.tabItems.forEach((item, index) => {
                item.onClick = this.onItemClick.bind(this);
                item.index = index;
                item.width = this.width;
                item.isActive = index === this.activeIndex;
            })
        })
        //this.ref.detectChanges();
    }
}