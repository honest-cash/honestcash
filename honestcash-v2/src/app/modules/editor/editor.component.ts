import {Component, OnInit} from '@angular/core';
import EditorJS, {EditorConfig} from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Link from '@editorjs/link';
import SimpleImage from '@editorjs/simple-image';
import Checklist from '@editorjs/checklist';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Paragraph from '@editorjs/paragraph';
import Code from '@editorjs/code';
import Marker from '@editorjs/marker';
import Delimiter from '@editorjs/delimiter';
import Warning from '@editorjs/warning';
import Paywall from './plugins/paywall.js';

const editorConfig: EditorConfig = {
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
      class: SimpleImage,
      inlineToolbar: true,
    },
    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
    embed: {
      class: Embed,
      inlineToolbar: true,
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
      config: {
        placeholder: 'Tell us your story...'
      }
    },
    code: {
      class: Code,
      inlineToolbar: true,
    },
    Marker: {
      class: Marker,
      inlineToolbar: true,
    },
    delimiter: {
      class: Delimiter,
      inlineToolbar: true,
    },
    warning: {
      class: Warning,
      inlineToolbar: true,
    },
    paywall: {
      class: Paywall
    }
  },
};

const initialValue = [
  {
    'type': 'paragraph',
    'data': {
      'text': 'asdfas'
    }
  },
  {
    'type': 'paragraph',
    'data': {
      'text': 'd'
    }
  },
  {
    'type': 'paragraph',
    'data': {
      'text': 'asdf'
    }
  },
  {
    'type': 'paragraph',
    'data': {
      'text': 'a'
    }
  },
  {
    'type': 'paragraph',
    'data': {
      'text': 'sdf'
    }
  },
  {
    'type': 'checklist',
    'data': {
      'items': [
        {
          'text': 'asdf',
          'checked': false
        },
        {
          'text': 'asdf',
          'checked': false
        },
        {
          'text': 'asdf',
          'checked': false
        }
      ]
    }
  }
];

@Component({
  selector: 'app-editor',
  template: '<div id="editor"></div>',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  editor: EditorJS = new EditorJS(editorConfig);
  constructor() {}

  ngOnInit() {
    this.editor.isReady.then(() => {
      //const editorEl = document.querySelector('.codex-editor');

      // editorEl.classList.add('codex-editor--empty');

      setInterval(() => {
        this.editor.saver.save().then((outputData) => {
          //console.log('Article data: ', JSON.stringify(outputData.blocks, null, 2));
        }).catch((error) => {
          console.log('Saving failed: ', error);
        });
      }, 2000);

      // for editing mode
      this.editor.blocks.clear();
      this.editor.blocks.render({blocks: initialValue});

    });
  }
}
