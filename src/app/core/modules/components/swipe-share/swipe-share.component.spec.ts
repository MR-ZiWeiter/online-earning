/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SwipeShareComponent } from './swipe-share.component';

describe('SwipeShareComponent', () => {
  let component: SwipeShareComponent;
  let fixture: ComponentFixture<SwipeShareComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ SwipeShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
