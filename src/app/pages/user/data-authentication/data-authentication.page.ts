import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'swipe-data-authentication',
  templateUrl: './data-authentication.page.html',
  styleUrls: ['./data-authentication.page.scss'],
})
export class DataAuthenticationPage implements OnInit {

  public validetaForm!: FormGroup;

  public username: any;

  constructor(
    private fb: FormBuilder
  ) {
    this.validetaForm = fb.group({
      realName: [],

    })
  }

  ngOnInit() {
  }

}
