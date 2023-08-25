import { Component } from '@angular/core';
import { data } from './data';

@Component({
  selector: 'app-chart-using-npx-charts',
  templateUrl: './chart-using-npx-charts.component.html',
  styleUrls: ['./chart-using-npx-charts.component.css']
})
export class ChartUsingNpxChartsComponent {
 data: any[];
 view: any[] = [500,400]

 showXAxis: boolean = true;
 showYAxis: boolean = true;
 showLegend: boolean = true;
 legendTitle: string = 'Years';
 xAxisLabel: string = 'Cities';
 yAxisLabel: string = 'Population'
 showXAxisLabel: boolean = true
 showYAxisLabel: boolean = true
constructor() {
  Object.assign(this, { data })
}
}
