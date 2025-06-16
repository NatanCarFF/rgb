document.addEventListener('DOMContentLoaded', () => {
    const redSlider = document.getElementById('red');
    const greenSlider = document.getElementById('green');
    const blueSlider = document.getElementById('blue');

    const redValueSpan = document.getElementById('red-value');
    const greenValueSpan = document.getElementById('green-value');
    const blueValueSpan = document.getElementById('blue-value');

    const colorBox = document.getElementById('color-box');
    const hexCodeParagraph = document.getElementById('hex-code');
    const predefinedColorsContainer = document.getElementById('predefined-colors');
    const tabButtons = document.querySelectorAll('.tab-button');

    // Predefined colors (name and hex code) organized by categories
    const predefinedColors = {
        basics: [
            { name: 'Vermelho', hex: '#FF0000' },
            { name: 'Verde', hex: '#008000' },
            { name: 'Azul', hex: '#0000FF' },
            { name: 'Amarelo', hex: '#FFFF00' },
            { name: 'Ciano', hex: '#00FFFF' },
            { name: 'Magenta', hex: '#FF00FF' },
            { name: 'Preto', hex: '#000000' },
            { name: 'Branco', hex: '#FFFFFF' },
            { name: 'Laranja', hex: '#FFA500' },
            { name: 'Roxo', hex: '#800080' },
            { name: 'Cinza', hex: '#808080' }
        ],
        neutrals: [
            { name: 'Cinza Claro', hex: '#D3D3D3' },
            { name: 'Cinza Escuro', hex: '#A9A9A9' },
            { name: 'Chumbo', hex: '#36454F' },
            { name: 'Bege', hex: '#F5F5DC' },
            { name: 'Marrom Claro', hex: '#D2B48C' },
            { name: 'Marrom', hex: '#A52A2A' },
            { name: 'Creme', hex: '#FFFDD0' },
            { name: 'Areia', hex: '#C2B280' },
            { name: 'Branco Gelo', hex: '#F0F8FF' },
            { name: 'Cinza Médio', hex: '#8696A7' },
            { name: 'Marrom Terra', hex: '#8B4513' },
            { name: 'Bege Claro', hex: '#EEE8AA' }
        ],
        pastels: [
            { name: 'Rosa Claro', hex: '#FFB6C1' },
            { name: 'Azul Claro', hex: '#ADD8E6' },
            { name: 'Verde Menta', hex: '#98FB98' },
            { name: 'Lavanda', hex: '#E6E6FA' },
            { name: 'Pêssego', hex: '#FFE5B4' },
            { name: 'Amarelo Pastel', hex: '#FDFD96' },
            { name: 'Lilás', hex: '#C8A2C8' },
            { name: 'Turquesa Claro', hex: '#AFEEEE' },
            { name: 'Rosa Bebê', hex: '#F4C2C2' },
            { name: 'Azul Bebê', hex: '#89CFF0' },
            { name: 'Verde Suave', hex: '#C1E1C1' },
            { name: 'Amarelo Suave', hex: '#FFFACD' }
        ],
        vibrants: [
            { name: 'Verde Limão', hex: '#32CD32' },
            { name: 'Azul Elétrico', hex: '#7DF9FF' },
            { name: 'Rosa Choque', hex: '#FF69B4' },
            { name: 'Laranja Brilhante', hex: '#FF5733' },
            { name: 'Vermelho Vibrante', hex: '#EE4B2B' },
            { name: 'Azul Real', hex: '#00008B' },
            { name: 'Verde Esmeralda', hex: '#50C878' },
            { name: 'Amarelo Canário', hex: '#FFFF00' },
            { name: 'Roxo Profundo', hex: '#800080' },
            { name: 'Laranja Vibrante', hex: '#FF4500' },
             { name: 'Ciano Vibrante', hex: '#00FFFF' },
            { name: 'Magenta Vibrante', hex: '#FF00FF' }
        ],
        earthy: [
            { name: 'Verde Oliva', hex: '#808000' },
            { name: 'Terracota', hex: '#E2725B' },
            { name: 'Mostarda', hex: '#FFDB58' },
            { name: 'Marrom Escuro', hex: '#654321' },
            { name: 'Verde Floresta', hex: '#228B22' },
            { name: 'Borgonha', hex: '#800020' },
            { name: 'Cobre', hex: '#B87333' }
        ]
    };

    function updateColor() {
        const red = redSlider.value;
        const green = greenSlider.value;
        const blue = blueSlider.value;

        // Atualiza os valores numéricos ao lado dos sliders
        redValueSpan.textContent = red;
        greenValueSpan.textContent = green;
        blueValueSpan.textContent = blue;

        // Converte os valores RGB para hexadecimal
        const hexRed = parseInt(red).toString(16).padStart(2, '0');
        const hexGreen = parseInt(green).toString(16).padStart(2, '0');
        const hexBlue = parseInt(blue).toString(16).padStart(2, '0');

        const hexColor = `#${hexRed}${hexGreen}${hexBlue}`.toUpperCase();

        // Atualiza a cor da caixa de visualização
        colorBox.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

        // Atualiza o código hexadecimal
        hexCodeParagraph.textContent = hexColor;
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert(`"${text}" copiado para a área de transferência!`);
        }).catch(err => {
            console.error('Falha ao copiar texto: ', err);
        });
    }

    function hexToRgb(hex) {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return { r, g, b };
    }

    function loadPredefinedColors(category) {
        predefinedColorsContainer.innerHTML = ''; // Limpa as cores existentes

        predefinedColors[category].forEach(color => {
            const colorItem = document.createElement('div');
            colorItem.classList.add('predefined-color-item');

            const colorBoxElem = document.createElement('div');
            colorBoxElem.classList.add('predefined-color-box');
            colorBoxElem.style.backgroundColor = color.hex;
            colorBoxElem.title = color.name; // Tooltip

            // Add click event to load color into sliders
            colorBoxElem.addEventListener('click', () => {
                const rgb = hexToRgb(color.hex);
                redSlider.value = rgb.r;
                greenSlider.value = rgb.g;
                blueSlider.value = rgb.b;
                updateColor();
            });

            const colorNameSpan = document.createElement('span');
            colorNameSpan.classList.add('predefined-color-name');
            colorNameSpan.textContent = color.name;

            const colorInfo = document.createElement('div');
            colorInfo.classList.add('predefined-color-info');

            const colorHexSpan = document.createElement('span');
            colorHexSpan.classList.add('predefined-color-hex');
            colorHexSpan.textContent = color.hex;

            const copyButton = document.createElement('button');
            copyButton.classList.add('copy-button');
            copyButton.textContent = 'Copiar';
            copyButton.addEventListener('click', () => copyToClipboard(color.hex));

            colorInfo.appendChild(colorHexSpan);
            colorInfo.appendChild(copyButton);

            colorItem.appendChild(colorBoxElem);
            colorItem.appendChild(colorNameSpan);
            colorItem.appendChild(colorInfo);

            predefinedColorsContainer.appendChild(colorItem);
        });
    }

    // Event listeners para as abas
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona 'active' ao botão clicado
            button.classList.add('active');
            // Carrega as cores da categoria correspondente
            const category = button.dataset.category;
            loadPredefinedColors(category);
        });
    });

    // Adiciona event listeners para cada slider
    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);

    // Inicializa a cor e carrega a categoria 'basics' quando a página carrega
    updateColor();
    loadPredefinedColors('basics'); // Carrega a primeira categoria por padrão
});