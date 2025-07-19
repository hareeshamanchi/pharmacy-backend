const products = [
  {
    productId: 'P001',
    drugName: 'Aspirin',
    brandName: 'Bayer',
    composition: 'Acetylsalicylic Acid (C9H8O4)',
    price: 10,
    discount: 5,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/OIP.jpeg',
    category: 'Pain Relief',
    description: `**Overview:**  
Aspirin is a salicylate drug used for pain relief, fever, and inflammation.

**Uses:**  
- Headache, cramps, fever  
- Prevents blood clots  
- Reduces inflammation`
  },
  {
    productId: 'P002',
    drugName: 'Amoxicillin 250mg',
    brandName: 'GlaxoSmithKline',
    composition: 'Amoxicillin (C16H19N3O5S)',
    price: 35,
    discount: 5,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/e.jpeg',
    category: 'Antibiotics',
    description: `**Overview:**  
Broad-spectrum antibiotic effective against various infections.

**Uses:**  
- Throat, ear, UTI, and skin infections  
- Respiratory tract treatment`
  },
  {
    productId: 'P003',
    drugName: 'Ibuprofen 400mg',
    brandName: 'Advil',
    composition: 'Ibuprofen (C13H18O2)',
    price: 25,
    discount: 20,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/t.jpeg',
    category: 'Pain Relief',
    description: `**Overview:**  
NSAID used for pain, fever, and inflammation relief.

**Uses:**  
- Arthritis, cramps, fever  
- Muscle pain relief`
  },
  {
    productId: 'P004',
    drugName: 'Paracetamol 500mg',
    brandName: 'Calpol',
    composition: 'Paracetamol (C8H9NO2)',
    price: 15,
    discount: 10,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/par.jpeg',
    category: 'Pain Relief',
    description: `**Overview:**  
Commonly used antipyretic and analgesic.

**Uses:**  
- Fever  
- Headaches  
- Cold/flu pain`
  },
  {
    productId: 'P005',
    drugName: 'Ciprofloxacin 500mg',
    brandName: 'Ciplox',
    composition: 'Ciprofloxacin (C17H18FN3O3)',
    price: 45,
    discount: 8,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/e.jpeg',
    category: 'Antibiotics',
    description: `**Overview:**  
Broad-spectrum antibiotic effective for serious bacterial infections.

**Uses:**  
- UTI, bone, and joint infections`
  },
  {
    productId: 'P006',
    drugName: 'Metformin 500mg',
    brandName: 'Gluconorm',
    composition: 'Metformin (C4H11N5)',
    price: 20,
    discount: 10,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/OIP.jpeg',
    category: 'Diabetes',
    description: `**Overview:**  
Used to control high blood sugar in type 2 diabetes.

**Uses:**  
- Lowers glucose levels  
- Improves insulin response`
  },
  {
    productId: 'P007',
    drugName: 'Losartan 50mg',
    brandName: 'Losar',
    composition: 'Losartan Potassium (C22H22ClKN6O)',
    price: 30,
    discount: 5,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/t.jpeg',
    category: 'Blood Pressure',
    description: `**Overview:**  
Angiotensin receptor blocker for hypertension.

**Uses:**  
- Lower blood pressure  
- Prevent stroke`
  },
  {
    productId: 'P008',
    drugName: 'Omeprazole 20mg',
    brandName: 'Omez',
    composition: 'Omeprazole (C17H19N3O3S)',
    price: 18,
    discount: 5,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/par.jpeg',
    category: 'Gastric',
    description: `**Overview:**  
Proton pump inhibitor for gastric problems.

**Uses:**  
- Acidity  
- GERD  
- Ulcer prevention`
  },
  {
    productId: 'P009',
    drugName: 'Cetirizine 10mg',
    brandName: 'Cetzine',
    composition: 'Cetirizine Hydrochloride (C21H25ClN2O3)',
    price: 12,
    discount: 5,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/OIP.jpeg',
    category: 'Allergy',
    description: `**Overview:**  
Antihistamine used for allergy relief.

**Uses:**  
- Sneezing, runny nose  
- Itchy eyes`
  },
  {
    productId: 'P010',
    drugName: 'Vitamin C 500mg',
    brandName: 'Limcee',
    composition: 'Ascorbic Acid (C6H8O6)',
    price: 25,
    discount: 10,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/e.jpeg',
    category: 'Supplements',
    description: `**Overview:**  
Immune support supplement.

**Uses:**  
- Boosts immunity  
- Fights infection`
  },
  {
    productId: 'P011',
    drugName: 'Calcium + D3',
    brandName: 'Shelcal',
    composition: 'Calcium Carbonate + Vitamin D3',
    price: 40,
    discount: 10,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/par.jpeg',
    category: 'Supplements',
    description: `**Overview:**  
Calcium and D3 for bone strength.

**Uses:**  
- Prevent osteoporosis  
- Support bone growth`
  },
  {
    productId: 'P012',
    drugName: 'Azithromycin 250mg',
    brandName: 'Azithral',
    composition: 'Azithromycin (C38H72N2O12)',
    price: 60,
    discount: 15,
    tabletsPerSheet: 6,
    imageUrl: 'http://localhost:5000/images/t.jpeg',
    category: 'Antibiotics',
    description: `**Overview:**  
Macrolide antibiotic for infections.

**Uses:**  
- Throat infections  
- Skin infections`
  },
  {
    productId: 'P013',
    drugName: 'Dolo 650mg',
    brandName: 'Micro Labs',
    composition: 'Paracetamol (C8H9NO2)',
    price: 20,
    discount: 10,
    tabletsPerSheet: 15,
    imageUrl: 'http://localhost:5000/images/par.jpeg',
    category: 'Pain Relief',
    description: `**Overview:**  
Effective pain and fever relief tablet.

**Uses:**  
- High fever  
- Body ache`
  },
  {
    productId: 'P014',
    drugName: 'Pantoprazole 40mg',
    brandName: 'Pantocid',
    composition: 'Pantoprazole (C16H15F2N3O4S)',
    price: 28,
    discount: 5,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/OIP.jpeg',
    category: 'Gastric',
    description: `**Overview:**  
Used for acid reflux and ulcers.

**Uses:**  
- GERD  
- Acid suppression`
  },
  {
    productId: 'P015',
    drugName: 'Levocetirizine 5mg',
    brandName: 'Levocet',
    composition: 'Levocetirizine (C21H25ClN2O3)',
    price: 14,
    discount: 5,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/e.jpeg',
    category: 'Allergy',
    description: `**Overview:**  
Anti-allergy medicine.

**Uses:**  
- Itching, sneezing  
- Seasonal allergies`
  },
  {
    productId: 'P016',
    drugName: 'Domperidone 10mg',
    brandName: 'Domstal',
    composition: 'Domperidone (C22H24ClN5O2)',
    price: 16,
    discount: 5,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/t.jpeg',
    category: 'Gastric',
    description: `**Overview:**  
Used for nausea and vomiting relief.

**Uses:**  
- Morning sickness  
- Indigestion`
  },
  {
    productId: 'P017',
    drugName: 'Montelukast 10mg',
    brandName: 'Montair',
    composition: 'Montelukast (C35H36ClNO3S)',
    price: 32,
    discount: 8,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/par.jpeg',
    category: 'Respiratory',
    description: `**Overview:**  
Leukotriene receptor antagonist.

**Uses:**  
- Asthma prevention  
- Allergic rhinitis`
  },
  {
    productId: 'P018',
    drugName: 'Telmisartan 40mg',
    brandName: 'Telma',
    composition: 'Telmisartan (C33H30N4O2)',
    price: 34,
    discount: 7,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/OIP.jpeg',
    category: 'Blood Pressure',
    description: `**Overview:**  
Used to treat hypertension.

**Uses:**  
- Blood pressure control  
- Heart protection`
  },
  {
    productId: 'P019',
    drugName: 'Atorvastatin 10mg',
    brandName: 'Lipitor',
    composition: 'Atorvastatin (C33H35FN2O5)',
    price: 29,
    discount: 10,
    tabletsPerSheet: 10,
    imageUrl: 'http://localhost:5000/images/e.jpeg',
    category: 'Cholesterol',
    description: `**Overview:**  
Lowers bad cholesterol and triglycerides.

**Uses:**  
- Heart protection  
- Lowers cholesterol`
  }
];

export default products;
