// @todo remove this jquery shit
export default class EditorService {
  public static $inject = [];

  private elements: JQuery<any>;
  private fixedBody: string;
  private $: any;

  constructor(jQueryLib) {
    this.$ = jQueryLib || $;

    this.ngOnInit();
  }

  private ngOnInit() {
  }

  public stringIncludes = (string, find) => {
    return string.indexOf(find) !== -1;
  }

  public getFixedBody = (editorHtml: string, externalHtml?: string) => {
    // converting from html to md to html cleans the body
    const bodyHtml = externalHtml ? externalHtml : editorHtml;
    const $bodyHtml = this.$(bodyHtml);

    // the html is to replace the body in the editor
    let fixedBody = "";

    $bodyHtml.map((i) => {
      const elem = $bodyHtml[i];
      const $elem = this.$($bodyHtml[i]);

      // find divs that are inserted by the mediumeditor mediuminsert plugin
      // with showdown converted syntax
      // showdown only has img inside a p tag
      // we rewrap the div with p tag here

      if (
        $elem.prop("nodeName") === "DIV" &&
        this.stringIncludes($elem.prop("className"), "medium-insert-images")
      ) {
        const content = $elem;
        const img = this.getOuterHtml(this.$(content).find("img"));
        const imgWrapped = `<p>${img}</p>`;
        fixedBody += imgWrapped;
      } else if (elem.nodeName === "P" && $elem.prop("childNodes").length === 1) {
        // check for tags that only has br tags in it
        if ($elem.children().first().prop("nodeName") !== "BR") {
          fixedBody += this.getOuterHtml($elem);
        }
      } else if (
        !this.stringIncludes(elem.nodeName, "#text") &&
        !this.stringIncludes(elem.nodeName, "#comment")
      ) {
        // we form our last new html
        fixedBody += this.getOuterHtml($elem);
      }

    });

    // elements and html is returned as tuple
    this.fixedBody = fixedBody.replace(new RegExp("<!-- -->", "g"), "");
    return fixedBody;
  }

  public getContextElement = (n: "free" | "paid" | "paidEnd", linebreak, linebreakEnd?) => {
    switch (n) {
      case "free":
        return this.$(this.elements).eq(linebreak);
      case "paid":
        return this.$(this.elements).eq(linebreak + 1);
      case "paidEnd":
        return this.$(this.elements).eq(linebreakEnd - 1);
      default:
        break;
    }
  }

  public getOuterHtml = (element) => {
    const child = element[0] ? element[0] : element;
    return this.$(child).prop("outerHTML");
  }

  public getSectionHtml = (n: "free" | "paid" | "paidEnd", linebreak, linebreakEnd?) => {
    return this.getOuterHtml(this.getContextElement(n, linebreak, linebreakEnd));
  }

}
