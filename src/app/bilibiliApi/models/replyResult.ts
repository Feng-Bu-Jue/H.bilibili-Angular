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
    public acount: number;
    public count: number;
    public num: number;
    public size: number;
}

export class ReplyContent {
    public device: string;
    public members: Array<string>;
    public message: string;
    public plat: number;//plat 1=web? 2=android 
}


export class AddReplyResult {
    dialog: number;
    dialog_str: number;
    need_captcha: boolean;
    parent: number;
    parent_str: string;
    root: number;
    root_str: string;
    rpid: number;
    rpid_str: string;
    url: string;
}

export class Member {
    public mid: string;
    public avatar: string;
    public uname: string;
    public sign: string;
    public sex: string;
    public rank: number;
    public level_info: MemberLevel;
    public vip: MemberVip;
}

export class MemberLevel {
    public current_level: number;
}
export class MemberVip {
    public vipStatus: number;
    public type: number;
}