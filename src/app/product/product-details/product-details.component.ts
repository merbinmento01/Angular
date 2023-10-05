import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeProfileComponent } from 'src/app/shared/employee-profile/employee-profile.component';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnChanges {
  
  @Input() selectedProduct: any;
  salesChartOptions: any;
  salesChart: any;
  salesChartData: any[] = [];
  productRating: number = 0;
  selectedTab: string = '';

  constructor(private modal: MatDialog) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.productRating = simpleChanges['selectedProduct']?.currentValue?.product?.Product_Consumer_Rating;
    this.productRating = Math.floor(this.productRating);
    this.formatChartData();
    if(this.salesChart) {
      this.salesChart.updateSeries(this.salesChartData)
    } else if (this.selectedTab == 'Sales And Opportunities' && this.selectedProduct?.salesAndOpportunities) {
      this.initializeChart();
    }
  }

  ngOnInit(): void {}

  openEmployeeInfo(employeeInfo: any) {
    const componentRef = this.modal.open(EmployeeProfileComponent, {
      minWidth: '30vw',
      width: '60vw',
      height: '32vw',
      panelClass: 'profile'
    })

    componentRef.componentInstance.employeeInfo = employeeInfo;
  }

  onChange(event: any) {
    this.selectedTab = event?.tab?.textLabel;
    if (this.selectedTab == 'Sales And Opportunities' && this.selectedProduct?.salesAndOpportunities) {
      this.initializeChart();
    } else if (!this.selectedProduct?.salesAndOpportunities) {
      this.salesChart.destroy();
    }
  }

  formatChartData() {
    this.salesChartData = [];
    const sales: any = { name: 'Sales', data: [] };
    const opportunities: any = { name: 'Opportunities', data: [] };
    this.selectedProduct?.salesAndOpportunities?.forEach((salesAndOpp: any) => {
      sales.data.push({x: salesAndOpp?.Year, y: salesAndOpp?.Sale})
      opportunities.data.push({x: salesAndOpp?.Year, y: salesAndOpp?.Opportunity})
    });
    this.salesChartData.push(sales);
    this.salesChartData.push(opportunities);

  }

  initializeChart() {
    if(!this.salesChartData?.length) {
      this.formatChartData();
    }
    this.salesChartOptions = {
        series: this.salesChartData,
        chart: {
            animations: {
                enabled: false,
            },
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'bar',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: true,
            },
        },
        grid: {
            borderColor: '#c1c1c1',
            show: true,
            strokeDashArray: 0,
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1,
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false,
                datetimeFormatter: {
                    year: 'yyyy',
                    month: "MMM 'yy",
                    day: 'dd MMM',
                    hour: 'HH:mm:ss',
                },
            }
        },
        fill: {
            opacity: 1
        },
        colors: ['#b2586e', '#1c294e']
    };

    setTimeout(() => {
        this.salesChart = new ApexCharts(document.querySelector("#salesChart"), this.salesChartOptions);
        this.salesChart.render();
    }, 1000)
}

}
