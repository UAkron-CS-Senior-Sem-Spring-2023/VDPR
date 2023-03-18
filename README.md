# VDPR

Main repo for VDPR to compose and run.

## How to run:
- First, install [Docker Desktop](https://www.docker.com/) (remember to restart).
- Second, open the codebase within your favorite IDE.
- Third, run:
  - To create your image(s) for your containers
    ```
    docker compose build
    ```
  - To create your containers:
    ```
    docker compose up
    ```
  - To destroy after checking they work:
    ```
    docker compose down
    ```
- Fourth, you can check the result of the Docker build on: [LocalHost](localhost:80)

## Branch Etiquette 
Since these directories are completely separate in purpose - branch naming should go as follows:


Any changes to VDPR-React should require the prefix **[VDPR-React]** in the branch name. This follows for the other subdirectories.
