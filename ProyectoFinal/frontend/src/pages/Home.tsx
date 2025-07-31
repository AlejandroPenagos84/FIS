import image from "../assets/Logo.jpeg"

export function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            {/* Imagen o logo de la empresa */}
            <img
                src={image} // Reemplaza con tu imagen real
                alt="Logo Empresa"
                className="w-40 h-40 mb-6 object-contain"
            />

            {/* Dirección */}
            <p className="text-lg font-semibold mb-2">
                Dirección: Cll 77C No. 100B - 46, Bogotá, Colombia
            </p>
            <iframe 
            width="360" 
            height="640" 
            src="https://www.youtube.com/embed/cyCJoX44p8U" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen>
            </iframe>
            {/* Link a LinkedIn */}
            <a
                href="https://co.linkedin.com/in/bolivar-bioingenieria-883669b8" // Cambia por tu URL real
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-blue-600 hover:underline text-lg"
            >
                Visítanos en LinkedIn
            </a>
        </div>
    )
}