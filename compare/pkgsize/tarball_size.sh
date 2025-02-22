#!/bin/bash

# Check if a package name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <package-name>"
  exit 1
fi

PACKAGE=$1
TARBALL_URL=$(npm view "$PACKAGE" dist.tarball)

# Check if the package exists
if [ -z "$TARBALL_URL" ]; then
  echo "Error: Package '$PACKAGE' not found."
  exit 1
fi

# Download tarball silently
curl -s -o package.tgz "$TARBALL_URL"

# Get file size and convert to kB
SIZE_KB=$(stat -f%z package.tgz | awk '{printf "%.2f", $1/1024}')

echo "Tarball size of '$PACKAGE': $SIZE_KB kB"

# Clean up
rm package.tgz
