# SWISH-Client

This library exports a client which can be used to query the SWISH API and even allows using HTTP Digest Auth.

## Setup

```bash
# Install yarn if not installed (npm/node is required)
npm install --global yarn

# Position yourself in the directory in which you wanna put this library and it's dependencies @juriskop/swish-node-digest-auth, @juriskop/axios-http-digest-auth and then run these commands
git clone https://github.com/Juriskop/SWISH-Client.git
git clone https://github.com/Juriskop/axios-http-digest-auth.git
git clone https://github.com/Juriskop/swish-node-digest-auth

# Setting up @juriskop/swish-node-digest-auth
cd swish-node-digest-auth

yarn install
yarn run build
yarn link

cd ..

# Setting up @juriskop/axios-http-digest-auth

cd axios-http-digest-auth

yarn install
# I had to run 'yarn link "@juriskop/swish-node-digest-auth" first for 'yarn run build' to work..
yarn run build
yarn link

cd ..

# Setting up this project
cd SWISH-Client

yarn install
yarn link @juriskop/swish-node-digest-auth
yarn link @juriskop/axios-http-digest-auth
```

## More commands

```bash
# Running tests
yarn run test 

# Building to project (to the dist folder)
yarn run build
```
