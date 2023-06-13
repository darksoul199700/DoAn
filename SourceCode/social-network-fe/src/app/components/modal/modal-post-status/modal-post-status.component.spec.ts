import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPostStatusComponent } from './modal-post-status.component';

describe('ModalPostStatusComponent', () => {
  let component: ModalPostStatusComponent;
  let fixture: ComponentFixture<ModalPostStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPostStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPostStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
