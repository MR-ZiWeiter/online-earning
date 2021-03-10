/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NullDataComponent } from './null-data.component';

describe('NullDataComponent', () => {
  let component: NullDataComponent;
  let fixture: ComponentFixture<NullDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NullDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NullDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
