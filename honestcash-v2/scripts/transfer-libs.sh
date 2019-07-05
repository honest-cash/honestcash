#!/bin/bash
echo "Copying robots.txt from v1"
cp ../public/robots.txt ./src/robots.txt
echo "Copying sitemap.xml from v1"
cp ../public/sitemap.xml ./src/sitemap.xml
echo "Copying Google verification file from v1"
cp ../public/google88a6c30000120fdc.html ./src/google88a6c30000120fdc.html
echo "Copying Simple Bitcoin Wallet"
cp ./node_modules/simple-bitcoin-wallet/dist/simplewallet.min.js ./src/assets/libs/simple-bitcoin-wallet.min.js
echo "Removing 'editorjs' folder from assets/lib"
rm -rf ./src/assets/libs/editorjs
echo "Recreating editorjs folder on assets/lib"
mkdir -p ./src/assets/libs/editorjs
echo "Copying EditorJS Core"
cp ./node_modules/@editorjs/editorjs/dist/editor.js ./src/assets/libs/editorjs/editor.min.js
echo "Copying EditorJS Plugins"
cp ./node_modules/@editorjs/paragraph/dist/bundle.js ./src/assets/libs/editorjs/paragraph.min.js
cp ./node_modules/@editorjs/header/dist/bundle.js ./src/assets/libs/editorjs/header.min.js
cp ./node_modules/@editorjs/image/dist/bundle.js ./src/assets/libs/editorjs/image.min.js
cp ./node_modules/@editorjs/embed/dist/bundle.js ./src/assets/libs/editorjs/embed.min.js

