import { expect, test } from '@playwright/test';

export class EditArticlePage {
    constructor(page) {
        this.page = page;
        this.titleField = page.getByPlaceholder('Article Title');
        this.descriptionField = page.getByPlaceholder(
            `What's this article about?`);
        this.textField =
            page.getByPlaceholder('Write your article (in markdown)');
        this.tagField = page.getByPlaceholder('Enter tags');
        this.updateArticleButton = page.getByRole('button', {
            name: 'Update Article',
        });
        this.errorMessage = page.getByRole('list').nth(1);
        this.tagsList = page.locator('.tag-list .tag-default');
    }

    async fillTitleField(title) {
        await test.step(`Fill the 'Title' field`, async () => {
            await this.titleField.fill(title);
        });
    }

    async clearTitleField() {
        await test.step(`Clear the 'Title' field`, async () => {
            await this.titleField.clear();
        });
    }

    async fillDescriptionField(description) {
        await test.step(`Fill the 'Description' field`, async () => {
            await this.descriptionField.fill(description);
        });
    }

    async clearDescriptionField() {
        await test.step(`Clear the 'Description' field`, async () => {
            await this.descriptionField.clear();
        });
    }

    async fillTextField(text) {
        await test.step(`Fill the 'Text' field`, async () => {
            await this.textField.fill(text);
        });
    }

    async clearTextField() {
        await test.step(`Clear the 'Text' field`, async () => {
            await this.textField.clear();
        });
    }

    async fillTagField(tag) {
        await test.step(`Fill the 'Tag' field with "${tag}"`, async () => {
            await this.tagField.fill(tag);
        });
    }

    async pressEnterInTagField() {
        await test.step(`Press Enter in 'Tag' field`, async () => {
            await this.tagField.press('Enter');
        });
    }

    async removeTag(tagName) {
        await test.step(`Remove tag "${tagName}"`, async () => {
            const tagLocator = this.page.locator('.tag-list .tag-default', {
                hasText: tagName,
            });
            const removeIcon = tagLocator.locator('.ion-close-round');
            await removeIcon.click();
        });
    }

    async clickUpdateArticleButton() {
        await test.step(`Click the 'Update Article' button`, async () => {
            await this.updateArticleButton.click();
        });
    }

    async assertErrorMessageContainsText(messageText) {
        await test.step(`Assert the '${messageText}' error is shown`,
            async () => {
                await expect(this.errorMessage).toContainText(messageText);
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