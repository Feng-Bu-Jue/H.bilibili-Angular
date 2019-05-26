import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, range, Subject, from, of } from 'rxjs';
import { catchError, filter, map, groupBy, reduce, mergeMap, mergeAll, mapTo, scan, mergeScan } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { TabEvent } from './Components/Tab/tab.item.component';
import { ReplyApi } from './bilibiliApi/replyApi';
import { LinkDrawApi } from './bilibiliApi/linkDrawApi';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
    
}
