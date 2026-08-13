# 09. Cifrado, hashing y ofuscación

## Distinciones

| Técnica | Reversible | Uso apropiado en EduRoom |
|---|---|---|
| Cifrado | Sí, con clave | Transporte TLS y datos sensibles seleccionados |
| Hash criptográfico | No en diseño | Integridad y derivación de contraseñas |
| Codificación | Sí, sin secreto | Representación de datos; no protege |
| Ofuscación | Parcialmente | Dificultar lectura; no es control de seguridad |

## Contraseñas

Las contraseñas no se cifran ni almacenan en texto claro. El backend utiliza bcrypt con factor de coste 12 y compara mediante la biblioteca. Se limita la longitud aceptada para evitar usos patológicos. En una evolución se añadirán recuperación segura y comprobación frente a contraseñas comprometidas.

## JWT

El JWT está firmado, no cifrado: su contenido puede leerse. Por ello solo contiene identificador, correo, rol y caducidad, y nunca contraseñas. `JWT_SECRET` se obtiene del entorno. Para un sistema de mayor riesgo conviene usar tokens de acceso breves y renovación con cookie HttpOnly, rotación y revocación.

## Datos en tránsito y reposo

Render termina HTTPS para tráfico público. PostgreSQL gestiona persistencia y la plataforma debe controlar cifrado y copias de seguridad. Campos especialmente sensibles exigirían cifrado de aplicación y gestión separada de claves.

> **Espacio de evidencia EV-09-01:** configuración de variables sin revelar valores.

## Ofuscación del frontend

Vite minifica la construcción de producción. Esto mejora transferencia pero no protege secretos. Todo dato enviado al navegador se considera observable; las decisiones sensibles permanecen en el servidor.

