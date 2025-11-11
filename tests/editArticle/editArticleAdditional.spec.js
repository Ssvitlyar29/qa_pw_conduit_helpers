import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

test.describe('Edit article additional tests', () => {
    let viewArticlePage;
    let editArticlePage;
    let article;
    let user;

    test.beforeEach(async ({ page }) => {
        viewArticlePage = new ViewArticlePage(page);
        editArticlePage = new EditArticlePage(page);
        user = generateNewUserData();
        article = generateNewArticleData(2);

        await signUpUser(page, user);
        await createNewArticle(page, article);
    });

    test('Edit all article fields at once', async () => {
        const newTitle = 'Completely New Title';
        const newDescription = 'Brand new description';
        const newText = 'This is entirely new text content';

        await viewArticlePage.clickEditArticleButton();

        await editArticlePage.clearTitleField();
        await editArticlePage.fillTitleField(newTitle);
        await editArticlePage.clearDescriptionField();
        await editArticlePage.fillDescriptionField(newDescription);
        await editArticlePage.clearTextField();
        await editArticlePage.fillTextField(newText);
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.assertArticleTitleIsVisible(newTitle);
        await viewArticlePage.assertArticleTextIsVisible(newText);
    });

    test('Edit article and add multiple new tags', async () => {
        const newTag1 = 'tag1';
        const newTag2 = 'tag2';
        const newTag3 = 'tag3';

        await viewArticlePage.clickEditArticleButton();

        await editArticlePage.fillTagField(newTag1);
        await editArticlePage.pressEnterInTagField();
        await editArticlePage.fillTagField(newTag2);
        await editArticlePage.pressEnterInTagField();
        await editArticlePage.fillTagField(newTag3);
        await editArticlePage.pressEnterInTagField();
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.assertTagIsVisible(newTag1);
        await viewArticlePage.assertTagIsVisible(newTag2);
        await viewArticlePage.assertTagIsVisible(newTag3);
        await viewArticlePage.assertTagIsVisible(article.tags[0]);
        await viewArticlePage.assertTagIsVisible(article.tags[1]);
    });

    test('Remove all tags from article', async () => {
        await viewArticlePage.clickEditArticleButton();

        for (const tag of article.tags) {
            await editArticlePage.removeTag(tag);
        }
        await editArticlePage.clickUpdateArticleButton();

        for (const tag of article.tags) {
            await viewArticlePage.assertTagIsNotVisible(tag);
        }
    });

    test('Edit article title with special characters', async () => {
        const specialTitle = 'Title with $pecial Ch@racters & Symbols!';

        await viewArticlePage.clickEditArticleButton();

        await editArticlePage.clearTitleField();
        await editArticlePage.fillTitleField(specialTitle);
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.assertArticleTitleIsVisible(specialTitle);
    });

    test('Edit article with very long content', async () => {
        const longTitle = 'A'.repeat(100);
        const longDescription = 'B'.repeat(500);
        const longText = 'C'.repeat(1000);

        await viewArticlePage.clickEditArticleButton();

        await editArticlePage.clearTitleField();
        await editArticlePage.fillTitleField(longTitle);
        await editArticlePage.clearDescriptionField();
        await editArticlePage.fillDescriptionField(longDescription);
        await editArticlePage.clearTextField();
        await editArticlePage.fillTextField(longText);
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.assertArticleTitleIsVisible(longTitle);
        await viewArticlePage.assertArticleTextIsVisible(longText);
    });
});