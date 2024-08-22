import { test, Browser, Page, expect } from '@playwright/test';
import { SandboxPage } from '../Pages/SandboxPage';

(async () => {
    let browser: Browser;
    let page: Page;

    let textoAEscribir = 'Estoy aprendiendo Playwright 🚀';

    test.describe('Acciones en el Automation Sandbox', () => {
        test('Click en Botón ID Dinámico', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Puedo hacer click en el botón con ID dinámico', async () => {
                const botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' });
                await botonIDDinamico.click({ force: true });
                await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible();
            })

        })

        test('Lleno un campo de texto en Automation @Sandbox', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
                await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edición').toBeEditable();
                await page.getByPlaceholder('Ingresá texto').fill(textoAEscribir);
                await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edición').toHaveValue(textoAEscribir);

            })


        })

        test('Puedo seleccionar y deseleccionar un checkbox en el @Sandbox', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Puedo seleccionar el checkbox para Pasta', async () => {
                const sandbox = new SandboxPage(page);
                //await page.getByLabel('Pasta 🍝').check();
                await sandbox.checkPasta();

                await expect(sandbox.pastaCheckbox, 'El checkbox no estaba seleccionado').toBeChecked();

            })

            await test.step('Puedo deseleccionar el checkbox Pasta', async () => {
                await page.getByLabel('Pasta 🍝').uncheck();

                await expect(page.getByLabel('Pasta 🍝'), 'El checkbox no estaba seleccionado').not.toBeChecked();
            })

        })

        test('Puedo seleccionar Radio Buttons', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Puedo seleccionar el Radio Button para No', async () => {
                await page.getByLabel('No').check();
                await expect(page.getByLabel('No'), 'El radio button no se seleccionó').toBeChecked();

            })


        })

        test('Puedo seleccionar un item del Dropdown', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Seleccion un deporte del dropdown', async () => {
                await page.getByLabel('Dropdown').selectOption('Tennis');

            })


        })

        test('Los items del dropdown son los esperados', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
            })
            await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
                const deportes = ['Fútbol', 'Tennis', 'Basketball', 'Bochas']

                for (let opcion of deportes) {
                    const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                    if (element) {
                        console.log(`La opción '${opcion}' está presente.`);
                    } else {
                        throw new Error(`La opción '${opcion}' no está presente.`);
                    }
                }

            })


        })

        test('Valido la columna Nombres de la tabla estática', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
                const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];
                //Saca una screen y la adjunta aunque el caso pase.
                await test.info().attach('screenshot', {
                    body: await page.screenshot(),
                    contentType: 'image/png',
                })
                expect(valoresColumnaNombres).toEqual(nombresEsperados);
            })

        })

        test('Valido que todos los valores cambian en la tabla dinámica luego de un reload', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })

            await test.step('Valido que los valores cambiaron al hacer un reload a la web', async () => {
                //Creamos un arreglo con todos los valores de la tabla dinámica
                const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresTablaDinamica);

                //Hacemos una recarga para que cambien los valores
                await page.reload();

                //Creamos un segundo arreglo con los valores luego de la recarga
                const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresPostReload);

                //Validamos que todos los valores cambiaron para cada celda.
                expect(valoresTablaDinamica).not.toEqual(valoresPostReload);

            })


        })

        test('Ejemplo de Soft Assertions', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
                await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizza 🍕').toBeVisible();
                await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
                await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
                await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helado 🍧').toBeVisible();
                await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
            })

        })



        test('Puedo seleccionar un día del dropdown Días de la Semana', async ({ page }) => {
            test.info().annotations.push({
                type: 'User Story 23443',
                description: 'El usuario puede seleccionar un día del dropdown Días de Semana '
            });
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Selecciono un día de la semana del dropdown', async () => {
                await page.getByRole('button', { name: 'Día de la semana' }).click();
                await page.getByRole('link', { name: 'Martes' }).click();

            })


        })

        test('Puedo subir archivos a Automation Sandbox - NO IMPLEMENTADO EN PROD', async ({ page }) => {
            test.fixme();
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Agrego archivos para ser subidos', async () => {
                await page.getByLabel('Upload file').setInputFiles(['pathAlArchivo.pdf', 'Invoice1.pdf', 'Invoice2.pdf']);
                await page.getByLabel('Upload file').setInputFiles([]);

            })


        })

        test.fixme('Puedo hacer un Drag and Drop de elementos en Automation Sandbox - NO IMPLEMENTADO EN PROD', async ({ page }) => {
            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('');
            })
            await test.step('Selecciono un día de la semana del dropdown', async () => {
                await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'));

            })


        })

        test('Validando dentro de un popup', async ({ page }) => {
            await test.step('Dado que navego al sandbox', async () => {
                await page.goto('');
            })

            await test.step('Cuando hago click en el botón popup', async () => {
                await page.getByRole('button', { name: 'Mostrar popup' }).click();
            })

            await test.step('Puedo validar un elemento dentro del popup', async () => {
                await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await page.getByRole('button', { name: 'Cerrar' }).click();

            })


        })

    })

})();