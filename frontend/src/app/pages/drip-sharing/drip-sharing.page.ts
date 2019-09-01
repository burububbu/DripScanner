import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-drip-sharing',
  templateUrl: './drip-sharing.page.html',
  styleUrls: ['./drip-sharing.page.scss']
})
export class DripSharingPage implements OnInit {
  createdCode = null;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.createdCode = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {}

  goBack() {
    this.router.navigateByUrl('/tabs');
  }
}
