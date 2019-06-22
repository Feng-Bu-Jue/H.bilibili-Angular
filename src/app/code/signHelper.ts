import { Md5 } from "ts-md5";
import { error } from 'util';

export class SignHelper {

    static md5Sign(signString: string): string;
    static md5Sign(param: { [name: string]: any }, specialHandle: (signString: string) => string): string;

    //这种写法是真的蠢 ts设计者怎么想的
    static md5Sign(): string {
        if (arguments.length > 0) {
            let hash: string;
            if (typeof arguments[0] == "string") {
                hash = <string>Md5.hashStr(arguments[0]);
            }
            else {
                hash = this.md5Sign(this.generateSignString(arguments[0], arguments[1]));
            }
            return hash.toLowerCase();
        }
        throw new error("not support");
    }

    static generateSignString(param: { [name: string]: any }, specialHandle: (signString: string) => string = null): string {
        let signString = Object.keys(param)
            .sort()
            .map(key => `${key}=${encodeURIComponent(param[key])}`)
            .join("&")

        if (signString)
            signString = specialHandle(signString);

        return signString;
    }
}