import { Injectable, Inject } from '@angular/core';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { saveAs } from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {
    protected readonly PICTRUE_DOWNLOAD_PATH: string = "/picture"

    constructor(
        private file: File,
        private client: HttpClient,
        private plt: Platform,
    ) { }

    public save(targetUrl: string) {
        let fileName = this.resolveFileName(targetUrl);
        this.client.get(targetUrl, { responseType: 'blob' }).subscribe(async (res) => {
            //need to inject corresponding instance for different platform?
            if (this.plt.is("mobile")) {
                await saveAs(res, fileName);
            }
            else {
                let fileEntry = await this.file.createFile(this.getBaseStorageDir() + this.PICTRUE_DOWNLOAD_PATH, fileName, true);
                fileEntry.createWriter((fileWriter) => {
                    fileWriter.write(res);
                }, (e) => { throw e; });
            }
        });
    }

    public batchSave(targetUrls: Array<string>) {
        targetUrls.forEach(url => {
            this.save(url);
        })
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