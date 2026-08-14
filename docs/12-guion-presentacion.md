# 12. Guion de presentación presencial

## 12.1 Objetivo y preparación

Este guion propone una presentación de 15 a 20 minutos sobre el análisis ético de caja negra y la implementación de EduRoom. La demostración utiliza únicamente datos sintéticos y artefactos propios.

Antes de presentar:

```bash
docker compose up --build -d
docker compose exec backend npm run prisma:seed
docker compose ps
```

Comprobar `http://localhost:3000/api/health`, abrir `http://localhost:3000` y mantener dos perfiles de navegador separados para profesor y estudiante. Confirmar que no haya correos, tokens, claves o información personal visible.

| Recurso | Preparación |
|---|---|
| Profesor | `teacher@eduroom.local` / `Teacher123!` |
| Estudiante | `student@eduroom.local` / `Student123!` |
| Curso inicial | Diseño de experiencias educativas |
| Código | `AULA2026` |
| Evidencias | Capturas anonimizadas y numeradas según `docs/13-evidencias.md` |

## 12.2 Apertura: problema y método — 1 minuto

**Mensaje sugerido:**

> El proyecto estudia funciones generales de Google Classroom mediante ingeniería inversa ética de caja negra. Se observaron interfaces, flujos normales, documentación pública y tráfico generado por cuentas de prueba. El resultado es EduRoom, una implementación original con identidad, código y modelo propios.

Mostrar el índice documental y explicar la diferencia entre observación, inferencia y decisión de diseño.

## 12.3 Introducción al análisis de Google Classroom — 2 minutos

1. Mostrar una captura previamente anonimizada de la pantalla inicial o lista de clases.
2. Identificar funciones observables: clases, tablón, tareas, entregas, comentarios y calificaciones.
3. Explicar que la observación de una función no revela su tecnología ni esquema interno.
4. Relacionar cada función con un requisito genérico de LMS, no con una copia visual.

**Documento de apoyo:** `docs/02-analisis-google-classroom.md`.

## 12.4 Límites éticos — 1 minuto

Mostrar la tabla de alcance y mencionar explícitamente:

- no se accedió a código propietario;
- no se realizaron explotación, evasión de autenticación o pruebas de carga;
- no se modificó tráfico dirigido a Google Classroom;
- no se recopilaron datos de terceros;
- no se copiaron marcas, iconos ni recursos visuales;
- las capturas fueron manuales y anonimizadas.

**Documento de apoyo:** `docs/01-marco-teorico.md` y `docs/04-analisis-dinamico.md`.

## 12.5 Modelo reconstruido — 2 minutos

Mostrar el esquema Prisma o un diagrama entidad–relación. Explicar:

1. `User` representa la identidad de EduRoom.
2. `Course` pertenece a un profesor.
3. `Enrollment` resuelve la membresía y el rol dentro del curso.
4. `Assignment` recibe `Submission`.
5. `Announcement` y `Comment` modelan comunicación.
6. `SecureNote` demuestra cifrado por propietario.

Aclarar que este modelo satisface los requisitos de EduRoom y no afirma reproducir estructuras internas de Google.

## 12.6 Demo de profesor: inicio y creación de curso — 2 minutos

1. Iniciar sesión como `teacher@eduroom.local`.
2. Mostrar el dashboard y el estado de integridad.
3. Abrir el curso sembrado para enseñar el anuncio y la tarea inicial.
4. Volver al dashboard y seleccionar **Crear curso**.
5. Crear un curso breve, por ejemplo `Taller presencial`.
6. Señalar el código generado, sin compartirlo fuera del entorno local.

**Resultado esperado:** el nuevo curso aparece en el dashboard del profesor.

## 12.7 Demo de profesor: crear tarea — 1 minuto

1. Dentro del nuevo curso, abrir **Trabajo de clase**.
2. Seleccionar la opción para crear una tarea.
3. Usar título `Actividad de demostración`, una descripción sintética y fecha futura.
4. Confirmar y mostrar la tarea en el listado.

**Resultado esperado:** la tarea queda asociada al curso y visible para integrantes autorizados.

## 12.8 Demo de estudiante y entrega — 2 minutos

1. Cambiar al perfil de estudiante e iniciar sesión como `student@eduroom.local`.
2. Abrir el curso sembrado `Diseño de experiencias educativas`.
3. Mostrar el anuncio y el comentario sintético.
4. Abrir `Mis objetivos de aprendizaje`.
5. Mostrar la entrega que creó el seed o actualizarla con otro texto ficticio.
6. Confirmar la entrega y señalar el cambio de estado.

**Resultado esperado:** el estudiante solo ve su propia entrega y no dispone de controles de calificación.

## 12.9 Demo de profesor calificando — 2 minutos

1. Regresar al perfil del profesor.
2. Abrir la tarea `Mis objetivos de aprendizaje`.
3. Seleccionar la entrega de `Estudiante Demo`.
4. Asignar, por ejemplo, `95` y una retroalimentación sintética.
5. Guardar y mostrar el estado calificado.
6. Volver al perfil del estudiante para confirmar que la calificación es visible únicamente en su contexto autorizado.

## 12.10 Checksum correcto — 1 minuto

Desde la raíz del repositorio:

```bash
npm run release:educational
npm run integrity:verify
```

Explicar que `integrity-manifest.json` cubre JavaScript compilado del backend y JS, CSS y HTML del frontend. Mostrar el resultado exitoso y el endpoint:

```bash
curl http://localhost:3000/api/security/integrity
```

El endpoint no expone hashes completos ni rutas internas.

## 12.11 Detección de una modificación controlada — 2 minutos

Esta prueba se realiza únicamente sobre un artefacto compilado propio y se restaura inmediatamente.

En PowerShell:

```powershell
Copy-Item backend/dist/src/app.js $env:TEMP/eduroom-app.js.backup
Add-Content backend/dist/src/app.js '// cambio educativo temporal'
npm run integrity:verify
Copy-Item $env:TEMP/eduroom-app.js.backup backend/dist/src/app.js -Force
npm run integrity:verify
```

El primer resultado debe informar un archivo modificado y salir con error; después de restaurarlo, la verificación debe ser correcta. No regenerar el manifest mientras el archivo está alterado. No ejecutar esta demostración en producción.

## 12.12 Ofuscación y cifrado — 2 minutos

### Ofuscación

Mostrar `frontend/dist/assets` después de:

```bash
npm --prefix frontend run build:obfuscated
```

Explicar que la ofuscación dificulta lectura casual, pero el navegador sigue recibiendo código ejecutable y no es cifrado real.

### Cifrado

1. Crear una nota segura mediante `POST /api/security/secure-notes` con un token de prueba.
2. Mostrar mediante una consulta preparada que `SecureNote.encryptedPayload` contiene `iv`, `authTag` y `ciphertext`, no el texto plano.
3. Recuperar la nota con `GET /api/security/secure-notes` como propietario.
4. Explicar que AES-256-GCM protege el campo almacenado y detecta modificaciones.

Nunca mostrar `APP_ENCRYPTION_KEY`, JWT, encabezados de autorización ni el contenido de archivos `.env`.

## 12.13 Despliegue en Render — 1 minuto

1. Mostrar el servicio desplegado y la base PostgreSQL desde el panel, ocultando identificadores sensibles.
2. Abrir la URL pública de EduRoom.
3. Consultar `/api/health` y señalar `status`, `uptime`, `timestamp` y `environment`.
4. Explicar que `render.yaml` declara build, arranque, salud, base y secretos.
5. Recordar que las credenciales demo locales no deben sembrarse en producción.

Si no hay conectividad, utilizar capturas verificadas previamente y continuar con la instancia Docker local.

## 12.14 Cierre — 1 minuto

Resumir tres conclusiones:

1. La ingeniería inversa ética permite derivar requisitos desde comportamiento externo sin acceder a implementación propietaria.
2. EduRoom reconstruye capacidades generales con arquitectura y diseño originales.
3. Checksum, ofuscación y cifrado tienen objetivos distintos y limitaciones explícitas.

Finalizar mostrando `docs/11-conclusiones.md` y abrir espacio para preguntas.

## 12.15 Plan de contingencia

| Problema | Respuesta |
|---|---|
| Docker no inicia | Mostrar build y capturas previamente verificadas |
| Render está suspendido | Usar entorno local y evidencia del último health check |
| Seed fue alterado por la demo | Ejecutar nuevamente `npm run prisma:seed` dentro del backend |
| Falló integridad después de una prueba | Restaurar el archivo; no regenerar el manifest para ocultar el cambio |
| Se ve un dato sensible | Detener la proyección, cerrar la vista y usar evidencia anonimizada |

