version: 2.1
orbs:
  cypress: cypress-io/cypress@1
jobs:
  setup:
    docker:
      - image: circleci/node:12.13-browsers
    working_directory: ~/repo
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-deps-{{ .Branch }}-{{ checksum "package.json" }}
            - v1-deps-{{ .Branch }}
            - v1-deps
      - run:
          name: Install Dependencies
          command: npm ci
      - save_cache:
          key: v1-deps-{{ .Branch }}-{{ checksum "package.json" }}
          # cache NPM modules and the folder with the Cypress binary
          paths:
            - ~/.npm
            - ~/.cache

workflows:
  build:
    jobs:
      - setup
      - cypress/run:
          requires:
            - setup
          start: npm start
          record: true
          wait-on: 'http://localhost:3000'
          no-workspace: true
          store_artifacts: true
          post-steps:
            - run: 'npm run deploy'