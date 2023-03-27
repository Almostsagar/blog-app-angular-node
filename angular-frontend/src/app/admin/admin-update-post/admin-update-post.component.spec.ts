import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdatePostComponent } from './admin-update-post.component';

describe('AdminUpdatePostComponent', () => {
  let component: AdminUpdatePostComponent;
  let fixture: ComponentFixture<AdminUpdatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdatePostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUpdatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
