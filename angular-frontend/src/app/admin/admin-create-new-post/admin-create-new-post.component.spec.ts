import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateNewPostComponent } from './admin-create-new-post.component';

describe('AdminCreateNewPostComponent', () => {
  let component: AdminCreateNewPostComponent;
  let fixture: ComponentFixture<AdminCreateNewPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateNewPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateNewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
