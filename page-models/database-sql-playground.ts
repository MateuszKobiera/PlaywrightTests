import { type Locator, type Page } from '@playwright/test';

export class DatabaseSqlPlaygroundPage {
  readonly Page: Page;
  readonly url = '/tools/dbplayground.html';

  readonly SQLQueryEditor: Locator;
  readonly SQLQueryEditorInput: Locator;
  readonly SQLQueryEditorButton: Locator;
  readonly Table: Locator;
  readonly TableHeaders: Locator;
  readonly TableRows: Locator;

  constructor(page: Page) {
    this.Page = page;

    this.SQLQueryEditor = page.locator('[id="floatingBox"]');
    this.SQLQueryEditorInput = this.SQLQueryEditor.locator('textarea').first();
    this.SQLQueryEditorButton = page.locator('[id="floatingBox"] button[onclick="runQuery()"]');
    this.Table = page.locator('table');
    this.TableHeaders = this.Table.locator('th');
    this.TableRows = this.Table.locator('tbody >> tr');
  }
}
