import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class MeasurePropertyTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('openCellarBookApp.measurePropertyType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  typeInput: ElementFinder = element(by.css('input#measure-property-type-type'));
  orderNumberInput: ElementFinder = element(by.css('input#measure-property-type-orderNumber'));
  uiTypeSelect: ElementFinder = element(by.css('select#measure-property-type-uiType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return this.typeInput.getAttribute('value');
  }

  async setOrderNumberInput(orderNumber) {
    await this.orderNumberInput.sendKeys(orderNumber);
  }

  async getOrderNumberInput() {
    return this.orderNumberInput.getAttribute('value');
  }

  async uiTypeSelectLastOption() {
    await this.uiTypeSelect.all(by.tagName('option')).last().click();
  }

  async uiTypeSelectOption(option) {
    await this.uiTypeSelect.sendKeys(option);
  }

  getUiTypeSelect() {
    return this.uiTypeSelect;
  }

  async getUiTypeSelectedOption() {
    return this.uiTypeSelect.element(by.css('option:checked')).getText();
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
    await this.setTypeInput('type');
    expect(await this.getTypeInput()).to.match(/type/);
    await waitUntilDisplayed(this.saveButton);
    await this.setOrderNumberInput('5');
    expect(await this.getOrderNumberInput()).to.eq('5');
    await this.uiTypeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
