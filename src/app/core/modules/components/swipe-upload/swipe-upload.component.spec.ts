/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SwipeUploadComponent } from './swipe-upload.component';

describe('SwipeUploadComponent', () => {
  let component: SwipeUploadComponent;
  let fixture: ComponentFixture<SwipeUploadComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ SwipeUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
