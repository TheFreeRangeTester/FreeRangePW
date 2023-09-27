import { test, Browser, Page, expect } from '@playwright/test';

(async () => {
    let browser: Browser;
    let page: Page;

    let textoAEscribir = 'Estoy aprendiendo Playwright 🚀';

    test.describe('Acciones en el Automation Sandbox', () => {
        test('Click en Botón ID Dinámico', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })

            await test.step('Puedo hacer click en el botón con ID dinámico', async () => {
                const botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' });
                await botonIDDinamico.click({ force: true });
                await botonIDDinamico.dblclick();
                await botonIDDinamico.click({ button: 'right' });
                await botonIDDinamico.click({ modifiers: ['Shift'] });
                await botonIDDinamico.hover();
            })

        })

        test('Lleno un campo de texto en Automation Sandbox', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
                await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir);
                await page.getByPlaceholder('Ingresá texto').press('Shift+ArrowLeft');
            })


        })

        test('Puedo seleccionar checkboxes', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Puedo seleccionar el checkbox para Pasta', async () => {
                await page.getByLabel('Pasta 🍝').check();
                await page.getByLabel('Pasta 🍝').uncheck();

            })


        })

        test('Puedo seleccionar Radio Buttons', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Puedo seleccionar el Radio Button para No', async () => {
                await page.getByLabel('No').check();

            })


        })

        test('Puedo seleccionar un item del Dropdown', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Seleccion un deporte del dropdown', async () => {
                await page.getByLabel('Dropdown').selectOption('Tennis');

            })


        })

        test('Puedo seleccionar un día del dropdown Días de la Semana', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Selecciono un día de la semana del dropdown', async () => {
                await page.getByRole('button', { name: 'Día de la semana' }).click();
                await page.getByRole('link', { name: 'Martes' }).click();

            })


        })

        test.skip('Puedo subir archivos a Automation Sandbox', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Agrego archivos para ser subidos', async () => {
                await page.getByLabel('Upload file').setInputFiles(['pathAlArchivo.pdf', 'Invoice1.pdf', 'Invoice2.pdf']);
                await page.getByLabel('Upload file').setInputFiles([]);

            })


        })

        test.skip('Puedo hacer un Drag and Drop de elementos en Automation Sandbox', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Selecciono un día de la semana del dropdown', async () => {
                await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'));

            })


        })


    })


})();