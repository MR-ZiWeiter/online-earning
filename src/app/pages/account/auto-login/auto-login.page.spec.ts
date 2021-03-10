import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutoLoginPage } from './auto-login.page';

describe('AutoLoginPage', () => {
  let component: AutoLoginPage;
  let fixture: ComponentFixture<AutoLoginPage>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ AutoLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutoLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
