import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleSuggessScreenComponent } from './people-suggess-screen.component';

describe('PeopleSuggessScreenComponent', () => {
  let component: PeopleSuggessScreenComponent;
  let fixture: ComponentFixture<PeopleSuggessScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleSuggessScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleSuggessScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
