import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersCompComponent } from './headers-comp.component';

describe('HeadersCompComponent', () => {
  let component: HeadersCompComponent;
  let fixture: ComponentFixture<HeadersCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadersCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadersCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
