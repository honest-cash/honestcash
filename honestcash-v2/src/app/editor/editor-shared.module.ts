import {NgModule} from '@angular/core';
import {SharedModule} from '../../core/shared.module';
import {EditorService} from './services/editor.service';
import {EditorEffects} from './store/editor.effects';
import {SharedComponentsModule} from '../../core/shared-components.module';
import {EditorPopupComponent} from './components/popup-editor/popup.component';
import {EditorComponent} from './components/editor/editor.component';
import {EditorStoryTagsSelectionComponent} from './components/story-tags-selection/story-tags-selection.component';
import {EditorPaidSectionToggleButtonComponent} from './components/paid-section-toggle-button/paid-section-toggle-button.component';
import {EditorPaidSectionSelectionComponent} from './components/paid-section-selection/paid-section-selection.component';
import {TagInputModule} from 'ngx-chips';
import {ScriptLoaderModule} from 'ngx-script-loader';
import {FormsModule} from '@angular/forms';
import {EditorPublishModalComponent} from './components/publish-modal/publish-modal.component';
import {EditorPublishButtonComponent} from './components/publish-button/publish-button.component';
import {EditorSaveStatusComponent} from './components/save-status/save-status.component';

@NgModule({
  declarations: [
    EditorComponent,
    EditorStoryTagsSelectionComponent,
    EditorPaidSectionToggleButtonComponent,
    EditorPaidSectionSelectionComponent,
    EditorPopupComponent,
    EditorComponent,
    EditorPublishModalComponent,
    EditorPublishButtonComponent,
    EditorSaveStatusComponent,
  ],
  providers: [
    EditorService,
    EditorEffects,
  ],
  imports: [
    FormsModule,
    SharedModule,
    SharedComponentsModule,
    TagInputModule,
    ScriptLoaderModule,
  ],
  entryComponents: [
    EditorPopupComponent,
    EditorComponent,
    EditorPublishModalComponent,
    EditorPublishButtonComponent,
    EditorSaveStatusComponent,
  ],
  exports: [
    SharedModule,
    SharedComponentsModule,
    EditorPopupComponent,
    EditorComponent,
    EditorPublishModalComponent,
    EditorPublishButtonComponent,
    EditorSaveStatusComponent,
  ],
})
export class EditorSharedModule {
}
