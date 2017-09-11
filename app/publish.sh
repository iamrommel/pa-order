#! /bin/bash
version=$(npm version patch)
exp publish
git commit -a -m "Created tags and Deployed $version"
git tag "$version"
git push && git push --tags
