import {NgModule} from '@angular/core';
import {FontAwesomeModule as OriginalFontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEnvelope, faPaperPlane, faUser,} from '@fortawesome/free-regular-svg-icons';
import {
  faAlignLeft,
  faAt,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCommentMedical,
  faComments,
  faCreditCard, faEdit,
  faExclamationCircle,
  faExclamationTriangle,
  faEye,
  faGlobe,
  faHeading,
  faHeart,
  faImage,
  faKey,
  faLevelUpAlt,
  faPenAlt,
  faRedoAlt,
  faRetweet,
  faShareAlt,
  faSpinner,
  faTags,
  faTerminal,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import {faBitcoin, faFacebook, faReddit, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faCircle} from '@fortawesome/free-solid-svg-icons/faCircle';

@NgModule({
  declarations: [],
  imports: [
    OriginalFontAwesomeModule,
  ],
  providers: [],
  exports: [OriginalFontAwesomeModule],
})
export class FontAwesomeModule {
  /* istanbul ignore next */
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
    library.add(faExclamationTriangle);
    library.add(faPenAlt);
    library.add(faPaperPlane);
    library.add(faWindowClose);
    library.add(faChevronLeft);
    library.add(faChevronRight);
    library.add(faCommentMedical);
    library.add(faComments);
    library.add(faHeading);
    library.add(faAlignLeft);
    library.add(faTags);
    library.add(faImage);
    library.add(faChevronUp);
    library.add(faChevronDown);
    library.add(faExclamationTriangle);
    library.add(faEye);
    library.add(faFacebook);
    library.add(faTwitter);
    library.add(faReddit);
    library.add(faCreditCard);
    library.add(faLevelUpAlt);
    library.add(faKey);
    library.add(faAt);
    library.add(faRedoAlt);
    library.add(faCircle);
    library.add(faEdit);
  }
}
