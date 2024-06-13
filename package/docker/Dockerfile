FROM node:16.18.1 as build-deps
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

# stage: 2 ?~@~T the production environment
FROM node:20-alpine
RUN npm install -g serve@14.2.0
COPY --from=build-deps /app/dist/ dist/
EXPOSE 5000

COPY entryPoint.sh /
RUN chmod +x entryPoint.sh
ENTRYPOINT ["/entryPoint.sh"]
CMD ["serve", "dist/", "-l",  "5000"]

