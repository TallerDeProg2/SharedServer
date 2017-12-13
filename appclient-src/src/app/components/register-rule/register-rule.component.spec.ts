import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRuleComponent } from './register-rule.component';

describe('RegisterRuleComponent', () => {
  let component: RegisterRuleComponent;
  let fixture: ComponentFixture<RegisterRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
