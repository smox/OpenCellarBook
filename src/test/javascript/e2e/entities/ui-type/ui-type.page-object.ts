import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import UiTypeUpdatePage from './ui-type-update.page-object';

const expect = chai.expect;
export class UiTypeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('openCellarBookApp.uiType.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-uiType'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class UiTypeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('ui-type-heading'));
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
    await navBarPage.getEntityPage('ui-type');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateUiType() {
    await this.createButton.click();
    return new UiTypeUpdatePage();
  }

  async deleteUiType() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const uiTypeDeleteDialog = new UiTypeDeleteDialog();
    await waitUntilDisplayed(uiTypeDeleteDialog.deleteModal);
    expect(await uiTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/openCellarBookApp.uiType.delete.question/);
    await uiTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(uiTypeDeleteDialog.deleteModal);

    expect(await isVisible(uiTypeDeleteDialog.deleteModal)).to.be.false;
  }
}
