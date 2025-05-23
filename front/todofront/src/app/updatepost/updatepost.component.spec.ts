import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepostComponent } from './updatepost.component';

describe('UpdatepostComponent', () => {
  let component: UpdatepostComponent;
  let fixture: ComponentFixture<UpdatepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatepostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
