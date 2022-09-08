1. Build `ansis` package from source into `dist/` directory.

    Run from project directory:
    ```
    npm run build
    ```

2. Install `ansis` as local `dist/` directory:

    ```
    cd ./test/package/
    npm i
    ```

3. Test in CommonJS mode:
    ```
    cd ./cjs
    node ./index.js
    ```

4. Test in ESM mode:
    ```
    cd ./esm
    node ./index.js
    ```