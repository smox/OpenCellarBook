import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MeasureTypeComponentsPage from './measure-type.page-object';
import MeasureTypeUpdatePage from './measure-type-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('MeasureType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let measureTypeComponentsPage: MeasureTypeComponentsPage;
  let measureTypeUpdatePage: MeasureTypeUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    measureTypeComponentsPage = new MeasureTypeComponentsPage();
    measureTypeComponentsPage = await measureTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load MeasureTypes', async () => {
    expect(await measureTypeComponentsPage.title.getText()).to.match(/Measure Types/);
    expect(await measureTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete MeasureTypes', async () => {
    const beforeRecordsCount = (await isVisible(measureTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(measureTypeComponentsPage.table);
    measureTypeUpdatePage = await measureTypeComponentsPage.goToCreateMeasureType();
    await measureTypeUpdatePage.enterData();

    expect(await measureTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(measureTypeComponentsPage.table);
    await waitUntilCount(measureTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await measureTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await measureTypeComponentsPage.deleteMeasureType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(measureTypeComponentsPage.records, beforeRecordsCount);
      expect(await measureTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(measureTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
