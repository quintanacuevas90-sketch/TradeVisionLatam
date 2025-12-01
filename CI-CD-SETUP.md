# Configuración de CI/CD con Travis CI - TradeVisionLatam

## 📋 Descripción

Esta configuración automatiza pruebas y validación del código cada vez que haces push a GitHub. Travis CI ejecutará automáticamente:

1. **Validación de código (Lint)** - Busca errores de sintaxis y estilo
2. **Compilación (Build)** - Construye la aplicación para detectar errores
3. **Notificaciones** - Te notifica si algo falla

## 🚀 Configuración Inicial

### 1. Conectar Travis CI con GitHub

1. Ve a [travis-ci.com](https://travis-ci.com)
2. Haz clic en "Sign up with GitHub"
3. Autoriza Travis CI a acceder a tus repositorios
4. En el dashboard, busca `TradeVisionLatam`
5. Actívalo (toggle ON)

### 2. Archivos Configurados

Esta configuración incluye:

- **`.travis.yml`** - Configuración principal de Travis CI
- **`.eslintrc.json`** - Reglas de validación de código
- **`package.json`** - Scripts actualizados con `lint`

## 📝 Cómo Funciona

### Flujo Automático

```
Haces push a GitHub
         ↓
Travis CI detecta el cambio
         ↓
Clona tu repositorio
         ↓
Instala dependencias (npm ci)
         ↓
Ejecuta npm run lint (validación)
         ↓
Ejecuta npm run build (compilación)
         ↓
Envía notificación de éxito/fallo
```

## 🔧 Scripts Ejecutados

```bash
# 1. Validación de código
npm run lint
# Busca errores en archivos .ts y .tsx

# 2. Compilación
npm run build
# Compila la aplicación con Vite
```

## ⚙️ Configuración Detallada (.travis.yml)

### Versión de Node.js
```yaml
node_js:
  - "18"  # LTS recomendada
```

### Cache
Las dependencias se cachean para acelerar builds:
```yaml
cache:
  directories:
    - node_modules
```

### Branches Monitoreados
Solo estos branches ejecutan CI:
- `main`
- `master`
- `develop`

## 📧 Notificaciones

### Email (Configurado por defecto)
- **En éxito**: Solo notifica si hay cambio de estado
- **En fallo**: Siempre notifica

### Slack (Opcional)
Para integrar notificaciones con Slack:

1. En Travis CI, ve a `Settings` de tu repo
2. Agrega variable `SLACK_WEBHOOK_URL`
3. Descomenta la sección `slack:` en `.travis.yml`

## 🐛 Solución de Problemas

### "Build Failed"

**Problema**: El lint falla
**Solución**: 
```bash
# Ejecuta localmente para ver errores
npm run lint

# Soluciona los errores que se mostrarán
# Haz commit y push
```

**Problema**: Build falla
**Solución**:
```bash
# Prueba localmente
npm run build

# Revisa los errores de compilación
```

## 📊 Estados del Build

- **✅ Build Passing** - Todo funciona correctamente
- **❌ Build Failing** - Hay errores que revisar
- **⏳ Build Pending** - Travis CI está ejecutando

## 🎯 Próximos Pasos

### 1. Instalar ESLint localmente (Opcional pero recomendado)
```bash
npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react
```

### 2. Agregar más validaciones
En `.eslintrc.json` puedes agregar más reglas:
```json
{
  "rules": {
    "no-unused-vars": "error",
    "prefer-const": "warn"
  }
}
```

### 3. Deploy Automático (Próxima Fase)
Desde Travis CI puedes hacer deploy automático a:
- Vercel
- Netlify
- AWS
- Google Cloud

Ejemplo para Vercel:
```yaml
after_success:
  - npm run build
  - npx vercel --prod --token=$VERCEL_TOKEN
```

## 📚 Documentación Oficial

- [Travis CI Docs](https://docs.travis-ci.com)
- [ESLint Docs](https://eslint.org)
- [Vite Docs](https://vitejs.dev)

## ❓ Preguntas Frecuentes

**¿Con qué frecuencia se ejecuta?**
Cada vez que haces push o abres un Pull Request (dependiendo de tu configuración).

**¿Puedo ver los logs?**
Sí, en el dashboard de Travis CI verás los logs detallados de cada build.

**¿Puede fallar un lint pero continuar el build?**
Sí, en `.travis.yml` usamos `|| true` para continuar aunque falle.

**¿Cómo desactivo CI temporalmente?**
Añade `[skip ci]` en el mensaje del commit:
```bash
git commit -m "Fix: something [skip ci]"
```

---

**Última actualización**: Diciembre 2025
**Autor**: TradeVisionLatam
