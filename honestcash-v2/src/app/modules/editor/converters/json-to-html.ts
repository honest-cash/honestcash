export enum ELEMENT_TYPES {
  Header = 'header',
  Paragraph = 'paragraph',
  List = 'list',
  Image = 'image',
  Quote = 'quote',
  Code = 'code',
  Delimiter = 'delimiter',
  Embed = 'embed',
}

export enum LIST_STYLES {
  Ordered = 'ordered',
  Unordered = 'unordered',
}

export enum EMBED_SERVICES {
  Youtube = 'youtube',
}

export interface Block {
  type: ELEMENT_TYPES;
  data: object;
}

export interface ParagraphElement extends Block {
  type: ELEMENT_TYPES.Paragraph;
  data: {
    text: string;
  };
}

export interface HeaderElement extends Block {
  type: ELEMENT_TYPES.Header;
  data: {
    level: number;
    text: string;
  };
}

export interface ListElement extends Block {
  type: ELEMENT_TYPES.List;
  data: {
    style: LIST_STYLES.Ordered | LIST_STYLES.Unordered;
    items: string[];
  };
}

export interface ImageElement extends Block {
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
}

export interface QuoteElement extends Block {
  type: ELEMENT_TYPES.Quote;
  data: {
    text: string;
    caption: string;
  };
}

export interface CodeElement extends Block {
  type: ELEMENT_TYPES.Code;
  data: {
    code: string;
  };
}

export interface DelimiterElement extends Block {
  type: ELEMENT_TYPES.Delimiter;
  data: {};
}

export interface EmbedElement extends Block {
  type: ELEMENT_TYPES.Embed;
  data: {
    service: EMBED_SERVICES.Youtube;
    caption: string;
    embed: string;
  };
}

export const convertHeadingBlockToHtml = (block: HeaderElement): string => {
  console.log('block', block);
  const {level, text} = block.data;
  return `<h${level}>${text}</h${level}>`;
};

export const convertParagraphBlockToHtml = (block: ParagraphElement): string => {
  const {text} = block.data;
  return `<p>${text}</p>`;
};

export const convertListBlockToHtml = (block: ListElement): string => {
  const {style, items} = block.data;
  const listStyle = style === LIST_STYLES.Ordered ? 'ol' : 'ul';
  const wrapper = (children) => `<${listStyle}>${children}</${listStyle}>`;
  const listItems = items.map(item => `<li>${item}</li>`).join('');
  return `${wrapper(listItems)}`;
};

export const convertImageBlockToHtml = (block: ImageElement): string => {
  const {file, caption} = block.data;
  return `<figure><img src="${file.url}" ${caption ? `alt="${caption}"` : ''}>${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
};

export const convertQuoteBlockToHtml = (block: QuoteElement): string => {
  const {text, caption} = block.data;
  return `<blockquote cite="${caption}">${text}</blockquote>`;
};

export const convertCodeBlockToHtml = (block: CodeElement): string => {
  const {code} = block.data;
  return `<code>${code}</code>`;
};

export const convertDelimiterBlockToHtml = (block: DelimiterElement): string => {
  return `<delimiter></delimiter>`;
};

export const convertEmbedBlockToHtml = (block: EmbedElement): string => {
  const {embed, caption, service} = block.data;
  return `
        <figure>
          <iframe frameborder="0" scrolling="no" allowfullscreen="" src="${embed}"></iframe>
          <figcaption>${caption}</figcaption>
        </figure>
      `;
};

export const convertBlocksArrayToHtml = (
  blockOrBlocks: Block | Block[]
): string | null => {
  if (Array.isArray(blockOrBlocks)) {
    return blockOrBlocks.map(convertBlockToHtml).join('');
  }
  return convertBlockToHtml(blockOrBlocks);
};

export const convertBlockToHtml = (block: Block): string | null => {
  switch (block.type) {
    case 'header': {
      return convertHeadingBlockToHtml(<HeaderElement>block);
    }
    case 'paragraph': {
      return convertParagraphBlockToHtml(<ParagraphElement>block);
    }
    case 'list': {
      return convertListBlockToHtml(<ListElement>block);
    }
    case 'image': {
      return convertImageBlockToHtml(<ImageElement>block);
    }
    case 'quote': {
      return convertQuoteBlockToHtml(<QuoteElement>block);
    }
    case 'code': {
      return convertCodeBlockToHtml(<CodeElement>block);
    }
    case 'delimiter': {
      return convertDelimiterBlockToHtml(<DelimiterElement>block);
    }
    case 'embed': {
      return convertEmbedBlockToHtml(<EmbedElement>block);
    }
    default: {
      return null;
    }
  }
};
