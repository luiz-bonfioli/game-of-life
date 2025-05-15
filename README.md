# Conway's Game of Life - React App

## Problem Description

This project implements Conway's Game of Life, a zero-player game where cells on a 2D grid evolve over discrete time steps based on a set of simple rules:

* Any live cell with two or three live neighbors survives.
* Any dead cell with three live neighbors becomes a live cell.
* All others live cells die in the next generation; all other dead cells stay dead.

The React app provides:

* Play / Stop controls to run the simulation automatically.
* Step controls to manually advance the simulation.
* Matrix Glider Gun seeding to insert interesting starting patterns.
* Adjustable grid size (dimension), controlled via an environment variable.

## Project documentation
[View the Documentation (PDF)](./docs/Game of Life.pdf)

[Watch the video](./docs/Game of Life Video.mov)

## Project structure overview
```
src/
├── common/
│   ├── Config.ts              # Configuration constants and environment settings
│   ├── LifeAlgorithm.ts      # Core logic for Conway’s Game of Life 
│   └── Logger.ts              # Custom logger utility for debugging and runtime info
│
├── components/
│   ├── Game.tsx               # Main container component for the Game of Life
│   └── Universe.tsx           # Component responsible for rendering the cell grid
│
├── services/
│   └── LifeService.ts         # Service layer to manage game state, evolution steps, etc.
│
├── App.tsx                    # Root React component that initializes and ties everything together
│                              # If it's a TypeScript module, clarify its purpose
│
tests/                         # Unit and integration tests for components, services, and core logic

```

## Steps to Run the Code using Docker
1. **Build the docker image**
```shell
docker build -t game-of-life . 
```
2. **Run the docker image**
```shell
docker run -p 3000:80 game-of-life
```
Go to your browser and access the app using this url: http://localhost:3000

## Steps to Run the Code Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/luiz-bonfioli/game-of-life
   cd game-of-life
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**
   or change the `.env.[production, staging, development]` file in the root directory:

   ```
   VITE_MATRIX_DIMENSION=50
   ```

4. **Start the server [dev, prod or stg]**

   ```bash
   npm run dev
   ```

   ```bash
   npm run stg
   ```

   ```bash
   npm run prod
   ```

5. **Run the tests**

   ```bash
   npx jest 
   ```

6. **Build for production**

   ```bash
   npm run build
   ```

## CI Pipeline (GitHub Actions)
This project uses GitHub Actions to automatically test and build the application on every push or pull request to the main branch.

What the pipeline does:
- Checkout code – Clones the repository.
- Setup Node.js – Installs Node.js v20.
- Install dependencies – Runs npm ci for a clean and fast install.
- Run tests – Executes the test suite using **npm test**.
- Build application – Runs **npm run build** to generate the production build.

## The Glider Gun pattern (seed example)
The Glider Gun (often called the Gosper Glider Gun) is a famous and important pattern in Conway’s Game of Life because:

- It is a stable oscillator that periodically produces “gliders”, which are small patterns that move diagonally across the grid.

- The glider gun was the first known pattern that demonstrated infinite growth in the Game of Life — it keeps creating new gliders forever, increasing the population indefinitely.

How Does It Work?
- The Glider Gun is a fixed arrangement of live cells (the "seed").

- Every 30 generations (steps), it "fires" a new glider — a small cluster of cells that travels diagonally.

- The gun itself remains mostly unchanged, cycling through a repeating pattern.

- The gliders it produces move away and continue on their own, potentially interacting with other parts of the grid.

## Explanation of the Solution and Thought Process

* **Component Architecture**
  The app is split into components:

    * `App`: main container, handles state and UI.
    * `Universe`: renders the matrix/grid.
    * `LifeService`: contains the logic for generating the matrix and calculating the next generation.

* **State Management**
  React's `useState` and `useEffect` hooks manage:

    * The current matrix.
    * Playing / stopped state.
    * Step counts.

* **Matrix Dimension**
  The matrix size is controlled via `import.meta.env.VITE_MATRIX_DIMENSION`, making the app configurable without code changes.

* **Testing**
  We use Jest and React Testing Library to test:

    * UI rendering.
    * Button interactions.
    * Matrix updates.
      External services (`LifeService`) and components (`Universe`) are mocked to isolate unit behavior.

* **Mocking `import.meta.env` in Tests**
  Since `import.meta.env` doesn't exist in the test environment, the `getMatrixDimension` utility is mocked to return a predictable value.

## Assumptions and Trade-offs

**Assumptions**

* The matrix is square (`n x n`) as controlled by `VITE_MATRIX_DIMENSION`.
* The backend logic for generating matrices (`LifeService`) works as a promise-based async service (even if it returns static data in tests).
* Users primarily interact via Play / Stop / Next / Glider buttons; 
* Matrix editing is handled by clicking on the cells.

**Trade-offs**

* Services and components are mocked for simplicity, limiting end-to-end integration testing.
* Assumes reasonably small matrices (≤ 200x200); larger grids may require performance optimizations.
