import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CompanyService, ICompany } from 'src/services/company.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  companies: any[] = [];
  isModalOpen = false;
  selectedCompany: any;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private actionSheetCtrl: ActionSheetController
  ) {}


  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companyService.getAll().subscribe((data) => {
      this.companies = data;
    });
  }

  navigateToTab1() {
    this.router.navigateByUrl('tabs/tab1');
  }

  setIsModalOpen(val: boolean) {
    this.isModalOpen = val;
  }

  setSelectedCompany(payload: any) {
    this.selectedCompany = payload;
  }

  onEditCompany(payload: any) {
    this.setSelectedCompany(payload);
    this.setIsModalOpen(true);
  }

  onAddCompany() {
    this.setSelectedCompany(undefined);
    this.setIsModalOpen(true);
  }

  removeCompany = async (id: string) => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Estas seguro que deseas eliminar esta aseguradora?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    if (role === 'confirm') {
      this.companyService.remove(id).subscribe(() => {
        this.getCompanies();
      });
    }
  };

  onSuccessSaveCompany() {
    this.getCompanies();
    this.setIsModalOpen(false)

  }

}
