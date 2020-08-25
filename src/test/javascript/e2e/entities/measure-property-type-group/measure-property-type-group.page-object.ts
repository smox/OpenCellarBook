import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import MeasurePropertyTypeGroupUpdatePage from './measure-property-type-group-update.page-object';

const expect = chai.expect;
export class MeasurePropertyTypeGroupDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('openCellarBookApp.measurePropertyTypeGroup.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-measurePropertyTypeGroup'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class MeasurePropertyTypeGroupComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('measure-property-type-group-heading'));
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
    await navBarPage.getEntityPage('measure-property-type-group');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateMeasurePropertyTypeGroup() {
    await this.createButton.click();
    return new MeasurePropertyTypeGroupUpdatePage();
  }

  async deleteMeasurePropertyTypeGroup() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const measurePropertyTypeGroupDeleteDialog = new MeasurePropertyTypeGroupDeleteDialog();
    await waitUntilDisplayed(measurePropertyTypeGroupDeleteDialog.deleteModal);
    expect(await measurePropertyTypeGroupDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /openCellarBookApp.measurePropertyTypeGroup.delete.question/
    );
    await measurePropertyTypeGroupDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(measurePropertyTypeGroupDeleteDialog.deleteModal);

    expect(await isVisible(measurePropertyTypeGroupDeleteDialog.deleteModal)).to.be.false;
  }
}
