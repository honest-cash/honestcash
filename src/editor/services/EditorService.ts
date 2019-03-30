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

    let $bodyHtml = $(bodyHtml);

    // the html is to replace the body in the editor
    let _fixedBody = '';

    $bodyHtml = $bodyHtml.map(i => {
      const _elem = $bodyHtml[i];
      const $elem = $($bodyHtml[i]);

      // find divs that are inserted by the mediumeditor mediuminsert plugin
      // with showdown converted syntax
      // showdown only has img inside a p tag
      // we rewrap the div with p tag here
       if ($elem.prop("nodeName") === "DIV" && this.stringIncludes($elem.prop("className"), "medium-insert-images")) {
        const content = $elem;
        const img = this.getOuterHtml($(content).find('img'));
        const imgWrapped = `<p>${img}</p>`;
        return $(imgWrapped);
      }

      // remove non dom elements from the result html
      if (this.stringIncludes(_elem.nodeName, "#text") || this.stringIncludes(_elem.nodeName, "#comment")) {
        // return null to remove the element
        return null;
      }

      return $elem;
    });

    // remap to add attr id with fixed indexes
    // if done in the first map function
    // indexes are wrong
    $bodyHtml = $bodyHtml.map(i => {
      const $elem = $($bodyHtml[i]);
      $elem.attr("id", `snap-section-${i}`);
      // we form our last new html
      _fixedBody += this.getOuterHtml($bodyHtml[i]);
      return $elem;
    })
    console.log('old editor', $bodyHtml.length)

    // elements and html is returned as tuple
    this.elements = $bodyHtml;
    this.fixedBody = _fixedBody;
    return [$bodyHtml, _fixedBody];
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
