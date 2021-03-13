/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SwipeHeaderComponent } from './swipe-header.component';

describe('SwipeHeaderComponent', () => {
  let component: SwipeHeaderComponent;
  let fixture: ComponentFixture<SwipeHeaderComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ SwipeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
