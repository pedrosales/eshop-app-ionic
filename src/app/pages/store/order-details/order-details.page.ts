import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';
import { SecurityUtil } from 'src/app/utils/security.util';
import { StatusUtil } from 'src/app/utils/status.util';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  public order = null;

  constructor(
    private route: ActivatedRoute,
    private service: DataService
  ) { }

  ngOnInit() {
    let number = this.route.snapshot.paramMap.get('number');
    this.service
      .getOrder(number)
      .subscribe((data: any) => {
        this.order = data;
      })
  }

  isManager(): boolean {
    return SecurityUtil.isInRole('manager');
  }

  translateOrderStatus(status: string): string {
    return StatusUtil.Convert(status);
  }

}
