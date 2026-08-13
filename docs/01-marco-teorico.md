# 01. Marco teórico

## 1.1 Propósito y alcance

Este capítulo establece los conceptos utilizados para estudiar, mediante técnicas de caja negra, funciones generales observables en una plataforma de gestión del aprendizaje y para diseñar una réplica original denominada EduRoom. El estudio se limita a interfaces visibles, documentación pública y tráfico generado legítimamente por una cuenta personal de prueba. No supone acceso al código fuente ni demuestra cómo está implementado internamente Google Classroom.

## 1.2 Ingeniería inversa

La **ingeniería inversa** es el proceso sistemático de examinar un producto o sistema existente para comprender sus componentes, relaciones, decisiones de diseño o comportamiento. En software puede emplearse para interoperabilidad, mantenimiento, aprendizaje, migración, auditoría autorizada o recuperación de conocimiento.

El conocimiento obtenido depende del nivel de acceso:

| Enfoque | Información disponible | Aplicación en este proyecto |
|---|---|---|
| Caja blanca | Código fuente, configuración y diseño interno | No aplicable al producto observado |
| Caja gris | Información interna parcial y autorizada | Solo cuando procede de documentación pública |
| Caja negra | Entradas, salidas, interfaz y conducta externa | Método principal, usando una cuenta propia |

Una observación externa no permite asegurar qué lenguaje, tabla, algoritmo o servicio interno produjo el resultado. Por ello el reporte distingue entre **observación comprobable**, **inferencia razonada** y **decisión original de EduRoom**.

## 1.3 Análisis estático y análisis dinámico

El **análisis estático** examina un artefacto sin ejecutarlo. Puede aplicarse a documentación pública, archivos propios, encabezados visibles, manifiestos de dependencias o al código fuente de EduRoom. En una aplicación no abierta, este proyecto no extrae, descompila ni desensambla binarios o código propietario.

El **análisis dinámico** observa el sistema mientras se ejecuta. Incluye recorrer flujos manuales, medir tiempos, registrar cambios de estado y revisar en DevTools las solicitudes originadas por la sesión propia.

| Criterio | Análisis estático | Análisis dinámico |
|---|---|---|
| Ejecución del objeto | No requerida | Requerida |
| Evidencia típica | Documentación, metadatos y configuración autorizada | Pantallas, estados, tiempos y tráfico propio |
| Ventaja | Facilita inventario y revisión reproducible | Revela comportamiento real ante una acción |
| Limitación | No confirma conducta en ejecución | No revela necesariamente la implementación interna |
| Uso en EduRoom | Revisión de arquitectura y dependencias propias | Validación de acceso, cursos y permisos |

Ambos enfoques son complementarios: el análisis estático formula hipótesis y el dinámico permite contrastarlas dentro del alcance autorizado.

## 1.4 OSINT aplicado al software

**OSINT** (*Open Source Intelligence*) es la obtención y análisis de información accesible públicamente de manera legal. Aplicado al software puede incluir documentación oficial, notas de versión, páginas de ayuda, estándares, publicaciones técnicas, políticas de privacidad, condiciones de servicio y metadatos entregados públicamente al navegador.

OSINT no equivale a que toda información técnicamente accesible pueda recopilarse o reutilizarse sin límites. Deben evaluarse procedencia, licencia, finalidad, vigencia y datos personales. En este trabajo sirve para contextualizar capacidades documentadas y terminología general; no se usa para recolectar datos de usuarios, localizar credenciales ni eludir controles.

## 1.5 Reconstrucción de estructuras de datos

La **reconstrucción de estructuras de datos** consiste en proponer un modelo conceptual capaz de explicar estados y relaciones observables. Por ejemplo, que un usuario pueda pertenecer a varios cursos sugiere, para el diseño de EduRoom, entidades como `User`, `Course` y una asociación `Enrollment`.

El procedimiento académico es:

1. Identificar sustantivos, acciones y estados visibles en los flujos autorizados.
2. Registrar invariantes, como unicidad, pertenencia o restricciones por rol.
3. Formular una hipótesis de entidades y relaciones.
4. Contrastar la hipótesis con más de un caso de uso.
5. Implementar un modelo propio, sin afirmar que reproduce el esquema interno observado.

La estructura resultante es una solución original para los requisitos de EduRoom. Su coincidencia con patrones comunes de un LMS no prueba equivalencia con estructuras propietarias.

## 1.6 Técnicas antireversing

Las técnicas **antireversing** buscan aumentar el esfuerzo necesario para comprender, modificar o abusar de un sistema. Entre ellas se encuentran minificación y ofuscación, separación de secretos, comprobaciones de integridad, limitación de solicitudes, detección de alteraciones y controles de autorización en servidor.

En aplicaciones web, el código enviado al navegador es observable; por ello estas técnicas no sustituyen la seguridad. EduRoom aplica el principio de diseño abierto: incluso conociendo su arquitectura, un usuario no autorizado no debería superar los controles del backend. La protección prioritaria se ubica en autenticación, autorización, validación, gestión de secretos y monitoreo.

## 1.7 Checksums y hashes

Un **checksum** es un valor calculado a partir de datos para detectar cambios accidentales o intencionales. Si un archivo cambia, el valor calculado normalmente también cambia. Los checksums simples se orientan a detectar errores; los hashes criptográficos, como SHA-256, añaden propiedades de resistencia a colisiones y preimagen.

EduRoom genera un manifiesto SHA-256 de los archivos entregables. Este mecanismo permite comprobar integridad, pero no acredita por sí solo la identidad del autor: para autenticidad se requiere publicar el valor por un canal confiable o usar una firma digital.

## 1.8 Cifrado y ofuscación

El **cifrado** transforma datos legibles en datos ininteligibles mediante un algoritmo y una clave; es reversible para quien posea la clave correcta. Se emplea para proteger confidencialidad en tránsito o en reposo. La **ofuscación** transforma una representación para dificultar su comprensión, pero no depende de una frontera criptográfica sólida y, en general, puede revertirse con suficiente tiempo.

| Propiedad | Cifrado | Ofuscación |
|---|---|---|
| Objetivo | Confidencialidad | Aumentar dificultad de lectura |
| Requiere clave | Sí | No necesariamente |
| Recuperación legítima | Mediante descifrado | Mediante interpretación o herramientas |
| Control de seguridad | Sí, con diseño y claves adecuados | Complementario, nunca suficiente |

Las contraseñas constituyen un caso diferente: se almacenan mediante una función de derivación no reversible, como bcrypt, y no mediante cifrado recuperable.

## 1.9 Consideraciones éticas y legales

El análisis de una aplicación no *open source* exige atender propiedad intelectual, privacidad, protección de datos, condiciones contractuales y legislación aplicable. Que una función sea visible no concede autorización para copiar código, recursos creativos, marcas, bases de datos o información personal.

Los principios adoptados son:

- **Autorización:** utilizar exclusivamente cuentas, dispositivos y datos bajo control del investigador.
- **Finalidad y proporcionalidad:** realizar solo acciones necesarias para el objetivo académico.
- **Minimización:** capturar la menor cantidad de datos posible y anonimizar evidencias.
- **No interferencia:** evitar automatización agresiva, pruebas de carga, explotación o alteración de solicitudes contra servicios ajenos.
- **Originalidad:** reconstruir requisitos generales con código, identidad visual y decisiones propias.
- **Trazabilidad:** registrar fecha, entorno, alcance, fuente y nivel de certeza.
- **Detención responsable:** interrumpir la observación si aparece información no autorizada o resulta necesario evadir un control.

La legalidad puede variar según jurisdicción, contrato y finalidad. Este documento no constituye asesoría jurídica; ante dudas se debe consultar a la institución responsable o a un profesional competente antes de ampliar el alcance.

> **Espacio de evidencia EV-01-01:** matriz de alcance, autorización, fuentes permitidas y tratamiento de datos.

> **Espacio de evidencia EV-01-02:** tabla que clasifique hallazgos como observación, inferencia o decisión de diseño.

## 1.10 Referencias base

- NIST SP 800-115, *Technical Guide to Information Security Testing and Assessment*.
- OWASP, *Web Security Testing Guide*.
- ISO/IEC 27001, sistemas de gestión de seguridad de la información.
- IETF RFC 6234, algoritmos SHA y HMAC-SHA.
- IETF RFC 7519, *JSON Web Token (JWT)*.
