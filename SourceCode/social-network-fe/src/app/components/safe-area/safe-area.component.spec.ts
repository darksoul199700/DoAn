import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeAreaComponent } from './safe-area.component';

describe('SafeAreaComponent', () => {
  let component: SafeAreaComponent;
  let fixture: ComponentFixture<SafeAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafeAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
