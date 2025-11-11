import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

test.describe('Edit article tags tests', () => {
    let viewArticlePage;
    let editArticlePage;
    let user;

    test.beforeEach(async ({ page }) => {
        viewArticlePage = new ViewArticlePage(page);
        editArticlePage = new EditArticlePage(page);
        user = generateNewUserData();

        await signUpUser(page, user);
    });

    test('Add the tag for the existing article without tags',
        async ({ page }) => {
        const article = generateNewArticleData(0);
        const newTag = 'newtag';

        await createNewArticle(page, article);
        await viewArticlePage.clickEditArticleButton();

        await editArticlePage.fillTagField(newTag);
        await editArticlePage.pressEnterInTagField();
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.assertTagIsVisible(newTag);
    });

    test('Add the tag for the existing article with tags', async ({ page }) => {
        const article = generateNewArticleData(2);
        const newTag = 'additionaltag';

        await createNewArticle(page, article);
        await viewArticlePage.clickEditArticleButton();

        await editArticlePage.fillTagField(newTag);
        await editArticlePage.pressEnterInTagField();
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.assertTagIsVisible(newTag);
        await viewArticlePage.assertTagIsVisible(article.tags[0]);
        await viewArticlePage.assertTagIsVisible(article.tags[1]);
    });

    test('Remove an article tag for the existing article with tag',
        async ({ page }) => {
        const article = generateNewArticleData(3);

        await createNewArticle(page, article);
        await viewArticlePage.clickEditArticleButton();

        const tagToRemove = article.tags[0];
        await editArticlePage.removeTag(tagToRemove);
        await editArticlePage.clickUpdateArticleButton();

        await viewArticlePage.assertTagIsNotVisible(tagToRemove);
        await viewArticlePage.assertTagIsVisible(article.tags[1]);
        await viewArticlePage.assertTagIsVisible(article.tags[2]);
    });
});