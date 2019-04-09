import * as showdown from "showdown";

const converter = new showdown.Converter({
  simpleLineBreaks: true,
  noHeaderId: true,
});

export default class EditorService {

  public static $inject = [];

  private elements: JQuery<any>;
  private fixedBody: string;

  constructor() {
    this.ngOnInit();
  }

  private ngOnInit() {
  }

  public stringIncludes = (string, find) => {
    return string.indexOf(find) !== -1;
  }

  public getFixedBody = (editor, externalHtml?) => {
    // converting from html to md to html cleans the body
    const bodyHtml = externalHtml ? externalHtml : editor.serialize().body.value;
    const $bodyHtml = $(bodyHtml);

    // the html is to replace the body in the editor
    let _fixedBody = "";

    $bodyHtml.map(i => {
      const _elem = $bodyHtml[i];
      const $elem = $($bodyHtml[i]);

      // find divs that are inserted by the mediumeditor mediuminsert plugin
      // with showdown converted syntax
      // showdown only has img inside a p tag
      // we rewrap the div with p tag here

      if ($elem.prop("nodeName") === "DIV" && this.stringIncludes($elem.prop("className"), "medium-insert-images")) {
        const content = $elem;
        const img = this.getOuterHtml($(content).find("img"));
        const imgWrapped = `<p>${img}</p>`;
        _fixedBody += imgWrapped;
      } else if (_elem.nodeName === "P" && $elem.prop("childNodes").length === 1) {
        // check for tags that only has br tags in it
        if ($elem.children().first().prop("nodeName") !== "BR") {
          _fixedBody += this.getOuterHtml($elem);
        }
      } else if (!this.stringIncludes(_elem.nodeName, "#text") && !this.stringIncludes(_elem.nodeName, "#comment")) {
        // we form our last new html
        _fixedBody += this.getOuterHtml($elem);
      }

    });

    // elements and html is returned as tuple
    this.fixedBody = _fixedBody.replace(new RegExp("<!-- -->", "g"), "");
    return this.fixedBody;
  }

  public getContextElement = (n: "free" | "paid" | "paidEnd", linebreak, linebreakEnd?) => {
    switch (n) {
      case "free":
        return $(this.elements).eq(linebreak);
      case "paid":
        return $(this.elements).eq(linebreak + 1);
      case "paidEnd":
        return $(this.elements).eq(linebreakEnd - 1);
      default:
        break;
    }
  }

  public getOuterHtml = (element) => {
    if (element[0]) {
      element = element[0];
    }
    return $(element).prop("outerHTML");
  }

  public getSectionHtml = (n: "free" | "paid" | "paidEnd", linebreak, linebreakEnd?) => {
    return this.getOuterHtml(this.getContextElement(n, linebreak, linebreakEnd));
  }

}
