import {
  Component,
  ContentChildren,
  AfterContentInit,
  QueryList,
  ViewEncapsulation,
  ChangeDetectorRef,
  Renderer2,
  Input,
  ViewChild,
  ElementRef,
  AfterContentChecked,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core'
import { NgxWaterfallItemDirective } from './ngx-waterfall-item.directive'
import { Directions } from './model'

@Component({
  selector: 'ngx-waterfall',
  templateUrl: 'ngx-waterfall.component.html',
  styleUrls: ['ngx-waterfall.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxWaterfallComponent
  implements AfterContentInit, AfterContentChecked {
  @ContentChildren(NgxWaterfallItemDirective) waterfallItemList!: QueryList<
    NgxWaterfallItemDirective
  >
  @ViewChild('container', { static: true }) waterfallContainerElement: ElementRef

  nextIndex = 0
  offsetTopArray: Array<number> = []
  offsetLeftArray: Array<number> = []
  colNum: number
  prevItemLength: number
  @Output() afterRendered = new EventEmitter<number>()

  @Input() gap = 10
  @Input() shouldListenToResize = false
  @Input() direction = Directions.LEFT_TO_RIGHT

  private _itemWidth: number
  get itemWidth() {
    return this._itemWidth
  }

  @Input() set itemWidth(value: number) {
    this._itemWidth = value
    if (this.offsetLeftArray.length > 0) {
      this.initialData()
      this.renderItem()
    }
  }

  public reset() {
    this.initialData()
    this.renderItem()
  }

  get largestTop() {
    return this.offsetTopArray.reduce((a, b) => {
      return a > b ? a : b
    })
  }

  constructor(private cd: ChangeDetectorRef, private renderer: Renderer2) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (this.shouldListenToResize) {
      this.initialData()
      this.renderItem()
    }
  }

  ngAfterContentInit() {
    this.initialData()
    this.renderItem()
  }

  ngAfterContentChecked() {
    if (this.waterfallItemList.length !== this.prevItemLength) {
      const lastAddItemList = this.waterfallItemList.filter((item, i) => {
        return i > this.prevItemLength - 1
      })
      this.renderItem(lastAddItemList)
      this.prevItemLength = this.waterfallItemList.length
    }
  }

  protected initialData() {
    if (!this.itemWidth) {
      if (this.waterfallItemList.toArray()[0]) {
        this.itemWidth = this.waterfallItemList.toArray()[0].el.nativeElement.clientWidth
      } else {
        console.warn('There is no waterfall item.')
        return
      }
    }
    this.prevItemLength = this.waterfallItemList.length
    this.colNum = Math.floor(
      (this.waterfallContainerElement.nativeElement.clientWidth + this.gap) /
      (this.itemWidth + this.gap)
    )
    this.offsetTopArray = Array(this.colNum).fill(0)
    this.offsetLeftArray = this.offsetTopArray.map(
      (top: number, index: number) => {
        return index * (this.itemWidth + this.gap)
      }
    )
  }

  protected renderItem(
    waterfallItemList:
      | QueryList<NgxWaterfallItemDirective>
      | Array<NgxWaterfallItemDirective> = this.waterfallItemList
  ) {
    waterfallItemList.forEach(item => {
      this.renderer.setStyle(
        item.el.nativeElement,
        'width',
        this.itemWidth + 'px'
      )
      this.renderNextEle(item)
    })
    this.afterRendered.emit(this.colNum)
  }

  private renderNextEle(item: NgxWaterfallItemDirective) {
    this.renderer.setStyle(
      item.el.nativeElement,
      'top',
      this.offsetTopArray[this.nextIndex] + 'px'
    )
    this.offsetTopArray[this.nextIndex] +=
      item.el.nativeElement.clientHeight + this.gap
    this.renderer.setStyle(
      item.el.nativeElement,
      'left',
      this.offsetLeftArray[this.nextIndex] + 'px'
    )

    this.nextIndex = this.findLowestTopColIndex(this.offsetTopArray)
    this.cd.detectChanges()
  }

  private findLowestTopColIndex(arr: Array<number>): number {
    const lowestTop = arr.reduce((a, b) => {
      return a > b ? b : a
    })
    return arr.indexOf(lowestTop)
  }
}
