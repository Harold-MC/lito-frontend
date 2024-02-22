import { Component, Input, OnChanges } from '@angular/core';
import { CompanyService, ICompany } from 'src/services/company.service';

@Component({
  selector: 'company-form',
  templateUrl: 'company-form.page.html',
})
export class CompanyForm implements OnChanges {
  @Input() company!: ICompany;
  @Input() onSuccess!: () => void;

  model: ICompany = {} as ICompany;

  constructor(private companyService: CompanyService) {}

  ngOnChanges(changes: any) {
    if (changes.company?.currentValue) {
      this.model = changes.company.currentValue;
    }
  }

  update(payload: ICompany) {
    this.companyService.update(payload).subscribe(() => {
      this.onSuccess?.();
    });
  }

  insert(payload: ICompany) {
    this.companyService.insert(payload).subscribe(() => {
      this.onSuccess?.();
    });
  }

  submit() {
    if (this.model.id) 
      return this.update(this.model);
    
    this.insert(this.model);
  }
}
