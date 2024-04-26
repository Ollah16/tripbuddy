import Main from "./(mainpage)/main";
import { HandleToggle } from "./toggleContext";

export default function Home() {

  return (
    <main className="min-h-screen bg-[#f7f6f6] relative overflow-hidden">
      <HandleToggle>
        <Main />
      </HandleToggle>
    </main>
  );
}
