import { Md5 } from "ts-md5";
import { error } from 'util';

export class SignHelper {

    static md5Sign(signString: string): string;
    static md5Sign(param: { [name: string]: any }, specialHandle: (signString: string) => string): string;

    static md5Sign(): string {
        if (arguments.length > 0) {
            let signString: string;
            if (typeof arguments[0] == "string") {
                signString = <string>Md5.hashStr(arguments[0]);
            }
            else {
                signString = this.md5Sign(this.generateSignString(arguments[0], arguments[1]));
            }
            return signString.toLowerCase();
        }
        throw new error("not supported");
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