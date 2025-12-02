const circles = [];
const numCircles = 50;
const maxSize = 100;

function createCircles() {
    const body = document.body;
    const numCircles = 50;
    const maxSize = 100;

    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';

        const size = Math.random() * maxSize + 10;
        circle.style.width = size + 'px';
        circle.style.height = size + 'px';

        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (window.innerHeight - size);
        circle.style.left = x + 'px';
        circle.style.top = y + 'px';

        const opacity = Math.random() * 0.4 + 0.3;
        circle.style.backgroundColor = `rgba(255, 107, 107, ${opacity})`;

        body.appendChild(circle);

        circles.push({
            element: circle,
            x: x,
            y: y,
            size: size,
            vx: (Math.random() - 0.5) * 1.5, // скорость по X (примерно от -0.75 до 0.75)
            vy: (Math.random() - 0.5) * 1.5  // скорость по Y
        });
    }
}

function animate() {
    for (const circle of circles) {
        circle.x += circle.vx;
        circle.y += circle.vy;

        // Отскок от границ окна
        if (circle.x <= 0 || circle.x >= window.innerWidth - circle.size) {
            circle.vx *= -1;
        }
        if (circle.y <= 0 || circle.y >= window.innerHeight - circle.size) {
            circle.vy *= -1;
        }

        circle.element.style.left = circle.x + 'px';
        circle.element.style.top = circle.y + 'px';
    }
    requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
    createCircles();
    animate();
});

window.addEventListener('resize', () => {
    circles.forEach(c => c.element.remove());
    circles.length = 0;
    createCircles();
});
