# 🎬 Next Movies & Series App

Aplicación web construida con **Next.js 15** y **React 19**, diseñada para explorar películas y series con enfoque en rendimiento, escalabilidad y experiencia de usuario moderna.

---

## 🚀 Tecnologías Utilizadas

- **Next.js 15 (App Router)** – SSR, cache nativa, y manejo optimizado de rutas.
- **React 19** – Concurrent features y mejoras de rendimiento.
- **Zustand** – Estado global sencillo, eficiente y minimalista.
- **TanStack Query (React Query)** – Manejo de datos, paginación e _infinite scroll_ con caché.
- **Jest** – Framework de testing para garantizar confiabilidad.
- **TypeScript** – Tipado estático robusto.

---

## 🖼️ Estructura de la App y Decisiones Técnicas

### 🎥 Películas – Cache y SSR con funcionalidad nativa de Next.js

En la vista de **películas** (`/movies`), utilicé las **funcionalidades nativas del framework Next.js**, siguiendo las recomendaciones oficiales:

- **Server Functions**: Los datos se obtienen directamente desde el servidor en cada navegación.
- **`pageParams`**: Permiten manejar la paginación, filtros y búsqueda de forma declarativa.
- **Cache Automática de Next.js**: Se aprovecha la caché integrada del App Router para evitar renders innecesarios y mejorar el rendimiento.

> Esta aproximación es ideal para contenido que puede beneficiarse de la pre-renderización, garantizando tiempos de carga rápidos y buena indexación SEO.

---

### 📺 Series – Infinite Scroll con TanStack Query

En la vista de **series** (`/series`), decidí implementar una experiencia más interactiva con **infinite scroll**:

- Utilicé **TanStack Query (`useInfiniteQuery`)** para manejar el fetching por páginas.
- Implementé un **scroll infinito con Intersection Observer**, cargando automáticamente nuevas páginas al hacer scroll.
- Para no impactar negativamente otras rutas, **aislé la funcionalidad de TanStack en su propio `layout.tsx`**, lo que me permite encapsular su configuración (como el `QueryClientProvider`) sin afectar el resto de la aplicación.

> Esta estrategia permite una experiencia fluida y moderna, ideal para consumir contenido de forma continua, como se hace en plataformas tipo streaming.

---

### 🧠 Estado Global con Zustand

Para el manejo de estado global, utilicé **Zustand**, una librería simple pero poderosa que ofrece:

- Bajo acoplamiento entre componentes.
- API basada en hooks.
- Excelente rendimiento sin necesidad de boilerplate.

Usé Zustand para gestionar filtros globales, selección de géneros, y estados que deben compartirse entre componentes sin prop drilling.

---

## 📦 Instalación del Proyecto

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
npm install
# o
yarn install

## 🧪 Ejecutar Pruebas
npm run test
# o
yarn test

🔧 Scripts Disponibles
npm run dev       # Iniciar servidor de desarrollo
npm run build     # Crear build de producción
npm run start     # Iniciar servidor en producción
npm run lint      # Verificar errores de lint
npm run test      # Ejecutar pruebas con Jest
```

## 📁 Estructura de Carpetas (Resumen)

```bash
echo-flix/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Página principal
│   │   ├── globals.css
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── favicon.ico
│   │   ├── movies/
│   │   │   ├── page.tsx                # SSR + pageParams + Cache Next.js
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx            # Detalles de película
│   │   │   ├── components/
│   │   │   │   ├── CategoryFilter.tsx
│   │   │   │   ├── MovieCard.tsx
│   │   │   │   ├── MoviesList.tsx
│   │   │   │   └── SearchBar.tsx
│   │   │   ├── moviesActions.ts
│   │   │   └── moviesTypes.ts
│   │   ├── series/
│   │   │   ├── layout.tsx              # Layout aislado para TanStack
│   │   │   ├── page.tsx                # Scroll infinito
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx            # Detalles de serie
│   │   │   ├── components/
│   │   │   │   ├── SerieCard.tsx
│   │   │   │   ├── SeriesList.tsx
│   │   │   │   └── scroll-animations.css
│   │   │   ├── seriesActions.ts
│   │   │   └── seriesType.ts
│   │   ├── favorites/
│   │   │   └── page.tsx                # Página de favoritos
│   │   └── store/                      # Estado global con Zustand
│   │       ├── favoriteStore.ts
│   │       └── useStore.ts
│   ├── components/                     # Componentes compartidos
│   │   ├── layout/
│   │   │   ├── Nav.tsx
│   │   │   ├── NavList.tsx
│   │   │   ├── NavLinkItem.tsx
│   │   │   ├── MenuButton.tsx
│   │   │   └── CardSkeleton.tsx
│   │   ├── __tests__/                  # Pruebas con Jest
│   │   │   ├── BackButton.test.tsx
│   │   │   └── FavoriteButton.test.tsx
│   │   ├── BackButton.tsx
│   │   ├── FavoriteButton.tsx
│   │   ├── Pagination.tsx
│   │   └── ThemeToggleButton.tsx
│   ├── config/
│   │   └── globalVariables.ts
│   ├── styles/
│   │   └── fonts.ts
│   ├── types/
│   │   ├── genresTypes.ts
│   │   └── jest.d.ts
│   └── assets/
│       └── imgs/
├── public/
│   └── placeholder.jpg
├── jest.config.js
├── jest.setup.js
├── package.json
├── README.md
└── tsconfig.json

```

✅ Conclusión

Este proyecto demuestra un balance entre aprovechar las capacidades nativas de Next.js y usar herramientas externas cuando agregan valor real a la experiencia:

Uso de caché del framework y SSR donde es más eficiente.

Implementación de scroll infinito y client-side fetching donde mejora la UX.

Separación clara de responsabilidades mediante layouts dedicados.

Estado global ligero y mantenible con Zustand.

🤝 Autor

> Proyecto desarrollado como parte de una entrevista técnica.
> Autor: Jesús Esquivel
> Empresa: Echo Tech
> GitHub: https://github.com/DarkKingpro10
