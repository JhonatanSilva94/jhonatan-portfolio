FROM nginx:alpine
COPY frontend /usr/share/nginx/html
COPY projetos /usr/share/nginx/html/projetos
EXPOSE 80
