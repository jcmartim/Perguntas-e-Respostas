// Lógica do botão de alteração
//Salvar Preferência no LocalStorage: Para lembrar a preferência do usuário:
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Recuperar o tema salvo no localStorage ou usar o padrão 'light-theme'
  const savedTheme = localStorage.getItem("theme") || "light-theme";
  body.className = savedTheme; // Aplicar o tema salvo

  // Atualizar o texto do botão com base no tema atual
  themeToggle.innerHTML =
    savedTheme === "light-theme"
      ? '<i class="bi bi-moon-stars-fill"></i>'
      : '<i class="bi bi-sun-fill"></i>';

  // Função para atualizar o atributo data-bs-theme
  const updateBootstrapTheme = (theme) => {
    const bsTheme = theme === "light-theme" ? "light" : "dark";
    document.querySelectorAll("[data-bs-theme]").forEach((element) => {
      element.setAttribute("data-bs-theme", bsTheme);
    });
  };

  // Aplicar o tema inicial ao data-bs-theme
  updateBootstrapTheme(savedTheme);

  // Adicionar um único evento ao botão
  themeToggle.addEventListener("click", () => {
    const isLightTheme = body.classList.contains("light-theme");

    // Alternar entre os temas
    body.className = isLightTheme ? "dark-theme" : "light-theme";

    // Salvar o tema no localStorage
    localStorage.setItem("theme", body.className);

    // Atualizar o texto do botão
    themeToggle.innerHTML = isLightTheme
      ? '<i class="bi bi-sun-fill"></i>'
      : '<i class="bi bi-moon-stars-fill"></i>';

    // Atualizar o atributo data-bs-theme
    updateBootstrapTheme(body.className);

    // Log para debug
    console.log(`Tema atual: ${body.className}`);
  });
});
