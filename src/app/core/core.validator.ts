/* 校验器 */
import { ValidatorFn, AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";

export class CoreValidators {
  static match(targetField: string): ValidatorFn {
    return (self: AbstractControl): { [key: string]: any } => {    //这里严格按照ValidatorFn的声明来
      let _form = self.parent;
      if (_form) {
        let targetControl: AbstractControl = _form.controls[targetField];
        if (targetControl.value && self.value != targetControl.value) {   //如果两个值不一致
          return { match: '' }
        }
      }
    }
  }

  /* 校验数据 deep 方式 */
  static deepCheckForm(formGroup: FormGroup|FormControl|FormArray|any) {
    if (formGroup instanceof FormGroup) {
      for (const i in formGroup.controls) {
        if (formGroup.controls[i] instanceof FormControl) {
          formGroup.controls[i].markAsDirty();
          formGroup.controls[i].updateValueAndValidity();
        } else {
          this.deepCheckForm(formGroup.controls[i]);
        }
      }
    } else if (formGroup instanceof FormArray) {
      for(let i = 0; i < formGroup.length; i ++) {
        this.deepCheckForm(formGroup.controls[i]);
      }
    } else {
      formGroup.markAsDirty();
      formGroup.updateValueAndValidity();
    }
  }

  /* 数据回填 -- 根据当前表单进行数据回填 */
  static resultFormInitel(validateForm: FormGroup|FormArray|FormControl|AbortController|any, renderInfo: any) {
    for (let key in validateForm.controls) {
      if (validateForm.controls[key] instanceof FormGroup) {
        this.resultFormInitel(validateForm.controls[key], renderInfo[key]);
      } else if ((validateForm.controls[key] instanceof FormArray) && renderInfo[key]) {
        for (let i = 0; i < validateForm.controls[key].length; i ++) {
          if (validateForm.controls[key].controls[i] instanceof FormGroup) {
            if (validateForm.controls[key].controls[i].value.ruleCode) {
              renderInfo[key].some((child: any) => {
                if (child.ruleCode === validateForm.controls[key].controls[i].value.ruleCode) {
                  this.resultFormInitel(validateForm.controls[key].controls[i], child);
                  return true
                }
                return false
              })
            } else {
              this.resultFormInitel(validateForm.controls[key].controls[i], renderInfo[key][i])
            }
          } else if (validateForm.controls[key].controls[i] instanceof FormArray) {
            this.resultFormInitel(validateForm.controls[key].controls[i], renderInfo[key][i]);
          } else if (validateForm.controls[key].controls[i] instanceof FormControl) {
            validateForm.controls[key].controls[i].controls.setValue(renderInfo[key][i]);
          }
        }
      } else {
        // console.log(key, renderInfo[key])
        if (renderInfo[key]) {
          validateForm.controls[key].setValue(renderInfo[key])
        }
      }
    }
  }
}
