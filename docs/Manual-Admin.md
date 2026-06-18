---
pdf_options:
  format: A4
  margin: 18mm
  printBackground: true
css: |
  * { font-family: "Segoe UI", Arial, sans-serif; }
  body { color: #44403c; line-height: 1.5; font-size: 12.5px; }
  h1 { color: #be185d; font-size: 26px; margin-bottom: 2px; }
  h2 { color: #be185d; border-bottom: 2px solid #fbcfe8; padding-bottom: 4px; margin-top: 26px; font-size: 18px; }
  h3 { color: #db2777; font-size: 14px; margin-bottom: 2px; }
  a { color: #db2777; }
  code { background: #fdf2f8; color: #be185d; padding: 1px 6px; border-radius: 6px; font-size: 12px; }
  table { border-collapse: collapse; width: 100%; margin: 8px 0; }
  th, td { border: 1px solid #fbcfe8; padding: 7px 9px; text-align: left; font-size: 12px; }
  th { background: #fdf2f8; color: #9d174d; }
  .tip { background: #fdf6ec; border-left: 4px solid #ec4899; padding: 8px 12px; border-radius: 6px; margin: 10px 0; }
  ol li, ul li { margin: 3px 0; }
  hr { border: none; border-top: 1px solid #f1ddcf; margin: 20px 0; }
---

# 🐾 Orejitas Callejeras — Manual para Administradores

Guía rápida para usar el panel: cargar perritos y gatitos en adopción, editar la
información de la web y gestionar usuarios.

> **Reemplazá el dominio si el tuyo es distinto.** En este manual usamos
> `https://orejitas-callejeras.vercel.app` como ejemplo.

---

## 1. Las direcciones (links)

### Web pública (la ve cualquiera, sin usuario)
| Página | Link |
| --- | --- |
| Inicio | `https://orejitas-callejeras.vercel.app` |
| En adopción | `https://orejitas-callejeras.vercel.app/adoptar` |
| Ser tránsito | `https://orejitas-callejeras.vercel.app/transito` |
| Concientización | `https://orejitas-callejeras.vercel.app/concientizacion` |

### Panel de administración (solo con usuario y contraseña)
| Acción | Link |
| --- | --- |
| Ingresar | `https://orejitas-callejeras.vercel.app/admin/login` |
| Panel | `https://orejitas-callejeras.vercel.app/admin` |

---

## 2. Ingresar al panel

1. Entrá a **`/admin/login`**.
2. Escribí tu **email** y **contraseña**.

### La primera vez (o si te resetearon la clave)
- Te llega un **mail con una clave temporal**.
- Esa clave **vence a los 15 minutos** y al entrar te pide **crear tu propia contraseña**.
- Ponés tu contraseña nueva (mínimo 6 caracteres) y listo: **esa ya no vence**.

<div class="tip">💡 Si la clave temporal venció, pedile a un administrador que te toque
<b>“Resetear clave”</b> para que te llegue una nueva.</div>

---

## 3. Cargar una adopción 🐶🐱

1. En el panel, entrá a **Publicaciones**.
2. Tocá **“+ Cargar adopción”**.
3. Completá los datos:
   - **Tipo:** Perro o Gato.
   - **Nombre.**
   - **WhatsApp de contacto (obligatorio):** el número de quien tiene ese rescate, en
     formato internacional sin `+` ni espacios. Ej: `5493815551234`.
   - **Edad** (ej: “Cachorro”, “2 años”).
   - **Sexo** y **Tamaño.**
   - **Estado:** Disponible / En proceso / Adoptado.
   - **Está castrado/a:** marcá la casilla si corresponde.
   - **Foto:** elegí una imagen del animalito.
   - **Descripción / historia:** personalidad, si se lleva con otros animales/niños, etc.
4. Tocá **“Cargar adopción”**. ¡Listo, ya aparece en la web!

<div class="tip">📸 La foto se ve mejor si es <b>cuadrada</b> y con buena luz. El botón de
WhatsApp de cada plaquita usa el número que cargaste en esa adopción.</div>

### Vista previa
Arriba a la derecha hay un interruptor **“Lista / Vista previa”**. En **Vista previa**
ves las plaquitas **tal cual salen en la web** antes de que las vean los visitantes.

---

## 4. Editar, borrar o marcar como adoptado

- En **Publicaciones** (modo Lista), cada adopción tiene **“Editar”** y **“Borrar”**.
- Para que **deje de ofrecerse** pero no se pierda: editala y cambiá el **Estado** a
  **“Adoptado”** (queda con el cartel “¡Ya encontró su hogar!”).
- **Borrar** elimina la publicación y su foto de forma permanente.

---

## 5. Editar la información de la web (Configuración)

En el panel → **Configuración** (solo Admin/Superadmin). Podés cambiar:

- **Textos del inicio:** nombre, eslogan y descripción.
- **Contacto:** Instagram, Facebook (el botón “Contactarnos” lleva a Instagram).
- **Donaciones:** el **alias** para transferencias (aparece con botón “Copiar”).
- **Tarjetas “Cómo ayudar”:** Adoptá, Transitá, Apadriná, Difundí (podés editarlas/agregarlas).

Tocá **“Guardar cambios”** y se actualiza la web al instante.

---

## 6. Gestionar usuarios (solo Admin/Superadmin)

En el panel → **Usuarios**.

### Crear un usuario
1. Escribí el **email** de la persona.
2. Tocá **“Crear usuario”**.
3. Le llega un **mail con clave temporal** para que entre y cree su contraseña.

### Otras acciones (en cada usuario)
| Botón | Qué hace |
| --- | --- |
| **Toggle Activo/Inactivo** | Permite o bloquea el acceso de esa persona. |
| **Resetear clave** | Le reenvía por mail una **nueva clave temporal** (útil si no le llegó). |
| **Eliminar** | Borra la cuenta de forma permanente. |

<div class="tip">🔒 El <b>Superadmin</b> es único y no aparece en la lista. Hoy todos los
usuarios que crees son administradores con los mismos permisos.</div>

---

## 7. Preguntas frecuentes

**No me llegó el mail.** Revisá spam. Si no está, que un admin te toque “Resetear clave”.

**¿Cómo contacta la gente para adoptar?** Cada plaquita tiene un botón verde de
**WhatsApp** que abre el chat con un mensaje ya escrito hacia el número de ese rescate.

**¿Puedo cambiar los textos sin tocar código?** Sí, desde **Configuración**.

---

<p style="text-align:center; color:#a8a29e; font-size:11px; margin-top:30px;">
Orejitas Callejeras · Manual para administradores · Tucumán, Argentina 🐾
</p>
