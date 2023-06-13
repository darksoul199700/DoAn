import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessBoxComponent } from './access-box.component';

describe('AccessBoxComponent', () => {
  let component: AccessBoxComponent;
  let fixture: ComponentFixture<AccessBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
