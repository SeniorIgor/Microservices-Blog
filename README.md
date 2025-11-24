# install everything (workspaces-aware)

npm install

# run linters for the whole repo

npm run lint

# in parallel terminals:

# posts service

cd posts
npm run dev

# comments service

cd comments
npm run dev

# client (React app)

cd client
npm run dev
