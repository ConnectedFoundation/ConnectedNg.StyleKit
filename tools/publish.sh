#!/bin/bash
branch=$(git branch --show-current)

source "$(dirname "$0")/version.sh"

if [[ "$branch" == "main" || "$branch" == "master" ]]; then
    npm publish --access=public
else
    npm publish --tag $branch --access=public
fi

