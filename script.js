const button = document.getElementById('runaway-btn');
document.addEventListener('mousemove', repelButton);
const REPEL_RADIUS = 150;
const  MOVE_DISTANCE = 50;
function repelButton(event) {
    // Координаты центра кнопки
    const btnRect = button.getBoundingClientRect();
    const btnX = btnRect.left + (btnRect.width / 2);
    const btnY = btnRect.top + (btnRect.height / 2);

    // Координаты курсора
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // 4. Расчет расстояния между курсором и центром кнопки (по теореме Пифагора)
    // $d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$
    const deltaX = mouseX - btnX;
    const deltaY = mouseY - btnY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // 5. Проверка, находится ли курсор внутри радиуса отталкивания
    if (distance < REPEL_RADIUS) {
        // Рассчитываем угол от курсора к кнопке (в радианах)
        const angle = Math.atan2(deltaY, deltaX);

        // Определяем новое положение, "отталкивая" кнопку
        // (перемещаем ее в направлении, противоположном углу)
        let newX = btnRect.left + (Math.cos(angle) * MOVE_DISTANCE);
        let newY = btnRect.top + (Math.sin(angle) * MOVE_DISTANCE);

        // 6. Ограничение движения (кнопка должна оставаться в пределах окна)
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Корректируем X
        newX = Math.max(0, Math.min(newX, windowWidth - btnRect.width));
        // Корректируем Y
        newY = Math.max(0, Math.min(newY, windowHeight - btnRect.height));

        // 7. Применяем новое положение
        button.style.left = `${newX}px`;
        button.style.top = `${newY}px`;
        // Удаляем transform, если он был задан ранее в CSS
        button.style.transform = 'none'; 
    }
}