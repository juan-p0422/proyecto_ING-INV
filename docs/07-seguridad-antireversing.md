# 07. Seguridad y resistencia frente a ingeniería inversa abusiva

## Enfoque

Un cliente web siempre entrega código al navegador; por tanto, ocultar por completo su funcionamiento no es un objetivo realista. La protección debe concentrarse en autorización del servidor, minimización de secretos, límites de uso, monitoreo y capacidad de actualización.

| Riesgo | Control presente | Mejora prevista |
|---|---|---|
| Fuerza bruta | Límite en rutas de autenticación | Bloqueo progresivo y alertas |
| Robo de contraseñas | bcrypt con coste 12 | Política y recuperación segura |
| Acceso horizontal | Consultas filtradas por identidad | Pruebas automáticas por recurso |
| Inyección | Prisma y validación Zod | Revisión continua |
| Exposición de token | Vida limitada; HTTPS en Render | Cookie HttpOnly y rotación |
| Abuso de carga | JSON limitado a 100 KB | Cuotas por usuario |

## Autorización

La autenticación responde quién es el usuario; la autorización decide qué puede hacer. Cada ruta protegida debe verificar identidad, rol y relación con el recurso. La interfaz puede ocultar botones, pero nunca sustituye el control del servidor.

## Antireversing legítimo

La minificación reduce tamaño, no constituye una frontera de seguridad. No deben incorporarse secretos al bundle mediante variables `VITE_*`. Los nombres internos pueden observarse; la seguridad se mantiene aunque el atacante conozca la arquitectura, siguiendo el principio de diseño abierto.

> **Espacio de evidencia EV-07-01:** salida anonimizada de pruebas de acceso sin token, con token inválido y con rol insuficiente.

## Respuesta

Registrar eventos de seguridad sin contraseñas ni tokens, rotar secretos ante exposición y revocar sesiones cuando exista un mecanismo de revocación. Para producción se recomienda gestor de secretos, copias de seguridad, alertas y análisis de dependencias.

## Referencias base

- OWASP Application Security Verification Standard (ASVS).
- OWASP Password Storage Cheat Sheet.
- OWASP JSON Web Token Cheat Sheet for Java.
