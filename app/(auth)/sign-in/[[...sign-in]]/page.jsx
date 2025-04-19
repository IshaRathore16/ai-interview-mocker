import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <div className="bg-sky-100 flex justify-center items-center h-screen">
    {/* Left: Image */}
    <div className="w-1/2 h-screen hidden lg:block">
    <img
      src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
      alt="Placeholder"
      className="object-cover relative"
      style={{
        height: "calc(100% - 150px)",
        width: "calc(100% - 150px)",
        top: "70px",
        left: "125px",
        position: "relative"
      }}
    />
    </div>

    <SignIn />
    </div>
  ); 
}