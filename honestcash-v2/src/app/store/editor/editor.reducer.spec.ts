import {reducer} from './editor.reducer';
import {EditorLoad, EditorUnload} from './editor.actions';
import Post from '../../shared/models/post';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Link from '@editorjs/link';
import Image from '@editorjs/image';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Paragraph from '@editorjs/paragraph';
import Code from '@editorjs/code';
import Marker from '@editorjs/marker';
import Delimiter from '@editorjs/delimiter';
import {HonestEditorConfig} from '../../modules/editor/components/editor/editor.component';

const editorConfig: HonestEditorConfig = {
  holder: 'editor',
  autofocus: true,
  initialBlock: 'paragraph',
  tools: {
    header: {
      class: Header,
      inlineToolbar: true,
    },
    link: {
      class: Link,
      inlineToolbar: true,
    },
    image: {
      class: Image,
      inlineToolbar: true,
      config: {} // needs to be populated in constructor for upload
    },
    /*checklist: {
	  class: Checklist,
	  inlineToolbar: true,
	},*/
    list: {
      class: List,
      inlineToolbar: true,
    },
    embed: Embed,
    quote: Quote,
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
    },
    code: Code,
    Marker: Marker,
    delimiter: Delimiter,
    /*warning: Warning,*/
  },
};

xdescribe('editor.reducer', () => {
  describe('EditorLoad', () => {
    it('should load the story provided in payload', () => {
      const payload = {story: new Post(), editor: new EditorJS(editorConfig)};
      payload.story.title = 'asdf';
      const newState = reducer(undefined, new EditorLoad());

      expect(newState.isLoaded).toBeTruthy();
      expect(newState.story).toEqual(payload.story);
    });
    it('should load the an empty story if not provided in payload', () => {
      const newState = reducer(undefined, new EditorLoad());

      expect(newState.isLoaded).toBeTruthy();
      expect(newState.story).toEqual(new Post());
    });
  });
  it('EditorUnload', () => {
    const newState = reducer(undefined, new EditorUnload());

    expect(newState.isLoaded).toBeFalsy();
  });
});
