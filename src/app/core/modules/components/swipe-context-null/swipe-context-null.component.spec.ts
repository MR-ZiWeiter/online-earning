/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SwipeContextNullComponent } from './swipe-context-null.component';

describe('SwipeContextNullComponent', () => {
  let component: SwipeContextNullComponent;
  let fixture: ComponentFixture<SwipeContextNullComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ SwipeContextNullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeContextNullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
