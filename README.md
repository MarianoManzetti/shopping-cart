# shopping-cart

This project implements an interactive shopping cart using React and Next.js, which consumes a mock product API. It also includes advanced functionality to find the best product combination to fit a defined budget.

---

#### 🚀 How to run the project

Follow these steps to install and run the application in your local environment:

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:MarianoManzetti/shopping-cart.git
    cd shopping-cart
    ```

2.  **Install dependencies:**
    Node version: >= 18

    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available in `http://localhost:3000`.

---

#### 💡 Solution Description

The project is divided into two main parts:

1.  **Frontend (Next.js):**
    * **User Interface:** Built with **React** and the **Material-UI (MUI)** design system for components, and **Tailwind CSS** for responsive and customizable design.
    * **State Management:** React hooks (`useState` and `useEffect`) are used to manage the state of the cart and product list. Custom hooks (`useProducts` and `useCart`) are used to centralize the data retrieval and manipulation logic.
    * **Mock API:** The application consumes a mock in-memory product and cart API to demonstrate endpoint interaction.

2.  **Best Combination Logic:**
    * A `findBestCombination` function is implemented that solves the `0/1 Knapsack` problem to find the product combination with the highest total value that fits a given budget.
    * **Algorithm Analysis:** A **dynamic programming-based** solution was chosen to solve this problem. Although a **brute-force** strategy might work for small amounts of data, efficiency would be severely affected as the number of products and budget increase. Dynamic programming, on the other hand, avoids recalculating the same subsolutions, making it much more scalable and performant for larger data sets.
    * The user can enter a budget in a dedicated text field. When clicking "Calculate", the app uses a **dynamic programming** algorithm to display the optimal products within the budget. This logic is found in the `BestCombination` component.
