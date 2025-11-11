import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleButton = page.getByRole('link', { name: 'Edit Article' });
    this.tagsList = page.locator('.tag-list .tag-default');
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleButton.click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertTagIsVisible(tagName) {
    await test.step(`Assert tag "${tagName}" is visible`, async () => {
      const tagLocator = this.tagsList.filter({ hasText: tagName });
      await expect(tagLocator).toBeVisible();
    });
  }

  async assertTagIsNotVisible(tagName) {
    await test.step(`Assert tag "${tagName}" is not visible`, async () => {
      const tagLocator = this.tagsList.filter({ hasText: tagName });
      await expect(tagLocator).not.toBeVisible();
    });
  }
}