import './App.css';
import { useEffect, useState } from 'react';
import Card from './components/Card';

function App() {
  const [products, setProducts] = useState([]);
  const [filter,setFilter]= useState({
    name:" ",
    price: "",
    category:"",
  });
  const [sortOrder,setSortOrder]= useState("asc");

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
// funcion para filtrar los productos
const prductoFiltrado = products.filter((product)=>{
  const nameMatch= product.title.toLowerCase().includes(filter.name.toLowerCase()) ||
  filter.name === "";

  const priceMatch=product.toString().includes(filter.price) || filter.price === "";

  const categoryMatch=product.category.toLowerCase() === filter.category.toLowerCase() || filter.category === "";
 return nameMatch && priceMatch && categoryMatch;

})
//función para ordenar los productos
 const productosOrdenados= [...prductoFiltrado].sort((a,b)=>{
  if(sortOrder=== "asc"){
    return a.title.localeCompare(b.title);
  }else{
    return b.title.localeCompare(a.title);
  }
 })

  return (
    <div>
    <form>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={filter.title}
        onChange={(e) => setFilter({ ...filter, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Buscar por precio"
        value={filter.price}
        onChange={(e) => setFilter({ ...filter, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="Buscar por categoría"
        value={filter.category}
        onChange={(e) => setFilter({ ...filter, category: e.target.value })}
      />
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Ordenar A-Z</option>
        <option value="desc">Ordenar Z-A</option>
      </select>
    </form>
    <div className="App">
      <h1>Tienda en línea</h1>
      <div className="product-grid">
      </div>
    </div>
    <div className="product-container">
      {productosOrdenados.map((product) => (
        <Card key={product.id} product={product} 
            description={product.description}
            price={product.price}
            title={product.title}
            image={product.image}
          />
      ))}
      
    </div>
  </div>
);
}
   
  

export default App;
