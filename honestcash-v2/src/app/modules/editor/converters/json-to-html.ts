enum ELEMENT_TYPES {
  Header = 'header',
  Paragraph = 'paragraph',
  List = 'list',
  Image = 'image',
  Quote = 'quote',
  Code = 'code',
  Delimiter = 'delimiter',
  Embed = 'embed',
}

enum LIST_STYLES {
  Ordered = 'ordered',
  Unordered = 'unordered',
}

enum EMBED_SERVICES {
  Youtube = 'youtube',
}

/* tslint:disable */
type ParagraphElement = {
  type: ELEMENT_TYPES.Paragraph;
  data: {
    text: string;
  };
};

type HeaderElement = {
  type: ELEMENT_TYPES.Header;
  data: {
    level: number;
    text: string;
  };
};

type ListElement = {
  type: ELEMENT_TYPES.List;
  data: {
    style: LIST_STYLES.Ordered | LIST_STYLES.Unordered;
    items: string[];
  };
};

type ImageElement = {
  type: ELEMENT_TYPES.Image;
  data: {
    url: string;
    caption: string;
    withBorder?: boolean;
    withBackground?: boolean;
    stretched?: boolean;
  };
};

type QuoteElement = {
  type: ELEMENT_TYPES.Quote;
  data: {
    text: string;
    caption: string;
  };
};

type CodeElement = {
  type: ELEMENT_TYPES.Code;
  data: {
    code: string;
  };
};

type DelimiterElement = {
  type: ELEMENT_TYPES.Delimiter;
  data: {};
};

type EmbedElement = {
  type: ELEMENT_TYPES.Embed;
  data: {
    service: EMBED_SERVICES.Youtube;
    caption: string;
    embed: string;
  };
};

export type BlockElements =
  | HeaderElement
  | ParagraphElement
  | ListElement
  | ImageElement
  | QuoteElement
  | CodeElement
  | DelimiterElement
  | EmbedElement;
/* tslint:enable */

export const convertBlocksArrayToHtml = (
  blocks: BlockElements[]
) => {
  return blocks.map((block, index) => {
    switch (block.type) {
      case 'header': {
        const {level, text} = block.data;
        return `<h${level} id="story-section__id-${index}">${text}</h${level}>`;
      }
      case 'paragraph': {
        const {text} = block.data;
        return `<p id="story-section__id-${index}">${text}</p>`;
      }
      case 'list': {
        const {style, items} = block.data;
        const listStyle = style === 'ordered' ? 'ol' : 'ul';
        const wrapper = (children) => `<${listStyle} id="story-section__id-${index}">${children}</${listStyle}>`;
        const listItems = items.map(item => `<li>${item}</li>`).join('');
        return `${wrapper(listItems)}`;
      }
      case 'image': {
        const {url, caption} = block.data;
        return `<figure id="story-section__id-${index}"><img src="${url}" alt="${caption}"><figcaption>${caption}</figcaption></figure>`;
      }
      case 'quote': {
        const {text, caption} = block.data;
        return `<blockquote id="story-section__id-${index}" cite="${caption}">${text}</blockquote>`;
      }
      case 'code': {
        const {code} = block.data;
        return `<code id="story-section__id-${index}">${code}</code>`;
      }
      case 'delimiter': {
        return `<p id="story-section__id-${index}" class="story-elements__delimiter"></p>`;
      }
      case 'embed': {
        const {embed, caption, service} = block.data;
        switch (service) {
          case 'youtube': {
              return `
              <figure id="story-section__id-${index}">
                <iframe frameborder="0" scrolling="no" allowfullscreen="" src="${embed}"></iframe>
                <figcaption>${caption}</figcaption>
              </figure>
            `;
          }
          default: {
            return ``;
          }
        }
        break;
      }
      default: {
        return ``;
      }
    }
  }).join('');
};
