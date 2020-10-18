import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMomentComponent } from './create-moment.component';

describe('CreateMomentComponent', () => {
  let component: CreateMomentComponent;
  let fixture: ComponentFixture<CreateMomentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMomentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMomentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
