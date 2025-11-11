import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

test.describe('Edit article positive tests', () => {
    let viewArticlePage;
    let editArticlePage;
    let article;
    let user;

    test.beforeEach(async ({ page }) => {
        viewArticlePage = new ViewArticlePage(page);
        editArticlePage = new EditArticlePage(page);
        user = generateNewUserData();
        article = generateNewArticleData();

        await signUpUser(page, user);
        await createNewArticle(page, article);
    });

    test('Edit the article title for the existing article', async () => {
        const newTitle = 'Updated Article Title';

        await viewArticlePage.clickEditArticleButton();

        await editArticlePage.clearTitleField();
        await editArticlePage.fillTitleField(newTitle);
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.assertArticleTitleIsVisible(newTitle);
    });

    test('Edit the article description for the existing article', async () => {
        const newDescription = 'This is an updated description for the article';

        await viewArticlePage.clickEditArticleButton();

        await editArticlePage.clearDescriptionField();
        await editArticlePage.fillDescriptionField(newDescription);
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.assertArticleDescriptionIsVisible(newDescription);
    });

    test('Edit the article text for the existing article', async () => {
        const newText =
        'This is completely new article text that replaces the old content.';

        await viewArticlePage.clickEditArticleButton();

        await editArticlePage.clearTextField();
        await editArticlePage.fillTextField(newText);
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.assertArticleTextIsVisible(newText);
    });
});