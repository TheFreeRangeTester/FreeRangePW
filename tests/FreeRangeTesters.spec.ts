import { test, expect } from '@playwright/test';

test.describe('Navegación en www.freerangetesters.com', () => {
  const secciones = [
    { nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos' },
    { nombre: 'Udemy', url: '/udemy', tituloEsperado: 'Udemy' },
    { nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos' },
    { nombre: 'Mentorías', url: '/mentoria-1-1-con-pato', tituloEsperado: 'Mentoría personalizada de avance de carrera para testers de software' },
    { nombre: 'Blog', url: '/blog', tituloEsperado: 'Free Range Testers' }
    // Otros elementos de la matriz aquí...
  ];

  for (const seccion of secciones) {
    test(`Validar redirección a la sección "${seccion.nombre}"`, async ({ page }) => {
      await test.step(`Estando yo en la web principal www.freerangetesters.com`, async () => {
        await page.goto('https://www.freerangetesters.com');
      });

      await test.step(`Cuando hago click en "${seccion.nombre}"`, async () => {
        const [response] = await Promise.all([
          page.waitForResponse(response => response.url().includes(seccion.url) && response.status() === 200),
          page.locator('#page_header').getByRole('link', { name: seccion.nombre, exact: true }).click(),
        ]);
      });

      await test.step(`Soy redirigido a la sección de título "${seccion.tituloEsperado}"`, async () => {
        await expect(page).toHaveTitle(seccion.tituloEsperado);
      });
    });
  }
});
