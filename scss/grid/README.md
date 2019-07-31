# grid

## Media
```
xs < 768;
sm >= 768;
md >= 992;
lg >= 1200;
xl >= 1920;
```

## Usage

### Basic
Auto adapt.

```html
.grid
  .row
    .col
```

### Average
Set `.row-average` to `row`, make each `col` get average space in one line.

```html
.grid
  .row.row-average
    .col
```

### Gutter
Set `.row-gutter` to `row`, make `gutter` in each `col`.

```html
.grid
  .row.row-gutter
    .col
```

### Responsive
Set width to col.

- Set `1-24` to `col` without responsive.
- Set `xs sm md lg xl`-`1-24` to `col` with responsive.

```html
.grid
  .row
    <!-- always width: 50% -->
    .col.col-12
    <!-- width: 50% only when window.width >= md-->
    .col.col-md-12
```

### Offset
Set offset to col.

- Set `1-24` to `col` without responsive.
- Set `xs sm md lg xl`-`1-24` to `col` with responsive.

```html
.grid
  .row
    <!-- always margin-left: 50% -->
    .col.col-offset-12
    <!-- margin-left: 50% only when window.width >= md-->
    .col.col-md-offset-12
```

### Wrap
Set `flex-wrap: wrap` to row, `col-24` will fill full line.

```html
.grid
  .row.row-wrap
    .col.col-24
    .col.col-24
```

### Order
Set order to col.

- Set `1-24` to `col` without responsive.
- Set `xs sm md lg xl`-`1-24` to `col` with responsive.

```html
.grid
  .row
    <!-- always order: 12 -->
    .col.col-order-12
    <!-- order: 12 only when window.width >= md-->
    .col.col-md-order-12
```

### Space
Set `flex: 1` to col.

```html
.grid
  .row
    .col
      title-icon
    .col
      title
    <!-- empty element, make middle space -->
    .col.col-space
    .col
      right-icon
```
