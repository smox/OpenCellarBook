import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class UiTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('openCellarBookApp.uiType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#ui-type-name'));
  elementSelect: ElementFinder = element(by.css('select#ui-type-element'));
  expressionInput: ElementFinder = element(by.css('input#ui-type-expression'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setElementSelect(element) {
    await this.elementSelect.sendKeys(element);
  }

  async getElementSelect() {
    return this.elementSelect.element(by.css('option:checked')).getText();
  }

  async elementSelectLastOption() {
    await this.elementSelect.all(by.tagName('option')).last().click();
  }
  async setExpressionInput(expression) {
    await this.expressionInput.sendKeys(expression);
  }

  async getExpressionInput() {
    return this.expressionInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(this.saveButton);
    await this.elementSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setExpressionInput('expression');
    expect(await this.getExpressionInput()).to.match(/expression/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
