import { test } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import {
    TITLE_CANNOT_BE_EMPTY,
    DESCRIPTION_CANNOT_BE_EMPTY,
    TEXT_CANNOT_BE_EMPTY
} from '../../src/ui/constants/articleErrorMessages';

test.describe('Edit article negative tests', () => {
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

    test('Remove an article title for the existing article', async () => {
        await viewArticlePage.clickEditArticleButton();

        await editArticlePage.clearTitleField();
        await editArticlePage.clickUpdateArticleButton();

        await editArticlePage.
            assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
    });

    test('Remove an article description for the existing article', async () => {
        await viewArticlePage.clickEditArticleButton();

        await editArticlePage.clearDescriptionField();
        await editArticlePage.clickUpdateArticleButton();

        await editArticlePage.
            assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
    });

    test('Remove the article text for the existing article', async () => {
        await viewArticlePage.clickEditArticleButton();

        await editArticlePage.clearTextField();
        await editArticlePage.clickUpdateArticleButton();

        await editArticlePage.
            assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
    });
});