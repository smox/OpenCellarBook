import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class MeasureEntryUpdatePage {
  pageTitle: ElementFinder = element(by.id('openCellarBookApp.measureEntry.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  realizedAtInput: ElementFinder = element(by.css('input#measure-entry-realizedAt'));
  createdAtInput: ElementFinder = element(by.css('input#measure-entry-createdAt'));
  additionalInformationInput: ElementFinder = element(by.css('input#measure-entry-additionalInformation'));
  deletedAtInput: ElementFinder = element(by.css('input#measure-entry-deletedAt'));
  containerSelect: ElementFinder = element(by.css('select#measure-entry-container'));
  currentContainerSelect: ElementFinder = element(by.css('select#measure-entry-currentContainer'));
  measureTypeSelect: ElementFinder = element(by.css('select#measure-entry-measureType'));
  parentSelect: ElementFinder = element(by.css('select#measure-entry-parent'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setRealizedAtInput(realizedAt) {
    await this.realizedAtInput.sendKeys(realizedAt);
  }

  async getRealizedAtInput() {
    return this.realizedAtInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async setAdditionalInformationInput(additionalInformation) {
    await this.additionalInformationInput.sendKeys(additionalInformation);
  }

  async getAdditionalInformationInput() {
    return this.additionalInformationInput.getAttribute('value');
  }

  async setDeletedAtInput(deletedAt) {
    await this.deletedAtInput.sendKeys(deletedAt);
  }

  async getDeletedAtInput() {
    return this.deletedAtInput.getAttribute('value');
  }

  async containerSelectLastOption() {
    await this.containerSelect.all(by.tagName('option')).last().click();
  }

  async containerSelectOption(option) {
    await this.containerSelect.sendKeys(option);
  }

  getContainerSelect() {
    return this.containerSelect;
  }

  async getContainerSelectedOption() {
    return this.containerSelect.element(by.css('option:checked')).getText();
  }

  async currentContainerSelectLastOption() {
    await this.currentContainerSelect.all(by.tagName('option')).last().click();
  }

  async currentContainerSelectOption(option) {
    await this.currentContainerSelect.sendKeys(option);
  }

  getCurrentContainerSelect() {
    return this.currentContainerSelect;
  }

  async getCurrentContainerSelectedOption() {
    return this.currentContainerSelect.element(by.css('option:checked')).getText();
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

  async parentSelectLastOption() {
    await this.parentSelect.all(by.tagName('option')).last().click();
  }

  async parentSelectOption(option) {
    await this.parentSelect.sendKeys(option);
  }

  getParentSelect() {
    return this.parentSelect;
  }

  async getParentSelectedOption() {
    return this.parentSelect.element(by.css('option:checked')).getText();
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
    await this.setRealizedAtInput('01-01-2001');
    expect(await this.getRealizedAtInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedAtInput('01-01-2001');
    expect(await this.getCreatedAtInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setAdditionalInformationInput('additionalInformation');
    expect(await this.getAdditionalInformationInput()).to.match(/additionalInformation/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDeletedAtInput('01-01-2001');
    expect(await this.getDeletedAtInput()).to.eq('2001-01-01');
    await this.containerSelectLastOption();
    await this.currentContainerSelectLastOption();
    await this.measureTypeSelectLastOption();
    await this.parentSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
