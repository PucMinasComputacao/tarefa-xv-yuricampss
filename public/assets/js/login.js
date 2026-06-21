
let usuariosDB = [];

let usuarioCorrente = {};

async function initLoginApp() {
  try {
    const response = await fetch("/usuarios");
    usuariosDB = await response.json();
  } catch (e) {
    console.error("Erro ao carregar usuários:", e);
  }

  const sessao = sessionStorage.getItem("usuarioCorrente");
  if (sessao) {
    usuarioCorrente = JSON.parse(sessao);
  } else {
    window.location.href = "/modulos/login/index.html";
  }
}

/**
 * @param {string} login - Login informado
 * @param {string} senha - Senha informada
 * @returns {boolean} true se login bem-sucedido, false caso contrário
 */
async function loginUser(login, senha) {
  if (usuariosDB.length === 0) {
    try {
      const response = await fetch("/usuarios");
      usuariosDB = await response.json();
    } catch (e) {
      console.error("Erro ao carregar usuários:", e);
      return false;
    }
  }

  const usuario = usuariosDB.find(
    (u) => u.login === login && u.senha === senha
  );

  if (usuario) {
    usuarioCorrente = {
      id: usuario.id,
      nome: usuario.nome,
      login: usuario.login,
      senha: usuario.senha,
      email: usuario.email,
    };
    sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuarioCorrente));
    return true;
  }

  return false;
}

function logoutUser() {
  usuarioCorrente = {};
  sessionStorage.removeItem("usuarioCorrente");
  window.location.href = "/modulos/login/index.html";
}

/**
 * Retorna o usuário corrente da sessão, ou null se não logado.
 * @returns {object|null}
 */
function getUsuarioCorrente() {
  const sessao = sessionStorage.getItem("usuarioCorrente");
  return sessao ? JSON.parse(sessao) : null;
}
