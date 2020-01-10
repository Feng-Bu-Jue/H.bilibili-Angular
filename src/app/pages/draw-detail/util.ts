
export function formatViewCount(view_count: number): string {
    let result = '';
    let viewCountStr = view_count.toString();
    if (view_count > 10000) {
        let interPart = viewCountStr.substring(0, viewCountStr.length - 4);
        let decimalPart = viewCountStr.substring(viewCountStr.length - 4, viewCountStr.length - 3)
        return `${interPart}.${decimalPart}万`;
    }
    else {
        result = viewCountStr;
    }
    return result;
}

export function getImgItemW(count: number): string {
    let wClass: string;
    let wClassMap: { [name: string]: () => boolean } =
    {
        "w-1": () => {
            return count == 1;
        },
        "w-2": () => {
            return count == 2 || count == 4;
        },
        "w-3": () => {
            return true;
        }
    }
    Object.keys(wClassMap).every((key, index) => {
        if (wClassMap[key]()) {
            wClass = key;
            return false;
        }
        return true;
    })
    return wClass;
}

export function replyRender(replyMessage: string) {
    //TODO
    let mockEmojiData=[{"id":216,"name":"[小电视_笑]","url":"http://i0.hdslb.com/bfs/vip/f80d384875183dfe2e24be13011c595c0210d273.png","state":0,"remark":"笑","size":"l"},{"id":217,"name":"[小电视_发愁]","url":"http://i0.hdslb.com/bfs/vip/05e279abbf3f72d5cc45548504a4220c5514b8b9.png","state":0,"remark":"发愁","size":"l"},{"id":218,"name":"[小电视_赞]","url":"http://i0.hdslb.com/bfs/vip/86ccf6d0b5480169bf80f3582fae09d7ed455c06.png","state":0,"remark":"赞","size":"l"},{"id":219,"name":"[小电视_差评]","url":"http://i0.hdslb.com/bfs/vip/38456e3bde2839b00b536a8be13934fa57c8e298.png","state":0,"remark":"差评","size":"l"},{"id":220,"name":"[小电视_嘟嘴]","url":"http://i0.hdslb.com/bfs/vip/6fd437f547ef1e4f231ff475d02f58bb94cef5a5.png","state":0,"remark":"嘟嘴","size":"l"},{"id":221,"name":"[小电视_汗]","url":"http://i0.hdslb.com/bfs/vip/5c150cec77eae1b05d5ca46526450ff3beeb44d2.png","state":0,"remark":"汗","size":"l"},{"id":222,"name":"[小电视_害羞]","url":"http://i0.hdslb.com/bfs/vip/de3aee88f7b6cc20ba9480c96c02f83a844381a9.png","state":0,"remark":"害羞","size":"l"},{"id":223,"name":"[小电视_吃惊]","url":"http://i0.hdslb.com/bfs/vip/05188008ea84c70d94e0076e28de15bf56f4c441.png","state":0,"remark":"吃惊","size":"l"},{"id":224,"name":"[小电视_哭泣]","url":"http://i0.hdslb.com/bfs/vip/938bdf98df945576ae88e2a22931db07ded9e663.png","state":0,"remark":"哭泣","size":"l"},{"id":225,"name":"[小电视_太太喜欢]","url":"http://i0.hdslb.com/bfs/vip/eb41a8c04840e4f77e76a4bff7a29ac89c432f4e.png","state":0,"remark":"太太喜欢","size":"l"},{"id":226,"name":"[小电视_好怒啊]","url":"http://i0.hdslb.com/bfs/vip/68d524b7e515396b6563d320fb710c64abfb1063.png","state":0,"remark":"好怒啊","size":"l"},{"id":227,"name":"[小电视_困惑]","url":"http://i0.hdslb.com/bfs/vip/6853161f0eab3332b874ab7c6c0311035b7538f3.png","state":0,"remark":"困惑","size":"l"},{"id":228,"name":"[小电视_我好兴奋]","url":"http://i0.hdslb.com/bfs/vip/a695fe1301aab2675ab6f6e34757c25a863a8617.png","state":0,"remark":"我好兴奋","size":"l"},{"id":229,"name":"[小电视_思索]","url":"http://i0.hdslb.com/bfs/vip/f8219e484d5a55787c3f1722dc3112d0eba03a69.png","state":0,"remark":"思索","size":"l"},{"id":230,"name":"[小电视_无语]","url":"http://i0.hdslb.com/bfs/vip/fbd12affebfdaadd3d721bffdb685a6b1ee71219.png","state":0,"remark":"无语","size":"l"}]
    let imgTemplate = `<img src="{url}" style="width:2em;height:2em">`;
    mockEmojiData.forEach(data => {
        var regexp = new RegExp(data.name.replace("[", "\\[").replace("]", "\\]"), "g")
        replyMessage = replyMessage.replace(regexp, imgTemplate.replace("{url}", data.url));
    })
    return replyMessage;
}