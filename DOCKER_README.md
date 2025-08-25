# 🐳 Marketing Platform - Docker Setup

## 📋 Requisitos Previos

- Docker Desktop instalado
- Docker Compose v2.0+
- 4GB RAM mínimo disponible para Docker

## 🚀 Inicio Rápido

### Desarrollo con Docker

```bash
# 1. Copiar variables de entorno
cp .env.docker .env

# 2. Iniciar ambiente de desarrollo
./docker-scripts.sh dev-build

# La aplicación estará disponible en:
# - App: http://localhost:3000
# - Adminer (DB): http://localhost:8080
```

## 📦 Servicios Disponibles

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| app-dev | 3000 | Aplicación Next.js (desarrollo) |
| app-prod | 3001 | Aplicación Next.js (producción) |
| postgres | 5432 | Base de datos PostgreSQL |
| adminer | 8080 | Interfaz web para PostgreSQL |

## 🛠️ Comandos Docker

### Usando docker-scripts.sh

```bash
# Desarrollo
./docker-scripts.sh dev          # Iniciar desarrollo
./docker-scripts.sh dev-build    # Construir e iniciar

# Producción
./docker-scripts.sh prod         # Iniciar producción
./docker-scripts.sh prod-build   # Construir e iniciar

# Base de datos
./docker-scripts.sh db           # Solo base de datos
./docker-scripts.sh migrate      # Ejecutar migraciones
./docker-scripts.sh studio       # Prisma Studio

# Utilidades
./docker-scripts.sh logs         # Ver logs
./docker-scripts.sh shell        # Abrir terminal
./docker-scripts.sh stop         # Detener servicios
./docker-scripts.sh clean        # Limpiar todo
```

### Comandos Docker Compose Directos

```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f app-dev

# Ejecutar comandos en contenedor
docker-compose exec app-dev npm run build

# Detener servicios
docker-compose down

# Limpiar todo (incluyendo volúmenes)
docker-compose down -v
```

## 🔧 Configuración

### Variables de Entorno

El archivo `.env.docker` contiene las variables necesarias:

- **DATABASE_URL**: Conexión a PostgreSQL local
- **SUPABASE_***: Credenciales de Supabase
- **STRIPE_***: Keys de Stripe (test mode)
- **SENDGRID_API_KEY**: Pendiente de configuración

### Modos de Ejecución

#### Desarrollo (app-dev)
- Hot reload habilitado
- Volúmenes montados para edición en vivo
- Puerto 3000
- Base de datos local

#### Producción (app-prod)  
- Build optimizado
- Sin hot reload
- Puerto 3001
- Requiere `--profile production`

## 🗄️ Base de Datos

### Acceder a PostgreSQL

**Opción 1: Adminer (Web UI)**
```
URL: http://localhost:8080
Sistema: PostgreSQL
Servidor: postgres
Usuario: postgres
Contraseña: localpassword123
Base de datos: marketing_platform
```

**Opción 2: CLI**
```bash
docker-compose exec postgres psql -U postgres -d marketing_platform
```

### Migraciones Prisma

```bash
# Crear nueva migración
./docker-scripts.sh migrate

# Aplicar migraciones pendientes
docker-compose exec app-dev npx prisma migrate deploy

# Reset de base de datos
docker-compose exec app-dev npx prisma migrate reset
```

## 🐛 Troubleshooting

### Error: Puerto en uso
```bash
# Verificar qué usa el puerto
lsof -i :3000
# O cambiar puerto en docker-compose.yml
```

### Error: Permisos en Windows/WSL
```bash
# Dar permisos de ejecución
chmod +x docker-scripts.sh
```

### Error: Contenedor no inicia
```bash
# Ver logs detallados
docker-compose logs app-dev

# Reconstruir imagen
docker-compose build --no-cache app-dev
```

### Error: Base de datos no conecta
```bash
# Verificar que postgres esté running
docker-compose ps

# Recrear volumen de datos
docker-compose down -v
docker-compose up -d postgres
```

## 🔄 Workflow de Desarrollo

1. **Iniciar ambiente**
   ```bash
   ./docker-scripts.sh dev
   ```

2. **Hacer cambios en código**
   - Los cambios se reflejan automáticamente (hot reload)

3. **Ejecutar migraciones si es necesario**
   ```bash
   ./docker-scripts.sh migrate
   ```

4. **Ver logs para debugging**
   ```bash
   ./docker-scripts.sh logs
   ```

5. **Detener al terminar**
   ```bash
   ./docker-scripts.sh stop
   ```

## 📊 Monitoreo

### Ver estado de contenedores
```bash
docker ps
docker stats
```

### Ver uso de recursos
```bash
docker system df
```

### Limpiar recursos no usados
```bash
docker system prune -a
```

## 🚢 Deploy a Producción

Para deploy real, usa las imágenes de Docker Hub o tu registry:

```bash
# Construir imagen de producción
docker build -t marketing-platform:latest .

# Subir a registry
docker tag marketing-platform:latest tu-registry/marketing-platform:latest
docker push tu-registry/marketing-platform:latest
```

## 📝 Notas Importantes

- La base de datos local es solo para desarrollo
- En producción usa Supabase o tu base de datos real
- Los volúmenes persisten datos entre reinicios
- Usa `./docker-scripts.sh clean` para reset completo