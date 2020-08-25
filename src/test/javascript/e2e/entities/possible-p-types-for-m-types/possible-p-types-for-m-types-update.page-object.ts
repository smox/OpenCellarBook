import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PossiblePTypesForMTypesUpdatePage {
  pageTitle: ElementFinder = element(by.id('openCellarBookApp.possiblePTypesForMTypes.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  measureTypeSelect: ElementFinder = element(by.css('select#possible-p-types-for-m-types-measureType'));
  measurePropertyTypeSelect: ElementFinder = element(by.css('select#possible-p-types-for-m-types-measurePropertyType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async measureTypeSelectLastOption() {
    await this.measureTypeSelect.all(by.tagName('option')).last().click();
  }

  async measureTypeSelectOption(option) {
    await this.measureTypeSelect.sendKeys(option);
  }

  getMeasureTypeSelect() {
    return this.measureTypeSelect;
  }

  async getMeasureTypeSelectedOption() {
    return this.measureTypeSelect.element(by.css('option:checked')).getText();
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
    await this.measureTypeSelectLastOption();
    await this.measurePropertyTypeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
