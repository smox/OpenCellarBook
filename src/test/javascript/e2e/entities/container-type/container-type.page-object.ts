import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ContainerTypeUpdatePage from './container-type-update.page-object';

const expect = chai.expect;
export class ContainerTypeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('openCellarBookApp.containerType.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-containerType'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ContainerTypeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('container-type-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('container-type');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateContainerType() {
    await this.createButton.click();
    return new ContainerTypeUpdatePage();
  }

  async deleteContainerType() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const containerTypeDeleteDialog = new ContainerTypeDeleteDialog();
    await waitUntilDisplayed(containerTypeDeleteDialog.deleteModal);
    expect(await containerTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/openCellarBookApp.containerType.delete.question/);
    await containerTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(containerTypeDeleteDialog.deleteModal);

    expect(await isVisible(containerTypeDeleteDialog.deleteModal)).to.be.false;
  }
}
