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
    file: {
      url: string
    },
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

export type Block =
  | HeaderElement
  | ParagraphElement
  | ListElement
  | ImageElement
  | QuoteElement
  | CodeElement
  | DelimiterElement
  | EmbedElement;
/* tslint:enable */

export const convertHeaderBlockToHtml = (block: HeaderElement) => {
  const {level, text} = block.data;
  return `<h${level}>${text}</h${level}>`;
};

export const convertParagraphBlockToHtml = (block: ParagraphElement) => {
  const {text} = block.data;
  return `<p>${text}</p>`;
};

export const convertListBlockToHtml = (block: ListElement) => {
  const {style, items} = block.data;
  const listStyle = style === 'ordered' ? 'ol' : 'ul';
  const wrapper = (children) => `<${listStyle}>${children}</${listStyle}>`;
  const listItems = items.map(item => `<li>${item}</li>`).join('');
  return `${wrapper(listItems)}`;
};

export const convertImageBlockToHtml = (block: ImageElement) => {
  const {file, caption} = block.data;
  return `<figure><img src="${file.url}" alt="${caption}"><figcaption>${caption}</figcaption></figure>`;
};

export const convertQuoteBlockToHtml = (block: QuoteElement) => {
  const {text, caption} = block.data;
  return `<blockquote cite="${caption}">${text}</blockquote>`;
};

export const convertCodeBlockToHtml = (block: CodeElement) => {
  const {code} = block.data;
  return `<code>${code}</code>`;
};

export const convertDelimiterBlockToHtml = (block: DelimiterElement) => {
  return `<p class="story-elements__delimiter"></p>`;
};

export const convertEmbedBlockToHtml = (block: EmbedElement) => {
  const {embed, caption, service} = block.data;
  switch (service) {
    case 'youtube': {
      return `
        <figure>
          <iframe frameborder="0" scrolling="no" allowfullscreen="" src="${embed}"></iframe>
          <figcaption>${caption}</figcaption>
        </figure>
      `;
    }
    default: {
      return null;
    }
  }
};

export const convertBlocksArrayToHtml = (
  blockOrBlocks: Block | Block[]
) => {
  if (Array.isArray(blockOrBlocks)) {
    return blockOrBlocks.map(convertEmbedBlockToHtml).join('');
  }
  return convertBlockToHtml(blockOrBlocks);
};

export const convertBlockToHtml = (block: Block) => {
  switch (block.type) {
    case 'header': {
      return convertHeaderBlockToHtml(block);
    }
    case 'paragraph': {
      return convertParagraphBlockToHtml(block);
    }
    case 'list': {
      return convertListBlockToHtml(block);
    }
    case 'image': {
      return convertImageBlockToHtml(block);
    }
    case 'quote': {
      return convertQuoteBlockToHtml(block);
    }
    case 'code': {
      return convertCodeBlockToHtml(block);
    }
    case 'delimiter': {
      return convertDelimiterBlockToHtml(block);
    }
    case 'embed': {
      return convertEmbedBlockToHtml(block);
    }
    default: {
      return null;
    }
  }
};
