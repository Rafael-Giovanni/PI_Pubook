"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resposta = await fetch("http://localhost/biblioteca_virtual/backend/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: senha }),
    });

    const dados = await resposta.json();

    if (dados.sucesso) {
      // Redireciona ou salva no localStorage
      router.push("/dashboard");
    } else {
      setErro(dados.erro || "Erro desconhecido");
    }
  };

  return (
    <div className="h-screen bg-[--gray-bg] flex justify-center items-center">
      <section>
        <img src="/imgs/Image_Login.svg" alt="" />
      </section>
      <section className="bg-white w-[600px] h-[600px] rounded-r-[20px] flex justify-center items-center flex-col">
        <h1 className="text-[40px] font-bold text-[--blue-bg] text-center mb-6">Entrar</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="input-bg">
            <img src="/imgs/User.svg" alt="" />
            <input
              type="email"
              placeholder="Email"
              className="bg-[--input-bg] outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-bg">
            <img src="/imgs/Locked.svg" alt="" />
            <input
              type="password"
              placeholder="Senha"
              className="bg-[--input-bg] outline-none w-full"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between text-[--blue-bg]">
            <div className="flex gap-3">
              <input type="checkbox" />
              <p>Lembrar senha</p>
            </div>
            <a href="#" className="hover:underline text-blue-500">Esqueci minha senha</a>
          </div>
          {erro && <p className="text-red-500 text-sm">{erro}</p>}
          <input
            type="submit"
            value="ENTRAR"
            className="h-[60px] w-[200px] bg-[--blue-bg] mx-auto text-white font-bold text-[24px] rounded-3xl m-5 hover:shadow-xl hover:bg-[#4F5D75] hover:cursor-pointer"
          />
        </form>
        <p className="m-3">Ainda não possui uma conta? <Link href="/cadastro" className="hover:underline text-blue-500">Cadastre-se</Link></p>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-[1px] w-[137px] bg-[--blue-bg] rounded-full"></div>
          <p>ou entre com</p>
          <div className="h-[1px] w-[137px] bg-[--blue-bg] rounded-full"></div>
        </div>
        <div className="flex gap-12">
          {/* Social Login (futuro) */}
        </div>
      </section>
    </div>
  );
}