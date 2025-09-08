const form = document.getElementById('contactForm');

form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Сброс кастомных сообщений и ARIA-атрибутов
    [...form.elements].forEach(el => {
        el.setCustomValidity?.('');
        el.removeAttribute('aria-invalid');
    });

    // Проверка валидности формы
    if (!form.checkValidity()) {
        // Кастомные сообщения об ошибках
        const email = form.elements.email;
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }

        // Показать браузерные подсказки
        form.reportValidity();

        // Добавить ARIA-атрибуты для доступности
        [...form.elements].forEach(el => {
            if (el.willValidate && !el.checkValidity()) {
                el.setAttribute('aria-invalid', 'true');
            }
        });
        
        return;
    }

    // Успешная отправка формы
    document.getElementById('contactDialog')?.close('success');
    form.reset();
    
    // Можно добавить уведомление об успехе
    alert('Форма успешно отправлена!');
});