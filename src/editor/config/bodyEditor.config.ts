export default (opts: { placeHolderText: string }) => {
  return {
    anchorPreview: true,

    // disabled because broken on markdown
    autoLink: false,
    buttonLabels: "fontawesome",
    extensions: {},
    placeholder: {
      hideOnClick: true,
      text: opts.placeHolderText,
    },
    toolbar: {
      buttons: ["bold", "italic", "unorderedlist", "anchor", "h2", "h3", "pre"],
    },
    paste: {
      cleanAttrs: ["id", "class", "style"],
      cleanPastedHTML: true,
      cleanReplacements: [],
      cleanTags: [
        "img",
        "meta",
        "div",
        "h1",
        "h4",
        "h5",
        "h6",
        "table",
        "tr",
        "td",
        "code",
      ],
      forcePlainText: true,
      unwrapTags: [],
    },
  };
};
