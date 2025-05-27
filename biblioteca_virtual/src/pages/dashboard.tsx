import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[--gray-bg] h-screen w-screen flex">
      {/* Sidebar */}
      <section id="Sidebar">
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </section>
      {/* Main */}
      <section id="Main" className="flex flex-col mx-auto">
        {/* Header */}
        <div id="Header" className=" mt-10">
          <form action="" method="post" className="">
            <div className="flex gap-4 w-[600px] bg-[#F6F6F6] p-4 rounded-xl">
              <img src="/imgs/Search.svg" alt="" />
              <input type="text" name="pesquisa" id="pesquisa" placeholder="Pesquise por livros, autor, genêro..." className="w-full bg-[#F6F6F6] border-none outline-none "/>
            </div>
          </form>
        </div>
        {/* Hero */}
        <div id="ContinuarLendo" className="self-start">
          <h2 className="text-xl font-semibold">Continuar lendo</h2>
        </div>
        <div id="ContinuarLendo" className="self-start">
          <h2 className="text-xl font-semibold">Descubra novos livros</h2>
        </div>
      </section>
    </div>
  );
}