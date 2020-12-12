import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PossiblePTypesForFEffectUpdatePage {
  pageTitle: ElementFinder = element(by.id('openCellarBookApp.possiblePTypesForFEffect.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  fillingEffectSelect: ElementFinder = element(by.css('select#possible-p-types-for-f-effect-fillingEffect'));
  measurePropertyTypeSelect: ElementFinder = element(by.css('select#possible-p-types-for-f-effect-measurePropertyType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFillingEffectSelect(fillingEffect) {
    await this.fillingEffectSelect.sendKeys(fillingEffect);
  }

  async getFillingEffectSelect() {
    return this.fillingEffectSelect.element(by.css('option:checked')).getText();
  }

  async fillingEffectSelectLastOption() {
    await this.fillingEffectSelect.all(by.tagName('option')).last().click();
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
    await waitUntilDisplayed(this.saveButton);
    await this.fillingEffectSelectLastOption();
    await this.measurePropertyTypeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
