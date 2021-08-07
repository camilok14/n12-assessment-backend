FROM node:14

COPY dist /n12-assessment-backend/dist
COPY node_modules /n12-assessment-backend/node_modules
COPY package.json /n12-assessment-backend/package.json

WORKDIR /n12-assessment-backend

EXPOSE 3000

CMD node dist/main