import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ContainerUpdatePage from './container-update.page-object';

const expect = chai.expect;
export class ContainerDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('openCellarBookApp.container.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-container'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ContainerComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('container-heading'));
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
    await navBarPage.getEntityPage('container');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateContainer() {
    await this.createButton.click();
    return new ContainerUpdatePage();
  }

  async deleteContainer() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const containerDeleteDialog = new ContainerDeleteDialog();
    await waitUntilDisplayed(containerDeleteDialog.deleteModal);
    expect(await containerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/openCellarBookApp.container.delete.question/);
    await containerDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(containerDeleteDialog.deleteModal);

    expect(await isVisible(containerDeleteDialog.deleteModal)).to.be.false;
  }
}
