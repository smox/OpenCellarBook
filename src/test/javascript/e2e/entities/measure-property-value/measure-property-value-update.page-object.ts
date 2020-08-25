import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class MeasurePropertyValueUpdatePage {
  pageTitle: ElementFinder = element(by.id('openCellarBookApp.measurePropertyValue.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  valueInput: ElementFinder = element(by.css('input#measure-property-value-value'));
  measurePropertyTypeSelect: ElementFinder = element(by.css('select#measure-property-value-measurePropertyType'));
  measureEntrySelect: ElementFinder = element(by.css('select#measure-property-value-measureEntry'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setValueInput(value) {
    await this.valueInput.sendKeys(value);
  }

  async getValueInput() {
    return this.valueInput.getAttribute('value');
  }

  async measurePropertyTypeSelectLastOption() {
    await this.measurePropertyTypeSelect.all(by.tagName('option')).last().click();
  }

  async measurePropertyTypeSelectOption(option) {
    await this.measurePropertyTypeSelect.sendKeys(option);
  }

  getMeasurePropertyTypeSelect() {
    return this.measurePropertyTypeSelect;
  }

  async getMeasurePropertyTypeSelectedOption() {
    return this.measurePropertyTypeSelect.element(by.css('option:checked')).getText();
  }

  async measureEntrySelectLastOption() {
    await this.measureEntrySelect.all(by.tagName('option')).last().click();
  }

  async measureEntrySelectOption(option) {
    await this.measureEntrySelect.sendKeys(option);
  }

  getMeasureEntrySelect() {
    return this.measureEntrySelect;
  }

  async getMeasureEntrySelectedOption() {
    return this.measureEntrySelect.element(by.css('option:checked')).getText();
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
    await this.setValueInput('value');
    expect(await this.getValueInput()).to.match(/value/);
    await this.measurePropertyTypeSelectLastOption();
    await this.measureEntrySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
