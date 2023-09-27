module.exports = { helloFlow };

// Probar con https://hlsjs.video-dev.org/demo/

async function helloFlow(page) {
    //
    // The code below is just a standard Playwright script:
    //
    // Go to https://artillery.io/
    await page.goto("https://www.freerangetesters.com/");
}