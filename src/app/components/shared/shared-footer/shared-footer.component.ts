import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shared-footer',
  templateUrl: './shared-footer.component.html',
  styleUrls: ['./shared-footer.component.css']
})
export class SharedFooterComponent implements OnInit {

  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
  }

  isCustomer: boolean = this._authService.isCustomer();

  isSeller: boolean = this._authService.isSeller();
  
  isAdmin: boolean = this._authService.isAdmin();

}
