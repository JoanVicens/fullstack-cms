# Sistema gestor de contenidos para la asociación cultural banda UJI


## Joan Vicen Vallés Cervera


# Índice

* [Resumen](#resumen)

* [Abstract](#abstract)

* [Introducción](#introducción)

* [Objetivos](#objetivos)

* [Estado actual del problema](#estado-actual-de-problema)

* [Solución propuesta](#solución-propuesta)

  * [Análisis de requisitos](#análisis-de-requisitos)

  * [Tecnologías que se usan](#tecnologías-que-se-usan)

  * [Modelos](#modelos)

  * [Implementación](#implementación)

  * [Experimentación](#experimentación)

  * [Requisitos de funcionamiento](#requisitos-d-funcionamiento)

  * [Conclusiones](#conclusiones)

* [Trabajos futuros](#trabajos-futuros)

* [Modelo de negocio](#modelo-de-negocio)

  * [Idea de negocio](#idea-de-negocio)

  * [Análisis DAFO](#análisis-dafo)

    * [Debilidades](#debilidades)

    * [Amenazas](#amenazas)

    * [Fortalezas](#fortalezas)

    * [Oportunidades](#oportunidades)

    * [Ventaja competitiva](#ventaja-competitiva)

  * [Financiación](#financiación)

  * [Marketing mix](#marketing-mix)

    * [Producto](#producto)

    * [Precio](#precio)

    * [Distribución](#distribución)

    * [Comunicación](#comunicación)

* [Bibliografía](#bibliografía)

  * [Vista](#vista)

  * [Controlador](#controlador)

  * [Modelo](#modelo)

  * [API](#api)

* [Anexos](#anexos)

  * [Manual de instalación](#manual-de-instalación)

    * [Servidor NodeJS](#servidor-nodejs)

    * [Aplicación VUE](#aplicación-vue)

  * [Manual de uso](#manual-de-uso)


# Resumen

El proyecto intenta solucionar los problemas en la gestión de la asistencia y comunicación de la asociación cultural banda UJI cumpliendo la ley de protección de datos, así como la creación de una ‘landing page’ para dicha asociación que permita informar a los posibles interesados sobre la asociación.

El proyecto intenta solucionar los problemas en la gestión de la asistencia y comunicación de la asociación cultural banda UJI cumpliendo la ley de protección de datos, así como la creación de una ‘landing page’ para dicha asociación que permita informar a los posibles interesados sobre la asociación.


# Abstract

This projects tries to solve the management and communication of ‘associaciò cultural banda UJI’ complying with the data protection law, as well as a landing page where the association could inform about itself to the potential stakeholders.

The goal of this project is to solve the deficiencies in management and communication of the ‘Associaciò Cultural Banda UJI’ so that it complies with the data protection law, as well as the creation of a landing page where the association could share information to potential stakeholders.


[TOC]





# Introducción

El proyecto se basa una aplicación MEVN stack (MongoDB, Expres, VueJs, NodeJs) y que implementará el modelo vista modelo controlador. Esta aplicación contará con 3 secciones o partes claramente diferenciadas.

La  primera será una página web estática con información de la actividad de la asociación, información de contacto de la misma, etc.

La segunda será un sistema gestor de contenido donde se recopile la información de los miembros de la asociación. Para esto contará con un sistema registro de usuarios. Además contará con una parte de administración, dónde se puedan realizar las acciones necesarias con la información de los usuarios sin violar la ley de protección de datos.

Tanto la primera como segunda sección pertenecerán a la vista de la aplicación.

La tercera parte de la aplicación será una una ‘rest api’ que realizará función de controlador (dentro del modelo vista modelo controlador) y que habilitará una serie de endpoints para la parte anterior.


# Objetivos

Los objetivos principales de la aplicación se pueden agrupar en dos: automatizar la creación de documentos generados por la asociación y anonimizar los usuarios durante estos procesos.

Otros objetivos que se van a intentar cumplir son mejorar la fiabilidad de la contabilización de la actividad de los miembros de la asociación. Proporcionar un punto de información propio de la asociación dónde esta pueda comunicar sus actividades sin depender de ninguna organización externa.


# Estado actual del problema

Con las restricciones de la actual ley de protección de datos, la gestión diaria de ciertos aspectos de la Asociación Cultural Banda UJI resulta bastante tediosa. Si a eso le sumamos los cambios en la política de mailing de la UJI, la asociación necesita de alguna herramienta para poder gestionar sus integrantes de forma eficiente.


# Solución propuesta


## Análisis de requisitos

El requisito primordial es anonimizar la información de los miembros de la asociación sin empeorar o dificultar la gestión semana a semana que se necesita realizar desde la junta directiva. Así como intentar cambiar lo menos posible la forma de funcionar de los miembros base de la ya nombrada asociación.


## Tecnologías que se usan

El proyecto utiliza java script de forma transversal. Desde la base de datos (Mongo DB) que almacena la información en formato JSON pasando por el controlador implementado con NodeJS y express, hasta las vistas implementadas con VueJS.


## Modelos

Los modelos implementados en la aplicación son los siguientes:



*   Curs: contiene toda la información que se necesita en un curso académico, además contiene otro modelo ‘semestre’ el cual he considerado oportuno anidar a curs por motivos de optimización al momento de acceder a la información. [^1]


*   Actuació: contiene la información de las actuaciones de la asociación
*   Assaig: contiene la información sobre los ensayos que se van a realizar durante un semestre, así como su assistencia
*   Correu: contiene los correos enviados a los miembros de la asociación.
*   Music: contiene la información de los miembros de la asociación.



## Implementación

La implementación de la aplicación web a requerido de otras tecnologías que se han ido modificando según iba avanzando la implementación de la aplicación e iba aumentando mi conocimiento sobre las características de estas distintas aplicación.

Por ejemplo, en un principio estaba previsto hacer el  despliegue de la aplicación mediante docker y kubernetes, aunque al final he optado por hacer el despliegue con un dyno de heroku.

Otra característica de la implementación ha sido que se ha hecho en un repositorio de git.

A parte de los recursos propios de las tecnologías se han implementado varias apis


## Experimentación

La experimentación con la aplicación ha sido hecha pràcticamente en la totalidad por mi, creando cuentas de pruebas a partir de cuentas de correo temporales para comprobar el correcto funcionamiento de la aplicación intentando incluir el máximo de variación tanto en el hardware como en el software.

El resto de la experimentación estaba orientada a la experiencia del usuario. Se realizó enseñado la aplicación a usuarios que nunca la habían visto y dándoles un par de tareas que desempeñar para comprobar la usabilidad de la aplicación.


## Requisitos de funcionamiento

Para que la aplicación funcione como es debido, se precisa de una una base de datos MongoDB a la cual el servidor NodeJS se pueda conectar ya que en esta implementación la base de datos no se encuentra en el mismo servidor de la aplicación.

Y de un servidor donde alojar la el servidor NodeJS y la aplicación VueJS compilada.

Además se precisa de credencial de un proyecto de google para tener acceso a la api del calendario y de las credenciales de una cuenta de mailjet para el envío de correos.




## Conclusiones

La solución propuesta soluciona los objetivos que se habían propuesto en un principio y cubre las principales acciones que se realizan de forma tanto semanal como semestral como algunas que se realizan anualmente, dicho esto aún faltan bastantes acciones para que la aplicación cubra todas las necesidades de la asociación y que discutiré en el siguiente apartado.


# Trabajos futuros

Los trabajos futuros son vàrios, algunos de los cuales están ya bastante adelantados, entre ellos está el conseguir información de forma programática para la página principal, así como la edición de ciertas partes; la adición de plantillas para el encabezado y el pié de los correos, añadir un formulario en la página principal para la suscripción a una newletter de actuaciones y otras noticias relacionadas con la asociación dirigida a personas que no forma parte activa de la asociación.

Además de añadir nuevas funcionalidades la aplicación (sobretodo el controlador) también necesita ser refactorizada para hacer uso de algunas utilidades que he aprendido durante el desarrollo.


# Modelo de negocio


## Idea de negocio

La idea de negocio es una mezcla del proyecto desarrollado con servicios relacionados a dicha aplicación, como podría ser la personalización de la implementación para otros clientes además de posibilidad de desarrollar otros proyectos similares.


## Análisis DAFO


### Debilidades

La principal debilidad será la falta de experiencia en el sector y de proyectos realizados que ayuden a respaldar la empresa.

Otra debilidad puede ser la falta de clientes potenciales del producto actual.


### Amenazas

La amenaza más preocupante es la competencia, empresas dedicadas a construir cms.


### Fortalezas

Conocimiento y experiencia en la gestión y organización de asociaciones con necesidades similares.

Mínimos costes de producción.

Fácil escalabilidad, los recursos se pueden ir obteniendo/deshaciendo  según las necesidades.


### Oportunidades

La oportunidad más atractiva es la falta de productos en el mercado que puedan proveer una solución tan integral como la propuesta nosotros.


### Ventaja competitiva

Nuestra ventaja competitiva es el conocimiento de las necesidades de nuestros potenciales clientes


## Financiación

La financiación será toda propia, proveniente de ahorros o similares ya que la inversión inicial es insignificante ya que el negocio se realizará en forma de freelance.

Gastos:



*   Servidor para alojar la página web dónde captar clientes: 7~10€/mes
*   Anuncios diferentes redes sociales: 10€/mes
*   Cota autónomo: 60€ (por la bonificación de nuevo autónomo)


## Marketing mix


### Producto

Si bien el producto es la aplicación gestora, ésta viene acompañada de un servicio de mantenimiento y actualización, con la intención de crear la asociación de adquirir tranquilidad en la adquisición del producto.


### Precio

El precio se calculará a partir de los costes de mantenimiento de los servidores + las horas invertidas en la aplicación base + las horas invertidas en la adaptación (si es necesaria hay)


### Distribución

La distribución será personalizada para cada cliente.


### Comunicación

La principal vía de comunicación serán las redes sociales ya que nuestros clientes potenciales son entidades muy concretas las herramientas de publicidad de las redes sociales nos darán mayor exposición a los potenciales clientes.

Además se durante periodos concretos dónde se quiera captar más clientes como en el momento de lanzar el producto se va a omitir el coste de los servidores durante un par o tres de meses.




# Bibliografía


## Vista



*   [https://vuejs.org](https://vuejs.org)


## Controlador



*   [https://www.npmjs.com/package/express](https://www.npmjs.com/package/express)
*   [https://jwt.io](https://jwt.io)
*   [https://www.npmjs.com/package/mongoose](https://www.npmjs.com/package/mongoose)


## Modelo



*   [https://www.mongodb.com/es](https://www.mongodb.com/es)
*   [https://mongoosejs.com/docs/guide.html](https://mongoosejs.com/docs/guide.html)


## API



*   [https://developers.google.com/calendar](https://developers.google.com/calendar)
*   [https://www.mailjet.com](https://www.mailjet.com)
*   [https://developers.google.com/people](https://developers.google.com/people)
*   [https://developers.google.com/gmail/api](https://developers.google.com/gmail/api)
*   [https://developers.google.com/drive](https://developers.google.com/drive)

La api de google gmail, people y drive está implementada pero no se utiliza de momento. El código está en repositorio aunque las credenciales no se han incluido.


# Anexos


## Manual de instalación

El primer paso es tener instalado **nodejs **en el equipo y su gestor de paquetes **npm**.


### Servidor NodeJS

En la raíz del proyecto:



1. *npm run install* para instalar todos los paquetes necesarios
2. Crear un documento .env con las siguientes variables de entorno con las credenciales:
  1. CALENDAR_ID_CLIENT
  2. CALENDAR_SECRET
  3. EMAIL_PASS
  4. EMAIL_USER
  5. ID_CALENDARI
  6. MJ_APIKEY_PRIVATE
  7. MJ_APIKEY_PUBLIC
  8. MONGO_PASSWORD

    Además de estas que explico a continuación:

  1. NODE_ENV: ‘production’ o ‘’ si estamos en el entorno de producción o no
  2. PORT: (opcional) el puerto en que queremos que nodejs escuche las peticiones, por defecto escucha en el puerto 5000. Solo afecta si no estamos en producción
  3. SESSION_SECRE: seed para generar los tokens de autenticación
  4. GOOGLE_API_REDIRECT_URI: la dirección donde queramos que google auth2 nos redireccione para conseguir el codigo de verificación de los permisos
  3. *npm run start*  para iniciar el servidor nodejs, alternativamente podemos ejecutar
  4.  *npm run dev*  para iniciar el servidor en modo desarrollador




### Aplicación VUE

En la carpeta cliente ejecutar:



*   **npm install**, para instalar los paquetes necesarios
*   **npm run seve**, para lanzar la aplicación en el servidor local


## Manual de uso

Una vez realizado los pasos anteriores entrar en [http://localhost:8080](http://localhost:8080). Esto mostrará la pàgina de la asociación.

En la parte superior derecha de la página si está en modo escritorio hay un par de botes, con el de entrar se accede a la parte privada de la página. Por conveniencia estas credenciales llevan a un perfil de administrador (correo: [horas51517@gotkmail.com](mailto:horas51517@gotkmail.com), contraseña: Nb3K3%Y9).


<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]:

     [https://docs.mongodb.com/manual/tutorial/model-data-for-atomic-operations/](https://docs.mongodb.com/manual/tutorial/model-data-for-atomic-operations/)
