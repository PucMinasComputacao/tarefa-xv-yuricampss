
function _chaveUsuario() {
  const usuario = getUsuarioCorrente();
  if (!usuario) return null;
  return `favoritos_${usuario.id}`;
}

/**
 * @returns {number[]}
 *
function getFavoritos() {
  const chave = _chaveUsuario();
  if (!chave) return [];
  const dados = localStorage.getItem(chave);
  return dados ? JSON.parse(dados) : [];
}

/**
 * Verifica se um item é favorito.
 * @param {number} id
 * @returns {boolean}
 */
function isFavorito(id) {
  return getFavoritos().includes(id);
}

/**
 * Adiciona ou remove um item dos favoritos.
 * Retorna strue se foi favoritado, false se foi desfavoritado.
 * Lança erro se o usuário não estiver logado.
 * @param {number} id
 * @returns {boolean}
 */
function toggleFavorito(id) {
  const usuario = getUsuarioCorrente();
  if (!usuario) {
    throw new Error("Usuário não autenticado.");
  }

  const chave = _chaveUsuario();
  let favoritos = getFavoritos();

  if (favoritos.includes(id)) {
    favoritos = favoritos.filter((f) => f !== id);
    localStorage.setItem(chave, JSON.stringify(favoritos));
    return false; // desfavoritado
  } else {
    favoritos.push(id);
    localStorage.setItem(chave, JSON.stringify(favoritos));
    return true; // favoritado
  }
}
