import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/services/company.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit  {

  companies: any[] = []

  constructor(private movieService: CompanyService, private router: Router) { }

  ngOnInit() {
    this.getPopularCompanies();
  }

  getPopularCompanies() {
    this.movieService.getPopulars().subscribe(
      (data) => {
        this.companies = data
      }
     );
  }

  navigateToTab2() {
    this.router.navigateByUrl('tabs/tab2');
  }

}
