import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import MeasurePropertyValueUpdatePage from './measure-property-value-update.page-object';

const expect = chai.expect;
export class MeasurePropertyValueDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('openCellarBookApp.measurePropertyValue.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-measurePropertyValue'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class MeasurePropertyValueComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('measure-property-value-heading'));
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
    await navBarPage.getEntityPage('measure-property-value');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateMeasurePropertyValue() {
    await this.createButton.click();
    return new MeasurePropertyValueUpdatePage();
  }

  async deleteMeasurePropertyValue() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const measurePropertyValueDeleteDialog = new MeasurePropertyValueDeleteDialog();
    await waitUntilDisplayed(measurePropertyValueDeleteDialog.deleteModal);
    expect(await measurePropertyValueDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /openCellarBookApp.measurePropertyValue.delete.question/
    );
    await measurePropertyValueDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(measurePropertyValueDeleteDialog.deleteModal);

    expect(await isVisible(measurePropertyValueDeleteDialog.deleteModal)).to.be.false;
  }
}
