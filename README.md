# MongoDB
docker run --name mongodb -p 27017:27017 -d -t mongo

# Redis
docker run --name redis -p 6379:6379 -d -t redis:alpine

## Instructions

### Install dependencies
Run `yarn`

### Start dev server
Run `yarn dev:server`

### Start debug server
Run `yarn dev:debug`

### Start queue service
Run `yarn dev:queue`

### Start debug queue service
Run `yarn dev:queue-debug`

***WARNING*** ONLY ONE DEBUG CAN BE RUNNING AT TIME

