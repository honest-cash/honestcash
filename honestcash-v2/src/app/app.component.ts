import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') class = 'h-full w-full flex flex-wrap';

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.setup();
  }
}
