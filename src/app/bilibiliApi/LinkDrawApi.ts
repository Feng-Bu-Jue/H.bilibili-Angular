import { Injectable } from '@angular/core';
import { LinkDrawResult, LinkDrawResultList } from './models/LinkDrawResult';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientWrapper } from '../code/HttpClientWrapper';
import { BiliBiliProtocal } from './models/BiliBiliProtocal';

@Injectable()
export class LinkDrawApi {

    constructor(
        private client: HttpClientWrapper
    ) { }

    public getDocList(num: number, pageSize: number, category: string, type: string): Observable<LinkDrawResult[]> {
        return this.client.get<BiliBiliProtocal<LinkDrawResultList>>("api.vc/link_draw/v2/Doc/list", {
            category: category,
            type: type,
            page_num: num,
            page_size: pageSize
        }).pipe(map(x => x.data.items));
    }

    public getPhotoList(num: number, pageSize: number, category: string, type: string): Observable<LinkDrawResult[]> {
        return this.client.get<BiliBiliProtocal<LinkDrawResultList>>("api.vc/link_draw/v2/Photo/list", {
            category: category,
            type: type,
            page_num: num,
            page_size: pageSize
        }).pipe(map(x => x.data.items));
    }

    public getDocDetail(doc_id: number): Observable<LinkDrawResult> {
        return this.client.get<BiliBiliProtocal<LinkDrawResult>>("api.vc/link_draw/v1/doc/detail?doc_id=" + doc_id).pipe(map(x => x.data));
    }
}