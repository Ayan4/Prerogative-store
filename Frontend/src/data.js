import faker from "faker";

faker.seed(123);

const productImageArray = [
  "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/6766487/2018/6/18/48910d85-f4ae-4cec-b254-295bad48fdc71529319569051-HANGUP-MENS-2-PIC-COAT-SUIT-9081529319568846-1.jpg",
  "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/13594374/2021/2/19/455044cc-e247-4757-a081-18c86c80857c1613730564805-Peter-England-Men-Suits-4881613730561313-1.jpg",
  "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/14040012/2021/4/27/6a2a9e1f-20e7-4aa5-bc5f-4843c5b735371619523315942ShortsHRXbyHrithikRoshanMenTshirtsHRXbyHrithikRoshanMenTshir1.jpg",
  "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/10241793/2019/7/30/ba0880ac-d331-4914-a0e6-9dd1c80390e61564470322664-Louis-Philippe-Men-Suits-9541564470320550-1.jpg",
  "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/13097580/2021/1/6/d4663f9f-0748-42a1-8aca-0bc1e6ec01901609926180691-Arrow-Men-Suits-5891609926176885-1.jpg"
];

const brandArray = [
  "Arrow",
  "Blackberrys",
  "Louis Philippe",
  "Prerogative",
  "Bruun & Stengade",
  "Van Heusen"
];

const data = [...Array(5)].map(item => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  image: faker.random.arrayElement(productImageArray),
  price: faker.commerce.price(),
  brand: faker.random.arrayElement(brandArray),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  quantity: 1
}));

export default data;
