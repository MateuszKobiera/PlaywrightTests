import { test, expect } from '@playwright/test';
import { DatabaseSqlPlaygroundPage } from '../page-models/database-sql-playground';

test.describe('database-sql-playground-tests', () => {
  let dataBasePlaygroundPage: DatabaseSqlPlaygroundPage;

  test.beforeEach(async ({ page }) => {
    dataBasePlaygroundPage = new DatabaseSqlPlaygroundPage(page);
    await page.goto(dataBasePlaygroundPage.url);
  });

  test('SQL Query can be run to find users and their articles', async () => {
    const SQL_QUERY =
      'SELECT users.id, CONCAT(firstname, " ", lastname) AS Author, articles.title FROM users \n' +
      'JOIN articles ON articles.user_id = users.id;';
    await expect(dataBasePlaygroundPage.SQLQueryEditor).toBeVisible();
    await expect(dataBasePlaygroundPage.SQLQueryEditorInput).toBeEditable();
    await dataBasePlaygroundPage.SQLQueryEditorInput.fill(SQL_QUERY, { force: true });
    await dataBasePlaygroundPage.SQLQueryEditorButton.click();
    await expect(dataBasePlaygroundPage.Table).toBeVisible();
    await expect(dataBasePlaygroundPage.TableHeaders).toHaveCount(3);
    await expect(dataBasePlaygroundPage.TableHeaders.nth(0)).toContainText('id');
    await expect(dataBasePlaygroundPage.TableHeaders.nth(1)).toContainText('Author');
    await expect(dataBasePlaygroundPage.TableHeaders.nth(2)).toContainText('title');
    const count = await dataBasePlaygroundPage.TableRows.count();
    expect(count).toBeGreaterThan(0);
  });

  test('SQL Query can be run to find users and their likes number grouped by user', async () => {
    const SQL_QUERY =
      'SELECT users.id, users.firstname, users.lastname, COUNT(likes.id) AS Number_of_given_likes\n' +
      '  FROM users\n' +
      '  JOIN likes ON users.id = likes.user_id\n' +
      '  GROUP BY users.id, users.firstname, users.lastname;';
    await expect(dataBasePlaygroundPage.SQLQueryEditor).toBeVisible();
    await expect(dataBasePlaygroundPage.SQLQueryEditorInput).toBeEditable();
    await dataBasePlaygroundPage.SQLQueryEditorInput.fill(SQL_QUERY, { force: true });
    await dataBasePlaygroundPage.SQLQueryEditorButton.click();
    await expect(dataBasePlaygroundPage.Table).toBeVisible();
    await expect(dataBasePlaygroundPage.TableHeaders).toHaveCount(4);
    await expect(dataBasePlaygroundPage.TableHeaders.nth(0)).toContainText('id');
    await expect(dataBasePlaygroundPage.TableHeaders.nth(1)).toContainText('firstname');
    await expect(dataBasePlaygroundPage.TableHeaders.nth(2)).toContainText('lastname');
    await expect(dataBasePlaygroundPage.TableHeaders.nth(3)).toContainText('Number_of_given_likes');
    const count = await dataBasePlaygroundPage.TableRows.count();
    expect(count).toBeGreaterThan(0);
  });
});
