import { test, expect } from '@playwright/test';

const REPO = 'REPOLOCO';
const USER = 'TheFreeRangeTester';
const TOKEN = 'your_access_token'; // Replace with your access token

test.beforeAll(async ({ request }) => {
    const response = await request.post('https://api.github.com/user/repos', {
        headers: {
            'Authorization': `token ${TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        },
        data: {
            name: REPO
        }
    });
    expect(response.ok()).toBeTruthy();
});

test('I can create a bug in the repo', async ({ request }) => {
    const newIssue = await request.post(`https://api.github.com/repos/${USER}/${REPO}/issues`, {
        headers: {
            'Authorization': `token ${TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        },
        data: {
            title: '[Bug] Everything exploded',
            body: 'We are completely lost!',
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(`https://api.github.com/repos/${USER}/${REPO}/issues`, {
        headers: {
            'Authorization': `token ${TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] Everything exploded',
        body: 'We are completely lost!'
    }));
});

test.afterAll(async ({ request }) => {
    const response = await request.delete(`https://api.github.com/repos/${USER}/${REPO}`, {
        headers: {
            'Authorization': `token ${TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    expect(response.ok()).toBeTruthy();
});
