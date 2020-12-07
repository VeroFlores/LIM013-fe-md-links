# Markdown Links
## ¿Qué es Md-Links?:triangular_flag_on_post:

Md-Links es una librería que lee y analiza archivos en formato `Markdown`, para verificar y brindar estadísticas de los links válidos y rotos.

![flowchart](https://user-images.githubusercontent.com/68167686/101280702-9936e380-3798-11eb-89c4-7712c76eec2b.png)
## ¿Cómo Usarlo?
### Instalación:hammer:
`npm install VeroFlores/LIM013-fe-md-links`
`npm install https://github.com/VeroFlores/LIM013-fe-md-links`

### Uso:arrow_forward:
`const mdlink=require('vf-mdlinks');`
### CLI (Command Line Interface - Interfaz de Línea de Comando)

`md-links <path-to-file> [options]`

Por ejemplo:

![cli](https://user-images.githubusercontent.com/68167686/101281125-63472e80-379b-11eb-893b-a9e29e40168e.png)

El _output_ te indica el link , texto y el file. 

#### Options

##### `--validate`

![validate](https://user-images.githubusercontent.com/68167686/101281170-a6090680-379b-11eb-80ca-56cf575d16cb.png)

El _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

![stats](https://user-images.githubusercontent.com/68167686/101281221-e10b3a00-379b-11eb-8258-717076c234f9.png)

El _output_ es un texto con estadísticas básicas sobre los links.
##### `--stats --validate || --validate --stats`
![statsValidate](https://user-images.githubusercontent.com/68167686/101281415-b7064780-379c-11eb-9c73-c9f4de8b470e.png)

El _output_ es un texto con estadísticas básicas sobre los links.
### API `mdLinks(path, opts)`
```js
const mdLinks = require("vf-mdlinks");

mdLinks("./test/exampleTest")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(error=>{
  });

mdLinks("./test/exampleTest", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, message }]
  })
  .catch(error=>{
  });

mdLinks("./test/exampleTe")
  .then(links => {
  })
  .catch(error=>{
    // =>[Error:Enter new path]
  });
```
## Objetivos de aprendizaje
### JavaScript

* [x] Uso de condicionales (if-else | switch | operador ternario)
* [x] Uso de funciones (parámetros | argumentos | valor de retorno)
* [x] Manipular arrays (filter | map | sort | reduce)
* [x] Manipular objects (key | value)
* [x] Uso ES modules ([`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
| [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export))
* [x] Diferenciar entre expression y statements.
* [x] Diferenciar entre tipos de datos atómicos y estructurados.
* [x] [Uso de callbacks.](https://developer.mozilla.org/es/docs/Glossary/Callback_function)
* [x] [Consumo de Promesas.](https://scotch.io/tutorials/javascript-promises-for-dummies#toc-consuming-promises)
* [x] [Creación de Promesas.](https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/)

### Node

* [x] Uso de sistema de archivos. ([fs](https://nodejs.org/api/fs.html), [path](https://nodejs.org/api/path.html))
* [x] Instalar y usar módulos. ([npm](https://www.npmjs.com/))
* [x] Creación de modules. [(CommonJS)](https://nodejs.org/docs/latest-v0.10.x/api/modules.html)
* [x] [Configuración de package.json.](https://docs.npmjs.com/files/package.json)
* [x] [Configuración de npm-scripts](https://docs.npmjs.com/misc/scripts)
* [x] Uso de CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing

* [x] [Testeo unitario.](https://jestjs.io/docs/es-ES/getting-started)
* [x] [Testeo asíncrono.](https://jestjs.io/docs/es-ES/asynchronous)
* [ ] [Uso de librerias de Mock.](https://jestjs.io/docs/es-ES/manual-mocks)
* [x] Uso de Mocks manuales.
* [ ] Testeo para múltiples Sistemas Operativos.

### Estructura del código y guía de estilo

* [x] Organizar y dividir el código en módulos (Modularización)
* [x] Uso de identificadores descriptivos (Nomenclatura | Semántica)
* [x] Uso de linter (ESLINT)

### Git y GitHub

* [x] Uso de comandos de git (add | commit | pull | status | push)
* [x] Manejo de repositorios de GitHub (clone | fork | gh-pages)
* [x] Colaboración en Github (branches | pull requests | |tags)
* [x] Organización en Github (projects | issues | labels | milestones)

### HTTP

* [x] Verbos HTTP ([http.get](https://nodejs.org/api/http.html#http_http_get_options_callback))

### Fundamentos de programación

* [x] [Recursión.](https://www.youtube.com/watch?v=lPPgY3HLlhQ)

***
