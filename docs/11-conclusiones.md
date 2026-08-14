# 11. Conclusiones

## Síntesis

El proyecto muestra que es posible estudiar capacidades generales de un LMS mediante caja negra ética y convertir hallazgos limitados en un modelo propio. La separación entre observación, inferencia y decisión evita atribuir detalles internos que la evidencia no demuestra.

EduRoom v0.1 materializa el núcleo seleccionado: identidad, roles, cursos, membresía, anuncios, tareas, entregas, comentarios, calificación y retroalimentación. La arquitectura separa React, API Express y PostgreSQL; Docker facilita reproducibilidad y Render ofrece una ruta de despliegue. La identidad visual y el código son originales.

## Cumplimiento de objetivos

| Objetivo | Resultado | Pendiente |
|---|---|---|
| Método ético documentado | Alcance y protocolo definidos | Adjuntar evidencias propias |
| Arquitectura full-stack | Backend y frontend compilan; pruebas automatizadas del cifrado y servidor productivo | Ampliar pruebas de API con una base efímera |
| Réplica funcional | Flujos de profesor y estudiante para cursos, anuncios, tareas, entregas, comentarios y calificaciones | Adjuntos binarios, notificaciones y rúbricas |
| Persistencia y acceso | Modelo Prisma, migraciones PostgreSQL, JWT/bcrypt y autorización por curso | Renovación, revocación y recuperación de cuenta |
| Protección educativa | SHA-256 antes del arranque, modo estricto, AES-256-GCM y ofuscación opcional | Firma digital y gestión de claves con KMS |
| Portabilidad | Compose, Dockerfile multietapa, seed idempotente y Blueprint de Render | Ensayo documentado en una cuenta Render |

## Limitaciones éticas y técnicas

La muestra de observación es pequeña, manual y dependiente del momento. Solo se estudiaron comportamientos visibles, documentación pública y tráfico originado por cuentas de prueba autorizadas. No se inspeccionaron ni se infieren como hechos el código, las bases de datos o la infraestructura internas del sistema estudiado. El proyecto no justifica evadir controles, automatizar extracción, obtener secretos, reutilizar datos de terceros ni copiar identidad visual.

Técnicamente, EduRoom es un prototipo: almacena el JWT en `localStorage`, permite el registro directo de docentes, no implementa revocación de sesiones, recuperación de cuenta, carga binaria de adjuntos, notificaciones, rúbricas, auditoría completa, rotación de claves ni KMS. La cobertura automatizada se concentra en cifrado y servicio productivo y debe ampliarse para reglas de autorización con PostgreSQL efímero. El seed usa credenciales conocidas y solo es apropiado en local.

Las protecciones demostradas tienen límites deliberadamente explícitos: SHA-256 no autentica al autor si el manifiesto también puede sustituirse; la ofuscación es reversible; cualquier JavaScript entregado al navegador es observable; y AES-GCM solo protege campos seleccionados mientras la clave permanezca separada y disponible.

## Trabajo futuro

Se propone ampliar las pruebas de autorización e integración, agregar sesiones revocables, adjuntos con almacenamiento controlado, entregas versionadas y auditoría. Para una entrega con mayor garantía de procedencia, el manifiesto puede firmarse y la clave pública distribuirse por un canal independiente. Antes de ampliar alcance se actualizará el modelo de amenazas y la política de tratamiento de archivos.

> **Espacio de evidencia EV-11-01:** matriz final de requisitos, prueba y referencia al commit.

## Cierre ético

La utilidad académica no justifica sobrepasar controles técnicos o expectativas de privacidad. Toda repetición del estudio deberá usar cuentas autorizadas, datos sintéticos, intensidad manual y un criterio de detención explícito.
