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