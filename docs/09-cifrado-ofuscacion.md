# 09. Cifrado y ofuscación

## 9.1 Conceptos y diferencias

El **cifrado** transforma datos legibles en datos cifrados mediante un algoritmo y una clave. Su objetivo es la confidencialidad: solo quien posea la clave adecuada debe recuperar el contenido. Puede ser simétrico, cuando se comparte una clave, o asimétrico, cuando se emplea un par de claves.

La **ofuscación** transforma código o datos para dificultar su lectura y análisis sin ofrecer una garantía criptográfica equivalente. Puede renombrar símbolos, eliminar información descriptiva o modificar la estructura manteniendo el comportamiento. Un analista con acceso al programa y tiempo suficiente puede reconstruir gran parte de lo ofuscado.

| Aspecto | Cifrado | Ofuscación |
|---|---|---|
| Objetivo | Impedir lectura sin la clave | Elevar el esfuerzo de comprensión |
| Fundamento | Algoritmo criptográfico y gestión de claves | Transformaciones de representación |
| Reversibilidad | Prevista con la clave correcta | Posible mediante análisis |
| Uso principal | Datos en tránsito o reposo | Distribución de código cliente y reducción de exposición accidental |
| Sustituye autorización | No | No |

La codificación, minificación y hashing también son conceptos distintos. Base64 no protege confidencialidad; la minificación optimiza tamaño; un hash es normalmente unidireccional y se usa para integridad. Las contraseñas se derivan con bcrypt y no se cifran para recuperarlas.

## 9.2 Por qué el código web no se cifra directamente durante la ejecución

El navegador necesita recibir, interpretar y ejecutar HTML, CSS y JavaScript. Si el bundle estuviera cifrado de extremo a extremo, el cliente también tendría que recibir la clave y el procedimiento de descifrado. Un usuario con control de su navegador podría observar la clave, el código ya descifrado o su comportamiento en memoria.

HTTPS cifra el **canal de transporte** entre servidor y navegador, pero el navegador legítimo obtiene el contenido en claro para ejecutarlo. Por esta razón, cifrar el JavaScript distribuido no crea una frontera duradera de confidencialidad. Los secretos y decisiones críticas nunca deben depender de que el bundle permanezca oculto.

## 9.3 Protección posible en el backend

El backend permanece bajo control del operador y constituye la frontera principal. EduRoom puede proteger:

| Activo o función | Medida apropiada |
|---|---|
| Contraseñas | Hash adaptativo con bcrypt, sal y coste configurado |
| Secretos JWT y credenciales de base | Variables de entorno o gestor de secretos; nunca enviarlos al cliente |
| Datos en tránsito | HTTPS/TLS en el entorno desplegado |
| Datos sensibles en reposo | Cifrado de plataforma o de campo cuando el riesgo lo justifique |
| Acciones de usuario | Autenticación, autorización por rol y pertenencia al recurso |
| Entradas | Validación de esquema, límites de tamaño y consultas parametrizadas mediante Prisma |
| Abuso | Rate limiting, registros sanitizados, alertas y revocación/rotación cuando exista |
| Código del servidor | Repositorio privado autorizado, permisos mínimos y cadena de suministro revisada |

El cifrado solo es útil si las claves se administran de forma separada, se rotan y el proceso tiene acceso mínimo. Incluir una clave dentro del repositorio o imagen elimina gran parte del beneficio.

## 9.4 Qué puede ofuscarse en el frontend

En el frontend pueden minificarse archivos, acortarse identificadores internos, eliminarse comentarios, evitarse mapas de fuentes públicos y dividirse el bundle. Estas medidas reducen exposición casual y tamaño, pero no ocultan:

- solicitudes que el navegador debe enviar;
- datos recibidos por el usuario;
- rutas o identificadores necesarios para la aplicación;
- reglas de interfaz ejecutadas en el cliente;
- secretos incorporados por error en variables `VITE_*`.

La ofuscación intensiva también introduce costes: dificulta depuración y accesibilidad, puede empeorar rendimiento, complica auditorías y puede generar incompatibilidades. Debe aplicarse de manera proporcional y medible.

## 9.5 Estrategia educativa de protección del build

La estrategia de EduRoom busca demostrar capas realistas sin presentar la ofuscación como seguridad absoluta:

1. **Separación de responsabilidades.** Toda autorización y acceso a datos se decide en Express; React solo representa el resultado.
2. **Gestión de configuración.** El frontend recibe únicamente `VITE_API_URL`. Secretos, `DATABASE_URL` y `JWT_SECRET` permanecen en el backend.
3. **Build de producción.** Vite agrupa y minifica React mediante `npm --prefix frontend run build`.
4. **Build ofuscado opcional.** `npm --prefix frontend run build:obfuscated` procesa únicamente los archivos `.js` generados con `javascript-obfuscator`.
5. **Mapas de fuentes.** No se publican por defecto. Si se requieren para monitoreo, se almacenarán de forma privada y asociados al commit.
6. **Contenedores multietapa.** La imagen final del frontend contiene archivos estáticos y Nginx; la del backend omite dependencias de desarrollo.
7. **Integridad.** Se genera `integrity-manifest.json` después de la última transformación y se verifica mediante SHA-256.
8. **Configuración HTTP.** El backend usa encabezados defensivos mediante Helmet y limita cuerpos y solicitudes de autenticación.
9. **Comprobación.** Se inspecciona el bundle para confirmar que no contenga secretos, rutas locales, credenciales ni datos de prueba sensibles.

La configuración implementada usa transformaciones moderadas: compactación, nombres hexadecimales y codificación Base64 de parte del arreglo de cadenas. Evita a propósito inyección de código muerto, aplanamiento de flujo y autodefensa, porque añaden coste y fragilidad. Una semilla fija hace reproducible la demostración.

Esta transformación **no es cifrado real**. El navegador recibe código ejecutable y una persona puede estudiarlo o reconstruirlo. Su finalidad es comparar artefactos, enseñar costes de legibilidad y reducir exposición casual; nunca se aplica a código de terceros.

## 9.6 Procedimiento de verificación

1. Compilar backend y frontend desde un commit conocido.
2. Confirmar que los archivos `.env` están ignorados por Git.
3. Buscar en `frontend/dist` únicamente nombres de variables de prueba previamente definidos, nunca valores secretos reales.
4. Ejecutar la aplicación contra la API propia y confirmar que alterar el estado local del cliente no concede permisos en el servidor.
5. Revisar encabezados HTTP, tamaño del bundle y ausencia de mapas de fuentes públicos.
6. Generar el manifiesto SHA-256 y conservar la evidencia de compilación.
7. Ejecutar `npm run integrity:verify` y comprobar el estado resumido del dashboard.

> **Espacio de evidencia EV-09-01:** variables configuradas mostrando solo nombres y origen, sin valores.

> **Espacio de evidencia EV-09-02:** salida del build de producción, tamaño de artefactos y ausencia de mapas públicos.

> **Espacio de evidencia EV-09-03:** prueba sobre EduRoom donde una acción sin autorización sea rechazada por el backend.

> **Espacio de evidencia EV-09-04:** comparación reproducible de tamaños normal/ofuscado y verificación posterior del manifest.

## 9.7 Limitaciones reales

- Todo código y dato entregado al navegador debe considerarse observable.
- Minificar u ofuscar no corrige fallos de autenticación, autorización o validación.
- HTTPS protege el tránsito, no impide que el usuario vea contenido recibido legítimamente.
- El cifrado en reposo pierde eficacia si la clave se almacena junto con los datos o tiene permisos excesivos.
- Un JWT firmado no está cifrado; su contenido puede leerse y no debe incluir secretos.
- La protección del build no evita copias de la experiencia funcional ni sustituye licencias y medidas legales.
- Las dependencias y herramientas de ofuscación pueden introducir vulnerabilidades y requieren mantenimiento.

La meta razonable es reducir exposición accidental, preservar secretos del servidor y hacer cumplir permisos aunque se conozca el diseño. No existe una técnica que haga irreversible un cliente web distribuido.

## 9.8 Referencias base

- OWASP, *Cryptographic Storage Cheat Sheet*.
- OWASP, *Password Storage Cheat Sheet*.
- OWASP, *Secrets Management Cheat Sheet*.
- NIST SP 800-57 Part 1, recomendaciones para gestión de claves.
