import { Component, OnInit } from '@angular/core';
import User from '../../../core/models/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { EmbeddableEditorComponent } from '../embed/embed.component';

@Component({
             selector: 'app-header',
             templateUrl: './header.component.html',
             styleUrls: ['./header.component.scss']
           })
export class HeaderComponent implements OnInit {
  menuHidden = true;
  // @todo get it from store instead
  public user: User;

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // @todo access from store instead
    this.user = new User();
    /*this.userService.getUser().subscribe(user => {
      this.user = user;
    });*/
  }

  openEditorModal() {
    const modalRef = this.modalService.open(EmbeddableEditorComponent, {
      size: 'lg',
      centered: true,
    });
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    // @todo implement logout action dispatch
    // this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  goTo(path: string) {
    switch (path) {
      case 'profile':
        window.location.href = `/profile/${this.user.username}`;
        break;
      case 'posts':
        window.location.href = `/posts`;
        break;
      case 'wallet':
        window.location.href = `/wallet`;
        break;
      case 'help':
        window.location.href = `/honest_cash/frequently-asked-questions`;
        break;
      case 'terms-of-service':
        window.location.href = `/honest_cash/honest-cash-terms-of-service-124`;
        break;
      case 'privacy-policy':
        window.location.href = `/honest_cash/honestcash-privacy-policy`;
        break;
      default:
        break;
    }
  }
}
