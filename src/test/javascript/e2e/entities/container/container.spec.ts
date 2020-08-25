import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ContainerComponentsPage from './container.page-object';
import ContainerUpdatePage from './container-update.page-object';
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

describe('Container e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let containerComponentsPage: ContainerComponentsPage;
  let containerUpdatePage: ContainerUpdatePage;

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
    containerComponentsPage = new ContainerComponentsPage();
    containerComponentsPage = await containerComponentsPage.goToPage(navBarPage);
  });

  it('should load Containers', async () => {
    expect(await containerComponentsPage.title.getText()).to.match(/Containers/);
    expect(await containerComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Containers', async () => {
    const beforeRecordsCount = (await isVisible(containerComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(containerComponentsPage.table);
    containerUpdatePage = await containerComponentsPage.goToCreateContainer();
    await containerUpdatePage.enterData();

    expect(await containerComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(containerComponentsPage.table);
    await waitUntilCount(containerComponentsPage.records, beforeRecordsCount + 1);
    expect(await containerComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await containerComponentsPage.deleteContainer();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(containerComponentsPage.records, beforeRecordsCount);
      expect(await containerComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(containerComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
