import { Injectable } from '@angular/core';
import { LinkDrawResult, LinkDrawResultList, LinkDrawResultV1List, LinkDrawResultV1 } from './models/linkDrawResult';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientWrapper } from '../code/httpClientWrapper';
import { BiliBiliProtocal } from './models/bilibiliProtocal';
import { Enum_DrawCategory, Enum_Biz, Enum_RankType } from './models/Enum';

@Injectable({
    providedIn: 'root'
})
export class LinkDrawApi {

    constructor(
        private client: HttpClientWrapper
    ) { }

    public getDocs(num: number, pageSize: number, category: Enum_DrawCategory, type: string): Promise<LinkDrawResult[]> {
        return this.client.get<BiliBiliProtocal<LinkDrawResultList>>("api.vc/link_draw/v2/doc/list", {
            category: Enum_DrawCategory[category],//all,illustration,comic,other
            type: type,//new,hot
            page_num: num,
            page_size: pageSize
        }).then(x => x.data.items);
    }

    public getDocsByUid(uid: number, biz: number, pageNum: string, pageSize: string): Promise<LinkDrawResultV1[]> {
        return this.client.get<BiliBiliProtocal<LinkDrawResultV1List>>("api.vc/link_draw/v1/doc/doc_list", {
            uid: uid,
            biz: biz,//all,draw,photo,daily
            page_num: pageNum,
            page_size: pageSize
        }).then(x => x.data.items);
    }

    public getPhotos(num: number, pageSize: number, category: Enum_DrawCategory, type: string): Promise<LinkDrawResult[]> {
        return this.client.get<BiliBiliProtocal<LinkDrawResultList>>("api.vc/link_draw/v2/photo/list", {
            category: Enum_DrawCategory[category],//cos,sifu
            type: type,
            page_num: num,
            page_size: pageSize
        }).then(x => x.data.items);
    }

    //biz=2&category=cos&rank_type=week&date=2019-12-16&page_num=0&page_size=50
    public getRankList(num: number, pageSize: number, biz: Enum_Biz, category: Enum_DrawCategory, type: Enum_RankType): Promise<LinkDrawResult[]> {
        return this.client.get<BiliBiliProtocal<LinkDrawResultList>>("api.vc/link_draw/v2/Doc/ranklist", {
            biz: biz,
            category: Enum_DrawCategory[category],
            rank_type: Enum_RankType[type],
            page_num: num,
            page_size: pageSize
        }).then(x => x.data.items);
    }


    public getDocDetail(docId: number): Promise<LinkDrawResult> {
        return this.client.get<BiliBiliProtocal<LinkDrawResult>>("api.vc/link_draw/v1/doc/detail", {
            doc_id: docId
        }).then(x => x.data);
    }

    public getOthers(uid: number, num: number, pageSize: number): Promise<LinkDrawResult[]> {
        return this.client.get<BiliBiliProtocal<LinkDrawResultList>>("api.vc/link_draw/v1/doc/others", {
            poster_uid: uid,
            page_num: num,
            page_size: pageSize
        }).then(x => x.data.items);
    }

    public vote(doc_id: number, type: number = 1): Promise<boolean> {
        return this.client.post<BiliBiliProtocal<any>>("api.vc/link_draw/v2/Vote/operate", {
            doc_id: doc_id,
            type: type,
        }).then(x => x.data.type == type);
    }

    public collection(doc_id: number, type: number = 1): Promise<boolean> {
        return this.client.post<BiliBiliProtocal<any>>("api.vc/user_plus/v1/Fav/add", {
            doc_id: doc_id,
            type: type,
        }).then(x => x.message == 'OK');
    }
}