import { Component } from '@angular/core';
import { LoadingService } from './loader/loadingService/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading = this._loader.loading$;

  title = 'ng-startup-project';

  constructor(public _loader: LoadingService) {}
}
