import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController, PickerController, ToastController } from '@ionic/angular';
import CityJson from './city.json';
import { UserAccountService } from 'src/app/core/modules/provider/api';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'swipe-data-authentication',
  templateUrl: './data-authentication.page.html',
  styleUrls: ['./data-authentication.page.scss'],
})
export class DataAuthenticationPage implements OnInit {

  public validetaForm!: FormGroup;

  public username: any;

  // 选中的坐标
  private selects = [4, 1, 8];

  /* 标签 */
  public checkboxRender: any[] = [];

  constructor(
    private fb: FormBuilder,
    private navController: NavController,
    private toastController: ToastController,
    private pickerController: PickerController,
    public changeDetectorRef: ChangeDetectorRef,
    private apiUserAccountService: UserAccountService,
    private actionSheetController: ActionSheetController,
    /* 监听中间件服务处 */
    private userService: UserService
  ) {
    this.initalTagsInfo();
    this.validetaForm = fb.group({
      realName: [null, [Validators.required, Validators.pattern(/^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/)]],
      gender: [null, [Validators.required]],
      qq: [null, [Validators.required, Validators.pattern(/^[0-9]{5,10}$/)]],
      addressCode: ['150202', [Validators.required]],
      idCardNumber: [null, [Validators.required]],
      idMainPhotoUrl: ['null', [Validators.required]],
      openBankCode: [null, [Validators.required]],
      bankCardNum: [null, [Validators.required]],
      bankCardUrl: ['null', [Validators.required]],
      aliPayNum: [null, [Validators.required]],
      aliPayUrl: ['null', [Validators.required]],
      weChatNum: [null, [Validators.required]],
      weChatUrl: ['null', [Validators.required]],
      shoppingTags: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    /* 初始化数据 */
    this.userService.getUserBasicInfo().subscribe(res => {
      // console.log(res);
      this.validetaForm = this.fb.group({
        realName: [res.realName, [Validators.required, Validators.pattern(/^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/)]],
        phone: [res.phone],
        gender: [res.gender, [Validators.required]],
        qq: [res.qq, [Validators.required, Validators.pattern(/^[0-9]{5,10}$/)]],
        addressCode: [res.addressCode, [Validators.required]],
        idCardNumber: [res.idCardNumber, [Validators.required]],
        idMainPhotoUrl: [res.idMainPhotoUrl, [Validators.required]],
        openBankCode: [res.openBankCode, [Validators.required]],
        bankCardNum: [res.bankCardNum, [Validators.required]],
        bankCardUrl: [res.bankCardUrl, [Validators.required]],
        aliPayNum: [res.aliPayNum, [Validators.required]],
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
  public async openPickerAddressInfo(numColumn: number = 3) {
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
            this.validetaForm.controls['addressCode'].setValue(ev[Object.keys(ev).length - 1].value);
          }
        }
      ],
      columns: this.getColumns(numColumn, CityJson),
      keyboardClose: true,
      mode: 'ios',
      showBackdrop: true
    })
    console.log(new PickerController())
    picker.addEventListener('ionPickerColChange', async (ev: any) => {
      console.log(ev)
      const data = ev.detail;
      // const pickerColumn = await picker.getColumn('0')
      // console.log(pickerColumn)
      /* 处理选择的列 */
      this.selects[Number(data.name)] = data.selectedIndex;
      // data.target.remove()
      // 获取数据
      let pickerColumns = [];
      pickerColumns = picker.columns;
      // 处理对应数据
      if (data.name < numColumn) {
        for (let i = 0; i < numColumn; i ++) {
          if (i > data.name) {
            // const pickerColumn = await picker.getColumn(`${i}`);
            // pickerColumn.options = this.getColumnOptions(i, this.getPrivateColumn(i, CityJson));
            // pickerColumn.selectedIndex = 0;
            // await picker.present();
            const options = this.getColumnOptions(i, this.getPrivateColumn(i, CityJson));
            pickerColumns[i] = {
              name: `${i}`,
              options,
              selectedIndex: 0
            }
            // console.log(pickerColumns)
          }
        }
        // console.log(pickerColumns)
        picker.columns = pickerColumns;
        // console.log((picker as any).__proto__)
        // picker.present();
        // console.log(pickerColumns)
        // (picker as any).forceUpdate();
      }
    })
    await picker.present();
  }

  /* 处理数据 */
  private getColumns(numColumns, columnOptions) {
    const options = [];
    for(let i = 0; i < numColumns; i++) {
      options.push({
        name: `${i}`,
        options: this.getColumnOptions(i, this.getPrivateColumn(i, columnOptions)),
        selectedIndex: this.selects[i] ? this.selects[i] : 0
      })

    }
    return options
  }

  /* 根据数据不同获取数据不同 */
  private getPrivateColumn(index, arrayInfo) {
    let resultArray = arrayInfo;
    for(let i = 0; i < index; i ++) {
      resultArray = (resultArray[this.selects[i] || 0] || {}).children || []
    }
    return resultArray;
  }

  /* 处理二级数据或者3级数据 */
  private getColumnOptions(columnIndex, columnOptions) {
    const options = [];
    for(let i = 0; i < columnOptions.length; i ++) {
      options.push({
        text: columnOptions[i].name,
        value: columnOptions[i].cityId
      })
    }
    return options;
  }

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
  // asyncAccountShoppingTagInfo
// asyncAccountEditBaiscInfoChange
}
