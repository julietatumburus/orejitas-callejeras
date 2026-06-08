# 🐾 Orejitas Callejeras — Web de adopciones

Sitio web para una organización sin fines de lucro de rescate de perritos.
**Gratis, sin servidor propio.** Hecho con Next.js + Supabase, pensado para Vercel.

## ¿Qué incluye?

- **Landing** (`/`) — presentación de la organización.
- **Adopciones** (`/adoptar`) — listado público (sin login) con **filtros por tamaño y sexo** y un **botón de WhatsApp** por cada perrito que abre el chat con un mensaje pre-cargado.
- **Login admin** (`/admin/login`) — acceso solo para las administradoras.
- **Panel admin** (`/admin`) — cargar, editar y borrar perritos con foto, descripción, edad y estado (disponible / en proceso / adoptado).

Costo: **$0** mientras el tráfico sea bajo (planes gratuitos de Vercel y Supabase).

---

## Puesta en marcha (paso a paso)

### 1) Crear el proyecto en Supabase (base de datos + fotos + login)

1. Entrá a [supabase.com](https://supabase.com) → creá una cuenta gratis → **New project**.
2. Elegí un nombre y una contraseña para la base (anotala). Esperá 1-2 min a que se cree.
3. En el menú lateral, **SQL Editor** → **New query**.
4. Pegá TODO el contenido de [`supabase/schema.sql`](supabase/schema.sql) y tocá **Run**.
   Esto crea la tabla de perritos, los permisos y el espacio para las fotos.

### 2) Conseguir las claves

En Supabase → **Project Settings** (⚙️) → **Data API** (y **API Keys**):

- **Project URL** → va en `NEXT_PUBLIC_SUPABASE_URL`
- **anon / public key** → va en `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Copiá el archivo de ejemplo y completalo:

```bash
cp .env.local.example .env.local
```

### 3) Crear el usuario admin (las que van a cargar perritos)

En Supabase → **Authentication** → **Users** → **Add user** → **Create new user**.
Poné el email y una contraseña. Marcá **"Auto Confirm User"** para que pueda
entrar enseguida. Repetí por cada persona que vaya a administrar.

> Para que **solo** estas personas puedan registrarse, en
> **Authentication → Providers → Email**, desactivá **"Allow new users to sign up"**.

### 4) Cargar los datos de la organización

Editá [`lib/config.ts`](lib/config.ts) con:

- Nombre, descripción y eslogan.
- **Número de WhatsApp** (formato internacional sin `+`, ej. `5491122334455`).
- Email y redes sociales.

### 5) Correr en local

```bash
npm install
npm run dev
```

Abrí <http://localhost:3000>. El panel está en <http://localhost:3000/admin>.

---

## Subir a internet (Vercel, gratis)

1. Subí este proyecto a un repositorio de GitHub.
2. Entrá a [vercel.com](https://vercel.com) con tu cuenta de GitHub → **Add New → Project** → importá el repo.
3. En **Environment Variables** agregá las mismas dos del `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy**. En ~1 minuto tenés la web online.

Cada vez que hagas `git push`, Vercel actualiza el sitio solo.

---

## Logo y fotos

- Poné el logo y favicon en la carpeta [`public/`](public/).
- Las fotos de los perritos se suben desde el panel admin (se guardan en Supabase).

## Notas técnicas

- **Stack:** Next.js 16 (App Router) · React 19 · Tailwind 4 · Supabase (Postgres + Storage + Auth).
- La protección del panel `/admin` está en [`middleware.ts`](middleware.ts).
- Las operaciones de carga/edición/borrado son Server Actions en [`app/admin/actions.ts`](app/admin/actions.ts) y están protegidas además por las políticas RLS de Supabase.
