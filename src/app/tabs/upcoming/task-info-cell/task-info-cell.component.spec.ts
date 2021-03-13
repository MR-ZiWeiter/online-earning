/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaskInfoCellComponent } from './task-info-cell.component';

describe('TaskInfoCellComponent', () => {
  let component: TaskInfoCellComponent;
  let fixture: ComponentFixture<TaskInfoCellComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ TaskInfoCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskInfoCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
