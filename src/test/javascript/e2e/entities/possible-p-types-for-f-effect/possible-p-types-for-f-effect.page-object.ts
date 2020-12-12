import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PossiblePTypesForFEffectUpdatePage from './possible-p-types-for-f-effect-update.page-object';

const expect = chai.expect;
export class PossiblePTypesForFEffectDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('openCellarBookApp.possiblePTypesForFEffect.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-possiblePTypesForFEffect'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PossiblePTypesForFEffectComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('possible-p-types-for-f-effect-heading'));
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
    await navBarPage.getEntityPage('possible-p-types-for-f-effect');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePossiblePTypesForFEffect() {
    await this.createButton.click();
    return new PossiblePTypesForFEffectUpdatePage();
  }

  async deletePossiblePTypesForFEffect() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const possiblePTypesForFEffectDeleteDialog = new PossiblePTypesForFEffectDeleteDialog();
    await waitUntilDisplayed(possiblePTypesForFEffectDeleteDialog.deleteModal);
    expect(await possiblePTypesForFEffectDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /openCellarBookApp.possiblePTypesForFEffect.delete.question/
    );
    await possiblePTypesForFEffectDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(possiblePTypesForFEffectDeleteDialog.deleteModal);

    expect(await isVisible(possiblePTypesForFEffectDeleteDialog.deleteModal)).to.be.false;
  }
}
