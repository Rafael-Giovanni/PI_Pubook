
const API_URL = "http://localhost/Bibliotecavirtual/livros";

export async function getLivros() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function criarLivro(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function atualizarLivro(data) {
  const res = await fetch(`${API_URL}/update.php`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await res.json();
}

export async function deletarLivro(id) {
  const res = await fetch(`${API_URL}/delete.php`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
  return await res.json();
}
