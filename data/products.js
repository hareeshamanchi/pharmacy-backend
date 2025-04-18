// data/products.js

const products = [
  {
    productId: 'P001',
    name: 'Aspirin',
    composition: 'Acetylsalicylic Acid',
    price: 10,
    discountPercent: 5,  // Updated to discountPercent
    description: 'Used to reduce pain, fever, or inflammation.',
    tabletsPerSheet: 10,
    expiryDate: '2025-12-31',
    imageUrl: 'http://localhost:5000/images/OIP.jpeg',
    category: 'Pain Relief'
  },
  {
    productId: 'P002',
    name: 'Amoxicillin 250mg',
    composition: 'Amoxicillin',
    price: 35,
    discountPercent: 5,  // Updated to discountPercent
    description: 'Antibiotic for bacterial infections.',
    tabletsPerSheet: 10,
    expiryDate: '2026-03-15',
    imageUrl: 'http://localhost:5000/images/e.jpeg',
    category: 'Antibiotics'
  },
  {
    productId: 'P003',
    name: 'Ibuprofen 400mg',
    composition: 'Ibuprofen',
    price: 25,
    discountPercent: 20,  // Updated to discountPercent
    description: 'NSAID used to treat pain and inflammation.',
    tabletsPerSheet: 10,
    expiryDate: '2026-09-01',
    imageUrl: 'http://localhost:5000/images/t.jpeg',
    category: 'Pain Relief'
  },
  {
    productId: 'P004',
    name: 'Paracetamol 500mg',
    composition: 'Paracetamol',
    price: 15,
    discountPercent: 10,  
    description: 'Common pain reliever and fever reducer.',
    tabletsPerSheet: 10,
    expiryDate: '2025-11-20',
    imageUrl: 'http://localhost:5000/images/par.jpeg',
    category: 'Pain Relief'
  },
  {
    productId: 'P005',
    name: 'Cetirizine 10mg',
    composition: 'Cetirizine Hydrochloride',
    price: 12,
    discountPercent: 8,  
    description: 'Antihistamine used for allergy relief.',
    tabletsPerSheet: 10,
    expiryDate: '2026-06-10',
    imageUrl: 'http://localhost:5000/images/u.jpeg',
    category: 'Allergy'
  },
  {
    productId: 'P006',
    name: 'Metformin 500mg',
    composition: 'Metformin Hydrochloride',
    price: 22,
    discountPercent: 7,  // Updated to discountPercent
    description: 'Used to control high blood sugar in Type 2 diabetes.',
    tabletsPerSheet: 10,
    expiryDate: '2026-02-01',
    imageUrl: 'http://localhost:5000/images/w.jpeg',
    category: 'Diabetes'
  },
  {
    productId: 'P007',
    name: 'Pantoprazole 40mg',
    composition: 'Pantoprazole Sodium',
    price: 18,
    discountPercent: 6,  // Updated to discountPercent
    description: 'Reduces stomach acid, treats acid reflux.',
    tabletsPerSheet: 10,
    expiryDate: '2026-08-01',
    imageUrl: 'http://localhost:5000/images/Q.jpeg',
    category: 'Digestive'
  },
  {
    productId: 'P008',
    name: 'Loratadine 10mg',
    composition: 'Loratadine',
    price: 14,
    discountPercent: 5,  // Updated to discountPercent
    description: 'Relieves allergy symptoms like runny nose and sneezing.',
    tabletsPerSheet: 10,
    expiryDate: '2026-10-10',
    imageUrl: 'http://localhost:5000/images/e.jpeg',
    category: 'Allergy'
  },
  {
    productId: 'P009',
    name: 'Losartan 50mg',
    composition: 'Losartan Potassium',
    price: 28,
    discountPercent: 9,  // Updated to discountPercent
    description: 'Used to treat high blood pressure.',
    tabletsPerSheet: 10,
    expiryDate: '2026-12-31',
    imageUrl: 'http://localhost:5000/images/W.jpeg',
    category: 'Blood Pressure'
  }
];

export default products;
