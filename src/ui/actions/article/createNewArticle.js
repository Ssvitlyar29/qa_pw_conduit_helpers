import { HomePage } from '../../pages/HomePage';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';
import { test } from '@playwright/test';

export async function createNewArticle(page, article) {
    await test.step(`Create new article`, async () => {
        const homePage = new HomePage(page);
        const createArticlePage = new CreateArticlePage(page);
        const viewArticlePage = new ViewArticlePage(page);

        await homePage.clickNewArticleLink();

        await createArticlePage.fillTitleField(article.title);
        await createArticlePage.fillDescriptionField(article.description);
        await createArticlePage.fillTextField(article.text);

        if (article.tags && article.tags.length > 0) {
            for (const tag of article.tags) {
                await createArticlePage.fillTagField(tag);
                await createArticlePage.pressEnterInTagField();
            }
        }

        await createArticlePage.clickPublishArticleButton();

        await viewArticlePage.assertArticleTitleIsVisible(article.title);
    });
}