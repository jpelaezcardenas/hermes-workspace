# CONTEXIA OPERATIONAL TRUTH
> **Fuente de la Verdad Técnica y Operativa de Contexia**
> Documento optimizado para Open Specs Driven Development
> *Lectura obligatoria para Codex, Claude, Hermes, Antigravity y Humanos.*

---

## 1. Arquitectura Base (La Verdad Técnica)

Contexia es un entorno Multi-Agente (Codex, Claude, Hermes, Antigravity) que orquesta servicios locales a través de la herramienta oficial `hermes`.

### Componentes Activos:
1. **Frontend (Workspace UI)**:
   - Ruta: `C:\Users\contexia\hermes-workspace`
   - Servidor Node.js / React corriendo en: `http://localhost:3000`
2. **Backend (Hermes Agent / Gateway & Dashboard)**:
   - Entorno virtual (Python): `C:\Users\contexia\AppData\Local\hermes\profiles\contexia\hermes-agent\venv\`
   - **Gateway** (Inferencias, Chat, Sesiones): Puerto `8642`.
   - **Dashboard** (Configuración de modelos, perfiles, Memoria): Puerto `9119`.
3. **Modelo Activo**:
   - Provider: `glm`
   - Model: `glm-5.2`
4. **Variables de Entorno Críticas**:
   - `~/.hermes/.env`: Debe contener obligatoriamente `HERMES_DASHBOARD=1` para que el backend exponga la configuración al frontend.

### Rutinas de Encendido (Start Up Routine)
Para que el entorno funcione correctamente y el UI no lance errores:
1. Arrancar el Gateway:
   ```powershell
   & "C:\Users\contexia\AppData\Local\hermes\profiles\contexia\hermes-agent\venv\Scripts\hermes.exe" gateway run --profile contexia
   ```
2. Arrancar el Dashboard:
   ```powershell
   & "C:\Users\contexia\AppData\Local\hermes\profiles\contexia\hermes-agent\venv\Scripts\hermes.exe" dashboard --profile contexia
   ```

---

## 2. Canon de Diagnósticos (Resolución de Problemas Recurrentes)

Este registro contiene el consenso obtenido tras las evaluaciones conjuntas de *Manus*, *Claude* y *Antigravity*. **Usa estas soluciones antes de investigar desde cero.**

### Caso 1: Error "Not available on this backend" / HTTP 401 en la UI
- **Síntoma**: El Frontend carga en el navegador pero las sesiones no cargan (401 Unauthorized), la página de Settings muestra un cuadro de error gris ("Not available on this backend"), y no se detecta el modelo GLM 5.2.
- **La Verdad Operativa**: El Frontend asume que el backend está caído porque no detecta el endpoint de configuración. El Gateway (`:8642`) NO expone configuraciones, ese es trabajo del Dashboard (`:9119`).
- **Solución Rápida**: El proceso `hermes dashboard` no está corriendo. Debes iniciarlo (ver Rutinas de Encendido).

### Caso 2: El navegador automatizado falla con `could not resolve IP for 127.0.0.1`
- **Síntoma**: Al invocar el sub-agente de navegador (Browser Subagent) en Chrome, falla la conexión CDP (Chrome DevTools Protocol) en el puerto `9222`.
- **La Verdad Operativa**: Chrome tiene un bug/comportamiento donde procesos residuales o zombies se quedan escuchando en la interfaz IPv6 (`::1`) en el puerto 9222. El agente interno intenta conectar a IPv4 (`127.0.0.1`) y hay un conflicto (socket colisionado).
- **Solución Rápida**: Matar todos los procesos residuales de Chrome antes de que el IDE lance el suyo.
  ```powershell
  Get-Process -Name "chrome" -ErrorAction SilentlyContinue | Stop-Process -Force
  ```

### Caso 3: "Authentication error — check your API key in Settings" al enviar mensajes
- **Síntoma**: El Dashboard y los modelos (GLM 5.2) cargan bien, el Gateway y Dashboard están corriendo, pero al escribir en el chat sale un error de autenticación rojo. En CLI funciona perfecto.
- **La Verdad Operativa**: Este no es un error de tu API Key del LLM (Anthropic/GLM/etc.), sino un rechazo del propio **Gateway local (puerto 8642)** al UI del Workspace (`localhost:3000`). El Gateway exige un Bearer token para uso externo (incluso en localhost).
- **Solución Rápida**: Asegurarse de que el token coincida. En `hermes-workspace/.env`, revisar `HERMES_API_TOKEN`. Ese mismo valor **debe** estar definido como `API_SERVER_KEY=valor` en `C:\Users\contexia\AppData\Local\hermes\profiles\contexia\.env`. Tras sincronizarlos, reiniciar el gateway.

---

## 3. Reglas de Modificación
- Cualquier cambio a la arquitectura, los puertos, o la adición de nuevos agentes debe registrarse en este documento antes de proceder.
- **Ubicaciones en GitHub**:
  - `jpelaezcardenas/hermes-workspace`
  - `jpelaezcardenas/hermes`
  - `jpelaezcardenas/antigravity-app`
