import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFirstPageComponent } from './user-first-page.component';

describe('UserFirstPageComponent', () => {
  let component: UserFirstPageComponent;
  let fixture: ComponentFixture<UserFirstPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFirstPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFirstPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
