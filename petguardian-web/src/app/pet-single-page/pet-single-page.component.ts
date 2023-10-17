import { Component, OnInit } from '@angular/core';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-pet-single-page',
  templateUrl: './pet-single-page.component.html',
  styleUrls: ['./pet-single-page.component.css']
})
export class PetSinglePageComponent {
  /*
  constructor(@Inject(DOCUMENT) document: Document) {
    document.getElementById('el');
 }

  ngOnInit() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Sleep', 7]
    ]);

    var options = {
      title: 'My Daily Activities'
    };
    console.log(document.getElementById('petName'));


    //var chart = new google.visualization.PieChart(document.getElementById('el'));
    //chart.draw(data, options);
  }
  */
}
