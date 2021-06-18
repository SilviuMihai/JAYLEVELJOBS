import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningsDocumentationComponent } from './learnings-documentation.component';

describe('LearningsDocumentationComponent', () => {
  let component: LearningsDocumentationComponent;
  let fixture: ComponentFixture<LearningsDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningsDocumentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningsDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
