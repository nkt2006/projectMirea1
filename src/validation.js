// Функция для валидации телефона (только цифры)
function validatePhoneInput() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {

        phoneInput.addEventListener('input', function(e) {
            // Удаляем все нецифровые символы
            this.value = this.value.replace(/\D/g, '');
        });
        
     
        phoneInput.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            this.value = pastedText.replace(/\D/g, '');
        });
        
       
        phoneInput.addEventListener('keypress', function(e) {
            const charCode = e.which ? e.which : e.keyCode;
          
            if (charCode < 48 || charCode > 57) {
                if (charCode !== 8 && charCode !== 9 && charCode !== 13 && charCode !== 27) {
                    e.preventDefault();
                }
            }
        });
        
        
        phoneInput.addEventListener('blur', function() {
            if (this.value && !/^\d+$/.test(this.value)) {
                this.setCustomValidity('Номер телефона должен содержать только цифры');
            } else {
                this.setCustomValidity('');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    validatePhoneInput();
    

    const form = document.getElementById('contactForm');
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        
        [...form.elements].forEach(el => {
            el.setCustomValidity?.('');
            el.removeAttribute('aria-invalid');
        });

        
        const phoneInput = document.getElementById('phone');
        if (phoneInput && phoneInput.value && !/^\d+$/.test(phoneInput.value)) {
            phoneInput.setCustomValidity('Номер телефона должен содержать только цифры');
            phoneInput.setAttribute('aria-invalid', 'true');
            phoneInput.focus();
            form.reportValidity();
            return;
        }

   
        if (!form.checkValidity()) {
            
            const email = form.elements.email;
            if (email?.validity.typeMismatch) {
                email.setCustomValidity('Введите корректный e-mail, например name@example.com');
            }

      
            form.reportValidity();

           
            [...form.elements].forEach(el => {
                if (el.willValidate && !el.checkValidity()) {
                    el.setAttribute('aria-invalid', 'true');
                }
            });
            
            return;
        }

        
        document.getElementById('contactDialog')?.close('success');
        form.reset();
        
     
        alert('Форма успешно отправлена!');
    });
});