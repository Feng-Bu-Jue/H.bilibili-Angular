import { Member } from './Member';

export class ReplyResult {
    public blacklist: number;//这个非常棒 帮助我发现世界很小
    public page: ReplyPage;
    public hots: Array<Reply>;
    public replies: Array<Reply>;
}

export class Reply {
    public floor: string;
    public content: ReplyContent
    public member: Member;
    public ctime: number;
    public count: number;
    public like: number;
    public mid: number;
    public oid: number;
    public replies: Array<Reply>;
}

export class ReplyPage {
    public acount: string;
    public count: string;
    public num: string;
    public size: string;
}

export class ReplyContent {
    public device: string;
    public members: Array<string>;
    public message: string;
    public plat: number;//plat 1=web? 2=android 
}