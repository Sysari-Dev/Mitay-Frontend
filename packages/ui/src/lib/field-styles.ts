const fieldTransition = 'transition-[border-color,box-shadow] duration-200 motion-reduce:transition-none'

export const fieldControlClassName = [
  'border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded-lg border text-base outline-none sm:text-sm',
  fieldTransition,
  'hover:border-muted-foreground/40',
  'focus:border-primary focus:ring-3 focus:ring-primary/15',
  'aria-invalid:border-destructive aria-invalid:focus:ring-destructive/15',
  'data-success:border-success data-success:focus:ring-success/15',
  'disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-70',
].join(' ')

export const fieldGroupClassName = [
  'border-input bg-background text-foreground flex w-full items-center rounded-lg border',
  fieldTransition,
  'hover:border-muted-foreground/40',
  'focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/15',
  'has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:focus-within:ring-destructive/15',
  'has-[[data-success]]:border-success has-[[data-success]]:focus-within:ring-success/15',
  'has-[:disabled]:bg-muted has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-70',
].join(' ')
