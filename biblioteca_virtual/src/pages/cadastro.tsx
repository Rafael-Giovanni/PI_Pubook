import { useState } from "react";
import Link from "next/link";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Evita o envio do formulário antes de validar

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("http://localhost/biblioteca_virtual/backend/cadastro.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: form.nome,
          sobrenome: form.sobrenome,
          email: form.email,
          senha: form.senha,
          confirmar_senha: form.confirmarSenha,
        }),
      });

      const result = await response.json();
      if (result.sucesso) {
        alert("Cadastro realizado com sucesso!");
      } else {
        alert("Erro: " + result.erro);
      }
    } catch (error) {
      alert("Erro na requisição: " + error);
    }
  };

  return (
    <div className="h-screen bg-[--gray-bg] flex justify-center items-center">
      <section className="bg-white w-[600px] h-[600px] rounded-l-[20px] flex justify-center items-center flex-col">
        <h1 className="text-[40px] font-bold text-[--blue-bg] text-center mb-6">Entrar</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="input-bg">
            <img src="/imgs/User.svg" alt="" />
            <input type="text" name="nome" placeholder="Nome" onChange={handleChange} className="bg-[--input-bg] outline-none w-full"/>
          </div>
          <div className="input-bg">
            <img src="/imgs/User.svg" alt="" />
            <input type="text" name="sobrenome" placeholder="Sobrenome" onChange={handleChange} className="bg-[--input-bg] outline-none w-full"/>
          </div>
          <div className="input-bg">
            <img src="/imgs/Tag.svg" alt="" />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="bg-[--input-bg] outline-none w-full"/>
          </div>
          <div className="input-bg">
            <img src="/imgs/Locked.svg" alt="" />
            <input type="password" name="senha" placeholder="Senha" onChange={handleChange} className="bg-[--input-bg] outline-none w-full"/>
          </div>
          <div className="input-bg">
            <img src="/imgs/Locked.svg" alt="" />
            <input type="password" name="confirmarSenha" placeholder="Confirmar Senha" onChange={handleChange} className="bg-[--input-bg] outline-none w-full"/>
          </div>
          <input
            type="submit"
            value="CADASTRE-SE"
            className="h-[60px] w-[200px] bg-[--blue-bg] mx-auto text-white font-bold text-[24px] rounded-3xl m-5 hover:shadow-xl hover:bg-[#4F5D75] hover:cursor-pointer"
          />
        </form>
        <div>
          <p>Já possui uma conta? <Link href="/login" className="hover:underline text-blue-500">Entrar</Link></p>
        </div>
      </section>
      <section>
        <img src="/imgs/Image_Cadastro.svg" alt="" />
      </section>
    </div>
  );
}