import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialAppStates} from '../../../app.states.mock';
import {
  EditorPaidSectionSelectionComponent,
  LINEBREAK_ACTION,
  PAID_SECTION_PRICE_SLIDER_SETTINGS
} from './paid-section-selection.component';
import {FormsModule} from '@angular/forms';
import {EDITOR_STATUS} from '../../store/editor.state';
import Story from '../../../main/models/story';
import * as converter from '../../shared/json-to-html';
import {convertBlockToHtml, ELEMENT_TYPES} from '../../shared/json-to-html';
import {Subscription} from 'rxjs';
import {AppStates} from '../../../app.states';
import {Store} from '@ngrx/store';
import {EditorStoryPropertyChange} from '../../store/editor.actions';
import {STORY_PROPERTIES} from '../../shared/editor.story-properties';

describe('EditorPaidSectionSelectionComponent', () => {
  let component: EditorPaidSectionSelectionComponent;
  let fixture: ComponentFixture<EditorPaidSectionSelectionComponent>;
  let store: MockStore<AppStates>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [EditorPaidSectionSelectionComponent],
      providers: [
        provideMockStore({initialState: initialAppStates})
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    });

    fixture = TestBed.createComponent(EditorPaidSectionSelectionComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('functions', () => {
    describe('ngOnInit should', () => {
      it('call setShouldHideElements and setPaidSectionDefaults and set story', () => {
        const setShouldHideElementsSpy = spyOn(component, 'setShouldHideElements').and.callThrough();
        const setPaidSectionDefaultsSpy = spyOn(component, 'setPaidSectionDefaults').and.callThrough();
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.story).toBeDefined();
        expect(setShouldHideElementsSpy).toHaveBeenCalled();
        expect(setPaidSectionDefaultsSpy).toHaveBeenCalled();
      });
    });

    describe('setShouldHideElements should', () => {
      it('have shouldHideElements true on init', () => {
        expect(component.shouldHideElements).toBeTruthy();
      });
      it('NOT set shouldHideElements to false if there is NOT a story', () => {
        component.setShouldHideElements(EDITOR_STATUS.NotInitialized);
        expect(component.shouldHideElements).toBeTruthy();
      });
      it('NOT set shouldHideElements to false if there is a story but no paidSection', () => {
        component.story = {
          ...new Story(),
          hasPaidSection: false,
        };
        component.setShouldHideElements(EDITOR_STATUS.NotInitialized);
        expect(component.shouldHideElements).toBeTruthy();
      });
      it('NOT set shouldHideElements to false if there is a story and a paidSection but Editor is not NotInitialized', () => {
        component.story = {
          ...new Story(),
          hasPaidSection: true,
        };
        component.setShouldHideElements(EDITOR_STATUS.NotInitialized);
        expect(component.shouldHideElements).toBeTruthy();
      });
      it('set shouldHideElements to false if there is a story, the story has a paidSection and editor is EditorLoaded', () => {
        component.story = {
          ...new Story(),
          hasPaidSection: true
        };
        component.setShouldHideElements(EDITOR_STATUS.EditorLoaded);
        expect(component.shouldHideElements).toBeFalsy();
      });
    });

    describe('setPaidSectionDefaults should', () => {
      it('set paidSectionLinebreak to 1 if it does not exist in story', () => {
        component.story = {
          ...new Story(),
          paidSectionLinebreak: undefined
        };
        component.setPaidSectionDefaults();
        expect(component.story.paidSectionLinebreak).toEqual(1);
      });
      it('NOT set paidSectionLinebreak to 1 if it already exists in story', () => {
        component.story = {
          ...new Story(),
          paidSectionLinebreak: 5
        };
        component.setPaidSectionDefaults();
        expect(component.story.paidSectionLinebreak).toEqual(5);
      });
      it('set paidSectionCost to PAID_SECTION_PRICE_SLIDER_SETTINGS.MIN if it does not exist in story', () => {
        component.story = {
          ...new Story(),
          paidSectionCost: undefined
        };
        component.setPaidSectionDefaults();
        expect(component.story.paidSectionCost).toEqual(PAID_SECTION_PRICE_SLIDER_SETTINGS.MIN);
      });
      it('NOT set paidSectionCost to PAID_SECTION_PRICE_SLIDER_SETTINGS.MIN if it already exists in story', () => {
        component.story = {
          ...new Story(),
          paidSectionCost: 3
        };
        component.setPaidSectionDefaults();
        expect(component.story.paidSectionCost).toEqual(3);
      });
      it('set paidSectionLinebreakEnd to the story bodyJSON length if it exists in story', () => {
        component.story = {
          ...new Story(),
          bodyJSON: [
            {
              type: ELEMENT_TYPES.Paragraph,
              data: {
                text: 'test'
              }
            },
            {
              type: ELEMENT_TYPES.Paragraph,
              data: {
                text: 'test'
              }
            }
          ]
        };
        component.setPaidSectionDefaults();
        expect(component.paidSectionLinebreakEnd).toEqual(component.story.bodyJSON.length - 1); // machine readable length
      });
      it('set paidSectionLinebreakEnd to 1 if story is not provided', () => {
        component.setPaidSectionDefaults();
        expect(component.paidSectionLinebreakEnd).toEqual(1); // machine readable length
      });
      it('set paidSectionLinebreakEnd to 1 if story is provided but bodyJSON is not defined', () => {
        component.story = {
          ...new Story(),
        };
        component.setPaidSectionDefaults();
        expect(component.paidSectionLinebreakEnd).toEqual(1); // machine readable length
      });
    });

    describe('onSwitchLinebreak should', () => {
      const paidSectionLinebreak = 2;
      const story = {
        ...new Story(),
        paidSectionLinebreak,
        bodyJSON: [
          {
            type: ELEMENT_TYPES.Paragraph,
            data: {
              text: 'test'
            }
          },
          {
            type: ELEMENT_TYPES.Paragraph,
            data: {
              text: 'test'
            }
          },
          {
            type: ELEMENT_TYPES.Paragraph,
            data: {
              text: 'test'
            }
          },
          {
            type: ELEMENT_TYPES.Paragraph,
            data: {
              text: 'test'
            }
          }
        ]
      };
      const paidSectionElements = story.bodyJSON.map(() => ({
        nativeElement: {
          scrollIntoView: () => {}
        }
      }));
      it('decrement story.paidSectionLinebreak by one if action is MoveUp and story.paidSectionLinebreak is greater than zero', () => {
        component.paidSectionElements = paidSectionElements as any;
        component.story = {...story};
        component.setPaidSectionDefaults();
        component.onSwitchLinebreak(LINEBREAK_ACTION.MoveUp);
        expect(component.story.paidSectionLinebreak).toEqual(paidSectionLinebreak - 1);
      });
      it('NOT decrement story.paidSectionLinebreak by one if action is MoveUp and story.paidSectionLinebreak is equal to zero', () => {
        const _paidSectionLinebreak = 0;
        component.paidSectionElements = paidSectionElements as any;
        component.story = {
          ...story,
          paidSectionLinebreak: _paidSectionLinebreak
        };
        component.setPaidSectionDefaults();
        component.onSwitchLinebreak(LINEBREAK_ACTION.MoveUp);
        expect(component.story.paidSectionLinebreak).toEqual(_paidSectionLinebreak + 1);
      });
      it('increment story.paidSectionLinebreak by one if action is MoveDown', () => {
        component.paidSectionElements = paidSectionElements as any;
        component.story = {...story};
        component.setPaidSectionDefaults();
        component.onSwitchLinebreak(LINEBREAK_ACTION.MoveDown);
        expect(component.story.paidSectionLinebreak).toEqual(paidSectionLinebreak + 1);
      });
      it('NOT increment story.paidSectionLinebreak by one if action is MoveDown and' +
        'story.paidSectionLinebreak is equal to paidSectionLinebreakEnd', () => {
        const _paidSectionLinebreak = story.bodyJSON.length - 1;
        component.paidSectionElements = paidSectionElements as any;
        component.story = {
          ...story,
          paidSectionLinebreak: _paidSectionLinebreak
        };
        component.setPaidSectionDefaults();
        component.onSwitchLinebreak(LINEBREAK_ACTION.MoveDown);
        expect(component.story.paidSectionLinebreak).toEqual(_paidSectionLinebreak);
      });
      it('call scrollLinebreakIntoView with the element of which index equals to the updated paidSectionLinebreak', () => {
        const scrollTop = 30;
        component.paidSectionElements = paidSectionElements as any;
        component.paidSectionElementsWrapperElement = {
          nativeElement: {
            scrollTop
          }
        };
        component.story = {...story};
        const scrollLinebreakIntoViewSpy = spyOn(component, 'scrollLinebreakIntoView');
        component.setPaidSectionDefaults();
        component.onSwitchLinebreak(LINEBREAK_ACTION.MoveDown);
        expect(scrollLinebreakIntoViewSpy).toHaveBeenCalledWith(paidSectionElements[paidSectionLinebreak + 1]);
      });
      it('set paidSectionLinebreak to one if it is zero', () => {
        component.paidSectionElements = paidSectionElements as any;
        component.story = {
          ...story,
          paidSectionLinebreak: 0,
        };
        component.setPaidSectionDefaults();
        component.onSwitchLinebreak(LINEBREAK_ACTION.MoveUp);
        expect(component.story.paidSectionLinebreak).toEqual(1);
      });
      it('dispatch EditorStoryPropertyChange with PaidSectionLinebreak as property and story.paidSectionLinebreak as value', () => {
        component.paidSectionElements = paidSectionElements as any;
        component.story = {...story};
        component.setPaidSectionDefaults();
        component.onSwitchLinebreak(LINEBREAK_ACTION.MoveDown);
        expect(store.dispatch).toHaveBeenCalledWith(
          new EditorStoryPropertyChange({
            property: STORY_PROPERTIES.PaidSectionLinebreak,
            value: paidSectionLinebreak + 1
          })
        );
      });
    });

    describe('onChangePaidSectionCost should', () => {
      it('dispatch EditorStoryPropertyChange with PaidSectionCost as property and story cost as value', () => {
        component.story = {
          ...new Story(),
          paidSectionCost: 3
        };
        component.onChangePaidSectionCost();
        expect(store.dispatch).toHaveBeenCalledWith(
          new EditorStoryPropertyChange({
            property: STORY_PROPERTIES.PaidSectionCost,
            value: component.story.paidSectionCost
          })
        );
      });
    });

    describe('scrollLinebreakIntoView', () => {
      it('call scrollIntoView on element', () => {
        const element = {
          nativeElement: {
            scrollIntoView: () => {}
          }
        };
        component.story = {
          ...new Story(),
          paidSectionLinebreak: 2
        };
        component.paidSectionLinebreakEnd = 3;
        const scrollIntoViewSpy = spyOn(element.nativeElement, 'scrollIntoView');
        component.scrollLinebreakIntoView(element);
        expect(scrollIntoViewSpy).toHaveBeenCalled();
      });
      it('set scrollTop -20px if element is NOT the last in bodyJSON', () => {
        const scrollTop = 30;
        const element = {
          nativeElement: {
            scrollIntoView: () => {}
          }
        };
        component.paidSectionElementsWrapperElement = {
          nativeElement: {
            scrollTop
          }
        };
        component.story = {
          ...new Story(),
          paidSectionLinebreak: 2
        };
        component.paidSectionLinebreakEnd = 3;
        component.scrollLinebreakIntoView(element);
        expect(component.paidSectionElementsWrapperElement.nativeElement.scrollTop).toEqual(scrollTop - 20);
      });
      it('NOT set scrollTop -20px if element is LAST in bodyJSON', () => {
        const scrollTop = 30;
        const element = {
          nativeElement: {
            scrollIntoView: () => {}
          }
        };
        component.paidSectionElementsWrapperElement = {
          nativeElement: {
            scrollTop
          }
        };
        component.story = {
          ...new Story(),
          paidSectionLinebreak: 3
        };
        component.paidSectionLinebreakEnd = 3;
        component.scrollLinebreakIntoView(element);
        expect(component.paidSectionElementsWrapperElement.nativeElement.scrollTop).toEqual(scrollTop);
      });
    });

    describe('convertBlockToHtml should', () => {
      it('call convertBlockToHtml to return converted block', () => {
        const convertBlockToHtmlSpy = spyOnProperty(converter, 'convertBlockToHtml').and.callThrough();
        const html = component.convertBlockToHtml({
          type: ELEMENT_TYPES.Paragraph,
          data: {
            text: 'test'
          }
        });
        expect(convertBlockToHtmlSpy).toHaveBeenCalled();
        expect(html).toBeDefined();
      });
    });

    describe('getBlockByLinebreak should', () => {
      it('return block by index', () => {
        const paidSectionLinebreak = 2; // should give number three
        component.paidSectionElements = [
          1,
          2,
          3,
          4
        ] as any;
        component.story = {
          ...new Story,
          paidSectionLinebreak,
        };
        const block = component.getBlockByLinebreak();
        expect(block).toEqual(component.paidSectionElements[paidSectionLinebreak]);
      });
    });

    describe('ngOnDestroy should', () => {
      it('unsubscribe from editorSub', () => {
        component.editorSub = new Subscription();
        const unsubscribeSpy = spyOn(component.editorSub, 'unsubscribe');
        component.ngOnDestroy();
        expect(unsubscribeSpy).toHaveBeenCalled();
      });
    });
  });
});
