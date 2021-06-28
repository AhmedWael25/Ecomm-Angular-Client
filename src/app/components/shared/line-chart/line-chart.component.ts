import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input('data') chartData: Map<string, number> = new Map();
  @Input('title') title:string = "";
  @Input('label') label:string= "";

  chart: any;

  constructor() { }

  ngOnInit(): void {


    let xAxis = Array.from(this.chartData.values());
    let yAxis = Array.from(this.chartData.keys());

    this.chart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: yAxis,
        datasets: [{
          label: this.label,
          data: xAxis,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 3,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: this.title,
          },
        }
      }
    });

  }

}
