const CATALOG_ITEMS = [
    {
        id: 1,
        titulo: "O mistério da Floresta Negra",
        categoria: "Livros",
        detalhes: "Um romance policiais envolvente que se passa nas profundezas da Floresta Negra",
        preco: "R$ 49,90",
        estoque: 15,
        autor: "Ana Clara Silva",
        lancamento: "2024"
    },
    {
        id: 2,
        titulo: "Vaso de Cerâmica Rústica",
        categoria: "Artesanato",
        detalhes: "Vaso decorativo, feito e pintado à mão, ideal para flores secas ou como peça central em mesas. Cada peça é única. Cor roxa vibrante com detalhes em ouro velho.",
        preco: "R$ 120,00",
        estoque: 3,
        material: "Argila Queimada e Tinta Acrílica",
        dimensoes: "20cm x 15cm"
    },
    {
        id: 3,
        titulo: "Crônicas de Marte",
        categoria: "Livros",
        detalhes: "Clássicos da ficção científica que explora a colonização humana em Marte e seua dilemas éticos. Uma leitura obrigatória para fãs de gênero.",
        preco: "R$ 35,50",
        estoque: 22,
        autor: "Roberto Almeida",
        lancamento: "1998 (Edição comemorativa)"
    },
    {
        id: 4,
        titulo: "Colar de Semente Natural",
        categoria: "Artesanato",
        detalhes: "Colar sustentável feito com sementes de açaí e tucumã. Perfeito para um visual boêmio e natural. Fecho ajustável.",
        preco: "R$75,90",
        estoque: 8,
        material: "Semente Naturais e Fio Encerada",
        comprimento: "50cm"
    }
];

/**
* Adiciona listeners aos botões "Ver Detalhes" para popular o modal dinamicamente
*/
const modalElement = document.querySelector('#detalheModal');
const modalTitle = modalElement.querySelector('.modal-title');
const modalBody = modalElement.querySelector('.modal-body');
const modalAction = modalElement.querySelector('.btn-success');

// 1. Ouvinte para popular o modal ANTES de ser exibido
modalElement.addEventListener('show.bs.modal', function (event) {
    // Lê o atributo "data-item-id" que contém o ID do item clickado
    const button = event.relatedTarget;
    const itemId = parseInt(button.getAttribute('data-item-id'));
    // Procura pelo ID do item clickado no vetor "CATALOG_ITEMS"
    const item = CATALOG_ITEMS.find(i => i.id === itemId);
    
    // Se o item foi encontrado no vetor "CATALOG_ITEMS"
    if (item) {
        // Atualiza o Título do Modal
        modalTitle.textContent = item.titulo;
        
        // Cria o HTML de detalhes 
        let detailsHTML = `
        <p class="mb-1"><strong>Categoria:</strong> <span class="badge bg-secondary">${item.categoria}</span></p>
        <p class="fs-4 fw-bold text-success mb-3">Preço: ${item.preco}</p>
        <hr>
        <p>${item.detalhes}</p>
    `;
        
        //Adiciona campos específicos por categoria
        if (item.categoria === 'Livros') {
            detailsHTML += `<p><strong>Autor:</strong> ${item.autor}</p>`;
            detailsHTML += `<p><strong>Lançamento:</strong> ${item.lancamento}</p>`;
            detailsHTML += `<p class="text-info"><strong>Estoque Disponível:</strong> ${item.estoque} unidades</p>`;
        } else if (item.categoria === 'Artesanato') {
            detailsHTML += `<p><strong>Material:</strong> ${item.material}</p>`;
            detailsHTML += `<p><strong>Dimensões/comprimento:</strong> ${item.dimensoes || item.comprimento}</p>`;
            detailsHTML += `<p class="text-info"><strong>Peças Exclusivas em Estoque:</strong> ${item.estoque}</p>`;
        }

        modalBody.innerHTML = detailsHTML;
        
        // Ao clicar no botão "Adicionar ao carrinho"
        modalAction.onclick = () => {
            console.log(`Ação: Item '${item.titulo}' (ID: $item.id}) adicionado ao carrinho.`);
            // Em uma aplicação real, você faria uma chamada de API aqui.
            // Para este exemplo, apenas fechamos o modal e mostramos o log.
            const bsModal = bootstrap.Modal.getInstance(modalElement);
            if(bsModal) bsModal.hide();
        }; 
    }
});

// 2. Ouvinte para a funcionalidade de busca (simples)
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const item = document.querySelector('.item-catalogo');

function executarPesquisa(event){
    
}

searchButton.addEventListener('click', executarPesquisa);
searchInput.addEventListener('keyup',(event) => {
    if (event.key === 'Enter') {
        executaePesquisa(event);
    } else if (searchInput.ariaValueMax.trim() === "") {
        executarPesquisa(event);
    }
});