import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { CartService } from 'src/app/services/cart/cart.service';
@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css'],
})
export class AnalyseComponent implements OnInit {
  chartData = [
    {
      data: [330, 450, 260, 650],
      label: 'apple watch serie 7',
    },
    {
      data: [120, 600, 100, 340],
      label: 'S22 Ultra',
    },
    {
      data: [420, 800, 700, 500],
      label: 'MSI GS65',
    },
  ];
  chartData2 = [
    {
      data: [45000, 70000, 30000, 80000],
      label: 'apple watch serie 7',
    },
    {
      data: [50000, 120000, 40000, 120000],
      label: 'S22 Ultra',
    },
    {
      data: [80000, 110000, 150000, 80000],
      label: 'MSI GS65',
    },
  ];
  chartLabels = ['Janvier', 'Fevrier', 'Mars', 'Avril'];
  chartOptions = {
    responsive: true,
  };
  constructor(private CartService: CartService) {}
 list:any=[]

  ngOnInit(): void {
    this.best();
  }

  exist(ch:any):any{
    for (var i = 0; i < this.list.length; i++) {
      console.log(ch)
      if (this.list[i]['Prod_Name'] == ch)
      {
        console.log(this.list)
        return i;
      }


      else
      {
        console.log("aaa")
        return null;
      }
    }
  }
  best() {
    this.CartService.getBest().subscribe((result: any) => {
      console.log(result);
      console.log(result.length)
      this.list=[...this.list];
      for (var x = 0; x < result.length; x++){
       console.log(result[x]['Prod_Name'])
        if ((result[x]['date'] = '2022-2')) {
          if (this.exist(result[x]['Prod_Name'])==null)
          {
            this.list.push(result[x])
            //console.log('succé')
          }
          else
          {
            //console.log(this.exist(x['Prod_Name']))
          }
         //if( x['Prod_Name'])


        }
      }
//console.log(this.list)
      // alert(result.toString());
      //window.location.reload();
    });
  }

}
