/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EyeCareModeComponent } from './eye-care-mode.component';

describe('EyeCareModeComponent', () => {
  let component: EyeCareModeComponent;
  let fixture: ComponentFixture<EyeCareModeComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ EyeCareModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EyeCareModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
