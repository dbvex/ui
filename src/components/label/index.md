# Label
<script setup>
import BaseLabel from './base-label.vue'

const message = 'В обработке'
</script>

## Default

<div class="blocks">
    <base-label class="label">
        Подписка
    </base-label>
    <base-label
        :value="message"
    >
        Основной текст
    </base-label>
</div>

```html
<base-label>
    Подписка
</base-label>
<base-label
    :value="message"
>
    Основной текст
</base-label>
```

## Custom colors

<div class="blocks">
    <base-label
        class="label"
        background-color="cold-red-1400"
        text-color="white-100"
    >
        Подписка
    </base-label>
    <base-label
        :value="message"
        background-color="dark-blue-800"
        text-color="white-88"
    >
        Основной текст
    </base-label>
</div>

```html
<base-label
    background-color="cold-red-1400"
    text-color="white-100"
>
    Подписка
</base-label>
<base-label
    :value="message"
    background-color="dark-blue-800"
    text-color="white-88"
>
    Основной текст
</base-label>
```