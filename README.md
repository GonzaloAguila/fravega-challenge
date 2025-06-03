# GitHub User Search

Challenge frontend para Frávega tech.
Aplicación web para buscar usuarios de GitHub y ver sus detalles.

## Características

- Búsqueda de usuarios de GitHub en tiempo real
- Gestión de favoritos persistente en localStorage
- Visualización de detalles de usuario y sus repositorios
- Panel de filtros: ordena y limita la cantidad de resultados
- Diseño responsive y accesible
- Notificaciones de error y éxito con toasts

## Tecnologías

- Next.js
- TypeScript
- React Query
- React Hot Toast (única librería externa que use para mostrar mas prolijamente los favoritos)
- CSS Modules
- GitHub API
- Jest + Testing Library

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/GonzaloAguila/fravega-challenge.git
```

2. Instalar las dependencias:
```bash
npm install
# o
yarn install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

4. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.
   Si el puerto ya está siendo utilizado, la consola indicará dónde abrir el proyecto.

## Uso

- Ingresar el nombre de usuario en la barra de búsqueda.
- Usar el panel de filtros para ordenar y limitar los resultados.
- Hacer clic en un usuario para ver sus detalles y repositorios.
- Usar el botón de estrella para agregar/quitar de favoritos.
- Acceder a la sección de favoritos desde el header.

## Testing

- Ejecuta todos los tests:
```bash
npm test
# o
yarn test
```
- Ejecuta los tests en modo watch:
```bash
npm run test:watch
# o
yarn test:watch
```
- Ver cobertura de tests:
```bash
npm run test:coverage
# o
yarn test:coverage
```

## Notas

- La API de GitHub tiene un límite de peticiones por hora para usuarios no autenticados. Si lo superas, verás un mensaje de error.
- El código está tipado completamente con TypeScript.
