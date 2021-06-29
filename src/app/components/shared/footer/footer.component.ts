import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  

  constructor(private _authService: AuthService) { }

  isCustomer: boolean = this._authService.isCustomer();

  isSeller: boolean = this._authService.isSeller();
  
  isAdmin: boolean = this._authService.isAdmin();


  ngOnInit(): void {
  }

}
