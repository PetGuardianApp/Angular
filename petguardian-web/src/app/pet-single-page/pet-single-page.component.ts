import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { PetModel } from '../models/pet.model';
import { ApexAxisChartSeries, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
};


@Component({
  selector: 'app-pet-single-page',
  templateUrl: './pet-single-page.component.html',
  styleUrls: ['./pet-single-page.component.css']
})
export class PetSinglePageComponent {
  @ViewChild("chart_div") chart: ChartComponent | undefined;

  public chartOptions: ChartOptions = {
    series: [
      {
        name: "Cardiac Frequency",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      },
      {
        name: "Steps",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      }
    ],
    chart: {
      type: "bar",
      height: 350
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct"
      ]
    },
    yaxis: {
      title: {
        text: "$ (thousands)"
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        }
      }
    }
  };

  public chartOptions2: ChartOptions = {
    series: [
      {
        name: "Weight",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      },
      {
        name: "Height",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      }
    ],
    chart: {
      type: "bar",
      height: 350
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"]
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct"
      ]
    },
    yaxis: {
      title: {
        text: "$ (thousands)"
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        }
      }
    }
  };
  public petInfo: PetModel;

  constructor(private apiService: ApiService) {
    const urlParams = new URLSearchParams(window.location.search);
    this.showPetData(urlParams.get('petId'));
    this.petInfo = new PetModel;
  }

  showPetData(petId: string | null) {
    if (petId != null) {
      this.apiService.getPet(petId).then((petData) => {
        this.petInfo = petData;

        console.log(petData);

        // Mostrar cardaiac freq
        this.drawCardiacFreqChart();
      });
    }
  }

  drawCardiacFreqChart() {
    // Procesar los datos de cardiac_freq
    const cardiacFreqData = this.petInfo.health_info?.cardiac_freq;
    if (cardiacFreqData != undefined) {
      // Convertir las claves de las fechas a un formato adecuado para Highcharts
      const series = Object.keys(cardiacFreqData).map((date) => {
        const value = parseFloat(cardiacFreqData[date]);
        return [new Date(date).getTime(), value];
      });
    }
  }

  getLatestWeight() {
    if (this.petInfo.weight != undefined) {
      const keys = Object.keys(this.petInfo.weight);
      const latestKey = keys[keys.length - 1];
      return this.petInfo.weight[latestKey];
    }
    return null;
  }

  getBirth(birth: string | undefined) {
    // Return birth in format 1 of July, 2023
    if (birth != undefined) {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      const parts = birth.split('_');
      const datePart = parts[0];

      const day = parseInt(datePart.substring(0, 2), 10);
      const monthIndex = parseInt(datePart.substring(2, 4), 10) - 1;
      const year = parseInt(datePart.substring(4, 8), 10);

      const formattedDate = `${day} of ${months[monthIndex]}, ${year}`;

      return formattedDate;
    }
    return null;
  }
}