import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachgheComponent } from './danhsachghe.component';

describe('DanhsachgheComponent', () => {
  let component: DanhsachgheComponent;
  let fixture: ComponentFixture<DanhsachgheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachgheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachgheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
