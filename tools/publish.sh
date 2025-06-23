#!/bin/bash
branch=$(git branch --show-current)

source "$(dirname "$0")/version.sh"

if [[ "$branch" == "main" || "$branch" == "master" ]]; then
    npm publish
else
    npm publish --tag $branch
fi

