# BaseLabel

Badge/label component with customizable background and text colors via CSS variables.

## Usage

```vue
<BaseLabel value="Active" />
<BaseLabel value="Draft" background-color="blue-grey-200" text-color="blue-grey-1200" />
<BaseLabel><slot>Custom content</slot></BaseLabel>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Label text (also settable via default slot) |
| `backgroundColor` | `string` | `blue-grey-200` | CSS variable name for background |
| `textColor` | `string` | `blue-grey-1200` | CSS variable name for text color |
