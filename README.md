# jQuery Google Recaptcha Plugin

jQuery плагин для обработки каптчи от Google.

Подключение:

Подключаем скрипт рекаптчи
```
<script src="https://www.google.com/recaptcha/api.js?onload=grecaptcha&render=explicit" async defer></script>
```

Инициализируем рекаптчу
```
  function grecaptcha() {
	$('form[data-grecaptcha]').grecaptcha({
		sitekey: 'sitekey'
	}).on('submitAjax.grecaptcha', function() {
		// обрабатываем ajax форму
	}).on('error.grecaptcha', function() {
		// событие об ошибке
	}).on('success.grecaptcha', function() {
		// событие об успешной валидации
	});
}
```

Параметры:
```
 sitekey - публичный ключ
 parent - родительский блок в форме, в который встроится виджет рекаптчи (по умолчанию в конец формы)
 ajax - true | false - аяксовая ли форма (по умолчанию false)
 size - 'invisible' | 'visible' тип рекаптчи (по умолчанию 'visible')
```
