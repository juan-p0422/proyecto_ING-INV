# 05. Reconstrucción de estructuras

## Del comportamiento al dominio

La reconstrucción se limita a un modelo conceptual suficiente para EduRoom. Las entidades se derivan de responsabilidades visibles y principios comunes de diseño de LMS; no pretenden reproducir esquemas internos del sistema observado.

| Entidad EduRoom | Responsabilidad | Relaciones | Origen |
|---|---|---|---|
| User | Identidad y rol global | Muchas inscripciones | Decisión propia |
| Course | Espacio académico | Muchas inscripciones | Función genérica observable |
| Enrollment | Membresía y rol local | Usuario + curso | Inferencia conceptual |

## Modelo actual

`Enrollment` resuelve la relación muchos-a-muchos entre usuarios y cursos. Una restricción única evita membresías duplicadas. El rol local permite que una persona sea docente en un curso y estudiante en otro, aunque la versión inicial también conserva un rol global para controlar la creación.

## Estados y reglas

| Regla | Implementación v0.1 |
|---|---|
| Correo único | Índice único en PostgreSQL |
| Código de curso único | Código aleatorio e índice único |
| Acceso a listado | JWT válido y filtro por usuario |
| Crear curso | Rol global docente/administrador |
| Unirse | Código existente y operación idempotente |

> **Espacio de evidencia EV-05-01:** diagrama ER exportado desde el esquema Prisma.

## Extensiones previstas

Las siguientes iteraciones podrían añadir publicaciones, actividades, entregas, comentarios y calificaciones. Cada agregado requiere estados explícitos, control de acceso por recurso, auditoría y reglas de eliminación. No se añaden en v0.1 para mantener un incremento pequeño y verificable.

