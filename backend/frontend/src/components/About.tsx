import { Hyperlink } from './Hyperlink';



export function About() {
    return (
    <main className="p-6">
      <header>
        <h1 className="text-5xl text-primaryBlue-500">
            ¡Bienvenide a &nbsp;
            <h3 className='font-casualHandy text-primaryPink-500'>
                Scribly
                <div className="ml-0.5 w-fit rotate-6">!</div>
            </h3>
        </h1>
      </header>

      <section className="my-6">
        <h2 className='text-2xl'>Acerca de &nbsp;
            <h3 className='font-casualHandy text-primaryPink-500'>
                Scribly
                <div className="ml-0.5 w-fit rotate-6">!</div>
            </h3>
        </h2>
        <p className='text-lg'>
            <h3 className='font-casualHandy text-primaryPink-500'>
                Scribly
                <div className="ml-0.5 w-fit rotate-6">!</div>
            </h3> &nbsp; es una plataforma de aprendizaje de escritura innovadora creada por Romen Medina Beltrán, estudiante de desarrollo web en Granada, España. Este proyecto es respaldado por &nbsp;<Hyperlink to='https://www.aircury.es/' color='blue'>
                Aircury SL
            </Hyperlink>
        , una empresa comprometida con el avance de la tecnología educativa.  &nbsp;
            <h3 className='font-casualHandy text-primaryPink-500'>
                Scribly
                <div className="ml-0.5 w-fit rotate-6">!</div>
            </h3> &nbsp; está diseñado para mejorar las habilidades de escritura de manera efectiva y accesible, ofreciendo lecciones interactivas, retroalimentación personalizada y una experiencia motivadora.
        </p>
      </section>

      <section className="my-6">
      <h2 className='text-2xl'> Impacto Potencial</h2>
        <p className='text-lg'>
        <h3 className='font-casualHandy text-primaryPink-500'>
                Scribly
                <div className="ml-0.5 w-fit rotate-6">!</div>
            </h3> &nbsp;  tiene el potencial de revolucionar la educación escrita al beneficiar a estudiantes, profesionales y aspirantes a escritores. Esta plataforma busca hacer que la escritura sea poderosa y accesible para todos. Únete a nosotros en este emocionante viaje para cambiar la forma en que escribimos y desarrollamos nuestras habilidades de comunicación. &nbsp;
            <h3 className='font-casualHandy text-primaryPink-500'>
                Scribly
                <div className="ml-0.5 w-fit rotate-6">!</div>
            </h3>, desarrollado con pasión, ¡está listo para transformar tu escritura!
            </p>
      </section>

    </main>
    
  );
}