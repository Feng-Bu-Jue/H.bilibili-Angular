import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
@Pipe({
  name: "avatar"
})
export class AvatarPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }
  transform(url: string, size: number = 48) {
    if (url.includes('/noface.gif')) {
      return url;
    }
    return `${url}@${size}w_${size}h_1e.webp`
  }
}