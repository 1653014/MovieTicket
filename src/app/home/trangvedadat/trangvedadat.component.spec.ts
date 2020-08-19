import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangvedadatComponent } from './trangvedadat.component';

describe('TrangvedadatComponent', () => {
  let component: TrangvedadatComponent;
  let fixture: ComponentFixture<TrangvedadatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangvedadatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangvedadatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
