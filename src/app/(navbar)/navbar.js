
import Navbrand from "./navbrand";
import NavBurger from "./navburger";

export const NavBar = () => {

    return (<div className={`flex items-center z-20 justify-between w-full px-4 h-16 relative top-0 right-0 left-0 border-b border-[#3498db] bg-inherit`}>
        <Navbrand />
        <NavBurger />
    </div >)
}