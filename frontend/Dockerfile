FROM node:16
WORKDIR /frontend
COPY package.json .

# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "development" ]; \
#         then npm install; \
#         else npm install --only=production; \
#         fi

RUN npm install
COPY . ./
ENV PORT 3001
EXPOSE $PORT 
CMD ["npm","start"]