import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input('data') data:any;

  chart:any;

  

  constructor() { }

  ngOnInit(): void {


    const chartConfig = {

    };
    // var ctx = document.getElementById('myChart').getContext('2d');
    this.chart = new Chart('canvas',{
      type:'line',
      data:{
        labels: [],
        datasets : [
          {
            data:[1,2,3,4,5],
            borderColor: '#3cba9f',
            fill:false
          },
          {
            data:[5,3,2,4,5],
            borderColor: '#ffcc00',
            fill:false
          }
        ]
      },
      options:{
        responsive:true,
        scales:{
          
        },
        plugins:{
          legend:{
            position:'top',
          },
          title:{
            display:true,
            text: "TESTIG",
          },
        }
      }
    })

  }

}
