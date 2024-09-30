import { test, expect } from '@playwright/test';
import { DatabaseSqlPlaygroundPage } from '../page-models/database-sql-playground';
import { validUser } from '../data/users';
import { postRegistration } from '../API/registration';

test.describe('database-sql-playground-tests', () => {
  let dataBasePlaygroundPage: DatabaseSqlPlaygroundPage;

  test.beforeEach(async ({ page }) => {
    dataBasePlaygroundPage = new DatabaseSqlPlaygroundPage(page);
    await page.goto(dataBasePlaygroundPage.url);
  });

  async function runSQLQuery(query: string) {
    await expect(dataBasePlaygroundPage.SQLQueryEditor).toBeVisible();
    await expect(dataBasePlaygroundPage.SQLQueryEditorInput).toBeEditable();
    await dataBasePlaygroundPage.SQLQueryEditorInput.fill(query, { force: true });
    await dataBasePlaygroundPage.SQLQueryEditorButton.click();
  }

  async function verifyTableHeaders(expectedHeaders: string[]) {
    await expect(dataBasePlaygroundPage.Table).toBeVisible();
    await expect(dataBasePlaygroundPage.TableHeaders).toHaveCount(expectedHeaders.length);
    for (let i = 0; i < expectedHeaders.length; i++) {
      await expect(dataBasePlaygroundPage.TableHeaders.nth(i)).toContainText(expectedHeaders[i]);
    }
  }

  async function verifyTableRowCount(rowCount: number = undefined) {
    const count = await dataBasePlaygroundPage.TableRows.count();
    expect(count).toBeGreaterThan(0);
    if (rowCount) {
      expect(count).toBe(rowCount);
    }
  }
  test('SQL Query can be run to find users and their articles', async () => {
    const SQL_QUERY =
      'SELECT users.id, CONCAT(firstname, " ", lastname) AS Author, articles.title FROM users \n' +
      'JOIN articles ON articles.user_id = users.id;';
    await runSQLQuery(SQL_QUERY);
    await verifyTableHeaders(['id', 'Author', 'title']);
    await verifyTableRowCount();
  });

  test('SQL Query can be run to find users and their likes number grouped by user', async () => {
    const SQL_QUERY =
      'SELECT users.id, users.firstname, users.lastname, COUNT(likes.id) AS Number_of_given_likes\n' +
      '  FROM users\n' +
      '  JOIN likes ON users.id = likes.user_id\n' +
      '  GROUP BY users.id, users.firstname, users.lastname;';
    await runSQLQuery(SQL_QUERY);
    await verifyTableHeaders(['id', 'firstname', 'lastname', 'Number_of_given_likes']);
    await verifyTableRowCount();
  });

  test('SQL Query can be run to find new users', async ({ request }) => {
    const SQL_QUERY = "SELECT * FROM users WHERE email = 'test@test.pl'";

    const newUser = validUser;

    const { response } = await postRegistration(request, newUser);
    expect(response.status()).toBe(201);

    await runSQLQuery(SQL_QUERY);
    await verifyTableHeaders(['firstname', 'lastname', 'email', 'password', 'avatar', 'id (PK)']);
    await verifyTableRowCount(1);
  });
});
