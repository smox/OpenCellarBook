import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MeasureTypeGroupComponentsPage from './measure-type-group.page-object';
import MeasureTypeGroupUpdatePage from './measure-type-group-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('MeasureTypeGroup e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let measureTypeGroupComponentsPage: MeasureTypeGroupComponentsPage;
  let measureTypeGroupUpdatePage: MeasureTypeGroupUpdatePage;

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
    measureTypeGroupComponentsPage = new MeasureTypeGroupComponentsPage();
    measureTypeGroupComponentsPage = await measureTypeGroupComponentsPage.goToPage(navBarPage);
  });

  it('should load MeasureTypeGroups', async () => {
    expect(await measureTypeGroupComponentsPage.title.getText()).to.match(/Measure Type Groups/);
    expect(await measureTypeGroupComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete MeasureTypeGroups', async () => {
    const beforeRecordsCount = (await isVisible(measureTypeGroupComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(measureTypeGroupComponentsPage.table);
    measureTypeGroupUpdatePage = await measureTypeGroupComponentsPage.goToCreateMeasureTypeGroup();
    await measureTypeGroupUpdatePage.enterData();

    expect(await measureTypeGroupComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(measureTypeGroupComponentsPage.table);
    await waitUntilCount(measureTypeGroupComponentsPage.records, beforeRecordsCount + 1);
    expect(await measureTypeGroupComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await measureTypeGroupComponentsPage.deleteMeasureTypeGroup();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(measureTypeGroupComponentsPage.records, beforeRecordsCount);
      expect(await measureTypeGroupComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(measureTypeGroupComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
