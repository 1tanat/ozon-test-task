## Блок Progress

Этот проект реализует прототип блока **Progress**.

Блок показывает прогресс в виде круговой дуги и имеет три состояния: **normal**, **animate**, **hidden**. Управление происходит через JavaScript‑API, а также через элементы интерфейса: поле ввода `Value` и переключатели `Animate` / `Hide`.

---

### 1. Стек и запуск

- **HTML**
- **CSS**
- **JavaScript**
  
Запуск: открыть `index.html` в браузере (двойной клик или «Открыть с помощью…»).

---

### 2. Структура проекта

```
├── index.html
├── script.js
├── src/
│   ├── styles/
│   │   ├── base.css
│   │   └── components.css
│   └── blocks/
│       └── progress/
│           ├── progress.css
│           ├── progressBar.js
│           └── progressBarInterface.js
└── api/
    └── progressApi.js
```

- **Блок progress**: в `src/blocks/progress/` лежат стили блока (`progress.css`) и логика (`progressBar.js`, `progressBarInterface.js`).
- **Общие стили**: `src/styles/base.css`, `src/styles/components.css`.
- **API управления**: `api/progressApi.js` — инициализация и программное управление (значение, состояние, размер, цвет).
- **Точка входа**: `script.js` вызывает `ProgressApi.init('.progress-wrapper', { value, size, strokeWidth, color })`.

---
#### Конструктор ProgressBar

```js
const progress_bar = new ProgressBar(svg_element, circle_element, progress, size, stroke_width, color);
```

- `svg_element` — элемент `svg`, в котором рисуется прогресс
- `circle_element` — элемент `circle`, чьи атрибуты управляют прогрессом
- `progress` — начальное значение прогресса (0–100)
- `size` — размер `svg`
- `stroke_width` — толщина линии окружности
- `color` — цвет линии

#### Основные методы

- `setProgress(value)`  
  Устанавливает прогресс от 0 до 100. Значение приводится к диапазону [0, 100].
  Внутри пересчитывает `stroke-dashoffset`, так что дуга увеличивается по часовой стрелке и при 100 замыкает круг.

- `setSize(size)`  
  Меняет размер `svg`, пересчитывает радиус, длину окружности и смещение прогресса, обновляет атрибуты `width/height`, `cx/cy`.

- `setStrokeWidth(stroke_width)`  
  Меняет толщину линии, пересчитывает радиус, длину окружности и смещение, обновляет DOM‑атрибуты.

- `setStrokeColor(color)`  
  Меняет цвет линии круга.

- `setState(state)` / `getState()`  
  Управление состоянием блока. Допустимые значения:
  - `'normal'` — обычное состояние, без анимации и скрытия
  - `'animate'` — к `svg` применяется CSS‑анимация вращения (`.progressbar-animate`)
  - `'hidden'` — `svg` скрывается (`.progressbar-hide`)

---

### 4. Интерфейс и элементы управления (`ProgressBarInterface`)

Класс `ProgressBarInterface` используется как прослойка между версткой и блоком `ProgressBar`.

Определён в файле `progressBarInterface.js`:

```js
const progress_bar_interface = new ProgressBarInterface(progress_bar_wrapper, progress_value, size, stroke_width, color);
```
Он:
- создаёт `ProgressBar` с переданными параметрами
- подписывается на события

---

### 5. Состояния блока

- **Normal**  
  - Управление через `setProgress(value)`

- **Animated**  
  - Задаётся через `setState('animate')`
  - К `svg` применяется класс `.progressbar-animate`, который крутит круг с помощью CSS‑анимации

- **Hidden**  
  - Задаётся через `setState('hidden')`
  - К `svg` добавляется класс `.progressbar-hide`, который скрывает блок прогресса.

---

### 6. Адаптивность и мобильные устройства

- В портретном режиме:
  - круг сверху
  - контролы (`Value`, `Animate`, `Hide`) под кругом в колонке
- В альбомной ориентации (`@media (orientation: landscape)`):
  - круг и блок контролов располагаются в один ряд
  - увеличивается размер круга и ширина карточки

---

