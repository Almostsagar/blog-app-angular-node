import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostsDashboardComponent } from './admin-posts-dashboard.component';

describe('AdminPostsDashboardComponent', () => {
  let component: AdminPostsDashboardComponent;
  let fixture: ComponentFixture<AdminPostsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPostsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPostsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
