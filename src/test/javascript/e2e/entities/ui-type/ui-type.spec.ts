import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UiTypeComponentsPage from './ui-type.page-object';
import UiTypeUpdatePage from './ui-type-update.page-object';
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

describe('UiType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let uiTypeComponentsPage: UiTypeComponentsPage;
  let uiTypeUpdatePage: UiTypeUpdatePage;

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
    uiTypeComponentsPage = new UiTypeComponentsPage();
    uiTypeComponentsPage = await uiTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load UiTypes', async () => {
    expect(await uiTypeComponentsPage.title.getText()).to.match(/Ui Types/);
    expect(await uiTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete UiTypes', async () => {
    const beforeRecordsCount = (await isVisible(uiTypeComponentsPage.noRecords)) ? 0 : await getRecordsCount(uiTypeComponentsPage.table);
    uiTypeUpdatePage = await uiTypeComponentsPage.goToCreateUiType();
    await uiTypeUpdatePage.enterData();

    expect(await uiTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(uiTypeComponentsPage.table);
    await waitUntilCount(uiTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await uiTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await uiTypeComponentsPage.deleteUiType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(uiTypeComponentsPage.records, beforeRecordsCount);
      expect(await uiTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(uiTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
