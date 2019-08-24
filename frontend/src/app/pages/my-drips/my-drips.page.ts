import { Component, OnInit } from '@angular/core';
import { OwnersService } from 'src/app/providers/owners/owners.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-drips',
  templateUrl: './my-drips.page.html',
  styleUrls: ['./my-drips.page.scss']
})
export class MyDripsPage implements OnInit {
  myDrips: string[];
  constructor(private ownersService: OwnersService, private router: Router) {}

  ngOnInit() {
    this.getDrips();
  }

  getDrips() {
    this.ownersService
      .getDrips('prova@gmail.com')
      .pipe(tap((drips: string[]) => (this.myDrips = drips)))
      .subscribe(() => console.log(this.myDrips));
  }

  handleOpenClick(e: Event) {
    this.router.navigateByUrl(`/info-drip/${e}`);
  }

  handleShareClick(e: Event) {
    this.router.navigateByUrl(`/drip-sharing/${e}`);
  }
}
