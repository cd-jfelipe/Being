export type Recipe = {
    id: string;
    name: string;
    category: string;
    image: string;
    description: string;
    time: string;
    servings: number;
    difficulty: 'Fácil' | 'Médio' | 'Difícil';
    ingredients: string[];
    steps: string[];
};

export const RECEITAS: Recipe[] = [
    {
        id: '1',
        name: 'Pudim de paçoca',
        category: 'Doces',
        image: 'https://static.itdg.com.br/images/640-400/a4bebef999f986c5e2185d1eb2f8a765/142133-original.jpg',
        description: 'Pudim feito com paçoca esfarelada',
        time: '1h',
        servings: 8,
        difficulty: 'Médio',
        ingredients: [
            '1 lata de leite condensado',
            '5 ovos',
            '2 xícaras de leite',
            '1 xícara de paçoca esfarelada',
            '1 xícara de açúcar',
            '1 xícara de água',
        ],
        steps: [
            'Leve o açúcar e a água ao fogo baixo sem mexer até formar um caramelo.',
            'Despeje em uma forma de buraco no meio de 24 cm de diâmetro e reserve.',
            'No liquidificador, bata o leite condensado, o leite e os ovos por 2 minutos. Misture a paçoca com uma colher e despeje na forma caramelada. Leve ao forno médio preaquecido em banho-maria por 40 minutos ou até assar e firmar.',
            'Retire, deixe esfriar e leve à geladeira por 3 horas. Retire, desenforme e sirva.',
        ],
    },
    {
        id: '2',
        name: 'Cuscuz paulista',
        category: 'Massas',
        image: 'https://static.itdg.com.br/images/640-400/79d132d2184db10d81acdd39087a9319/98896-140588-original.jpg',
        description: 'Cuscuz nordestino naturalizado em São Paulo',
        time: '30 min',
        servings: 10,
        difficulty: 'Médio',
        ingredients: [
            '1 xícara de azeite',
            '1 cebola picada',
            '1 lata ou caixa de molho de tomate',
            '2 copos de água',
            '1 lata de ervilha',
            '1 lata de milho verde',
            '1 pimentão',
            '2 latas de sardinha ou atum',
            'Cheiro-verde a gosto',
            'Sal',
            '1 tablete de caldo de legumes',
            '3 xícaras de farinha de milho grossa',
            '3 ovos cozidos',
            '1 tomate',
        ],
        steps: [
            'Refogue no azeite, a cebola, o pimentão, as azeitonas, a ervilha, o milho verde, o molho de tomate, o cheiro-verde, a sardinha, os temperos e o tablete de caldo.',
            'Coloque a água, deixe ferver, coloque a farinha de milho e cozinhe.',
            'Unte a forma com azeite, e coloque os ovos, os tomates e a sardinha por baixo.',
            'Coloque a massa na forma, deixe esfriar e desenforme.',
        ],
    },
    {
        id: '3',
        name: 'Churrasco de Jacaré',
        category: 'Carnes',
        image: 'https://static.itdg.com.br/images/640-400/e70a5a4175adc2f8a341a9e81e813f31/70156-original.jpg',
        description: 'Carne de jacaré assada',
        time: '40 min',
        servings: 5,
        difficulty: 'Difícil',
        ingredients: [
            '1kg de carne de jacaré',
            '4 folhas de orégano',
            '1 folha de hortelã',
            '1 pitada de pimenta-do-reino a gosto',
            '4 folhas de ouro',
            '6 dentes de alho',
            'Sal',
        ],
        steps: [
            'Fure o jacaré em vários lugares para penetrar o tempero.',
            'Misture todos os ingredientes',
            'Amasse o alho e misture.',
            'Coloque tudo no jacaré.',
            'Depois coloque o jacaré junto com os ingredientes no saco plástico.',
            'Amarre e leve a jeladeira de um dia para o outro.',
            'Depois é so levar para a churrasqueira.',
        ],
    },
    {
        id: '4',
        name: 'Bolo de cenoura com cobertuda de chocolate',
        category: 'Sobremesas',
        image: 'https://cozinha365.com.br/wp-content/uploads/2025/02/Bolo-de-cenoura-S-1024x1024.webp',
        description: 'Bolo de cenoura com chocolate derretido por cima',
        time: '40 min',
        servings: 8,
        difficulty: 'Médio',
        ingredients: [
            '1 xícara de óleo',
            '4 ovos',
            '3 cenouras médias raladas',
            '1 xícara de farinha de trigo',
            '3 xícaras de açúcar',
            '1 colher de fermento em pó',
            '1 colher de manteiga',
            '3 colheres de chocolate em pó',
            '1 xícara de leite',
        ],
        steps: [
            'Em um liquidificador, adicione a cenoura, os ovos e o óleo, depois misture.',
            'Acrescente o açúcar e bata novamente por 5 minutos.',
            'Em uma tigela ou na batedeira, adicione a farinha de trigo e depois misture novamente.',
            'Acrescente o fermento e misture lentamente com uma colher.',
            'Asse em um forno preaquecido a 180° C por aproximadamente 40 minutos.',
            'Despeje em uma tigela a manteiga, o chocolate em pó, o açúcar e o leite, depois misture.',
            'Leve a mistura ao fogo e continue misturando até obter uma consistência cremosa, depois despeje a calda por cima do bolo.',
        ],
    },
];

export const CATEGORIAS = [...new Set(RECEITAS.map(r => r.category))];

