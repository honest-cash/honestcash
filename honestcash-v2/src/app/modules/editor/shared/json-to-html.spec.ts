import * as converter from './json-to-html';
import {Block} from './json-to-html';

interface MockElements {
  heading: converter.HeaderElement;
  paragraph: converter.ParagraphElement;
  orderedList: converter.ListElement;
  unorderedList: converter.ListElement;
  image: converter.ImageElement;
  quote: converter.QuoteElement;
  code: converter.CodeElement;
  delimiter: converter.DelimiterElement;
  embed: converter.EmbedElement;
  unknown: { type: string; };
}

const mockElements: MockElements = {
  heading: {
    type: converter.ELEMENT_TYPES.Header,
    data: {
      text: 'asdf',
      level: 2
    }
  },
  paragraph: {
    type: converter.ELEMENT_TYPES.Paragraph,
    data: {
      text: 'asdf',
    }
  },
  orderedList: {
    type: converter.ELEMENT_TYPES.List,
    data: {
      style: converter.LIST_STYLES.Ordered,
      items: [
        '1',
        '2',
      ]
    }
  },
  unorderedList: {
    type: converter.ELEMENT_TYPES.List,
    data: {
      style: converter.LIST_STYLES.Unordered,
      items: [
        '1',
        '2',
      ]
    }
  },
  image: {
    type: converter.ELEMENT_TYPES.Image,
    data: {
      file: {
        url: 'http://example.com',
      },
      caption: 'example caption',
    }
  },
  quote: {
    type: converter.ELEMENT_TYPES.Quote,
    data: {
      text: 'example quote',
      caption: 'example caption',
    }
  },
  code: {
    type: converter.ELEMENT_TYPES.Code,
    data: {
      code: 'example code',
    },
  },
  delimiter: {
    type: converter.ELEMENT_TYPES.Delimiter,
    data: {},
  },
  embed: {
    type: converter.ELEMENT_TYPES.Embed,
    data: {
      service: converter.EMBED_SERVICES.Youtube,
      caption: 'example caption',
      embed: 'http://example.com',
    }
  },
  unknown: {
    type: 'unknown'
  }
};

describe('converter', () => {
  describe('individual block converter', () => {
    describe('convertHeadingBlockToHtml', () => {
      it('should convert block to html with correct text and heading level', () => {
        const heading = converter.convertHeadingBlockToHtml(mockElements.heading);
        expect(heading).toContain(`</h${mockElements.heading.data.level}>`);
        expect(heading).toContain(`>${mockElements.heading.data.text}<`);
      });
    });
    describe('convertParagraphBlockToHtml', () => {
      it('should convert block to html with a paragraph tag containing the text', () => {
        const paragraph = converter.convertParagraphBlockToHtml(mockElements.paragraph);
        expect(paragraph).toContain(`</p>`);
        expect(paragraph).toContain(`>${mockElements.paragraph.data.text}<`);
      });
    });
    describe('convertListBlockToHtml', () => {
      it('should convert block to html with a ordered list tag containing the list items', () => {
        const list = converter.convertListBlockToHtml(mockElements.orderedList);
        expect(list).toContain(`</ol>`);
        mockElements.orderedList.data.items.map(item => expect(list).toContain(`<li>${item}</li>`));
      });
      it('should convert block to html with a unordered list tag containing the list items', () => {
        const list = converter.convertListBlockToHtml(mockElements.unorderedList);
        expect(list).toContain(`</ul>`);
        mockElements.unorderedList.data.items.map(item => expect(list).toContain(`<li>${item}</li>`));
      });
    });
    describe('convertImageBlockToHtml', () => {
      it('should convert block to html with a img tag containing the src of the image tag and the caption as the alt', () => {
        const image = converter.convertImageBlockToHtml(mockElements.image);
        expect(image).toContain(`<img`);
        expect(image).toContain(`src="${mockElements.image.data.file.url}"`);
        expect(image).toContain(`alt="${mockElements.image.data.caption}"`);
      });
      it('should convert block to html with a figcaption tag and an image tag inside of a figure tag', () => {
        const image = converter.convertImageBlockToHtml(mockElements.image);
        expect(image).toContain(`</figcaption></figure>`);
        expect(image).toContain(`<figure><img`);
      });
      it('should convert block to html with a figcaption tag with caption of the image', () => {
        const image = converter.convertImageBlockToHtml(mockElements.image);
        expect(image).toContain(`<figcaption>${mockElements.image.data.caption}</figcaption>`);
      });
    });
    describe('convertQuoteBlockToHtml', () => {
      it('should convert block to html with a blockquote tag containing the text and the caption as cite', () => {
        const quote = converter.convertQuoteBlockToHtml(mockElements.quote);
        expect(quote).toContain(`</blockquote>`);
        expect(quote).toContain(`cite="${mockElements.quote.data.caption}"`);
        expect(quote).toContain(`>${mockElements.quote.data.text}</`);
      });
    });
    describe('convertCodeBlockToHtml', () => {
      it('should convert block to html with a code tag', () => {
        const code = converter.convertCodeBlockToHtml(mockElements.code);
        expect(code).toContain(`<code>${mockElements.code.data.code}</code>`);
      });
    });
    describe('convertDelimiterBlockToHtml', () => {
      it('should convert block to html with a delimiter tag', () => {
        const delimiter = converter.convertDelimiterBlockToHtml(mockElements.delimiter);
        expect(delimiter).toContain(`<delimiter></delimiter>`);
      });
    });
    describe('convertEmbedBlockToHtml', () => {
      it('should convert block to html with a figcaption tag and a iframe tag inside a figure tag', () => {
        const embed = converter.convertEmbedBlockToHtml(mockElements.embed);
        expect(embed).toContain(`<figure>`);
        expect(embed).toContain(`<figcaption>`);
        expect(embed).toContain(`</figcaption>`);
        expect(embed).toContain(`<iframe`);
        expect(embed).toContain(`</iframe`);
        expect(embed).toContain(`</figure>`);
      });
      it('should convert block to html with a figcaption tag with caption inside', () => {
        const embed = converter.convertEmbedBlockToHtml(mockElements.embed);
        expect(embed).toContain(`<figcaption>${mockElements.embed.data.caption}</figcaption>`);
      });
      it('should convert block to html with a iframe tag with embed as the src', () => {
        const embed = converter.convertEmbedBlockToHtml(mockElements.embed);
        expect(embed).toContain(`src="${mockElements.embed.data.embed}"></iframe>`);
      });
    });
  });

  describe('general purpose converter', () => {
    describe('convertBlockToHtml', () => {
      it('should convert heading element', () => {
        expect(converter.convertBlockToHtml(mockElements.heading).length).not.toEqual(0);
      });
      it('should convert paragraph element', () => {
        expect(converter.convertBlockToHtml(mockElements.paragraph).length).not.toEqual(0);
      });
      it('should convert orderedList element', () => {
        expect(converter.convertBlockToHtml(mockElements.orderedList).length).not.toEqual(0);
      });
      it('should convert unorderedList element', () => {
        expect(converter.convertBlockToHtml(mockElements.unorderedList).length).not.toEqual(0);
      });
      it('should convert image element', () => {
        expect(converter.convertBlockToHtml(mockElements.image).length).not.toEqual(0);
      });
      it('should convert quote element', () => {
        expect(converter.convertBlockToHtml(mockElements.quote).length).not.toEqual(0);
      });
      it('should convert code element', () => {
        expect(converter.convertBlockToHtml(mockElements.code).length).not.toEqual(0);
      });
      it('should convert delimiter element', () => {
        expect(converter.convertBlockToHtml(mockElements.delimiter).length).not.toEqual(0);
      });
      it('should convert embed element', () => {
        expect(converter.convertBlockToHtml(mockElements.embed).length).not.toEqual(0);
      });
      it('should NOT convert an unknown element', () => {
        expect(converter.convertBlockToHtml(<Block>mockElements.unknown)).toBeNull();
      });
    });

    describe('convertBlocksArrayToHtml', () => {
      it('should convert an array of blocks to html', () => {
        const html = converter.convertBlocksArrayToHtml([mockElements.heading, mockElements.paragraph]);
        expect(html).toContain(`</h${mockElements.heading.data.level}>`);
        expect(html).toContain(`</p>`);
      });
      it('should convert an single block to html', () => {
        const html = converter.convertBlocksArrayToHtml(mockElements.heading);
        expect(html).toContain(`</h${mockElements.heading.data.level}>`);
      });
    });
  });
});
