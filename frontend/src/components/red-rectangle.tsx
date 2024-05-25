const RedRectangle = () => {
    return (
      <div className="bg-red-500 w-full md:w-2/5 h-screen flex items-center justify-center text-wrap pl-20">
        <div>
          <h1 className="text-white text-4xl font-bold leading-tight pb-4">
            Calculateur de cote
          </h1>
          <h2 className="text-white text-3xl font-semibold leading-tight opacity-70 w-3/4 pb-2">
            École de technologie supérieure
          </h2>
          <p className="text-white text-base mt-4 text-wrap w-4/5">
            Entrez les sigles de chaque cours complétés ainsi que les notes obtenues pour calculer votre cote
          </p>
        </div>
      </div>
    );
  }

  export default RedRectangle;
