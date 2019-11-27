import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelComponentComponent } from './admin-panel-component.component';

describe('AdminPanelComponentComponent', () => {
  let component: AdminPanelComponentComponent;
  let fixture: ComponentFixture<AdminPanelComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
