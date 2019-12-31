import { Injectable, Inject } from '@angular/core';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { saveAs } from 'file-saver';
import { HttpClientBase } from '../code/httpClientBase';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {
    protected readonly PICTRUE_DOWNLOAD_PATH: string = "/picture"

    constructor(
        private file: File,
        private httpClient: HttpClientBase,
        private plt: Platform,
    ) { }

    public async save(targetUrl: string) {
        let fileName = this.resolveFileName(targetUrl);
        let blob = await this.httpClient.get<any>(targetUrl, { resolveProtocal: false, responseType: 'blob' });
        if (this.plt.is("desktop") || this.plt.is("mobileweb")) {
            await saveAs(blob, fileName);
        }
        else {
            let fileEntry = await this.file.createFile(this.getBaseStorageDir() + this.PICTRUE_DOWNLOAD_PATH, fileName, true);
            fileEntry.createWriter((fileWriter) => {
                fileWriter.write(blob);
            }, (e) => { throw e; });
        }
    }

    public async batchSave(targetUrls: Array<string>) {
        await Promise.all(targetUrls.map(url => this.save(url)))
    }

    public async getDownloadedFlie(): Promise<string[]> {
        let entries = await this.file.listDir(this.getBaseStorageDir(), this.PICTRUE_DOWNLOAD_PATH);
        return entries.map((entry) => entry.toURL());
    }

    private resolveFileName(targetUrl: string): string {
        var regexResult = /[\w]+\.((webp)|(jpg)|(png))/.exec(targetUrl);
        if (!regexResult)
            throw new Error("file name extraction failed")
        return regexResult[0];
    }

    private getBaseStorageDir() {
        let basePath;
        if (this.plt.is("ios")) {
            basePath = this.file.documentsDirectory;
        }
        else {
            basePath = this.file.externalApplicationStorageDirectory;
        }
        return basePath;
    }

}