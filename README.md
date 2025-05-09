# Conway's Game of Life — React App

## Problem Description

This project implements Conway's Game of Life, a zero-player game where cells on a 2D grid evolve over discrete time steps based on a set of simple rules:

* Any live cell with two or three live neighbors survives.
* Any dead cell with three live neighbors becomes a live cell.
* All other live cells die in the next generation; all other dead cells stay dead.

The React app provides:

* Play / Stop controls to run the simulation automatically.
* Step controls to manually advance the simulation.
* Matrix Glider Gun seeding to insert interesting starting patterns.
* Adjustable grid size (dimension), controlled via an environment variable.

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
