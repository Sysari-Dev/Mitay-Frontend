'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUp, Pencil, Trash2 } from 'lucide-react'
import { canDeleteCategory, countDishesInCategory, type MenuCategory } from '@mitay/core/catalog'
import { Button } from '@mitay/ui/atoms/button'
import { ConfirmDialog } from '@mitay/ui/molecules/confirm-dialog'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@mitay/ui/organisms/dialog'
import { CategoryNameForm } from '@/modules/catalog/presentation/catalog/components/CategoryNameForm'
import type { CatalogController } from '@/modules/catalog/presentation/catalog/hooks/useCatalog'

type CategoryManagerDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  catalog: CatalogController
}

function formatDishCount(count: number) {
  return count === 1 ? '1 plato' : `${count} platos`
}

export function CategoryManagerDialog({ open, onOpenChange, catalog }: CategoryManagerDialogProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [categoryToDelete, setCategoryToDelete] = useState<MenuCategory | null>(null)
  const lastIndex = catalog.categories.length - 1
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) setEditingId(null)
        onOpenChange(isOpen)
      }}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Categorías</DialogTitle>
          <DialogDescription>Ordénalas como quieres que aparezcan en tu carta.</DialogDescription>
        </DialogHeader>
        <CategoryNameForm label="Nueva categoría, por ejemplo Menú del día" submitLabel="Agregar" onSubmit={catalog.createCategory} />
        {catalog.categories.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aún no tienes categorías.</p>
        ) : (
          <ol className="border-border divide-border flex flex-col divide-y rounded-xl border">
            {catalog.categories.map((category, index) => {
              const dishCount = countDishesInCategory(catalog.dishes, category.id)
              if (editingId === category.id) {
                return (
                  <li key={category.id} className="p-3">
                    <CategoryNameForm
                      label={`Nuevo nombre para ${category.name}`}
                      initialName={category.name}
                      submitLabel="Guardar"
                      onSubmit={(name) => {
                        catalog.renameCategory(category.id, name)
                        setEditingId(null)
                      }}
                      onCancel={() => setEditingId(null)}
                    />
                  </li>
                )
              }
              return (
                <li key={category.id} className="flex items-center gap-1 py-2 pr-2 pl-4">
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">{category.name}</span>
                    <span className="text-muted-foreground text-xs">{formatDishCount(dishCount)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    color="neutral"
                    size="icon-sm"
                    aria-label={`Subir ${category.name}`}
                    disabled={index === 0}
                    onClick={() => catalog.moveCategory(category.id, 'up')}
                  >
                    <ArrowUp />
                  </Button>
                  <Button
                    variant="ghost"
                    color="neutral"
                    size="icon-sm"
                    aria-label={`Bajar ${category.name}`}
                    disabled={index === lastIndex}
                    onClick={() => catalog.moveCategory(category.id, 'down')}
                  >
                    <ArrowDown />
                  </Button>
                  <Button
                    variant="ghost"
                    color="neutral"
                    size="icon-sm"
                    aria-label={`Renombrar ${category.name}`}
                    onClick={() => setEditingId(category.id)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant="ghost"
                    color="destructive"
                    size="icon-sm"
                    aria-label={`Eliminar ${category.name}`}
                    disabled={!canDeleteCategory(catalog.dishes, category.id)}
                    onClick={() => setCategoryToDelete(category)}
                  >
                    <Trash2 />
                  </Button>
                </li>
              )
            })}
          </ol>
        )}
        <p className="text-muted-foreground text-xs">Solo puedes eliminar categorías sin platos.</p>
        <ConfirmDialog
          open={categoryToDelete !== null}
          onOpenChange={(isOpen) => {
            if (!isOpen) setCategoryToDelete(null)
          }}
          title={`¿Eliminar la categoría "${categoryToDelete?.name ?? ''}"?`}
          description="Dejará de aparecer en tu carta."
          confirmLabel="Eliminar categoría"
          onConfirm={() => {
            if (categoryToDelete) catalog.deleteCategory(categoryToDelete.id)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
