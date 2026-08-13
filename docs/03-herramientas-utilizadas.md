# 03. Herramientas utilizadas

## 3.1 Criterios de selección

Las herramientas se seleccionaron por reproducibilidad, pertinencia académica y posibilidad de operar dentro de un alcance autorizado. Se distinguen tres finalidades: observación de caja negra, desarrollo de EduRoom y validación de su despliegue. Ninguna herramienta autoriza por sí misma una acción; su configuración debe respetar el protocolo ético del proyecto.

## 3.2 Matriz de herramientas

| Herramienta | Descripción | Uso dentro del proyecto | Tipo de análisis | Evidencias esperadas |
|---|---|---|---|---|
| Navegador web | Cliente que representa interfaces HTML, CSS y JavaScript y gestiona navegación y sesión. | Recorrer manualmente flujos permitidos con una cuenta de prueba y validar la interfaz adaptable de EduRoom. | Dinámico, funcional y de usabilidad. | Capturas anonimizadas, fecha, versión, rol, acción y estado anterior/posterior. |
| DevTools | Instrumentos integrados para inspeccionar DOM, accesibilidad, consola, almacenamiento, rendimiento y red. | Relacionar una acción propia con cambios visibles y metadatos de sus solicitudes; depurar EduRoom. No se conservan cookies ni tokens. | Dinámico; inspección de interfaz, red propia y rendimiento. | Capturas censuradas de Network/Performance, códigos de estado, tiempos y bitácora de la acción. |
| Lighthouse | Auditor automatizado de rendimiento, accesibilidad, buenas prácticas y SEO. | Evaluar páginas públicas o propias y establecer una línea base para el frontend de EduRoom. No sustituye pruebas manuales. | Dinámico automatizado y calidad no funcional. | Informe HTML/JSON, versión, dispositivo simulado, URL evaluada y puntuaciones por categoría. |
| Wappalyzer o alternativa similar | Herramienta de identificación probabilística de tecnologías a partir de señales públicas del cliente y encabezados. | Registrar hipótesis tecnológicas de alto nivel y contrastar el stack declarado de EduRoom. Los resultados sobre terceros se etiquetan como inferencias, no como hechos internos. | OSINT y análisis estático/dinámico superficial. | Captura de detecciones, versión, fecha, señales observadas y nivel de confianza. |
| OWASP ZAP, modo pasivo | Proxy de análisis de seguridad que puede observar tráfico sin enviar ataques activos adicionales. | Revisar exclusivamente tráfico autorizado y auditar EduRoom en entorno local. Se deshabilita el escaneo activo contra servicios ajenos. | Dinámico pasivo y revisión de configuración HTTP. | Reporte de alertas pasivas, alcance configurado, URL propia, falsos positivos revisados y datos sanitizados. |
| Postman o Insomnia | Cliente para construir, enviar y documentar solicitudes HTTP controladas. | Probar endpoints de la API propia de EduRoom, variables de entorno y casos válidos o inválidos. No se usa para enumerar endpoints ajenos. | Dinámico, funcional y pruebas de contrato de API. | Colección exportada sin secretos, respuestas de prueba, aserciones y matriz método–ruta–resultado. |
| Docker | Plataforma de contenedores que empaqueta aplicaciones y dependencias de manera reproducible. | Ejecutar frontend, backend y PostgreSQL mediante Compose; construir imágenes equivalentes a despliegue. | Validación operativa, integración y reproducibilidad. | `docker compose config`, logs de salud, identificadores de imagen y capturas de contenedores sanos. |
| Git y GitHub | Git controla versiones localmente; GitHub puede alojar y colaborar sobre repositorios. | Mantener historial, ramas y trazabilidad; publicar solo en un repositorio autorizado y sin secretos. | Análisis de cambios, configuración y cadena de custodia. | Hash de commit, comparación de cambios, etiqueta de entrega y resultado de controles automatizados. |
| Node.js | Entorno de ejecución de JavaScript en servidor y base del ecosistema de construcción. | Ejecutar Express, scripts TypeScript y herramientas de compilación. | Desarrollo, análisis estático por TypeScript y ejecución dinámica. | Versiones de Node/npm, salida de compilación, pruebas y auditoría de dependencias. |
| React | Biblioteca declarativa para construir interfaces mediante componentes y estado. | Implementar acceso, panel de cursos, formularios y estados de interfaz originales de EduRoom. | Desarrollo y pruebas funcionales de presentación. | Capturas responsivas, árbol de componentes propio, resultados de compilación y pruebas UI. |
| Express | Framework web minimalista para Node.js. | Exponer rutas REST, aplicar middleware, validación, autenticación y manejo uniforme de errores. | Desarrollo y pruebas dinámicas de backend. | Inventario de rutas, respuestas HTTP, logs sanitizados y pruebas de autorización. |
| Prisma | ORM y conjunto de herramientas para definir esquemas, migraciones y acceso tipado a datos. | Modelar usuarios, cursos e inscripciones; generar el cliente y desplegar migraciones. | Análisis estático del modelo y validación dinámica de persistencia. | Esquema validado, historial de migraciones, diagrama entidad–relación y salida de `prisma validate`. |
| PostgreSQL | Sistema gestor de bases de datos relacional con restricciones, transacciones e índices. | Persistir las entidades de EduRoom y garantizar unicidad e integridad referencial. | Persistencia, integración y comprobación estructural. | Versión, migración aplicada, restricciones verificadas y consultas de prueba sin datos personales. |
| Render | Plataforma administrada para desplegar servicios web, sitios estáticos y PostgreSQL. | Desplegar el frontend, la API y la base definidos en `render.yaml`; administrar variables desde el entorno. | Validación de despliegue, disponibilidad y operación. | Blueprint validado, endpoint de salud, logs de despliegue sanitizados y URLs del prototipo. |

## 3.3 Configuración segura por etapa

### Observación autorizada

El navegador y DevTools se emplean manualmente. Lighthouse se limita a páginas públicas o bajo control del investigador. Wappalyzer aporta indicios y no prueba la arquitectura interna. Si se utiliza ZAP, se configura como proxy pasivo, con el objetivo claramente delimitado y sin *spider*, *fuzzer*, escaneo activo ni generación de carga adicional.

### Desarrollo y prueba de EduRoom

Postman o Insomnia pueden ejercer la API local de forma controlada. Node.js, React, Express, Prisma y PostgreSQL constituyen el stack. Docker encapsula servicios y Git registra cambios. En esta etapa sí pueden probarse errores y permisos porque el objetivo es el sistema propio.

### Despliegue

Render consume el blueprint del repositorio. Los secretos se configuran en la plataforma, nunca dentro de capturas o commits. Las evidencias deben ocultar cadenas de conexión, tokens, cookies, direcciones personales e identificadores que no sean necesarios.

## 3.4 Protocolo de evidencia

Para cada ejecución se registrarán:

1. Identificador de evidencia y objetivo.
2. Fecha, zona horaria, sistema operativo y versiones.
3. Cuenta o rol de prueba y precondiciones.
4. Herramienta, configuración y alcance exacto.
5. Acción realizada y resultado esperado/obtenido.
6. Transformaciones de anonimización.
7. Hash SHA-256 del archivo final de evidencia.

| Identificador sugerido | Evidencia |
|---|---|
| EV-03-01 | Tabla de versiones de herramientas |
| EV-03-02 | Informe Lighthouse del frontend propio |
| EV-03-03 | Reporte pasivo de ZAP con alcance visible |
| EV-03-04 | Colección de API de EduRoom sin secretos |
| EV-03-05 | Estado de Compose y endpoint de salud |
| EV-03-06 | Despliegue de Render y hash del commit |

## 3.5 Limitaciones metodológicas

Las extensiones de identificación tecnológica pueden producir falsos positivos. Lighthouse varía por equipo y condiciones de red. ZAP pasivo solo evalúa tráfico observado. Un cliente HTTP no reproduce todas las políticas del navegador. Por tanto, ningún resultado aislado se considera concluyente: se conserva contexto, se repite la prueba cuando procede y se separan hechos de inferencias.

