import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectSystemComponent } from './connect-system.component';

describe('ConnectSystemComponent', () => {
  let component: ConnectSystemComponent;
  let fixture: ComponentFixture<ConnectSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
