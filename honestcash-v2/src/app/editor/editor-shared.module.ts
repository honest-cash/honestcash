import {NgModule} from '@angular/core';
import {SharedModule} from '../../core/shared.module';
import {EditorService} from './services/editor.service';
import {EditorEffects} from './store/editor.effects';
import {SharedComponentsModule} from '../../core/shared-components.module';

@NgModule({
  declarations: [

  ],
  providers: [
    EditorService,
    EditorEffects,
  ],
  imports: [
    SharedModule,
    SharedComponentsModule,
  ],
  entryComponents: [

  ],
  exports: [
    SharedModule,
    SharedComponentsModule,
  ],
})
export class EditorSharedModule {
}
