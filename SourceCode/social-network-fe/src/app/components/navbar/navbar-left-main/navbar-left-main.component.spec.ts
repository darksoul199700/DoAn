import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLeftMainComponent } from './navbar-left-main.component';

describe('NavbarLeftMainComponent', () => {
  let component: NavbarLeftMainComponent;
  let fixture: ComponentFixture<NavbarLeftMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarLeftMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLeftMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
