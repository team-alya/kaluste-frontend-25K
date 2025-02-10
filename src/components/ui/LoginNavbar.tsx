import logo from "/src/assets/logo.png";

const AuthNavbar = () => {
  return (
    <nav className="relative flex flex-col items-center bg-black text-white pb-21 rounded-b-[350px]">
      {" "}
      {/* Pienempi navbar */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[600px] h-[600px] bg-black rounded-full"></div>
      <div className="relative z-10 mt-17 flex items-center gap-2">
        <img src={logo} alt="Kierrätys" className="h-20 w-12 object-contain" />
        <div className="flex flex-col leading-tight">
          <span className="text-lg text-white">Kierrätys-</span>
          <span className="text-lg text-white">keskus</span>
        </div>
      </div>
      <h1 className="relative z-10 mt-5 text-left text-2xl text-gray-400">
        Tervetuloa töihin, <br />
        <span className="font-bold text-3xl text-white">Kirjaudu sisään</span>
      </h1>
    </nav>
  );
};

export default AuthNavbar;
