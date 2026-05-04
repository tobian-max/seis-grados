#!/bin/bash
# Script de deploy para 6 Grados — corre esto DESPUÉS de autenticarte con gh

set -e

GH=/tmp/gh
REPO_NAME="seis-grados"
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "=== 6 Grados Deploy Script ==="
echo ""

# 1. Verificar auth de GitHub
echo "→ Verificando GitHub..."
$GH auth status || { echo "ERROR: Corre primero: /tmp/gh auth login"; exit 1; }

# 2. Obtener username de GitHub
GH_USER=$($GH api user --jq '.login')
echo "→ Conectado como: $GH_USER"

# 3. Crear repo en GitHub (público)
echo "→ Creando repositorio en GitHub..."
$GH repo create "$REPO_NAME" --public --source="$PROJECT_DIR" --remote=origin --push \
  --description "6 Grados Business Solutions — Landing page" 2>&1 && echo "→ ¡Repositorio creado y código subido!" \
  || echo "→ El repositorio puede ya existir, intentando push..."

# Si ya existía, solo hacer push
git -C "$PROJECT_DIR" push -u origin main 2>/dev/null || true

REPO_URL="https://github.com/$GH_USER/$REPO_NAME"
echo ""
echo "✓ Código en GitHub: $REPO_URL"
echo ""

# 4. Deploy a Vercel
echo "→ Conectando con Vercel..."
cd "$PROJECT_DIR"
npx vercel --yes --prod 2>&1

echo ""
echo "=== ¡Deploy completado! ==="
echo "GitHub: $REPO_URL"
echo ""
