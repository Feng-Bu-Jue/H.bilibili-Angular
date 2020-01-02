import { Injectable, Inject } from '@angular/core';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { saveAs } from 'file-saver';
import { HttpClientBase } from '../code/httpClientBase';

@Injectable({
    providedIn: 'root'
})
export class DownloadService {
    protected readonly PICTRUE_DOWNLOAD_FOLDER: string = "H.BiliBili"

    constructor(
        private file: File,
        private httpClient: HttpClientBase,
        private plt: Platform,
    ) { }

    public async save(url: string) {
        let fileName = this.resolveFileName(url);
        let blob = await this.httpClient.get<any>(url, null, { resolveProtocol: false, responseType: 'blob', noHeader: true });
        if (this.plt.is("desktop") || this.plt.is("mobileweb")) {
            await saveAs(blob, fileName);
        }
        else {
            let baseDir = this.getBaseStorageDir();
            this.file.createDir(baseDir, this.PICTRUE_DOWNLOAD_FOLDER, false);
            let fileEntry = await this.file.createFile(`${baseDir}/${this.PICTRUE_DOWNLOAD_FOLDER}`, fileName, false);
            fileEntry.createWriter((fileWriter) => {
                fileWriter.write(blob);
            }, (e) => { throw e; });
        }
    }

    public async batchSave(targetUrls: Array<string>): Promise<void> {
        await Promise.all(targetUrls.map(url => this.save(url)))
    }

    public async getDownloadedFlie(): Promise<string[]> {
        let entries = await this.file.listDir(this.getBaseStorageDir(), this.PICTRUE_DOWNLOAD_FOLDER);
        return entries.map((entry) => entry.toURL());
    }

    private resolveFileName(targetUrl: string): string {
        var regexResult = /[\w]+\.((webp)|(jpg)|(png))/.exec(targetUrl);
        if (!regexResult)
            throw new Error("fail to extraction file name")
        return regexResult[0];
    }

    private getBaseStorageDir(): string {
        let basePath: string;
        if (this.plt.is("ios")) {
            basePath = this.file.documentsDirectory;
        }
        else {
            basePath = this.file.externalRootDirectory;
        }
        return basePath;
    }

}