import React, { useEffect } from 'react';
import styles from '../styles/NavbarHome.module.css';
import Image from 'next/image';
import { useState } from 'react';



function NavbarHome({ isAutenticated, onLogin, onLogout }) { //prop isAuthenticated para mostrar iconos en la barra de navegación.
 console.log(isAutenticated);

  //funcionalidad barra buscadora
  const [product, setProduct] = useState([]);  // variable de estado del input
  const [productMatch, setProductMatch] = useState([]); //estado para coincidencia

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('error fetch data', error);
      }
    };
    loadProduct();
  }, [])

  //funcion busqueda
  const searchProduct = (text) => {
    if (!text) {
      setProductMatch([]);
    } else {
      let matches = product.filter((product) => {
        const regex = new RegExp(`${text}`, "gi");
        return product.title.match(regex)
      });
      setProductMatch(matches);
    }
  }

  //informacion usuario

  const [showModal, setShowModal] = useState(false)  //mostrar ventana de informacion
  const [userName, setUserName] = useState("");

  //controlador de clic al icono usuario para mostrar ventana emergente
  const InfoUsuario = async () => {
   
    if (isAutenticated) {
      // Usuario autenticado: Mostrar nombre y opción de cerrar sesión
      try {
        const token = localStorage.getItem('token');
        console.log('Token obtenido del localStorage:', token);

        if (!token) {
          // Redirigir a la página de inicio de sesión si no hay token
          window.location.href = '/login';
          return;
        }

        const response = await fetch('http://localhost:3002/user/InfoUser', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Solicitud enviada:', response);
        if (!response.ok) {
          if (response.status === 401) {
            console.log('Token no válido o no presente');
            window.location.href = '/login';


          } else if (response.status === 404) {
            console.log('Ruta /InfoUser no encontrada');
          } else {
            throw new Error(`Error al obtener información del usuario. Código de estado: ${response.status}`);
          }
        }


        const data = await response.json();
        console.log(data);
        setUserName(data.name);
        console.log(setUserName);
        setShowModal(true);

       

      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    } else {
      // Usuario no autenticado: Redirigir a la página de inicio de sesión
      window.location.href = '/login';
    }
  };

  return (
    <div className={styles.contenedorPrincipal}>

      {/* icono marca "General Shop" */}
      <div className={styles.marca}>
        <Image src={require("@/public/image/logo.png")}
          width={59}
          height={52}
        />
        <a className={styles.ref} href='/'>
          <h1 className={styles.nombreTienda}><b>General Shop</b></h1>
        </a>
      </div>

      {/* icono home */}
      <div className={styles.categorias}>
        <div className={styles.home}>
          <a href='/'>
            <Image src={require('@/public/image/home.png')}
              width={30}
              height={30}
            />
          </a>
        </div>

        {/* icono secciones */}
        <div className={styles.seccion}>
          <Image src={require('@/public/image/section.png')}
            width={23}
            height={24}
          />
          <p>SECCIONES</p>
        </div>

        {/* icono catalogo */}
        <div className={styles.catalogo}>
          <Image src={require('@/public/image/Bookmark.png')}
            width={21}
            height={40}
          />
          <a href='/productos' className={styles.refCatalogo}>
            <p>CATALOGO</p>
          </a>
        </div>

        {/* icono carro */}
        <div className={styles.carrito}>
          <Image src={require('@/public/image/Shopping Cart.png')}
            width={25}
            height={20}
          />
        </div>
      </div>

      {/* barra de busqueda */}
      <div className={styles.busqueda}>
        <div>
          <Image src={require('@/public/image/Search.png')}
            width={26}
            height={27} />
        </div>
        <input type='text' className={styles.caja}
          onChange={(e) => {
            searchProduct(e.target.value);
          }}></input>

        <div className={`${styles.resultBusqueda} ${productMatch.length > 0 && styles.active}`}>
          {productMatch.map((product, id) => (
            <div key={id} className={styles.card}>
              <Image
                src={product.image}
                alt={product.title}
                width={100}
                height={100}
              />
              <p>{product.title}</p>
            </div>
          ))}
          {productMatch.length > 0 && (
            <a href='/productos'> <p className={styles.verTodos}>Ver todos los productos </p> </a>
          )}
        </div>
      </div>

      {/* icono usuario */}
      <div className={styles.usuario}>
        <div onClick={InfoUsuario}>

        {/* condición ? expresión_si_verdadero : expresión_si_falso; */}
          {isAutenticated ? (
            // Usuario autenticado: Mostrar icono usuario y nombre
            <>
              <Image src={require('@/public/image/User.png')}
                width={45}
                height={45}
              />
              <span>{userName}</span>
            </>

          ) : (
            // Usuario no autenticado: Mostrar icono de inicio de sesión
            <Image src={require('@/public/image/User.png')}
              width={45}
              height={45}
            />
          )}
        </div>

        {isAutenticated && (
          // Mostrar opción de cerrar sesión si el usuario está autenticado
          <div className={styles.logout} onClick={onLogout}>
            <Image src={require('@/public/image/logout.png')}
              width={45}
              height={45}
            />
          </div>
        )}

        {!isAutenticated && (
          // Mostrar botón de registrarse si el usuario no está autenticado
          <button className={styles.botonRegistro}>
            <a className={styles.refB} href='/registro'><b>Registrate</b> </a>
          </button>
        )}
      </div>

      {showModal && (
        //Modal o ventana de información de usuario
        <div className={styles.modalContenedor}>
          <div className={styles.modal}>
            <p>¡Hola, {userName}!</p>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavbarHome;
