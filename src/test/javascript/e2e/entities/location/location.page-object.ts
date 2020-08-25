import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import LocationUpdatePage from './location-update.page-object';

const expect = chai.expect;
export class LocationDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('openCellarBookApp.location.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-location'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class LocationComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('location-heading'));
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
    await navBarPage.getEntityPage('location');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateLocation() {
    await this.createButton.click();
    return new LocationUpdatePage();
  }

  async deleteLocation() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const locationDeleteDialog = new LocationDeleteDialog();
    await waitUntilDisplayed(locationDeleteDialog.deleteModal);
    expect(await locationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/openCellarBookApp.location.delete.question/);
    await locationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(locationDeleteDialog.deleteModal);

    expect(await isVisible(locationDeleteDialog.deleteModal)).to.be.false;
  }
}
