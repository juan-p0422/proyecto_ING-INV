# 06. Diseño de la réplica EduRoom

## Objetivos de arquitectura

EduRoom prioriza separación de responsabilidades, portabilidad y seguridad razonable para un prototipo académico. El navegador consume una API REST; Express valida las entradas y aplica autorización; Prisma traduce operaciones de dominio a PostgreSQL.

```text
React/Vite ──HTTPS/JSON──> Express ──Prisma──> PostgreSQL
     │                         │
 identidad original       JWT + validación
```

## Componentes

| Capa | Tecnología | Responsabilidad |
|---|---|---|
| Presentación | React + Vite + TypeScript | Acceso, cursos y formularios |
| Aplicación | Express + Zod | Rutas, validación y políticas |
| Persistencia | Prisma + PostgreSQL | Integridad y consultas |
| Operación | Docker + Render | Construcción y despliegue |

## API inicial

| Método y ruta | Autenticación | Resultado |
|---|---|---|
| `GET /api/health` | No | Estado del servicio |
| `POST /api/auth/register` | No | Usuario y token |
| `POST /api/auth/login` | No | Usuario y token |
| `GET /api/courses` | Sí | Cursos del usuario |
| `POST /api/courses` | Docente/admin | Curso nuevo |
| `POST /api/courses/join` | Sí | Membresía por código |

## Decisiones visuales

La interfaz evita imitar el producto estudiado. Usa tipografía editorial, tarjetas con franja cromática y una paleta propia. El diseño es adaptable y mantiene etiquetas asociadas a campos y mensajes con roles accesibles.

> **Espacio de evidencia EV-06-01:** captura del inicio de sesión de EduRoom.

> **Espacio de evidencia EV-06-02:** captura del panel en escritorio y dispositivo móvil.

