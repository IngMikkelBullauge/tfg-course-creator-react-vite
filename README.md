# The Friedman Group - Course Creator
<img src="https://friedmanu.lat/wp-content/themes/friedman/img/logo.png" alt="Logo TFG" />

Generador de micro cursos con motor ChatGPT 3.5  
Modelo de ChatGpt: text-davinci-003  

Permite generar un micro curso con 10 temas, cada tema contiene un resumen, cuestionario de 5 preguntas de opción múltiple (la opticón correcta es indicada) y una reflexión del tema.  

## Comenzando 🚀
Estructura del proyecto
```
./main.jsx
    ./providers/tokenPriceProvider.jsx
        ./CourseCreatorApp.jsx
            ./components/PromptInput.jsx
                ./components/MicroCourseInfo.jsx
                ./components/ThemesPreview.jsx
                ./components/ListCardThemes.jsx
                    ./components/ThemeCard.jsx
                        ./hooks/useProcessTheme.js
```

## Pre-requisitos 📋
* yarn
* API KEY de OpenAI

## Instalación 🔧
```
yarn
```

## Desarrollo ⌨️
1) `Creación del proyecto`
    ```
    yarn create vite
    ```
    * `Project name:` Dar el nombre al proyecto **tfg-ask-mike-react-app**
    * `Select a framework: ` Seleccionar el framework del proyecto **React**
    * `Select a variant: ` Seleccionar **JavaScript**
2) `Instalar módulos de node`
    ```
    yarn
    ```
3) `Instalación de Material UI`
    ```
    yarn add @mui/material @emotion/react @emotion/styled
    yarn add @mui/material @mui/styled-engine-sc styled-components
    ```
4) `Instalación de Roboto font`
    ```
    yarn add @fontsource/roboto
    ```
    `Importaciones`  
    import '@fontsource/roboto/300.css';  
    import '@fontsource/roboto/400.css';  
    import '@fontsource/roboto/500.css';  
    import '@fontsource/roboto/700.css';  

5) `Instalación de Google Web Fonts`  
    Editar **./index.html** y agregar en el `<head />`
    ```
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    ```
6) `Instalación de íconos`
    ```
    yarn add @mui/icons-material
    ```
    Editar **./index.html** y agregar en el `<head />`
    ```
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

    ```
7) `Instalación de librería de OpenAI`
    ```
    yarn add openai
    ```
8) `Instalación de Bootstrap`
    ```
    yarn add react-bootstrap bootstrap
    ```
8) `Instalación de FontAwesome`
    ```
    yarn add @fortawesome/react-fontawesome
    yarn add  @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
    ```

## Despliegue 📦

## Construido con 🛠️
* [React](https://es.react.dev/)
* [Vite](https://vitejs.dev/guide/)
* [PropTypes](https://github.com/facebook/prop-types)
* [Bootstrap React](https://react-bootstrap.netlify.app/)
* [FontAwesome](https://fontawesome.com/)
* [OpenAI](https://openai.com/)

## Autores ✒️
* **Ing. Miguel Portilla** - *Desarrollo* - [jportilla](email:jportilla@friedman.com.mx)
