# 13. Checklist de evidencias

## 13.1 Reglas generales

Antes de incorporar una captura al reporte:

- utilizar solo cuentas y contenido sintéticos;
- ocultar correos, avatares, códigos activos, tokens, cookies, URL con identificadores y nombres de archivo personales;
- incluir fecha, zona horaria, herramienta, versión, precondición y resultado;
- distinguir observación, inferencia y evidencia de implementación propia;
- calcular SHA-256 de la captura anonimizada;
- conservar originales sensibles fuera del repositorio o eliminarlos según la política institucional.

## 13.2 Checklist principal

| Estado | ID | Captura requerida | Contenido mínimo | Sanitización necesaria |
|---|---|---|---|---|
| [ ] | EV-13-01 | Google Classroom observado | Vista inicial o lista de clases de prueba | Ocultar identidad, códigos y clases no sintéticas |
| [ ] | EV-13-02 | DevTools sin datos sensibles | Network con tipo, estado, tiempo y tamaño | Excluir URL completas, headers, bodies, cookies y tokens |
| [ ] | EV-13-03 | Modelo de datos | Diagrama de entidades de EduRoom | Confirmar que se presenta como reconstrucción conceptual |
| [ ] | EV-13-04 | Dashboard de EduRoom | Usuario demo, cursos y estado de integridad | Usar únicamente credenciales locales de demostración |
| [ ] | EV-13-05 | Curso | Tablón, anuncio y navegación interna | No mostrar códigos públicos reutilizables |
| [ ] | EV-13-06 | Tarea | Título, descripción, vencimiento y rol | Contenido completamente sintético |
| [ ] | EV-13-07 | Entrega | Estado y texto de entrega demo | Mostrar solo al estudiante correspondiente o profesor propietario |
| [ ] | EV-13-08 | Checksum correcto | Salida `Integridad verificada` y conteo | No es necesario mostrar hashes completos |
| [ ] | EV-13-09 | Checksum fallido | Archivo propio marcado como modificado | Usar cambio temporal y demostrar restauración |
| [ ] | EV-13-10 | Render funcionando | Aplicación pública y `/api/health` | Ocultar paneles, IDs, variables y cadenas de conexión |

## 13.3 Evidencias complementarias recomendadas

| Estado | ID | Captura | Propósito |
|---|---|---|---|
| [ ] | EV-13-11 | Login de profesor | Probar separación de roles |
| [ ] | EV-13-12 | Login de estudiante | Probar experiencia de estudiante |
| [ ] | EV-13-13 | Calificación y feedback | Mostrar autorización del profesor |
| [ ] | EV-13-14 | Payload de `SecureNote` | Confirmar estructura cifrada sin revelar clave o ciphertext completo |
| [ ] | EV-13-15 | Recuperación de nota segura | Confirmar descifrado para el propietario |
| [ ] | EV-13-16 | Build ofuscado | Comparar artefacto normal y ofuscado sin atribuir cifrado |
| [ ] | EV-13-17 | Docker Compose saludable | Mostrar frontend, backend y PostgreSQL |
| [ ] | EV-13-18 | Migraciones aplicadas | Probar reproducibilidad del esquema |

## 13.4 Ficha para cada evidencia

```markdown
### EV-13-XX — [Título]

| Campo | Valor |
|---|---|
| Fecha y hora | AAAA-MM-DD HH:MM, zona horaria |
| Responsable | Identificador académico |
| Entorno | Local / Render |
| Herramienta y versión | [Dato] |
| Rol | Profesor / estudiante / no autenticado |
| Precondición | [Estado inicial] |
| Acción | [Acción manual] |
| Resultado | [Resultado visible] |
| Clasificación | Observación / inferencia / implementación EduRoom |
| Datos censurados | [Lista de categorías] |
| Archivo | EV-13-XX-descripcion.png |
| SHA-256 | [Hash] |
| Limitaciones | [Condiciones que afectan interpretación] |
```

## 13.5 Control final antes de entregar

- [ ] Todas las evidencias tienen identificador único.
- [ ] Ninguna captura contiene credenciales, tokens o cookies.
- [ ] Las capturas de Google Classroom usan datos autorizados y sintéticos.
- [ ] Las inferencias están etiquetadas y no se presentan como arquitectura interna confirmada.
- [ ] El cambio usado para checksum fallido fue restaurado.
- [ ] `npm run integrity:verify` vuelve a terminar correctamente.
- [ ] `docs/checksums.sha256` corresponde a la versión final.
- [ ] El commit o etiqueta de entrega quedó registrado.
