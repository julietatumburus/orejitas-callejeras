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
4. Corré estos scripts **en orden** (cada uno: pegar todo → **Run**):
   1. [`supabase/schema.sql`](supabase/schema.sql) — tabla de publicaciones, permisos y fotos.
   2. [`supabase/migration-roles.sql`](supabase/migration-roles.sql) — roles, registro y aprobación de usuarios. **Cambiá el email del final por el tuyo** para quedar como superadmin.
   3. [`supabase/migration-settings.sql`](supabase/migration-settings.sql) — configuración editable (textos y contacto).

   > Si ya tenías la base creada de antes, corré además [`supabase/migration-especie.sql`](supabase/migration-especie.sql) (agrega perro/gato).

### 2) Conseguir las claves

En Supabase → **Project Settings** (⚙️) → **Data API** (y **API Keys**):

- **Project URL** → va en `NEXT_PUBLIC_SUPABASE_URL`
- **anon / public key** → va en `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Copiá el archivo de ejemplo y completalo:

```bash
cp .env.local.example .env.local
```

### 3) Roles y usuarios

El sistema tiene 4 niveles:

| Rol | Puede |
|-----|-------|
| **Superadmin** | Todo: gestionar usuarios y roles, editar la info de la org y las publicaciones |
| **Admin** | Habilitar usuarios, editar la info de la org y las publicaciones |
| **Usuario** | Solo cargar/editar/borrar publicaciones de adopción |
| **Usuario final** | No se loguea, solo ve la web pública |

Cómo funciona:
1. Las personas se registran solas en **`/admin/signup`** → quedan **pendientes**.
2. Vos (o un admin) las habilitás y les asignás el rol en **`/admin/usuarios`**.
3. Vos quedaste como **superadmin** al correr `migration-roles.sql` (con tu email).

> En Supabase → **Authentication → Providers → Email** podés desactivar la
> confirmación por mail para que el alta sea inmediata (queda igual pendiente de aprobación).

### 3.b) Editar la info de la organización
Desde el panel, en **`/admin/configuracion`** (solo admin/superadmin) podés cambiar
el nombre, eslogan, descripción, datos de contacto (WhatsApp, email, redes) y las
tarjetas de "Cómo ayudar". Todo eso se refleja en la web pública.

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
