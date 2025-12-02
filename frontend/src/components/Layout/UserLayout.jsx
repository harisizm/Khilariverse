import React from 'react'

const UserLayout = () => {
  return (
    <div>
      <header>
        <h1>Khilariverse</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>Welcome to Khilariverse!</h2>
        <p>Your one-stop shop for amazing products.</p>
      </main>
      <footer>
        <p>&copy; 2025 Khilariverse. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default UserLayout
