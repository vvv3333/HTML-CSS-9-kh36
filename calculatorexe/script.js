const units = {
            length: {
                standard: 'm',
                units: {
                    cm: { name: 'сантиметры', factor: 0.01 },
                    m: { name: 'метры', factor: 1 },
                    km: { name: 'километры', factor: 1000 },
                    banana: { name: 'бананы', factor: 0.2, unusual: true },
                    pencil: { name: 'карандаши', factor: 0.175, unusual: true }
                }
            },
            weight: {
                standard: 'kg',
                units: {
                    g: { name: 'граммы', factor: 0.001 },
                    kg: { name: 'килограммы', factor: 1 },
                    ton: { name: 'тонны', factor: 1000 },
                    rice: { name: 'зёрнышки риса', factor: 0.00003, unusual: true }
                }
            },
            area: {
                standard: 'm2',
                units: {
                    m2: { name: 'квадратные метры', factor: 1 },
                    km2: { name: 'квадратные километры', factor: 1000000 },
                    ha: { name: 'гектары', factor: 10000 },
                    football: { name: 'футбольные поля', factor: 7140, unusual: true }
                }
            }
        };

        const categorySelect = document.getElementById('category');
        const fromUnitSelect = document.getElementById('fromUnit');
        const toUnitSelect = document.getElementById('toUnit');
        const inputValue = document.getElementById('inputValue');
        const convertBtn = document.getElementById('convertBtn');
        const resultDiv = document.getElementById('result');

        function fillSelects() {
            const category = categorySelect.value;
            const categoryUnits = units[category].units;

            fromUnitSelect.innerHTML = '';
            toUnitSelect.innerHTML = '';

            for (const [key, unit] of Object.entries(categoryUnits)) {
                if (!unit.unusual) {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = unit.name;
                    if (key === units[category].standard) {
                        option.selected = true;
                    }
                    fromUnitSelect.appendChild(option);
                }
            }

            for (const [key, unit] of Object.entries(categoryUnits)) {
                if (unit.unusual) {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = unit.name;
                    toUnitSelect.appendChild(option);
                }
            }
        }

        function convert() {
            const category = categorySelect.value;
            const fromUnitKey = fromUnitSelect.value;
            const toUnitKey = toUnitSelect.value;
            const value = parseFloat(inputValue.value);
            
            if (isNaN(value)) {
                resultDiv.textContent = 'Введите число';
                return;
            }
            
            const fromUnit = units[category].units[fromUnitKey];
            const toUnit = units[category].units[toUnitKey];

            const valueInStandard = value * fromUnit.factor;
            const result = valueInStandard / toUnit.factor;

            resultDiv.textContent = `${value} ${fromUnit.name} = ${result.toFixed(2)} ${toUnit.name}`;
        }

        categorySelect.addEventListener('change', fillSelects);
        convertBtn.addEventListener('click', convert);
        
        inputValue.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') convert();
        });
        
        fillSelects();
        convert();