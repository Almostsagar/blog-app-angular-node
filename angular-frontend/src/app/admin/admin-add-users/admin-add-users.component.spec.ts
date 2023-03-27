import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddUsersComponent } from './admin-add-users.component';

describe('AdminAddUsersComponent', () => {
  let component: AdminAddUsersComponent;
  let fixture: ComponentFixture<AdminAddUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
