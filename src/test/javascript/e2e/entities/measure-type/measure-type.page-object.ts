import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import MeasureTypeUpdatePage from './measure-type-update.page-object';

const expect = chai.expect;
export class MeasureTypeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('openCellarBookApp.measureType.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-measureType'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class MeasureTypeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('measure-type-heading'));
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
    await navBarPage.getEntityPage('measure-type');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateMeasureType() {
    await this.createButton.click();
    return new MeasureTypeUpdatePage();
  }

  async deleteMeasureType() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const measureTypeDeleteDialog = new MeasureTypeDeleteDialog();
    await waitUntilDisplayed(measureTypeDeleteDialog.deleteModal);
    expect(await measureTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/openCellarBookApp.measureType.delete.question/);
    await measureTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(measureTypeDeleteDialog.deleteModal);

    expect(await isVisible(measureTypeDeleteDialog.deleteModal)).to.be.false;
  }
}
