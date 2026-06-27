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

---

## 3. Reglas de Modificación
- Cualquier cambio a la arquitectura, los puertos, o la adición de nuevos agentes debe registrarse en este documento antes de proceder.
- **Ubicación en GitHub**: `jpelaezcardenas/hermes-workspace` (y ecosistema asociado `hermes` / `antigravity-app`).
