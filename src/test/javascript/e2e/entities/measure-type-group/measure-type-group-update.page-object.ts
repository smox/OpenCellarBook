import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class MeasureTypeGroupUpdatePage {
  pageTitle: ElementFinder = element(by.id('openCellarBookApp.measureTypeGroup.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#measure-type-group-name'));
  measureTypeSelect: ElementFinder = element(by.css('select#measure-type-group-measureType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
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
    // this.measureTypeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
