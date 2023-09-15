import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartUsingNpxChartsComponent } from './chart-using-ngx-charts.component';

describe('ChartUsingNpxChartsComponent', () => {
  let component: ChartUsingNpxChartsComponent;
  let fixture: ComponentFixture<ChartUsingNpxChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartUsingNpxChartsComponent]
    });
    fixture = TestBed.createComponent(ChartUsingNpxChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
