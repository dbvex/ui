# Checkbox
<script setup>
import BaseCheckbox from './base-checkbox.vue';
import { ref } from 'vue';

const isCheck = ref(true);
const isCheck1 = ref(true);
const isCheck2 = ref(false);
const isCheck3 = ref(false);
const themeName = ref('red');
const heroes = ref(['tor', 'hulk'])
</script>

<style>
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.col {
    width: 25%;
}

</style>   

## V-model - Boolean

```html
<base-checkbox v-model="isCheck">  </base-checkbox>
```
```ts
const isCheck = ref(false)

```
<base-checkbox  v-model="isCheck"> Label </base-checkbox>



## V-model - Array

```html
<div>
    <base-checkbox  v-model="heroes" :value="'tor'"> tor</base-checkbox>
    <base-checkbox  v-model="heroes" :value="'loki'"> loki</base-checkbox>
    <base-checkbox  v-model="heroes" :value="'hulk'"> hulk</base-checkbox>
</div>
```
heroes: {{ heroes }}


<div> 
    <base-checkbox  v-model="heroes" :value="'tor'"> tor</base-checkbox>
    <base-checkbox  v-model="heroes" :value="'loki'"> loki</base-checkbox>
    <base-checkbox  v-model="heroes" :value="'hulk'"> hulk</base-checkbox>
</div>


## Prop

```html
<base-checkbox :value="isCheck" @change="isCheck = !isCheck">  </base-checkbox>
```
```ts
const isCheck = ref(true)
```

<base-checkbox  :value="isCheck" @change="isCheck = !isCheck">  Label</base-checkbox>

## Theme color

```html

<div class="row">
    <div class="col">
        <base-checkbox
            :theme="themeName"
            :value="themeName === 'red'"
            @change="themeName = themeName === 'red' ? 'black':'red' "
        >Red - default</base-checkbox>
    </div>
    <div class="col">
        <base-checkbox
            :theme="themeName"
            :value="themeName === 'black'"
            @change="themeName = themeName === 'red' ? 'black':'red' "
        >Black</base-checkbox>
    </div>
</div>

```
```ts
const themeName = ref('red');
```
<div class="row">
    <div class="col">
        <base-checkbox 
            :theme="themeName" 
            :value="themeName === 'red'" 
            @change="themeName = themeName === 'red' ? 'black':'red' " 
        >Red - default</base-checkbox>
    </div>
    <div class="col">
        <base-checkbox 
            :theme="themeName"
            :value="themeName === 'black'" 
            @change="themeName = themeName === 'red' ? 'black':'red' " 
        >Black</base-checkbox>
    </div>
</div>

## State
```html

<base-checkbox :value="true"></base-checkbox>
<base-checkbox  :value="false"></base-checkbox>
<base-checkbox indeterminate></base-checkbox>

<base-checkbox  disabled :value="true"></base-checkbox>
<base-checkbox  disabled :value="false"></base-checkbox>
<base-checkbox  disabled indeterminate></base-checkbox>

<base-checkbox error></base-checkbox>

```
<div class="row">
    <div class="col">checked</div>
    <div class="col">off</div>
    <div class="col">indeterminate</div>
</div>

<div class="row">
    <div class="col"><base-checkbox :value="true"></base-checkbox></div>
    <div class="col"><base-checkbox :value="false"></base-checkbox></div>
    <div class="col"><base-checkbox indeterminate ></base-checkbox></div>
</div>
<div class="row">disabled</div>
<div class="row">
    <div class="col"><base-checkbox  disabled :value="true"></base-checkbox></div>
    <div class="col"><base-checkbox  disabled :value="false"></base-checkbox></div>
    <div class="col"><base-checkbox  disabled indeterminate></base-checkbox></div>
</div>
<div class="row">error</div>
<div class="row">
    <div><base-checkbox error></base-checkbox></div>
</div>

## Slot - default
```html

<div class="row">
    <base-checkbox :value="isCheck" @change="isCheck = !isCheck">
        Here's some <u>contact info</u>
    </base-checkbox>
</div>

```
<div class="row">
    <base-checkbox :value="isCheck" @change="isCheck = !isCheck">
        Here's <b>some</b> <u>contact info</u>
    </base-checkbox>
</div>


