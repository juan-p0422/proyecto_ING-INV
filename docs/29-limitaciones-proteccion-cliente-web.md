# 29. Limitaciones de protección del cliente web

**Proyecto:** EduRoom  
**Fecha:** 16-08-2026  
**Criterio:** seguridad por controles verificables, no por ocultamiento del cliente

## 29.1 Veredicto

La observabilidad de HTML, CSS y JavaScript no constituye un incumplimiento: es una propiedad necesaria de una aplicación web ejecutada en el equipo del usuario. EduRoom **cumple con limitación técnica documentada** porque mantiene autenticación, autorización, validación, secretos y decisiones críticas en el servidor; además aplica ofuscación e integridad como medidas de dificultad y detección, no como promesas de invisibilidad.

La formulación correcta es: **el cliente continúa siendo observable; la ofuscación eleva el coste de lectura y el checksum detecta cambios en artefactos, pero ninguno impide por completo la ingeniería inversa**.

## 29.2 Por qué el frontend debe descargarse

El navegador necesita obtener los recursos que renderizan y controlan la interfaz:

- HTML para construir el documento y su estructura semántica;
- CSS para calcular presentación, layout y estilos;
- JavaScript para ejecutar React, navegación, estado e interacción;
- imágenes, fuentes y otros assets necesarios para la experiencia.

HTTPS protege esos bytes durante el transporte. Al llegar al navegador autorizado deben quedar disponibles para ser analizados, interpretados y ejecutados. Cifrar permanentemente el bundle no resuelve esta condición: el cliente necesitaría también la clave o recibiría el código descifrado en memoria.

## 29.3 Por qué JavaScript es observable

El navegador controla la ejecución del JavaScript recibido. Un usuario con control de su propio equipo puede:

- descargar el bundle desde Network o la cache;
- inspeccionar Sources, DOM, estilos calculados y eventos;
- colocar breakpoints y observar llamadas, variables y respuestas;
- formatear código minificado;
- instrumentar APIs del navegador;
- modificar estado local o construir solicitudes propias.

DevTools no revela automáticamente el código fuente del backend, claves secretas de Render ni la base de datos. Muestra lo que el servidor entregó al cliente y el comportamiento observable de la sesión. Por ello ningún secreto o permiso puede depender de que una función, ruta o nombre permanezca oculto en JavaScript.

## 29.4 Backend protegido frente a frontend ofuscado

| Propiedad | Backend | Frontend |
|---|---|---|
| Ubicación de ejecución | Infraestructura controlada por el operador | Navegador controlado por el usuario |
| Código necesario para el usuario | No se entrega | Debe descargarse |
| Secretos | Pueden mantenerse en variables del servidor | No deben incorporarse al bundle |
| Autorización | Debe decidirse y verificarse aquí | Solo puede reflejar estado y ocultar acciones por UX |
| Ofuscación | No es la frontera principal | Eleva dificultad de lectura casual |
| Integridad | Puede bloquear arranque o release | Detecta que el asset no coincide con el build aprobado |

Ocultar un botón en React no revoca una capacidad. El endpoint debe volver a autenticar al usuario, comprobar su rol y verificar su relación con el recurso. Si el navegador altera el estado visual, el servidor debe seguir respondiendo 401 o 403 cuando corresponda.

## 29.5 Alcance real de la ofuscación

EduRoom transforma el JavaScript compilado con opciones moderadas y reproducibles. La transformación cambia identificadores y representación de cadenas, lo que dificulta una lectura inmediata. Sin embargo:

- el bundle sigue siendo JavaScript válido;
- el navegador debe poder ejecutarlo;
- las cadenas necesarias pueden reconstruirse durante la ejecución;
- un analista puede formatear, depurar o instrumentar el código;
- Base64 no es cifrado;
- la ofuscación no corrige fallos de autorización, XSS o exposición de secretos.

Su valor académico consiste en demostrar una técnica antireversing proporcional y explicar sus costes, no en prometer imposibilidad de análisis.

## 29.6 Controles implementados en EduRoom

| Control | Implementación y propósito | Límite declarado |
|---|---|---|
| JWT | Firma sesiones y permite autenticar solicitudes API | El token no está cifrado; actualmente se almacena en `localStorage` y requiere mitigación de XSS/revocación |
| Roles | Profesor/estudiante y comprobaciones de acceso se aplican en rutas del servidor | La UI por sí sola no autoriza |
| bcrypt | Deriva hashes adaptativos para contraseñas con sal | No protege una contraseña ya comprometida o reutilizada |
| Validación | Zod, límites de cuerpo, reglas de dominio y Prisma validan entradas | Debe mantenerse en cada endpoint y actualizarse con el modelo |
| CORS | Limita orígenes admitidos y usa mismo origen en Render | No reemplaza autenticación ni evita clientes HTTP directos |
| Checksum SHA-256 | Compara artefactos compilados con el manifest | No autentica al autor y puede sustituirse junto con el manifest |
| AES-256-GCM | Cifra y autentica `SecureNote.encryptedPayload` | No cifra toda la base ni todo el producto; depende de proteger la clave |
| Ofuscación | Transforma el JavaScript compilado propio | Dificulta lectura, pero el cliente permanece observable |
| Integridad de arranque | Verifica scopes antes de abrir el puerto; el candidato admite modo estricto | No es monitoreo continuo ni firma digital |
| Endpoint de integridad | Publica `status`, fecha y contadores sin hashes o rutas | Es una señal informativa y no una atestación firmada |
| Separación frontend/backend | React representa la experiencia; Express y PostgreSQL aplican reglas y persistencia | Requiere evitar secretos `VITE_*` y validar siempre en servidor |
| Helmet y límites HTTP | Añaden cabeceras defensivas y límites de tamaño | Las políticas deben revisarse contra el deploy real |
| Rate limiting | La autenticación limita solicitudes por ventana | Debe ampliarse según riesgo y acompañarse de monitoreo |

## 29.7 Modelo de confianza

```text
Navegador no confiable
  ├─ puede observar y modificar HTML/CSS/JS local
  ├─ puede construir solicitudes propias
  └─ no recibe secretos ni autoridad implícita
                    │
                    ▼
Servidor confiable
  ├─ valida JWT y entrada
  ├─ comprueba rol, membresía y propiedad
  ├─ aplica cifrado y persistencia
  └─ devuelve solo datos autorizados
```

Este diseño asume explícitamente que el cliente puede ser inspeccionado o alterado. La seguridad depende de que el servidor rechace acciones no autorizadas incluso cuando la interfaz sea modificada.

## 29.8 Mejoras futuras

| Mejora | Beneficio | Precaución |
|---|---|---|
| Firma digital de artefactos | Autenticar manifest y procedencia del build | Proteger clave privada y distribuir la pública por canal confiable |
| CSP estricta | Reducir fuentes de scripts y mitigar parte del impacto de XSS | Probar compatibilidad; preferir nonces/hashes y evitar `unsafe-inline` |
| SRI para assets | Verificar bytes de recursos referenciados por HTML | Útil especialmente para recursos externos; requiere hashes actualizados e inmovilidad del asset |
| Attestations en CI/CD | Asociar fuente, workflow y artefactos de una release | La identidad del runner y permisos de publicación deben protegerse |
| Monitoreo de integridad | Detectar cambios posteriores al arranque | Evitar ciclos costosos y definir respuesta/rollback |
| Auditoría centralizada | Correlacionar autenticación, 401/403 y operaciones sensibles | No registrar JWT, contraseñas o contenido sensible |
| Rate limiting ampliado | Reducir abuso en rutas de alto riesgo | Ajustar por identidad, ruta y proxy sin bloquear uso legítimo |
| Logs de seguridad | Mejorar investigación y alerta | Sanitizar y limitar retención/acceso |
| Hardening de headers | Reforzar CSP, HSTS, `frame-ancestors`, MIME y referrer policy | Validar cabeceras efectivas, no solo configuración local |
| Sesiones reforzadas | Cookies `HttpOnly`, `Secure`, `SameSite`, expiración y revocación | Evaluar CSRF y flujos de despliegue |

## 29.9 Criterios de evaluación académica

La protección del cliente se considera cumplida cuando:

1. se reconoce que el frontend es observable;
2. no se presentan minificación u ofuscación como cifrado;
3. no existen secretos intencionales en el bundle;
4. autenticación, autorización y validación se aplican en servidor;
5. la integridad y la ofuscación tienen pruebas reproducibles;
6. las limitaciones y mejoras futuras están documentadas.

EduRoom satisface estos criterios. La falta de invisibilidad del cliente no se contabiliza como ausencia de control; contabilizarla así exigiría una propiedad incompatible con la ejecución web normal.

## 29.10 Conclusión

La superficie cliente de EduRoom puede inspeccionarse, como cualquier aplicación web. Esa observabilidad no elimina los controles reales del servidor. La arquitectura correcta no intenta confiar en el secreto del código distribuido: limita los datos entregados, mantiene secretos y decisiones en backend, valida cada operación y usa ofuscación e integridad como capas complementarias.

Por tanto, el resultado es **Cumple con limitación técnica documentada**. No se afirma protección absoluta, invisibilidad del frontend ni imposibilidad de ingeniería inversa.
