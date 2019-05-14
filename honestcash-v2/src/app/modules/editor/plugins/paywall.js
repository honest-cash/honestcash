/**
 * Paywall Block for the Editor.js.
 *
 * @author CodeX (team@ifmo.su)
 * @copyright CodeX 2018
 * @license The MIT License (MIT)
 * @version 2.0.0
 */

/**
 * @typedef {Object} PaywallData
 * @description Tool's input and output data format
 */
class Paywall {
  /**
   * Allow Tool to have no content
   * @return {boolean}
   */
  static get contentless() {
    return true;
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {{data: PaywallData, config: object, api: object}}
   *   data — previously saved data
   *   config - user config for Tool
   *   api - Editor.js API
   */
  constructor({data, config, api}) {
    this.api = api;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: 'ce-paywall'
    };

    this._data = {};
    this._element = this.drawView();
    this.existing = false;

    this.data = data;
    const blockCount = this.api.blocks.getBlocksCount();
    for (var index = 0; index < blockCount; index++) {
      const block = this.api.blocks.getBlockByIndex(index);
      const hasPaywall = block.innerHTML.includes('ce-paywall');
      if (hasPaywall) {
        this.existing = true;
        break;
      }
    }
  }

  /**
   * Create Tool's view
   * @return {HTMLElement}
   * @private
   */
  drawView() {
    let div = document.createElement('DIV');

    div.classList.add(this._CSS.wrapper, this._CSS.block);

    return div;
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
    if (!this.existing) {
      return this._element;
    }
  }

  /**
   * Extract Tool's data from the view
   * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
   * @returns {PaywallData} - saved data
   * @public
   */
  save(toolsContent) {
    return {};
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: `<svg width="19" height="4" viewBox="0 0 19 4" xmlns="http://www.w3.org/2000/svg"><path d="M1.25 0H7a1.25 1.25 0 1 1 0 2.5H1.25a1.25 1.25 0 1 1 0-2.5zM11 0h5.75a1.25 1.25 0 0 1 0 2.5H11A1.25 1.25 0 0 1 11 0z"/></svg>`,
      title: 'Paywall'
    };
  }
}

module.exports = Paywall;
