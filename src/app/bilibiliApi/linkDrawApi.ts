import { Injectable } from '@angular/core';
import { LinkDrawResult, LinkDrawResultList, LinkDrawResultV1List, LinkDrawResultV1 } from './models/linkDrawResult';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientWrapper } from '../code/httpClientWrapper';
import { BiliBiliProtocal } from './models/bilibiliProtocal';

@Injectable({
    providedIn: 'root'
})
export class LinkDrawApi {

    constructor(
        private client: HttpClientWrapper
    ) { }

    public getDocs(num: number, pageSize: number, category: string, type: string): Observable<LinkDrawResult[]> {
        return this.client.get<BiliBiliProtocal<LinkDrawResultList>>("api.vc/link_draw/v2/doc/list", {
            category: category,//all,illustration,comic,other
            type: type,//new,hot
            page_num: num,
            page_size: pageSize
        }).pipe(map(x => x.data.items));
    }

    public getDocsByUid(uid: number, biz: number, pageNum: string, pageSize: string): Observable<LinkDrawResultV1[]> {
        return this.client.get<BiliBiliProtocal<LinkDrawResultV1List>>("api.vc/link_draw/v1/doc/doc_list", {
            uid: uid,
            biz: biz,//all,draw,photo,daily
            page_num: pageNum,
            page_size: pageSize
        }).pipe(map(x => x.data.items));
    }

    public getPhotos(num: number, pageSize: number, category: string, type: string): Observable<LinkDrawResult[]> {
        return this.client.get<BiliBiliProtocal<LinkDrawResultList>>("api.vc/link_draw/v2/photo/list", {
            category: category,//cos,sifu
            type: type,//new,hot
            page_num: num,
            page_size: pageSize
        }).pipe(map(x => x.data.items));
    }

    public getDocDetail(docId: number): Observable<LinkDrawResult> {
        return this.client.get<BiliBiliProtocal<LinkDrawResult>>("api.vc/link_draw/v1/doc/detail", {
            doc_id: docId
        }).pipe(map(x => x.data));
    }

    public getOthers(uid: number, num: number, pageSize: number): Observable<LinkDrawResult[]> {
        return this.client.get<BiliBiliProtocal<LinkDrawResultList>>("api.vc/link_draw/v1/doc/others", {
            poster_uid: uid,
            page_num: num,
            page_size: pageSize
        }).pipe(map(x => x.data.items));
    }

    public vote(doc_id: number, type: number = 1): Observable<boolean> {
        return this.client.post<BiliBiliProtocal<any>>("api.vc/link_draw/v2/Vote/operate", {
            doc_id: doc_id,
            type: type,
            csrf_token: '',
            token: ''
        }).pipe(map(x => x.data.type == type));
    }

    public collection(doc_id: number, type: number = 1): Observable<boolean> {
        return this.client.post<BiliBiliProtocal<any>>("api.vc/user_plus/v1/Fav/add", {
            doc_id: doc_id,
            type: type,
            csrf_token: '',
            token: ''
        }).pipe(map(x => x.message == 'OK'));
    }

}