import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class MeasurePropertyTypeGroupUpdatePage {
  pageTitle: ElementFinder = element(by.id('openCellarBookApp.measurePropertyTypeGroup.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#measure-property-type-group-name'));
  measurePropertyTypeSelect: ElementFinder = element(by.css('select#measure-property-type-group-measurePropertyType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
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
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    // this.measurePropertyTypeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
