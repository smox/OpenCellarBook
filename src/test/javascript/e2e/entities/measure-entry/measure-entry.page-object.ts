import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import MeasureEntryUpdatePage from './measure-entry-update.page-object';

const expect = chai.expect;
export class MeasureEntryDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('openCellarBookApp.measureEntry.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-measureEntry'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class MeasureEntryComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('measure-entry-heading'));
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
    await navBarPage.getEntityPage('measure-entry');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateMeasureEntry() {
    await this.createButton.click();
    return new MeasureEntryUpdatePage();
  }

  async deleteMeasureEntry() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const measureEntryDeleteDialog = new MeasureEntryDeleteDialog();
    await waitUntilDisplayed(measureEntryDeleteDialog.deleteModal);
    expect(await measureEntryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/openCellarBookApp.measureEntry.delete.question/);
    await measureEntryDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(measureEntryDeleteDialog.deleteModal);

    expect(await isVisible(measureEntryDeleteDialog.deleteModal)).to.be.false;
  }
}
