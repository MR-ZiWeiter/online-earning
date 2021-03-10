/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LottieComponent } from './lottie.component';

describe('LottieComponent', () => {
  let component: LottieComponent;
  let fixture: ComponentFixture<LottieComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ LottieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LottieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
