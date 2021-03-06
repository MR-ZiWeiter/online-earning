import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActionSheetController, NavController, PickerController, ToastController } from '@ionic/angular';
// import CityJson from './city.json';
import { ApiSystemService, UserAccountService } from 'src/app/core/modules/provider/api';
import { UserService } from 'src/app/core/services/user/user.service';
import { GenderPipe } from 'src/app/core/pipes/gender.pipe';

import { bankRegExp } from './bank-reg';

@Component({
  selector: 'swipe-data-authentication',
  templateUrl: './data-authentication.page.html',
  styleUrls: ['./data-authentication.page.scss'],
  providers: [GenderPipe]
})
export class DataAuthenticationPage implements OnInit, OnDestroy {

  public validetaForm!: FormGroup;

  public username: any;

  public backList: any[] = [];

  public _genderPipe = GenderPipe;

  // 选中的坐标
  private selects = [4, 1, 8];

  /* 标签 */
  public checkboxRender: any[] = [];

  private basicInfoSubscribe!: any;

  constructor(
    private fb: FormBuilder,
    private genderPipe: GenderPipe,
    private navController: NavController,
    private toastController: ToastController,
    private apiSystemService: ApiSystemService,
    private pickerController: PickerController,
    public changeDetectorRef: ChangeDetectorRef,
    private apiUserAccountService: UserAccountService,
    private actionSheetController: ActionSheetController,
    /* 监听中间件服务处 */
    private userService: UserService
  ) {
    this.initalTagsInfo();
    this.apiSystemService.asyncFetchSystemBankList().subscribe(res => {
      // console.log(res);
      this.backList = res.rel;
    })
    this.validetaForm = fb.group({
      realName: [null, [Validators.required, Validators.pattern(/^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/)]],
      gender: [null, [Validators.required]],
      gender_name: [null],
      qq: [null, [Validators.required, Validators.pattern(/^[0-9]{5,10}$/)]],
      addressCode: [null, [Validators.required]],
      idCardNumber: [null, [Validators.required, Validators.pattern(/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/)]],
      idMainPhotoUrl: ['null', [Validators.required]],
      openBankCode: [null, [Validators.required]],
      bankName: [null],
      bankCardNum: [null, [Validators.required, Validators.pattern(bankRegExp)]],
      bankCardUrl: ['null', [Validators.required]],
      aliPayNum: [null, [Validators.required, Validators.pattern(/^1{1}[3-9]{1}[0-9]{9}$|^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/)]],
      aliPayUrl: ['null', [Validators.required]],
      weChatNum: [null, [Validators.required]],
      weChatUrl: ['null', [Validators.required]],
      shoppingTags: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    /* 初始化数据 */
    this.basicInfoSubscribe = this.userService.getUserBasicInfo().subscribe(res => {
      // console.log(res);
      this.validetaForm = this.fb.group({
        realName: [res.realName, [Validators.required, Validators.pattern(/^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/)]],
        phone: [res.phone, Validators.pattern(/^1{1}[3-9]{1}[0-9]{9}$/)],
        gender: [res.gender, [Validators.required]],
        gender_name: [this.genderPipe.transform(res.gender)],
        qq: [res.qq, [Validators.required, Validators.pattern(/^[0-9]{5,10}$/)]],
        addressCode: [Number(res.areaCode), [Validators.required]],
        idCardNumber: [res.idCardNumber, [Validators.required, Validators.pattern(/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/)]],
        idMainPhotoUrl: [res.idMainPhotoUrl, [Validators.required]],
        bankName: [null],
        openBankCode: [res.openBankCode, [Validators.required]],
        bankCardNum: [res.bankCardNum, [Validators.required, Validators.pattern(bankRegExp)]],
        bankCardUrl: [res.bankCardUrl, [Validators.required]],
        aliPayNum: [res.aliPayNum, [Validators.required, Validators.pattern(/^1{1}[3-9]{1}[0-9]{9}$|^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/)]],
        aliPayUrl: [res.aliPayUrl, [Validators.required]],
        weChatNum: [res.weChatNum, [Validators.required]],
        weChatUrl: [res.weChatUrl, [Validators.required]],
        shoppingTags: [res.shoppingTags, [Validators.required]]
      });

      /* 处理选择的数据 */
      if (this.checkboxRender.length) {
        const tagRender = res.shoppingTags.split(',').map(fs => Number(fs));
        this.checkboxRender = this.checkboxRender.map(item => {
          if (tagRender.includes(item.value)) {
            item.isCheck = true
          }
          return item;
        })
      }
    })
  }
  /* 获取tag标签 */
  private initalTagsInfo() {
    this.apiUserAccountService.asyncAccountShoppingTagInfo().subscribe(res => {
      // console.log(res)
      this.checkboxRender = res.rel.map((item: any) => {
        return {
          label: item.title,
          value: item.id,
          isCheck: false
        }
      })

      /* 处理数据 */
      const tagRender = this.validetaForm.value.shoppingTags.split(',').map(fs => Number(fs));
      this.checkboxRender = this.checkboxRender.map(item => {
        if (tagRender.includes(item.value)) {
          item.isCheck = true
        }
        return item;
      })
      // console.log(this.checkboxRender)
    })
  }

  /* 选择开户行 */
  public async openSelectBankCode() {
    const picker = await this.pickerController.create({
      backdropDismiss: true,
      buttons: [
        {
          role: 'cancel',
          text: '取消'
        },
        {
          role: 'confirm',
          text: '确定',
          handler: ev => {
            // console.log(ev)
            this.validetaForm.controls['openBankCode'].setValue(ev.bankcode.value);
            this.validetaForm.controls['bankName'].setValue(ev.bankcode.text);
          }
        }
      ],
      columns: [
        {
          name: 'bankcode',
          options: this.backList.map(item => {
            return {
              value: item.bankCode,
              text: item.bankName,
              selected: item.bankCode === this.validetaForm.value.openBankCode ? true : false
            };
          })
        }
      ],
      keyboardClose: true,
      mode: 'ios',
      showBackdrop: true
    })
    picker.present()
  }

  /* 选择性别 */
  public async presentActionSheetGender() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: '男',
          role: '0',
          handler: () => {
            this.validetaForm.controls['gender'].setValue(0);
          }
        },
        {
          text: '女',
          role: '1',
          handler: () => {
            this.validetaForm.controls['gender'].setValue(1);
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ],
      backdropDismiss: true,
      keyboardClose: true,
      mode: 'ios'
    })
    await actionSheet.present();
  }

  /* 选择地区 */
  // public async openPickerAddressInfo(numColumn: number = 3) {
  //   const picker = await this.pickerController.create({
  //     backdropDismiss: true,
  //     buttons: [
  //       {
  //         role: 'cancel',
  //         text: '取消'
  //       },
  //       {
  //         role: 'confirm',
  //         text: '确定',
  //         handler: ev => {
  //           // console.log(ev)
  //           this.validetaForm.controls['addressCode'].setValue(ev[Object.keys(ev).length - 1].value);
  //         }
  //       }
  //     ],
  //     columns: this.getColumns(numColumn, CityJson),
  //     keyboardClose: true,
  //     mode: 'ios',
  //     showBackdrop: true
  //   })
  //   console.log(new PickerController())
  //   picker.addEventListener('ionPickerColChange', async (ev: any) => {
  //     console.log(ev)
  //     const data = ev.detail;
  //     // const pickerColumn = await picker.getColumn('0')
  //     // console.log(pickerColumn)
  //     /* 处理选择的列 */
  //     this.selects[Number(data.name)] = data.selectedIndex;
  //     // data.target.remove()
  //     // 获取数据
  //     let pickerColumns = [];
  //     pickerColumns = picker.columns;
  //     // 处理对应数据
  //     if (data.name < numColumn) {
  //       for (let i = 0; i < numColumn; i ++) {
  //         if (i > data.name) {
  //           // const pickerColumn = await picker.getColumn(`${i}`);
  //           // pickerColumn.options = this.getColumnOptions(i, this.getPrivateColumn(i, CityJson));
  //           // pickerColumn.selectedIndex = 0;
  //           // await picker.present();
  //           const options = this.getColumnOptions(i, this.getPrivateColumn(i, CityJson));
  //           pickerColumns[i] = {
  //             name: `${i}`,
  //             options,
  //             selectedIndex: 0
  //           }
  //           // console.log(pickerColumns)
  //         }
  //       }
  //       // console.log(pickerColumns)
  //       picker.columns = pickerColumns;
  //       // console.log((picker as any).__proto__)
  //       // picker.present();
  //       // console.log(pickerColumns)
  //       // (picker as any).forceUpdate();
  //     }
  //   })
  //   await picker.present();
  // }

  /* 处理数据 */
  // private getColumns(numColumns, columnOptions) {
  //   const options = [];
  //   for(let i = 0; i < numColumns; i++) {
  //     options.push({
  //       name: `${i}`,
  //       options: this.getColumnOptions(i, this.getPrivateColumn(i, columnOptions)),
  //       selectedIndex: this.selects[i] ? this.selects[i] : 0
  //     })

  //   }
  //   return options
  // }

  /* 根据数据不同获取数据不同 */
  // private getPrivateColumn(index, arrayInfo) {
  //   let resultArray = arrayInfo;
  //   for(let i = 0; i < index; i ++) {
  //     resultArray = (resultArray[this.selects[i] || 0] || {}).children || []
  //   }
  //   return resultArray;
  // }

  /* 处理二级数据或者3级数据 */
  // private getColumnOptions(columnIndex, columnOptions) {
  //   const options = [];
  //   for(let i = 0; i < columnOptions.length; i ++) {
  //     options.push({
  //       text: columnOptions[i].name,
  //       value: columnOptions[i].cityId
  //     })
  //   }
  //   return options;
  // }

  /* checkboxRenderChange */
  public checkboxRenderChange(info: any) {
    // console.log(info)
    this.validetaForm.controls['shoppingTags'].setValue(info.map(item => item.value).join(','));
  }

  /* 提交数据 */
  public submitChange() {
    for (const i in this.validetaForm.controls) {
      this.validetaForm.controls[i].markAsDirty();
      this.validetaForm.controls[i].updateValueAndValidity();
    }
    if (this.validetaForm.valid) {
      // console.log(1)
      this.apiUserAccountService.asyncAccountEditBaiscInfoChange(this.validetaForm.value).subscribe(res => {
        this.presentToast('修改成功', 'success');
        setTimeout(() => {
          this.navController.back();
        }, 2000)
      })
    } else {
      console.log(this.validetaForm)
      this.presentToast('请完善用户信息后提交', 'danger');
    }
  }

  // 提示吐司
  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      color,
      message,
      duration: 2000
    });
    toast.present();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.basicInfoSubscribe.unsubscribe();
  }
  // asyncAccountShoppingTagInfo
// asyncAccountEditBaiscInfoChange
}
