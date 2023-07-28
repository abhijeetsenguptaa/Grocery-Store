const createOrderTable = `
 CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    paymentMethod VARCHAR(50) NOT NULL,
    paymentStatus VARCHAR(50) NOT NULL,
    orderStatus VARCHAR(50) NOT NULL,
    totalAmount DECIMAL(10, 2) NOT NULL,
    products JSON, -- JSON data type to store the array of products
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
 )
`;

module.exports = { createOrderTable };
