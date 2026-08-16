# 19. Estructura de diapositivas para la presentación final

**Formato:** 16 diapositivas, relación 16:9

**Duración estimada:** 10 minutos y 55 segundos; rango operativo de 8–12 minutos

**Audiencia:** profesor y compañeros de clase

**Fuente lista para PDF:** [30. Presentación final imprimible](30-presentacion-final-print.md)

**Guion presencial:** [12. Guion de presentación](12-guion-presentacion.md)

> **Trabajo de comunicación:** al finalizar, la audiencia debe comprender que EduRoom convierte observaciones éticas de caja negra en una implementación LMS independiente, funcional y respaldada por evidencia, sin afirmar acceso a la arquitectura interna de Google ni protección absoluta del frontend.

## 19.1 Política visual y de evidencia

- Usar identidad propia de EduRoom; no incorporar logos, iconos, textos, tipografías o assets propietarios de Google en la réplica.
- Mantener títulos de una línea, máximo tres o cuatro ideas visibles y texto legible a distancia.
- Alternar capturas, tablas simples y diagramas mínimos; las instrucciones operativas permanecen en las notas del presentador.
- Las capturas de Google Classroom, Render, GitHub, API o pruebas pueden mostrar nombres, avatares, URL, identificadores y códigos controlados cuando pertenecen a cuentas personales o controladas del alumno.
- Las capturas existentes se conservan sin modificación, censura o cambio de resolución. La resolución original de Classroom no invalida su valor funcional.
- No proyectar contraseñas, JWT completos, cookies, encabezados `Authorization`, claves, variables de entorno completas ni cadenas de conexión.
- No presentar como capturada una evidencia que el [inventario 27](27-evidencias-tecnicas-finales.md) marque pendiente.

## 19.2 Secuencia definitiva

| # | Título y función narrativa | Recurso principal real | Tiempo |
|---:|---|---|---:|
| 1 | **EduRoom** — presentar proyecto y verificabilidad | `02-dashboard-cursos--desktop-1280x720.png` | 0:25 |
| 2 | **La consigna exigía analizar, construir y demostrar** | Secuencia tipográfica de la consigna | 0:30 |
| 3 | **Tres objetivos conectan análisis y producto** | Síntesis de objetivos | 0:30 |
| 4 | **Classroom aportó patrones funcionales, no código** | `GC-02-dashboard-clase.png` | 0:35 |
| 5 | **La metodología mantuvo un límite ético verificable** | Dentro/fuera de alcance | 0:35 |
| 6 | **El análisis dinámico registró comportamiento observable** | `GC-DYN-05-performance-summary.png` | 0:45 |
| 7 | **El modelo reconstruido explica el ciclo educativo** | Modelo relacional propio | 0:40 |
| 8 | **EduRoom separa interfaz, reglas y persistencia** | Arquitectura de tres capas | 0:40 |
| 9 | **La demo recorre un flujo completo entre dos roles** | Trabajo, entrega y calificación de EduRoom | 1:15 |
| 10 | **Render validó el flujo con solicitudes controladas** | Resultado 26/26, 14/14 e integridad UI | 0:45 |
| 11 | **Cada control protege una propiedad diferente** | Tabla JWT/bcrypt/AES-GCM/SHA-256 | 0:50 |
| 12 | **El frontend puede observarse; la seguridad vive en el servidor** | Límites de ofuscación e integridad | 0:40 |
| 13 | **La correspondencia es funcional, no pixel a pixel** | Par de tablón Classroom/EduRoom | 0:50 |
| 14 | **La evidencia disponible es real, trazable y limitada** | 9 UI + 6 dinámicas + 54 EduRoom | 0:40 |
| 15 | **Los resultados muestran cumplimiento y límites abiertos** | 29 Cumple, 5 Parcial, 0 Falta | 0:40 |
| 16 | **Comprender cómo se observa ayuda a construir y proteger** | Síntesis y enlaces finales | 0:35 |

La fuente 30 contiene para cada diapositiva título, bullets, recurso a mostrar, guion oral, evidencia, ruta de imagen y tiempo. Los datos de preparación se almacenan como notas y no ocupan el área proyectada.

## 19.3 Evidencias seleccionadas

| Propósito | Ruta | Estado |
|---|---|---|
| Portada y arquitectura funcional | `evidence/ui/eduroom/02-dashboard-cursos--desktop-1280x720.png` | Disponible |
| Referencia de Classroom | `evidence/ui/google-classroom/GC-02-dashboard-clase.png` | Disponible, original autorizado |
| Performance manual | `evidence/dynamic/google-classroom/GC-DYN-05-performance-summary.png` | Disponible; métricas pendientes de transcripción validada |
| Flujo de profesor | `evidence/ui/eduroom/04-trabajo-clase--desktop-1280x720.png` | Disponible |
| Flujo de estudiante | `evidence/ui/eduroom/07-entrega--desktop-1280x720.png` | Disponible |
| Cierre por calificación | `evidence/ui/eduroom/08-calificacion-retroalimentacion--desktop-1280x720.png` | Disponible |
| Integridad de EduRoom | `evidence/ui/eduroom/09-integridad--desktop-1280x720.png` | Disponible |
| Par comparativo | `GC-04-tablon.png` + `03-curso-tablon--desktop-1280x720.png` | Disponible |
| Build ofuscado | `evidence/security/SEC-07-obfuscated-build-proof.txt` | Evidencia documental disponible |
| Capturas API/Render/GitHub/DB | Series definidas en documento 27 | Pendientes; no se simulan |

La diapositiva 14 debe incluir literalmente:

> Las capturas visibles pertenecen a cuentas personales/controladas del alumno y se incluyen con autorización para fines académicos.

## 19.4 Demo presencial

1. Mantener dos perfiles: profesor y estudiante.
2. Profesor: abrir curso, publicar o mostrar tarea.
3. Estudiante: incorporarse con código temporal y entregar contenido sintético.
4. Profesor: asignar nota y retroalimentación.
5. Mostrar `/api/health`, `/api/security/integrity` y el repositorio solo si están preparados y no exponen secretos.
6. Volver a la diapositiva 16 para cerrar; no terminar en una terminal.

La demostración en vivo no sustituye la evidencia preparada. Si falla, se recorre el mismo flujo con las tres capturas de la diapositiva 9.

## 19.5 Exportación a PDF

### Marp CLI

Desde la raíz del repositorio:

```bash
npx @marp-team/marp-cli docs/30-presentacion-final-print.md --pdf --allow-local-files -o evidence/final-pdf/eduroom-presentacion-final.pdf
```

### Visual Studio Code

1. Abrir `docs/30-presentacion-final-print.md` con **Marp for VS Code**.
2. Ejecutar **Marp: Export Slide Deck**.
3. Elegir PDF y guardar en `evidence/final-pdf/eduroom-presentacion-final.pdf`.
4. Verificar que el PDF tenga exactamente 16 páginas y que todas las imágenes locales se rendericen.

### Criterio de aceptación

- [ ] El PDF abre sin conexión.
- [ ] Tiene 16 páginas en formato 16:9.
- [ ] No hay recortes, texto ilegible ni imágenes deformadas.
- [ ] Las notas del presentador no aparecen en las diapositivas.
- [ ] No se observa ningún secreto reutilizable.
- [ ] La ruta y hash del PDF se registran en `docs/13-evidencias.md`.

La existencia del Markdown no acredita por sí sola la exportación. Hasta crear y revisar el PDF, la evidencia de presentación conserva el marcador **[PENDIENTE DE EXPORTACIÓN MANUAL]**.

## 19.6 Ensayo

- Ensayar una vez con el flujo vivo y otra usando solo capturas.
- Cronometrar entre 8 y 12 minutos; objetivo: 10:55.
- Practicar las respuestas de checksum, observabilidad del frontend y alcance ético.
- Aplicar el checklist y los planes B del [guion presencial](12-guion-presentacion.md).
