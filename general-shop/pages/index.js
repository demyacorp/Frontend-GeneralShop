import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import styles from '../styles/App.module.css';
import NavbarHome from '@/components/NavbarHome.js';
import Separador from '@/components/Separador.js';
import Portada from '@/components/Portada.js';
import Popular from '@/components/Popular.js';
import Destacados from '@/components/Destacados.js';
import Secciones from '@/components/Secciones.js';
import Categorias from '@/components/Categorias.js';
import Footer from '@/components/Footer.js';

//renderizar componentes en la pagina principal Home
const Home = () => {
  useEffect(() => {
    const root = document.getElementById('root');
    const rootElement = ReactDOM.createRoot(root);
    rootElement.render(
      <React.StrictMode>
        <NavbarHome />
        <Separador />
        <Portada />
        <Popular />
        <div className={styles.Destacados}>
          <Destacados
            imagen='img10'
            width={246}
            nombre='Camisa - Original japan'
            colores={['blue','#5CDF87','#DF7B5C']}
            precio='$42.000'
          />
          <Destacados
            imagen='img9'
            nombre='Camisa básica'
            colores={['#710100','#061731','#C69D1E']}
            precio='$28.000'
          />
          <Destacados
            imagen='img11'
            nombre='Camibuso'
            colores={['#B5B3B4','3E3E46','#C6A993']}
            precio='$53.000'
          />
          <Destacados
            imagen='img2'
            nombre='Camisa hipoalergénica'
            colores={['white']}
            precio='$42.000'
          />
          <Destacados
            imagen='img1'
            nombre='Camisa OnlyStyle'
            colores={['#60898A']}
            precio='$42.000'
          />
        </div>
        <Separador />
        <Secciones />
        <Categorias />
        <Footer />
      </React.StrictMode>
    );
  }, []);

  return <div id="root"></div>
};

export default Home;