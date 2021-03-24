# Vue-use-popperjs

The usePopperjs hook provides an API identical to the ones of
[createPopper](https://popper.js.org/docs/v2/constructors/#createpopper) constructor.

<img alt="Workflow status badge" src="https://github.com/iendeavor/vue-use-popperjs/workflows/CI/badge.svg" />

# Documentation

https://iendeavor.github.io/vue-use-popperjs/

# API

## Parameters

### Reference

### Popper

### Option

| Option             | Default   | Type                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------ | --------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| placement          | -         | -                                                                        | See [popper.js](https://popper.js.org/docs/v2/constructors/#placement) options                                                                                                                                                                                                                                                                                                        |
| modifiers          | -         | -                                                                        | See [popper.js](https://popper.js.org/docs/v2/constructors/#modifiers) options                                                                                                                                                                                                                                                                                                        |
| strategy           | -         | -                                                                        | See [popper.js](https://popper.js.org/docs/v2/constructors/#strategy) options                                                                                                                                                                                                                                                                                                         |
| onFirstUpdate      | -         | -                                                                        | See [popper.js](https://popper.js.org/docs/v2/constructors/#options) options                                                                                                                                                                                                                                                                                                          |
| trigger            | `'hover'` | `'hover' \| 'focus' \| 'click-to-toggle' \| 'click-to-open' \| 'manual'` | <ul><li>`hover` - open popper when hovering reference</li><li>`focus`: open popper when focusing on reference, hide popper on blur</li><li>`click-to-open`: click reference toggles popper's visibility</li><li>`click-to-open`: open popper when clicking reference, click outside to hide popper</li><li>`manual`: manually change popper's the visible of returned value</li></ul> |
| delay-on-mouseover | `200`     | `number`                                                                 | Delay in ms before showing popper during the mouseover event, only applicable for `trigger='hover'`                                                                                                                                                                                                                                                                                   |
| delay-on-mouseout  | 200       | number                                                                   | Delay in ms before hiding popper during the mouseout event, only applicable for `trigger='hover'`                                                                                                                                                                                                                                                                                     |
| force-show         | false     | boolean                                                                  | Force show the popper even manually (see the visible of returned value) close it                                                                                                                                                                                                                                                                                                      |

### Return

| Key      | Type           | Description                                          |
| -------- | -------------- | ---------------------------------------------------- |
| instance | `Object`       | Popperjs instance                                    |
| visible  | `Ref<boolean>` | Allow to manually set this value to show/hide popper |
