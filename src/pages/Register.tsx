


export default function Register() {


    return(
        <div className="mt-20 flex justify-center">

            {/* form onSubmit vai button onClick? */}
            <form>

                <label>
                    <p className="text-xs mb-3"> Käyttäjätunnus</p>
                    <input 
                        className="border-2 border-solid min-w-xs max-w-lg min-h-12 mb-8 pl-5" 
                        type="text" />
                </label>

                <label>
                    <p className="text-xs mb-3"> Etunimi</p>
                    <input 
                        className="border-2 border-solid min-w-xs max-w-lg min-h-12 mb-8 pl-5" 
                        type="text" />
                </label>

                <label>
                    <p className="text-xs mb-3"> Sukunimi</p>
                    <input 
                        className="border-2 border-solid min-w-xs max-w-lg min-h-12 mb-8 pl-5" 
                        type="text" />
                </label>

                <label>
                    <p className="text-xs mb-3"> Sähköpostiosoite</p>
                    <input 
                        className="border-2 border-solid min-w-xs max-w-lg min-h-12 mb-8 pl-5" 
                        type="text" />
                </label>

                <label>
                    <p className="text-xs mb-3">Salasana</p>
                    <input
                        className="border-2 border-solid min-w-xs min-h-12 mb-8 pl-5" 
                        type="password" />
                </label>

                <div className="flex justify-center">
                    <button 
                        className="gap-2 mt-4 px-12 py-3 h-12 text-white bg-emerald-700 shadow-md hover:bg-emerald-600 transition"
                        type="submit"
                        >
                        Rekisteröidy
                    </button>
                </div>
            </form>
        </div>
    )
}