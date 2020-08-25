import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class MeasureTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('openCellarBookApp.measureType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#measure-type-name'));
  fillingEffectSelect: ElementFinder = element(by.css('select#measure-type-fillingEffect'));
  orderNumberInput: ElementFinder = element(by.css('input#measure-type-orderNumber'));
  colorInput: ElementFinder = element(by.css('input#measure-type-color'));
  iconInput: ElementFinder = element(by.css('input#file_icon'));
  deletedAtInput: ElementFinder = element(by.css('input#measure-type-deletedAt'));
  parentSelect: ElementFinder = element(by.css('select#measure-type-parent'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
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
  async setOrderNumberInput(orderNumber) {
    await this.orderNumberInput.sendKeys(orderNumber);
  }

  async getOrderNumberInput() {
    return this.orderNumberInput.getAttribute('value');
  }

  async setColorInput(color) {
    await this.colorInput.sendKeys(color);
  }

  async getColorInput() {
    return this.colorInput.getAttribute('value');
  }

  async setIconInput(icon) {
    await this.iconInput.sendKeys(icon);
  }

  async getIconInput() {
    return this.iconInput.getAttribute('value');
  }

  async setDeletedAtInput(deletedAt) {
    await this.deletedAtInput.sendKeys(deletedAt);
  }

  async getDeletedAtInput() {
    return this.deletedAtInput.getAttribute('value');
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
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(this.saveButton);
    await this.fillingEffectSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setOrderNumberInput('5');
    expect(await this.getOrderNumberInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setColorInput('color');
    expect(await this.getColorInput()).to.match(/color/);
    await waitUntilDisplayed(this.saveButton);
    await this.setIconInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setDeletedAtInput('01-01-2001');
    expect(await this.getDeletedAtInput()).to.eq('2001-01-01');
    await this.parentSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
