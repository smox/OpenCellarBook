import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PossiblePTypesForMTypesUpdatePage from './possible-p-types-for-m-types-update.page-object';

const expect = chai.expect;
export class PossiblePTypesForMTypesDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('openCellarBookApp.possiblePTypesForMTypes.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-possiblePTypesForMTypes'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PossiblePTypesForMTypesComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('possible-p-types-for-m-types-heading'));
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
    await navBarPage.getEntityPage('possible-p-types-for-m-types');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePossiblePTypesForMTypes() {
    await this.createButton.click();
    return new PossiblePTypesForMTypesUpdatePage();
  }

  async deletePossiblePTypesForMTypes() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const possiblePTypesForMTypesDeleteDialog = new PossiblePTypesForMTypesDeleteDialog();
    await waitUntilDisplayed(possiblePTypesForMTypesDeleteDialog.deleteModal);
    expect(await possiblePTypesForMTypesDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /openCellarBookApp.possiblePTypesForMTypes.delete.question/
    );
    await possiblePTypesForMTypesDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(possiblePTypesForMTypesDeleteDialog.deleteModal);

    expect(await isVisible(possiblePTypesForMTypesDeleteDialog.deleteModal)).to.be.false;
  }
}
