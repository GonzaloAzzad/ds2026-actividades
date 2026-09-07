import LibroCard from '../components/LibroCard'
import librosIniciales from '../data/librosIniciales'

function Home() {
  return (
    <div>
      <section className="px-4 py-5 text-center bg-dark">
        <div className="py-5">
          <h1 className="display-5 fw-bold text-white">Bienvenido a La Librería</h1>
          <div className="col-lg-6 mx-auto">
            <p className="fs-5 mb-4 text-white">
              Explorá nuestra colección de libros destacados y encontrá tu próxima lectura.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <a href="#destacados" className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">Ver catálogo</a>
              <a href="#" className="btn btn-outline-light btn-lg px-4">Contacto</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" id="destacados">
        <div className="container">
          <h2 className="mb-4">Destacados</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {librosIniciales.map((libro) => (
              <LibroCard key={libro.id} {...libro} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home