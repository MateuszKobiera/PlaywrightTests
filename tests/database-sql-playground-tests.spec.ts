import { test, expect } from '@playwright/test';
import { DatabaseSqlPlaygroundPage } from '../page-models/database-sql-playground';

test.describe('database-sql-playground-tests', () => {
  let dataBasePlaygroundPage: DatabaseSqlPlaygroundPage;

  test.beforeEach(async ({ page }) => {
    dataBasePlaygroundPage = new DatabaseSqlPlaygroundPage(page);
    await page.goto(dataBasePlaygroundPage.url);
  });

  test('SQL Query can be run', async () => {
    const SQL_QUERY =
      'SELECT users.id, CONCAT(firstname, " ", lastname), articles.title FROM users \n' +
      'JOIN articles ON articles.user_id = users.id;';
    await expect(dataBasePlaygroundPage.SQLQueryEditor).toBeVisible();
    await expect(dataBasePlaygroundPage.SQLQueryEditorInput).toBeEditable();
    await dataBasePlaygroundPage.SQLQueryEditorInput.fill(SQL_QUERY, { force: true });
    await dataBasePlaygroundPage.SQLQueryEditorButton.click();
    await expect(dataBasePlaygroundPage.Table).toBeVisible();
  });
});
