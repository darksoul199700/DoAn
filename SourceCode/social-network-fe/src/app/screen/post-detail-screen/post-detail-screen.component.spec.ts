import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailScreenComponent } from './post-detail-screen.component';

describe('PostDetailScreenComponent', () => {
  let component: PostDetailScreenComponent;
  let fixture: ComponentFixture<PostDetailScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDetailScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
