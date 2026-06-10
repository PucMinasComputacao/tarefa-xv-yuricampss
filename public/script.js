async function realizarLogin(usuario, senha) {

    try {

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario,
                senha
            })
        });

        const dados = await response.json();

        if (response.ok) {

            sessionStorage.setItem("token", dados.token);
            window.location.href = "dashboard.html";

        } else {
            exibirMensagem(dados.mensagem, "erro");
        }

    } catch (erro) {
        exibirMensagem("Erro ao conectar com o servidor.", "erro");
    }
}
