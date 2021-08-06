FROM node:14

COPY . /n12-assessment-backend

WORKDIR /n12-assessment-backend

EXPOSE 3000

CMD node dist/main