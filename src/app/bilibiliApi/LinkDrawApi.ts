import { Injectable } from '@angular/core';
import { DocResult, DocResultList } from './models/DocResult';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientWrapper } from '../code/HttpClientWrapper';
import { BiliBiliProtocal } from './models/BiliBiliProtocal';

@Injectable()
export class LinkDrawApi {

    constructor(
        private client: HttpClientWrapper
    ) { }

    public getDocList(num: number, pageSize: number, category: string, type: string): Observable<DocResult[]> {
        return this.client.get<BiliBiliProtocal<DocResultList>>("api.vc/link_draw/v2/Doc/list", {
            category: category,
            type: type,
            page_num: num,
            page_size: pageSize
        }).pipe(map(x => x.data.items));
    }

    public getDetail(doc_id: string): Observable<DocResult> {
        return this.client.get<BiliBiliProtocal<DocResult>>("api.vc/link_draw/v1/doc/detail?doc_id=" + doc_id).pipe(map(x => x.data));
    }
}