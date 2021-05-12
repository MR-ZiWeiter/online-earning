import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, FormControl } from '@angular/forms';
import { CoreToolsFunction } from 'src/app/core/core.tools';
import { ApiSystemService } from 'src/app/core/modules/provider/api';

@Component({
  selector: 'swipe-upload',
  templateUrl: './swipe-upload.component.html',
  styleUrls: ['./swipe-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwipeUploadComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SwipeUploadComponent),
      multi: true
    }
  ]
})
export class SwipeUploadComponent implements OnInit, ControlValueAccessor {

  public coreTools: CoreToolsFunction = new CoreToolsFunction();

  private ossConfig: any = {
    dir: 'user/',
    expire: null,
    accessKeyId: null,
    secretKeyId: null,
    securityToken: null
  }

  public fileList: any[] = [];

  public value!: any;
  public valueChange: any = () => {};
  public touchChange: any = () => {};

  @Input() public size: any[] = [150, 150];

  @Input() public maxFileListLength = 1;

  @Input() public coustom: boolean = false;
  @Input() public isVideo: boolean = false;
  @Input() public isReady: boolean = false;

  constructor(
    private apiSystemService: ApiSystemService
  ) { }
  writeValue(obj: any): void {
    this.value = obj;
    this.handlerInputFilesChange(obj);
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    this.valueChange = fn;
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    this.touchChange = fn;
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }
  public validate(c: FormControl) {
    return null
  }

  ngOnInit() {
  }

  /* 在列表中删除图片 */
  public onDeleteChange(info: any) {
    this.fileList = this.fileList.filter(fs => fs.url !== info.url);
    this.onChange(this.fileList);
  }

  /* 选择文件后上传操作 */
  public openFileChange(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    /* 手动创建获取文件的方式 */
    const fileInputDom = document.createElement('input');
    fileInputDom.type = 'file';
    fileInputDom.accept = 'image/*';
    fileInputDom.onchange = () => {
      const formData = new FormData();
      const file = fileInputDom.files[0];
      formData.append('file', file);
      this.apiSystemService.asyncFetchSystemUpLoadFile(formData).subscribe(res => {
        // console.log(res);
        this.fileList.push({
          uid: `-${Math.random() * 1000000 | 0}`,
          name: file.name,
          status: 'done',
          url: res.rel.url
        })
        this.onChange(this.fileList);
      })
    }
    fileInputDom.click();
  }

  /* 上传成功后回调 */
  public onChange(fileList: any[]): void {
    console.log('Aliyun OSS:', fileList);
    if (fileList && this.maxFileListLength > 1) {
      const urlList: string[] = [];
      fileList.filter(fs => fs.status === 'done').map((item: any) => {
        urlList.push(item.url || item.response.rel.url);
      })
      this.valueChange(urlList);
    } else if (fileList && this.maxFileListLength === 1) {
      let urlString: any;
      fileList.filter(fs => fs.status === 'done').map((item: any) => {
        urlString = item.url || item.response.rel.url;
      })
      this.valueChange(urlString);
    }
  }

  /* 处理初始化数据后的数据同步 */
  private handlerInputFilesChange(fileInfo: Array<string>|string) {
    /* 处理是数组时 */
    if (fileInfo instanceof Array) {
      this.fileList = fileInfo.map((item: string) => {
        return {
          uid: `-${Math.random() * 1000000 | 0}`,
          name: item.slice(item.lastIndexOf('/')).substr(1),
          status: 'done',
          url: item
        }
      })
    } else {
      if (fileInfo) {
        this.fileList = [{
          uid: `-${Math.random() * 1000000 | 0}`,
          name: fileInfo.slice(fileInfo.lastIndexOf('/')).substr(1),
          status: 'done',
          url: fileInfo
        }]
      }
    }
  }

  /* 处理上传前文件类型名字等 */
  public transformFile = (file: any) => {
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    file.url = this.ossConfig.dir + filename;
    return file;
  };

}
