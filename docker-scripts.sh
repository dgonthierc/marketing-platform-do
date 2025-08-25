#!/bin/bash

# Marketing Platform Docker Scripts
# Uso: ./docker-scripts.sh [comando]

set -e

COMPOSE_FILE="docker-compose.yml"
PROJECT_NAME="marketing-platform"

case "$1" in
  "dev")
    echo "🚀 Iniciando ambiente de desarrollo..."
    docker-compose -f $COMPOSE_FILE up app-dev adminer
    ;;
    
  "dev-build")
    echo "🔨 Construyendo imagen de desarrollo..."
    docker-compose -f $COMPOSE_FILE build app-dev
    echo "🚀 Iniciando servicios..."
    docker-compose -f $COMPOSE_FILE up app-dev adminer
    ;;
    
  "prod")
    echo "🏭 Iniciando ambiente de producción..."
    docker-compose -f $COMPOSE_FILE --profile production up app-prod
    ;;
    
  "prod-build")
    echo "🔨 Construyendo imagen de producción..."
    docker-compose -f $COMPOSE_FILE build app-prod
    echo "🏭 Iniciando servicios de producción..."
    docker-compose -f $COMPOSE_FILE --profile production up app-prod
    ;;
    
  "db")
    echo "💾 Iniciando solo la base de datos..."
    docker-compose -f $COMPOSE_FILE up postgres adminer
    ;;
    
  "migrate")
    echo "📝 Ejecutando migraciones de Prisma..."
    docker-compose -f $COMPOSE_FILE run --rm app-dev npx prisma migrate dev
    ;;
    
  "seed")
    echo "🌱 Ejecutando seed de base de datos..."
    docker-compose -f $COMPOSE_FILE run --rm app-dev npx prisma db seed
    ;;
    
  "studio")
    echo "🎨 Abriendo Prisma Studio..."
    docker-compose -f $COMPOSE_FILE run --rm -p 5555:5555 app-dev npx prisma studio
    ;;
    
  "logs")
    echo "📋 Mostrando logs..."
    docker-compose -f $COMPOSE_FILE logs -f ${2:-app-dev}
    ;;
    
  "stop")
    echo "⏹️ Deteniendo servicios..."
    docker-compose -f $COMPOSE_FILE down
    ;;
    
  "clean")
    echo "🧹 Limpiando todo (incluyendo volúmenes)..."
    docker-compose -f $COMPOSE_FILE down -v
    ;;
    
  "reset")
    echo "🔄 Reseteando todo..."
    docker-compose -f $COMPOSE_FILE down -v
    docker-compose -f $COMPOSE_FILE build --no-cache app-dev
    docker-compose -f $COMPOSE_FILE up app-dev adminer
    ;;
    
  "shell")
    echo "💻 Abriendo shell en contenedor..."
    docker-compose -f $COMPOSE_FILE exec ${2:-app-dev} sh
    ;;
    
  "status")
    echo "📊 Estado de los servicios:"
    docker-compose -f $COMPOSE_FILE ps
    ;;
    
  *)
    echo "📚 Marketing Platform - Docker Scripts"
    echo ""
    echo "Comandos disponibles:"
    echo "  dev          - Iniciar ambiente de desarrollo"
    echo "  dev-build    - Construir y iniciar desarrollo"
    echo "  prod         - Iniciar ambiente de producción"
    echo "  prod-build   - Construir y iniciar producción"
    echo "  db           - Iniciar solo base de datos y Adminer"
    echo "  migrate      - Ejecutar migraciones de Prisma"
    echo "  seed         - Ejecutar seed de base de datos"
    echo "  studio       - Abrir Prisma Studio"
    echo "  logs [servicio] - Ver logs (default: app-dev)"
    echo "  stop         - Detener todos los servicios"
    echo "  clean        - Limpiar todo incluyendo volúmenes"
    echo "  reset        - Reset completo y reinicio"
    echo "  shell [servicio] - Abrir shell en contenedor"
    echo "  status       - Ver estado de servicios"
    echo ""
    echo "Ejemplos:"
    echo "  ./docker-scripts.sh dev"
    echo "  ./docker-scripts.sh logs postgres"
    echo "  ./docker-scripts.sh shell app-dev"
    ;;
esac