import './tlacuache-elements.js'
//Mathjax 3
function loadMathJax() {
  return new Promise((resolve) => {
    if (!window.MathJax) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.id = 'MathJax-script';
      script.async = true;
      
      // Configuración antes de cargar
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']]
        },
        startup: {
          pageReady: () => {
            console.log('MathJax está listo');
            resolve();
            return MathJax.startup.defaultPageReady();
          }
        }
      };
      
      document.head.appendChild(script);
    } else {
      resolve();
    }
  });
}

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
  await loadMathJax();  
  console.log('Aplicación y MathJax cargados');
});