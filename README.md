# Proyecto NOMAD
## Proyecto final del primer año de la carrera de Certified Trech Developer en Digital House

### Final exposition - NomadApp
`video: https://www.youtube.com/watch?v=R22-HyfBnD8`

### FrontEnd

### BackEnd

Para la realizacion del BackEnd, utilizamos la herramienta de spring para crear nuestro proyecto.
Principalmente instalamos las dependencias de Spring Boot para la creacion de una API y Log4j para loguear la misma asi tener un seguimiento en su funcionamiento; Json Web Token y Spring Boot Security para administrar la seguridad; Junit para el testing; y por ultimo H2, Hibernate y MySQL connector para la creacion de las bases de datos.
Realizamos la conexion de la API con un Bucket S3 en AWS para que el usuario pueda subir imagenes a la hora de crear un producto.
Tambien nos tomamos la libertad de agregar la dependencia de Spring Boot Starter Mail para realizar una conexion con un servidor SMTP para enviar correos de ser necesario.

### Infraestructura

Para la realizacion de la infraestructura, utilizamos las siguientes herramientas:

- Gitlab Pipelines CI/CD
- Gitlab CI/CD Variables
- Gitlab Runners
- Gitlab Terraform Remote State
- Docker Containers, Docker Images, Docker Compose y Docker Hub
- Terraform y Terraform Modules
- AWS EC2, S3 Buckets y RDS (Endpoint brindado por Digital House)
- Bash Scripts en Ubuntu
- Nic.ar (Dominio personalizado)
- Google Cloud DNS
- Certbot (Certificado SSL para las instancias)
- Google Workspace (Email personalizado)

### Testing

Para el testeo de la aplicación se utilizaron varias herramientas y técnicas distintas. Podemos mencionar casos de prueba, tests no funcionales y funcionales, test exploratorio, smoke tests, test de regresión, pegadas a la API con Postman, tests automáticos con Selenium IDE y además se agregaron test unitarios en el back con Mokito. Se fue documentando cada sesión de test con una planilla de fallos y vale la pena mencionar que como estrategia de equipo, se decidió realizar los test al final de cada sprint para reducir la cantidad de sesiones de testing y de esta forma nos obligandonos a subir cambios previamente testeados y funcionando.

## Informacion necesaria para levantar el proyecto

Para levantar el proyecto se recomienda clonar el repositorio desde Gitlab y pararse en la rama develop para la producción. A nivel de front, abrir el preyecto con Visula Studio Code e instalar las dependencias de node y luego levantar con el comando npm run dev. 
Para el back se recomienda abrir y correr el proyecto en IntelliJ. El mismo esta organizado en las carpetas configurations, controller, customFilters, dto, entities, exception, repository, security, service y utils. Además un apartado para los test unitarios. 
Para la base de datos se armo la estructura en un mapa de relaciones y se creo gracias a jdbc y el mysql connector.

**Infraestructura**

Aunque la infraestructura está automatizada, es necesario tener variables preestablecidas de antemano para poder ejecutarla correctamente en diferentes entornos.

**Los requisitos obligatorios son:**

- AWS:
    - Tener una cuenta de AWS con acceso a las credenciales necesarias para el inicio de sesión con IAM.
    - Contar con los servicios de AWS EC2, S3 Bucket y un endpoint a una base de datos remota.
    - Contar con llaves privadas para la conexión SHH con las instancias EC2.

- Google:

    - Contar con un Gmail y sus credenciales (en nuestro caso es personalizado gracias a Google Workspace) para el envío de los mails necesarios a los usuarios registrados.
    - En caso de utilizar un mail personalizado en Google Workspace, verificar la titularidad del dominio siguiendo los pasos recomendados por este servicio.
    - Contar con una cuenta de prueba de Google Cloud, habilitar la API de Cloud DNS y crear las credenciales necesarias para el inicio de sesión con software de terceros.

- Dominio:

    - Contar con un dominio personalizado y conectarlo a los servidores de Google Cloud DNS (esta conexión varía según qué empresa estás utilizando para crear tu dominio).

- Docker:

    - Contar con una cuenta gratuita de Docker Hub y crear las credenciales necesarias para el inicio de sesión en softwares de terceros.

- Gitlab:

    - Contar con un token de registro de runners para poder utilizarlos correctamente al momento de dockerizar las instancias dentro de los EC2.
    - Para la correcta ejecución del pipeline de deploy, es necesario hacer un merge desde la rama Develop hacia la rama Main.

**Variables a configurar en Gitlab CI/CD:**

- AWS_TERRAFORM_CREDENTIALS:
    - Credenciales brindadas al provider de Terraform de la cuenta IAM de AWS a utilizar.

- BACKEND_SERVER_IP && FRONTEND_SERVER_IP
    - Ips privadas de las dos instancias de AWS, son utilizadas para hacer la conexión SSH desde los pipelines al gitlab runner.

- CI_PROJECT_PATH
    - Nombre completo de la ruta donde vamos a guardar las imágenes de Docker creadas. Ej: "nombredeusuario/proyectointegrador".

- CI_REGISTRY && CI_REGISTRY_USER && CI_REGISTRY_PASSWORD
    - Nombre del registro a utilizar ("docker.io") y credenciales para software de terceros de la cuenta de Docker creada.

- DOTENV_CONFIG_BACKEND
    - Configuración con datos sensibles para la instancia de Backend, esta variable es transformada en un archivo ".env" dentro de la carpeta "grupo2-backend/src/main/resources".

- GOOGLE_TERRAFORM_CREDENTIALS
    - Credenciales en formato JSON de la cuenta creada en Google Cloud.

- NEW_NGINX_CONF && SERVER_XML
    - Configuraciones necesarias para Nginx Y Apache Tomcat respectivamente. Estas variables se convertirán en archivos "nginx.conf" y "server.xml" para crear las imágenes de Docker y configurar las peticiones https una vez que sean desplegadas.

- SERVER_USER
    - Nombre del usuario dentro del sistema operativo en el cual nos conectaremos vía SSH.

- SSH_PRIVATE_KEY_BACKEND && SSH_PRIVATE_KEY_FRONTEND
    - Llaves privadas de las dos instancias de AWS para el Frontend y el Backend.

- TF_VAR_backend_instance_ip && TF_VAR_frontend_instance_ip
    - IP estática a crear del Backend Y Frontend en AWS desde Terraform.

- TF_VAR_gitlab_runner_token
    - Token de registro del Runner de Gitlab.

- TF_VAR_google_project_id
    - ID del proyecto de Google generado para las DNS.

- TF_VAR_main_vpc_cidr
    - CIDR a crear dentro de la VPC en AWS.

- TF_VAR_public_subnet_cidr
    - CIDR a crear dentro de la subnet pública en AWS.

**Extras:**

- En caso de querer modificar el entorno completamente, para crear desde cero la infraestructura, es necesario modificar las variables públicas dentro de los módulos de la rama de Terraform para que apunten correctamente a los nuevos valores establecidos.

- También es necesario modificar los archivos de Docker Compose creados para las dos instancias haciendo que apunten correctamente a la imagen deseada.

- Los pipelines actuales crean las versiones empaquetadas del Frontend y el Backend según las rutas relativas a nuestro repositorio. En caso de querer modificarlas, es necesario cambiarlas dentro del pipeline de la rama Main y dentro de los Dockerfiles correspondientes.

- En caso de querer destruir completamente la infraestructura, descomentar el apartado destroy en el terraform-pipeline y ejecutarlo. Una vez llegado al job de destrucción es necesario darle permiso de ejecución manualmente.


Para las evaluaciones de testing se utilizaron distintas técnicas y herramientas que se fueron aplicando en cada sprint. 
Se realizaron casos de prueba, test exploratorios, test de regresión, test no funcionales, pegadas a la API con Postman, test automáticos con Selenium IDE y además test unitarios en el back del proyecto con Mokito.
Los casos de fallo o error fueron detallados en una planilla y se repitieron tests hasta solucionar los problemas.
Como estrategia de equipo se decidió que cada desarrollador comprobara y testeara el funcionamiento de la issue que se le asignó antes de subir sus cambios, permitiendo así reducir la cantidad de sesiones de testing a implementar. Además a la finalisación del sprint ya con el MVP terminado y previo a subir a producción se corrió una batería de testing garantizando así el correcto funcionamiento de la versión.

## Integrantes: Mosca, Ignacio. Alamino, Francisco. Alloco, Patricio. Bernardin, Tomas.
