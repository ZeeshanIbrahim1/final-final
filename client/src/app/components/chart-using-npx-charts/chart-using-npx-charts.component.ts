import { Component } from '@angular/core';
import { data } from './data';
import { PatientService } from 'src/app/services/patient.service';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-chart-using-npx-charts',
  templateUrl: './chart-using-npx-charts.component.html',
  styleUrls: ['./chart-using-npx-charts.component.css']
})
export class ChartUsingNpxChartsComponent {
 data: any[];
 view: any[] = [500,400]
 patientData: any;
 maleCount: number = 0;
 femaleCount: number = 0;
 otherCount:number = 0;
 genderData: any[] = [];
 parsedData: any;

 showXAxis: boolean = true;
 showYAxis: boolean = true;
 showLegend: boolean = true;
 legendTitle: string = 'Years';
 xAxisLabel: string = 'Cities';
 yAxisLabel: string = 'Population'
 xAxisLabel2: string = 'Gender';
 yAxisLabel2: string = '# Number'
 showXAxisLabel: boolean = true
 showYAxisLabel: boolean = true
constructor(private patientService:PatientService,private caseService:CaseService) {
  Object.assign(this, { data })
}
ngOnInit(){
  this.getInfo();
}
chartData = [
  {
    name: 'A Grade',
    value: 10
  },
  {
    name: 'B Grade',
    value: 45
  },
  {
    name: 'C Grade',
    value: 30
  }
  // Add more data points here...
];
getInfo(){
   this.patientService.getPatientsAll().subscribe((response)=>{
    this.patientData = response;
    console.log("information:",this.patientData)
    this.genderCount(this.patientData);
  })
}
genderCount(data){
  data.forEach((arr)=>{
    if(arr.gender === "male"){
      this.maleCount++;
      console.log("in count",this.maleCount)
    }
    else if(arr.gender === "female"){
      this.femaleCount++;
    }
    else{
      this.otherCount++;
    }
  })
  this.genderData = [
    {
      name: 'Male',
      value: this.maleCount
    },
    {
      name: "Female",
      value: this.femaleCount
    },
    {
      name: "Other",
      value: this.otherCount
    },
    ]
    console.log("gender Data",this.genderData)
    this.parsedData = (JSON.parse(JSON.stringify(this.genderData).replace(/^\{(.*)\}$/,"[ { $1 }]")));
    console.log("data", this.data)
}
}
