FROM node:12.8.1

ADD . /app

WORKDIR /app

RUN npm install

ENV WEATHER_API_KEY=188f632dcd5795ac61ad21bc7fa2fa8e
ENV MONGODB_URI=mongodb+srv://numel007:rBj4mtRdzsJtFI2A@cluster0.wyzu6.mongodb.net/weatherAPI?retryWrites=true&w=majority

EXPOSE 3000

CMD ["node", "app.js"]