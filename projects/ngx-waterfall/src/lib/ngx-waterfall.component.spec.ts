import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxWaterfallComponent } from './ngx-waterfall.component';

describe('NgxWaterfallComponent', () => {
  let component: NgxWaterfallComponent;
  let fixture: ComponentFixture<NgxWaterfallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxWaterfallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxWaterfallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
