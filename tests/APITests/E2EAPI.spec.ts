import { test, expect } from '@playwright/test';

const REPO = 'FreeRangePW';
const USER = 'TheFreeRangeTester';

// El contexto de la solicitud es reutilizado por todas las pruebas en el archivo.
let apiContext;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // Todos los requests que enviamos van a este endpoint.
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            // Configuramos este Header como nos dicen en la docu de GitHub.
            'Accept': 'application/vnd.github.v3+json',
            // Agregamos el token de autorización a todos los requests.
            // Acá ponemos el token que generamos en GitHub.
            'Authorization': `token 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`,
        },
    });
});

test.afterAll(async ({ }) => {
    // Nos deshacemos de todas las respuestas al final.
    await apiContext.dispose();
});

test('El último issue creado es el primero en la lista', async ({ page }) => {
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Que el framework me planche la ropa',
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    const firstIssue = page.locator(`a[data-hovercard-type='issue']`).first();
    await expect(firstIssue).toHaveText('[Feature] Que el framework me planche la ropa');
});