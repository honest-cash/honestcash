export default {
  buttons: [],
  disableDoubleReturn: true,
  disableReturn: true,
  paste: {
    cleanAttrs: ["class", "style"],
    cleanPastedHTML: true,
    cleanReplacements: [],
    cleanTags: [
      "meta",
      "dir",
      "h1",
      "h4",
      "h5",
      "h6",
      "table",
      "tr",
      "td",
      "a",
      "ul",
      "li",
      "code",
      "pre",
    ],
    forcePlainText: true,
    unwrapTags: [],
  },
  placeholder: {
    hideOnClick: true,
    text: "Title",
  },
  toolbar: false,
};