import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleFriendScreenComponent } from './people-friend-screen.component';

describe('PeopleFriendScreenComponent', () => {
  let component: PeopleFriendScreenComponent;
  let fixture: ComponentFixture<PeopleFriendScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleFriendScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleFriendScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
