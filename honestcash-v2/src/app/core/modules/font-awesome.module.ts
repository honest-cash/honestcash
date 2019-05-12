import { NgModule } from '@angular/core';
import { FontAwesomeModule as OriginalFontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEnvelope, faUser} from '@fortawesome/free-regular-svg-icons';
import {faKey} from '@fortawesome/free-solid-svg-icons/faKey';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import {faComments, faGlobe, faHeart, faRetweet, faShareAlt, faSpinner, faTerminal} from '@fortawesome/free-solid-svg-icons';
import {faBitcoin} from '@fortawesome/free-brands-svg-icons';

@NgModule({
  declarations: [],
  imports: [
    OriginalFontAwesomeModule,
  ],
  providers: [],
  exports: [OriginalFontAwesomeModule],
})
export class FontAwesomeModule {
  constructor() {
    library.add(faComments);
    library.add(faTerminal);
    library.add(faGlobe);
    library.add(faRetweet);
    library.add(faBitcoin);
    library.add(faShareAlt);
    library.add(faHeart);
    library.add(faSpinner);
    library.add(faEnvelope);
    library.add(faUser);
    library.add(faKey);
    library.add(faExclamationCircle);
  }
}
