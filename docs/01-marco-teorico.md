# 01. Marco teórico

## Ingeniería inversa de caja negra

La ingeniería inversa de caja negra estudia un sistema a partir de entradas, salidas y comportamiento observable, sin examinar su implementación interna. Para un LMS, las entradas pueden ser acciones como crear un curso o entregar una actividad; las salidas comprenden cambios de estado, mensajes de interfaz y respuestas de red de la sesión autorizada.

| Enfoque | Fuente de conocimiento | Aplicación en este proyecto |
|---|---|---|
| Caja negra | Comportamiento externo | Sí, dentro de una cuenta propia |
| Caja gris | Información parcial interna autorizada | Solo documentación pública |
| Caja blanca | Código y diseño interno | Fuera de alcance |

## Reconstrucción conceptual

Observar una función no demuestra cómo está implementada. Por ello se separan tres categorías: **observación**, hecho reproducible; **inferencia**, explicación compatible con la evidencia; y **decisión de diseño**, solución original elegida para EduRoom. Esta separación evita presentar conjeturas como propiedad del producto estudiado.

## Principios éticos

Se aplican minimización de datos, finalidad académica, autorización, proporcionalidad y divulgación responsable. Solo se usan cuentas y contenidos de prueba. Los identificadores, encabezados de autorización y datos personales se ocultan antes de incluir evidencia.

## Validez y limitaciones

El comportamiento puede variar por fecha, región, tipo de cuenta o experimento de interfaz. Una muestra pequeña no permite concluir detalles de la arquitectura interna. Los resultados describen la versión y condiciones observadas, no una especificación oficial.

> **Espacio de evidencia EV-01-01:** matriz firmada de alcance, autorización y tratamiento de datos.

## Preguntas de investigación

1. ¿Qué flujos mínimos necesita un entorno de clases para sostener la interacción docente-estudiante?
2. ¿Qué entidades pueden inferirse sin atribuir una implementación interna concreta?
3. ¿Cómo reconstruir esas capacidades con una arquitectura original, segura y desplegable?

## Referencias base

- NIST SP 800-115, *Technical Guide to Information Security Testing and Assessment*.
- OWASP, *Web Security Testing Guide*.
- IETF RFC 7519, *JSON Web Token (JWT)*.
