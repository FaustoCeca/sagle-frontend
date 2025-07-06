Todavia no pude implementar github actions para CI/CD en el frontend, por lo tanto las reglas de deploy seran las siguientes
Entornos: staging - prod

Ir a la carpeta del entorno a deployar dentro del VPS (staging o prod)
Hacer un pull de los cambios
Correr npm install
Correr npm run build
Correr rm -rf /var/www/thesagle-frontend/(entorno)/dist/* para borrar previas versiones
Correr cp -r dist/* /var/www/thesagle-frontend/(entorno)/dist/ para agregar a la carpeta dist (que se sirve como archivo estatico en un nginx) el nuevo codigo
Reiniciar el servidor de nginx con sudo systemctl restart nginx

Y listo!!