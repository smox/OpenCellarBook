import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ContainerTypeComponentsPage from './container-type.page-object';
import ContainerTypeUpdatePage from './container-type-update.page-object';
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

describe('ContainerType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let containerTypeComponentsPage: ContainerTypeComponentsPage;
  let containerTypeUpdatePage: ContainerTypeUpdatePage;

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
    containerTypeComponentsPage = new ContainerTypeComponentsPage();
    containerTypeComponentsPage = await containerTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load ContainerTypes', async () => {
    expect(await containerTypeComponentsPage.title.getText()).to.match(/Container Types/);
    expect(await containerTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ContainerTypes', async () => {
    const beforeRecordsCount = (await isVisible(containerTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(containerTypeComponentsPage.table);
    containerTypeUpdatePage = await containerTypeComponentsPage.goToCreateContainerType();
    await containerTypeUpdatePage.enterData();

    expect(await containerTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(containerTypeComponentsPage.table);
    await waitUntilCount(containerTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await containerTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await containerTypeComponentsPage.deleteContainerType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(containerTypeComponentsPage.records, beforeRecordsCount);
      expect(await containerTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(containerTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
