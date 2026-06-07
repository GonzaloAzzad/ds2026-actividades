import LibroCard from '../components/LibroCard'

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
            <LibroCard titulo="El Señor de los Anillos" autor="J.R.R. Tolkien" genero="Fantasía" descripcion="Un hobbit emprende un épico viaje para destruir el Anillo Único y salvar la Tierra Media." imagen="https://covers.openlibrary.org/b/id/14625729-L.jpg" />
            <LibroCard titulo="Harry Potter y la Piedra Filosofal" autor="J.K. Rowling" genero="Fantasía" descripcion="Un joven huérfano descubre que es un mago y comienza su vida en Hogwarts." imagen="https://covers.openlibrary.org/b/id/14925450-L.jpg" />
            <LibroCard titulo="Dune" autor="Frank Herbert" genero="Ciencia ficción" descripcion="En un planeta desértico, un joven noble se convierte en el líder de un pueblo oprimido." imagen="https://covers.openlibrary.org/b/id/14636513-L.jpg" />
            <LibroCard titulo="Fundación" autor="Isaac Asimov" genero="Ciencia ficción" descripcion="Un matemático predice la caída del Imperio Galáctico y planea preservar el conocimiento humano." imagen="https://covers.openlibrary.org/b/id/14560069-L.jpg" />
            <LibroCard titulo="Cien Años de Soledad" autor="Gabriel García Márquez" genero="Realismo mágico" descripcion="La saga multigeneracional de la familia Buendía en el mítico pueblo de Macondo." imagen="https://covers.openlibrary.org/b/id/15219095-L.jpg" />
            <LibroCard titulo="El Aleph" autor="Jorge Luis Borges" genero="Realismo mágico" descripcion="Una colección de cuentos que exploran el infinito, los laberintos y los límites de la realidad." imagen="https://covers.openlibrary.org/b/id/14826417-L.jpg" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home