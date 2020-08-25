import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class ContainerUpdatePage {
  pageTitle: ElementFinder = element(by.id('openCellarBookApp.container.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#container-name'));
  isAlwaysFullInput: ElementFinder = element(by.css('input#container-isAlwaysFull'));
  currentAmountOfContentInput: ElementFinder = element(by.css('input#container-currentAmountOfContent'));
  capacityInput: ElementFinder = element(by.css('input#container-capacity'));
  colorInput: ElementFinder = element(by.css('input#container-color'));
  orderNumberInput: ElementFinder = element(by.css('input#container-orderNumber'));
  iconInput: ElementFinder = element(by.css('input#file_icon'));
  deletedAtInput: ElementFinder = element(by.css('input#container-deletedAt'));
  locationSelect: ElementFinder = element(by.css('select#container-location'));
  containerTypeSelect: ElementFinder = element(by.css('select#container-containerType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  getIsAlwaysFullInput() {
    return this.isAlwaysFullInput;
  }
  async setCurrentAmountOfContentInput(currentAmountOfContent) {
    await this.currentAmountOfContentInput.sendKeys(currentAmountOfContent);
  }

  async getCurrentAmountOfContentInput() {
    return this.currentAmountOfContentInput.getAttribute('value');
  }

  async setCapacityInput(capacity) {
    await this.capacityInput.sendKeys(capacity);
  }

  async getCapacityInput() {
    return this.capacityInput.getAttribute('value');
  }

  async setColorInput(color) {
    await this.colorInput.sendKeys(color);
  }

  async getColorInput() {
    return this.colorInput.getAttribute('value');
  }

  async setOrderNumberInput(orderNumber) {
    await this.orderNumberInput.sendKeys(orderNumber);
  }

  async getOrderNumberInput() {
    return this.orderNumberInput.getAttribute('value');
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

  async locationSelectLastOption() {
    await this.locationSelect.all(by.tagName('option')).last().click();
  }

  async locationSelectOption(option) {
    await this.locationSelect.sendKeys(option);
  }

  getLocationSelect() {
    return this.locationSelect;
  }

  async getLocationSelectedOption() {
    return this.locationSelect.element(by.css('option:checked')).getText();
  }

  async containerTypeSelectLastOption() {
    await this.containerTypeSelect.all(by.tagName('option')).last().click();
  }

  async containerTypeSelectOption(option) {
    await this.containerTypeSelect.sendKeys(option);
  }

  getContainerTypeSelect() {
    return this.containerTypeSelect;
  }

  async getContainerTypeSelectedOption() {
    return this.containerTypeSelect.element(by.css('option:checked')).getText();
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
    const selectedIsAlwaysFull = await this.getIsAlwaysFullInput().isSelected();
    if (selectedIsAlwaysFull) {
      await this.getIsAlwaysFullInput().click();
      expect(await this.getIsAlwaysFullInput().isSelected()).to.be.false;
    } else {
      await this.getIsAlwaysFullInput().click();
      expect(await this.getIsAlwaysFullInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setCurrentAmountOfContentInput('5');
    expect(await this.getCurrentAmountOfContentInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCapacityInput('5');
    expect(await this.getCapacityInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setColorInput('color');
    expect(await this.getColorInput()).to.match(/color/);
    await waitUntilDisplayed(this.saveButton);
    await this.setOrderNumberInput('5');
    expect(await this.getOrderNumberInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setIconInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setDeletedAtInput('01-01-2001');
    expect(await this.getDeletedAtInput()).to.eq('2001-01-01');
    await this.locationSelectLastOption();
    await this.containerTypeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
