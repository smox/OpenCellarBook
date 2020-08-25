import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import MeasurePropertyTypeUpdatePage from './measure-property-type-update.page-object';

const expect = chai.expect;
export class MeasurePropertyTypeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('openCellarBookApp.measurePropertyType.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-measurePropertyType'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class MeasurePropertyTypeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('measure-property-type-heading'));
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
    await navBarPage.getEntityPage('measure-property-type');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateMeasurePropertyType() {
    await this.createButton.click();
    return new MeasurePropertyTypeUpdatePage();
  }

  async deleteMeasurePropertyType() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const measurePropertyTypeDeleteDialog = new MeasurePropertyTypeDeleteDialog();
    await waitUntilDisplayed(measurePropertyTypeDeleteDialog.deleteModal);
    expect(await measurePropertyTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /openCellarBookApp.measurePropertyType.delete.question/
    );
    await measurePropertyTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(measurePropertyTypeDeleteDialog.deleteModal);

    expect(await isVisible(measurePropertyTypeDeleteDialog.deleteModal)).to.be.false;
  }
}
