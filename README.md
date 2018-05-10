# router stack for web app

## requirements

-   Vue ^2.2.0
-   Vue-Router ^2.0.0
-   router's component must be given a name as same as router's

## usage

    <app-router></app-router>

## lifecycle

| hook          | action |
| ------------- | ------ |
| mounted       | push   |
| activated     | show   |
| deactivated   | hide   |
| beforeDestroy | pop    |
