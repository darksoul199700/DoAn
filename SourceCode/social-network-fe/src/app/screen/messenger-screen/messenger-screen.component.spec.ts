import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerScreenComponent } from './messenger-screen.component';

describe('MessengerScreenComponent', () => {
  let component: MessengerScreenComponent;
  let fixture: ComponentFixture<MessengerScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
