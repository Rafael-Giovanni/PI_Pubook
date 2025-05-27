
import { useEffect, useState } from "react";
import { getLivros, criarLivro, atualizarLivro, deletarLivro } from "../services/livrosApi";

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [formLivro, setFormLivro] = useState({ id: null, titulo: "", autor: "", ano: "" });

  useEffect(() => {
    fetchLivros();
  }, []);

  async function fetchLivros() {
    const data = await getLivros();
    setLivros(data);
  }

  async function handleSalvar() {
    if (!formLivro.titulo || !formLivro.autor || !formLivro.ano) return;
    if (formLivro.id) {
      await atualizarLivro(formLivro);
    } else {
      await criarLivro(formLivro);
    }
    setFormLivro({ id: null, titulo: "", autor: "", ano: "" });
    fetchLivros();
  }

  function handleEditar(livro) {
    setFormLivro(livro);
  }

  async function handleExcluir(id) {
    await deletarLivro(id);
    fetchLivros();
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Livros</h1>
      <input placeholder="Título" value={formLivro.titulo} onChange={e => setFormLivro({ ...formLivro, titulo: e.target.value })} />
      <input placeholder="Autor" value={formLivro.autor} onChange={e => setFormLivro({ ...formLivro, autor: e.target.value })} />
      <input placeholder="Ano" type="number" value={formLivro.ano} onChange={e => setFormLivro({ ...formLivro, ano: e.target.value })} />
      <button onClick={handleSalvar}>{formLivro.id ? "Atualizar" : "Adicionar"}</button>

      <ul>
        {livros.map(livro => (
          <li key={livro.id}>
            {livro.titulo} - {livro.autor} ({livro.ano})
            <button onClick={() => handleEditar(livro)}>Editar</button>
            <button onClick={() => handleExcluir(livro.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
