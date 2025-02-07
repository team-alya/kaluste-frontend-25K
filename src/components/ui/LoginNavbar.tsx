const AuthNavbar = () => {
    return (
        <nav className="relative flex flex-col items-center bg-black text-white pb-40 rounded-b-[250px]">

            <div className="absolute top-20 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[600px] h-[600px] bg-black rounded-full"></div>

        
            <h1 className="relative z-10 mt-32 text-center text-lg font-light">
                Tervetuloa töihin, <br />
                <span className="font-bold text-xl">Kirjaudu sisään</span>
            </h1>

           
        </nav>
    );
};

export default AuthNavbar;
