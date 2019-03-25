import * as showdown from "showdown";

const converter = new showdown.Converter();

export default class EditorService {

  public static $inject = [
    "$http"
  ];

  private elements: JQuery<any>;
  private fixedBody: string;

  constructor(
    private $http: ng.IHttpService
  ) {
    this.ngOnInit();
  }

  private ngOnInit() {
  }

  public stringIncludes = (string, find) => {
    return string.indexOf(find) !== -1;
  }

  public getFixedBody = (editor, externalHtml?) => {
    // converting from html to md to html cleans the body
    const bodyMarkdown = converter.makeMd(externalHtml ? externalHtml : editor.serialize().body.value);
    const bodyHtml = converter.makeHtml(bodyMarkdown);

    let $bodyHtml = $(bodyHtml);
    // get only the dom elements
    let _elements = $bodyHtml.filter((e) => {
      return $bodyHtml[e].nodeName !== "#text" && $bodyHtml[e].nodeName !== "#comment"
    });

    // to convert mediumeditor default div wrappers to showdown converted syntax
    // showdown only has p tags
    // to the below is to replace those elements
    const replaceContents = [];
    // the html is to replace the body in the editor
    let _fixedBody = '';

    _elements = _elements.map(i => {
      const $elem = $(_elements[i]);
      // find regular divs and remove them
      // get the content of the div and its previous sibling
      // so that it is inserted at correct place
      if ($elem.prop("nodeName") === "DIV" && !this.stringIncludes($elem.prop("className"), "medium-insert-images")) {
        const previous = $elem.prev();
        const content = $elem;
        replaceContents.push([content, previous]);
        $elem.remove();
        return null;
      }
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
      // kind of trim the body of all unneccessary br tags
      // the honestcash-editor has auto delete feature for more than one new lines
      // we simulate the same by removing all the br tags because p and header tags
      // already provide the margins and paddings
      if ($elem.prop("childElementCount") === 1 && $($elem.prop("lastElementChild")).prop("nodeName") === "BR") {
        $elem.remove();
        return null;
      }
      // we form our last new html
      _fixedBody += this.getOuterHtml(_elements[i]);
      return $elem;
    });

    replaceContents.forEach(contentTuple => {
      $(contentTuple[0]).insertAfter($(contentTuple[1]));
    });

    // elements and html is returned as tuple
    this.elements = _elements;
    this.fixedBody = _fixedBody;
    return [_elements, _fixedBody];
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
