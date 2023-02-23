FROM node:16
WORKDIR /frontend
COPY package.json .

# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "development" ]; \
#         then npm install; \
#         else npm install --only=production; \
#         fi

RUN npm install -g pnpm
RUN rm -fr node_moduls
RUN rm -rf package-lock.json
RUN pnpm install
COPY . ./
ENV PORT 3001
EXPOSE $PORT 
CMD ["pnpm","start"]