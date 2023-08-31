import { Component, AfterViewInit } from '@angular/core';
import { Chart,registerables } from 'chart.js';
import { PatientService } from 'src/app/services/patient.service';
import { CaseComponent } from '../case/case.component';
import { CaseService } from 'src/app/services/case.service';
import { AppointService } from 'src/app/services/appoint.service';
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements AfterViewInit {
  myChart:any;
  firmChart: any;
  manualChart: any;
  increment: 0;
  canvasElement:any;
  firmCanvasElement: any;
  manualElement: any;
  context:any;
  chart: any;
  patientInfo: any;
  caseInfo: any;
  charts: any[]=[
    {value:"bar", viewChart : "Bar Graph"},
    {value: "pie", viewChart : "Pie Graph"},
    {value: "line", viewChart: "Line Graph"},
    // {value: "bubble", viewChart: "Bubble Chart"}
  ]
  constructor(private patientService:PatientService, private caseService:CaseService, private appointService:AppointService){}
  ngAfterViewInit() {
    this.canvasElement = document.getElementById('chart1') as HTMLCanvasElement;
    this.firmCanvasElement = document.getElementById('chart2') as HTMLCanvasElement;
    this.manualElement = document.getElementById('chart3') as HTMLCanvasElement;
    // create 3rd for better understanding
    this.initializeChart();
    this.initializeFirmChart();
    this.initializeManualChart();
  }

  initializeChart() {
    this.myChart = new Chart(this.canvasElement, {
      type: 'bar',
      data: {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
          label: 'Patient Gender',
          data: [1, 1, 1], // Placeholder data
          borderWidth: 1,
          backgroundColor: ['blue', 'pink', 'gray']
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  // context = this.canvasElement.getContext('2d');
  initializeFirmChart(){
    this.firmChart = new Chart(this.firmCanvasElement, {
      type: 'bar',
      data: {
        labels: ['ABC Firm', 'XYZ Firm'],
        datasets: [{
          label: 'Firm Cases',
          data: [0, 0], // Placeholder data
          borderWidth: 1,
          backgroundColor: ['blue', 'pink', 'gray']
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  initializeManualChart() {
    this.manualChart = new Chart(this.manualElement, {
      type: 'bar',
      data: {
        labels: ['lahore', 'Karachi', 'Multan', 'Islamabad', 'Peshawar', 'Quetta'],
        datasets: [{
          label: 'PSL Trophies',
          data: [2,1,1,1,1,1],
          borderWidth: 1,
          backgroundColor: ['green', 'blue', 'orange', 'red', 'yellow', 'purple']
        }]
      },
      options: {
        plugins:{
          legend:{
            display:true
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  ngOnInit(){
    this.getPatientInfo();
    this.getCaseInfo();
  }
  createChart(arg1:any){
    if(this.myChart){
      this.myChart.destroy()
    }
    this.chartCreation(arg1)
    this.updateChart();
  }
  create2ndChart(arg1:any){
    if(this.firmChart){
      this.firmChart.destroy()
    }
    this.firmChartCreation(arg1)
    this.updateFirmChart();
  }
  chartCreation(type){
    this.myChart = new Chart(this.canvasElement,{
      type:type,
      data:{
        labels: [ "Male","Females","Other" ],
        datasets:[{
          label:"# of Patient",
          data:[0,0,0],
          borderWidth: 1,
          backgroundColor:['blue','black','red']
        }]
      },
      options:{
        scales:{
          y:{
            beginAtZero: true
          }
        }
      }
    })
  }
  firmChartCreation(type){
    this.firmChart = new Chart(this.firmCanvasElement,{
      type:type,
      data:{
        labels: [ "ABC Firm","XYZ Firm"],
        datasets:[{
          label:"Firm Cases",
          data:[0,0],
          borderWidth: 1,
          backgroundColor:['blue','red']
        }]
      },
      options:{
        scales:{
          y:{
            beginAtZero: true
          }
        }
      }
    })
  }
  getPatientInfo(){
    this.patientService.getPatientsAll().subscribe((response: any[])=>{
      this.patientInfo = response;
      console.log("Patient Info:",this.patientInfo)
    })
  }
  getCaseInfo(){
    this.caseService.getAllCases().subscribe((response)=>{
      this.caseInfo = response;
      console.log("Case Info:",this.caseInfo)
    })
  }

  updateChart(){
    const genderCounts={
      male:0,
      female:0,
      other:0
    }
    
    this.patientInfo.forEach(patient => {
      if(patient.gender === 'male'){
        genderCounts.male++;
      } 
      else if(patient.gender === 'female'){
        genderCounts.female++;
      }
      else{
        genderCounts.other++;
      }
    });
    

    this.myChart.data.datasets[0].data = [
      genderCounts.male,
      genderCounts.female,
      genderCounts.other
    ];

    
    this.myChart.update();

  }
  updateFirmChart(){
    const firmCasesCounts = {
      firmABC:0,
      firmXYZ:0
    }

    this.caseInfo.forEach((info):any => {
      console.log(` case`,info.firmName)
      if(info.firmName === 'ABC Law Firm'){
        firmCasesCounts.firmABC++;
      }
      else if(info.firmName === "XYZ Legal Services"){
        firmCasesCounts.firmXYZ++;
      }
    })

    this.firmChart.data.datasets[0].data = [
      firmCasesCounts.firmABC,
      firmCasesCounts.firmXYZ
    ]

    this.firmChart.update();

  }

}
