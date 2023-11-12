import { test, expect } from '@playwright/test';

const REPO = 'REPOLOCO';
const USER = 'TheFreeRangeTester';

test.beforeAll(async ({ request }) => {
    const response = await request.post('user/repos', {
        data: {
            name: REPO
        }
    });
    expect(response.ok()).toBeTruthy();
})


test('Puedo crear un bug en el repo', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] Explotó todo',
            body: 'Estamos perdidirijillos!',
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] Explotó todo',
        body: 'Estamos perdidirijillos!'
    }));
});

test('Puedo crear un feature request', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Quiero que haga helados',
            body: 'Estaría buenísimo que el repo haga helados 🍦',
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Feature] Quiero que haga helados',
        body: 'Estaría buenísimo que el repo haga helados 🍦'
    }));
});

test.afterAll(async ({ request }) => {
    const response = await request.delete(`/repos/${USER}/${REPO}`);
    expect(response.ok()).toBeTruthy();
});

